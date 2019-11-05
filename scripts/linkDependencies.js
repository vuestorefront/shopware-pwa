/**
 * Setup core dependencies as they're not published yet
 */

const execa = require("execa");
const path = require("path");

const apiClientDir = path.resolve(__dirname, "../packages/shopware-6-client");
const defaultThemeDir = path.resolve(__dirname, "../packages/default-theme");

async function run() {
  await execa("yarn", ["link"], {
    stdio: "inherit",
    cwd: apiClientDir
  });

  await execa("yarn", ["link", "@shopware-pwa/shopware-6-client"], {
    stdio: "inherit",
    cwd: defaultThemeDir
  });
}

run();
