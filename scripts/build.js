/*
Produces production builds and stitches together d.ts files.

To specify the package to build, simply pass its name and the desired build
formats to output (defaults to `buildOptions.formats` specified in that package,
or "esm,cjs"):

```
# name supports fuzzy match. will build all packages with name containing "dom":
yarn build dom

# specify the format to output
yarn build core --formats cjs
```
*/

const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const execa = require("execa");
const { gzipSync } = require("zlib");
const { compress } = require("brotli");
const { targets: buildTargets, fuzzyMatchTarget } = require("./utils");
const { build: esBuild } = require("esbuild");

const args = require("minimist")(process.argv.slice(2));
const isCIRun = !!args.ci;
const targets = args._;
const formats = args.formats || args.f;
const devOnly = args.devOnly || args.d;
const isRelease = args.release;
const buildTypes = args.t || args.types || isRelease || isCIRun;
const buildAllMatching = args.all || args.a;

run();

async function run() {
  try {
    if (!targets.length) {
      const buildedCorrectly = await buildAll(buildTargets);
      if (buildedCorrectly === false) process.exit(1);
      if (isCIRun) {
        await execa("node", ["yalcPushPackages.js"], {
          stdio: "inherit",
          cwd: __dirname,
        });
      }
      checkAllSizes(buildTargets);
    } else {
      await buildAll(fuzzyMatchTarget(targets, buildAllMatching));
      checkAllSizes(fuzzyMatchTarget(targets, buildAllMatching));
    }
  } catch (e) {
    console.error("Build error", e);
    process.exit(1);
  }
}

async function buildAll(targets) {
  for (const target of targets) {
    const result = await build(target);
    if (result === false) return false;
  }
  if (buildTypes) {
    console.log(
      chalk.bold(
        chalk.yellow(
          `Updating docs/landing/resources/api folder with public documentation`
        )
      )
    );
    if (!fs.existsSync("temp")) {
      console.log(
        chalk.bold(chalk.yellow(`No definition found in "temp" directory.`))
      );
      return;
    }
    await execa(
      "api-documenter",
      ["markdown", "-i", "./temp", "-o", "./docs/landing/resources/api"],
      { stdio: "inherit" }
    );
  }
}

async function runBuild({
  target,
  packageJson,
  format = "esm",
  additionalEntrypoints = [],
}) {
  const buildTarget = format === "esm" ? "es2020" : "es2015";

  try {
    const dependencies = Object.keys(packageJson.dependencies || {});
    const peerDependencies = Object.keys(packageJson.peerDependencies || {});
    const external = [...dependencies, ...peerDependencies];
    await esBuild({
      define: {
        "process.env.NODE_ENV": '"production"',
      },
      entryPoints: [path.join("packages", target, "src", "index.ts")],
      outfile: path.join("packages", target, "dist", `${target}.${format}.js`),
      minify: false,
      bundle: true,
      external,
      target: buildTarget,
      format,
    });
    if (additionalEntrypoints.length) {
      const promisses = additionalEntrypoints.map((entrypoint) => {
        return esBuild({
          entryPoints: [
            path.join("packages", target, "src", `${entrypoint}.ts`),
          ],
          outfile: path.join(
            "packages",
            target,
            "dist",
            `${entrypoint}.${format}.js`
          ),
          minify: false,
          bundle: true,
          external,
          target: buildTarget,
          format,
          define: {
            "process.env.NODE_ENV": '"production"',
          },
        });
      });
      await Promise.all(promisses);
    }
    return true;
  } catch (e) {
    console.error("Error building " + target, e);
    return false;
  }
}

async function buildPackage(target, packageJson) {
  const formats =
    (packageJson.buildOptions && packageJson.buildOptions.formats) || [];
  const additionalEntrypoints =
    (packageJson.buildOptions &&
      packageJson.buildOptions.additionalEntrypoints) ||
    [];
  const results = await Promise.all(
    formats.map((format) => {
      return runBuild({
        target,
        packageJson,
        format,
        additionalEntrypoints,
      });
    })
  );
  return !results.includes(false);
}

