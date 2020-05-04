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
const {
  targets: buildTargets,
  allTargets,
  fuzzyMatchTarget,
} = require("./utils");

const args = require("minimist")(process.argv.slice(2));
const isCIRun = !!args.ci;
const targets = args._;
const formats = args.formats || args.f;
const devOnly = args.devOnly || args.d;
const prodOnly = !devOnly && (args.prodOnly || args.p);
const sourceMap = args.sourcemap || args.s;
const isRelease = args.release;
const buildTypes = true; // args.t || args.types || isRelease || isCIRun; -> for now build always with types
const buildAllMatching = args.all || args.a;
const commit = execa.sync("git", ["rev-parse", "HEAD"]).stdout.slice(0, 7);

run();

async function run() {
  if (!targets.length) {
    await buildAll(buildTargets);
    if (isCIRun) {
      for (let index = 0; index < allTargets.length; index++) {
        const pkgDir = path.resolve(`packages/${allTargets[index]}`);
        await execa("npx", ["yalc", "push"], {
          stdio: "inherit",
          cwd: pkgDir,
        });
      }
    }
    checkAllSizes(buildTargets);
  } else {
    await buildAll(fuzzyMatchTarget(targets, buildAllMatching));
    checkAllSizes(fuzzyMatchTarget(targets, buildAllMatching));
  }
}

async function buildAll(targets) {
  for (const target of targets) {
    const result = await build(target);
    if (result === false) return;
  }
  if (buildTypes) {
    console.log(
      chalk.bold(
        chalk.yellow(`Updating docs/api folder with public documentation`)
      )
    );
    await execa(
      "api-documenter",
      ["markdown", "-i", "./temp", "-o", "./docs/api"],
      { stdio: "inherit" }
    );
  }
}

async function build(target) {
  const pkgDir = path.resolve(`packages/${target}`);
  const pkg = require(`${pkgDir}/package.json`);

  // only build published packages for release
  if (isRelease && pkg.private) {
    if (isCIRun) {
      await execa("npx", ["yalc", "push"], {
        stdio: "inherit",
        cwd: pkgDir,
      });
    }
    return;
  }

  // if building a specific format, do not remove dist.
  if (!formats) {
    await fs.remove(`${pkgDir}/dist`);
  }

  const env =
    (pkg.buildOptions && pkg.buildOptions.env) ||
    (devOnly ? "development" : "production");
  await execa(
    "rollup",
    [
      "-c",
      "--environment",
      [
        `COMMIT:${commit}`,
        `NODE_ENV:${env}`,
        `TARGET:${target}`,
        formats ? `FORMATS:${formats}` : ``,
        buildTypes ? `TYPES:true` : ``,
        prodOnly ? `PROD_ONLY:true` : ``,
        sourceMap ? `SOURCE_MAP:true` : ``,
      ]
        .filter(Boolean)
        .join(","),
    ],
    { stdio: "inherit" }
  );

  if (buildTypes && pkg.types) {
    console.log();
    console.log(
      chalk.bold(chalk.yellow(`Rolling up type definitions for ${target}...`))
    );

    // build types
    const { Extractor, ExtractorConfig } = require("@microsoft/api-extractor");

    const extractorConfigPath = path.resolve(pkgDir, `api-extractor.json`);
    const extractorConfig = ExtractorConfig.loadFileAndPrepare(
      extractorConfigPath
    );
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
