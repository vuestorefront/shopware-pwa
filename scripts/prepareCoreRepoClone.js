/**
 * Setup core dependencies as they're not published yet
 */

const execa = require("execa");
const path = require("path");
const fs = require("fs-extra");

const tempDir = path.resolve(__dirname, "../local");
const repoDir = `${tempDir}/next`;
const nuxtModuleDir = `${repoDir}/packages/nuxt-module`;
const apiClientDir = path.resolve(__dirname, "../packages/shopware-6-client");
const defaultThemeDir = path.resolve(__dirname, "../packages/default-theme");

async function run() {
  /**
   * Clone newest Next repo
   */
  if (fs.existsSync(repoDir)) {
    fs.removeSync(repoDir);
  }
  await execa("git", ["clone", "https://github.com/filrak/next", repoDir], {
    stdio: "inherit"
  });

  /**
   * Build dependencies
   */
  execa("yarn", [], {
    stdio: "inherit",
    cwd: nuxtModuleDir
  });

  execa("yarn", ["link"], {
    stdio: "inherit",
    cwd: apiClientDir
  });

  execa("yarn", ["link", "@shopware-pwa/shopware-6-client"], {
    stdio: "inherit",
    cwd: defaultThemeDir
  });
}

run();
