/**
 * Init Test project to develop and test Shopware PWA.
 * It produces an output by shopware-pwa CLI.
 */

const execa = require("execa");
const path = require("path");
const jetpack = require("fs-jetpack");

const rootDir = path.resolve(__dirname, "../");
const testProjectDir = path.join(rootDir, "test-project");

async function run() {
  await jetpack.dir(testProjectDir);

  await execa("../packages/cli/bin/shopware-pwa", ["init"], {
    stdio: "inherit",
    cwd: testProjectDir
  });
}

run();
