const { allTargets } = require("./utils");
const path = require("path");
const execa = require("execa");
const chalk = require("chalk");

async function run() {
  const { performance } = require("perf_hooks");
  const t0 = performance.now();
  const testProjectPath = path.join(__dirname, "..", "test-project");
  const allPackages = allTargets.map(
    (targetName) => `@shopware-pwa/${targetName}`
  );

  await execa("yalc", ["add", ...allPackages], {
    stdio: "inherit",
    cwd: testProjectPath,
  });

  const t2 = performance.now();
  console.log(
    chalk.green(`Yalc adding to test project time: ${Math.round(t2 - t0)} ms`)
  );
}

run();
