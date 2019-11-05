/**
 * Setup core dependencies as they're not published yet
 */

const execa = require("execa");
const path = require("path");
const fs = require("fs-extra");

const tempDir = path.resolve(__dirname, "../local");
const repoDir = `${tempDir}/next`;
const nuxtModuleDir = `${repoDir}/packages/nuxt-module`;

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
}

run();
