const { allTargets } = require("./utils");
const path = require("path");
const execa = require("execa");
const chalk = require("chalk");

async function run() {
  const { performance } = require("perf_hooks");
  const t0 = performance.now();
  const packagesPath = path.join(__dirname, "..", "packages");
  const allTasts = allTargets.map(async (targetName) => {
    const pkgDir = path.join(packagesPath, targetName);
    return await execa("yalc", ["push"], {
      stdio: "inherit",
      cwd: pkgDir,
    });
  });
  await Promise.all(allTasts);
  const t2 = performance.now();
  console.log(chalk.green(`Yalc linking time: ${Math.round(t2 - t0)} ms`));
}

run();