async function build(target) {
  console.log();
  console.log(`Building ${chalk.bold(target)} package...`);
  const { performance } = require("perf_hooks");
  const t0 = performance.now();
  const pkgDir = path.resolve(`packages/${target}`);
  const pkg = require(`${pkgDir}/package.json`);

  // run custom package build if there is one
  if (pkg.scripts && pkg.scripts.build) {
    await execa("yarn", ["build"], {
      stdio: "inherit",
      cwd: pkgDir,
      env: {
        NODE_ENV: "production",
      },
    });
    return;
  }

  // if building a specific format, do not remove dist.
  if (!formats) {
    await fs.remove(`${pkgDir}/dist`);
  }

  const buildResult = await buildPackage(target, pkg);
  if (!buildResult) return false;
  const t1 = performance.now();
  console.log(chalk.green(`Build success: ${Math.round(t1 - t0)} ms`));

  if (buildTypes && pkg.types) {
    console.log();
    console.log(
      chalk.bold(chalk.yellow(`Rolling up type definitions for ${target}...`))
    );

    try {
      await execa(
        "yarn",
        [
          "tsc",
          "--emitDeclarationOnly",
          "--declaration",
          "--skipLibCheck",
          "--project",
          path.join("packages", target, `tsconfig-${target}.json`),
        ],
        {
          stdio: "inherit",
        }
      );
    } catch (e) {
      console.error("Problem with generationg declarations file", e);
      return false;
    }

    // build types
    const { Extractor, ExtractorConfig } = require("@microsoft/api-extractor");

    const extractorConfigPath = path.resolve(pkgDir, `api-extractor.json`);
    const extractorConfig =
      ExtractorConfig.loadFileAndPrepare(extractorConfigPath);
    const result = Extractor.invoke(extractorConfig, {
      localBuild: !isCIRun,
      showVerboseMessages: true,
    });

    if (result.succeeded) {
      // concat additional d.ts to rolled-up dts (mostly for JSX)
      if (pkg.buildOptions && pkg.buildOptions.dts) {
        const dtsPath = path.resolve(pkgDir, pkg.types);
        const existing = await fs.readFile(dtsPath, "utf-8");
        const toAdd = await Promise.all(
          pkg.buildOptions.dts.map((file) => {
            return fs.readFile(path.resolve(pkgDir, file), "utf-8");
          })
        );
        await fs.writeFile(dtsPath, existing + "\n" + toAdd.join("\n"));
      }
      console.log(
        chalk.bold(chalk.green(`API Extractor completed successfully.`))
      );
    } else {
      console.error(
        `API Extractor completed with ${result.errorCount} errors` +
          ` and ${result.warningCount} warnings`
      );
      console.log(
        chalk.bold(
          chalk.red(
            `Probably public API has changed. You need to run 'yarn build' locally and commit generated public API documentation.`
          )
        )
      );
      process.exitCode = 1;
      return false;
    }

    await fs.remove(`${pkgDir}/dist/packages`);
  }
  const t2 = performance.now();
  console.log(chalk.green(`Whole package build: ${Math.round(t2 - t0)} ms`));
  console.log();
}

function checkAllSizes(targets) {
  if (devOnly) {
    return;
  }
  console.log();
  for (const target of targets) {
    checkSize(target);
  }
  console.log();
}

function checkSize(target) {
  const pkgDir = path.resolve(`packages/${target}`);
  checkFileSize(`${pkgDir}/dist/${target}.global.prod.js`);
  checkFileSize(`${pkgDir}/dist/${target}.runtime.global.prod.js`);
}

function checkFileSize(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }
  const file = fs.readFileSync(filePath);
  const minSize = (file.length / 1024).toFixed(2) + "kb";
  const gzipped = gzipSync(file);
  const gzippedSize = (gzipped.length / 1024).toFixed(2) + "kb";
  const compressed = compress(file);
  const compressedSize = (compressed.length / 1024).toFixed(2) + "kb";
  console.log(
    `${chalk.gray(
      chalk.bold(path.basename(filePath))
    )} min:${minSize} / gzip:${gzippedSize} / brotli:${compressedSize}`
  );
}
