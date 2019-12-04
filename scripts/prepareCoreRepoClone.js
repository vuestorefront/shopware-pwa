/**
 * Setup core dependencies as they're not published yet
 */

const execa = require("execa");
const path = require("path");
const fs = require("fs-extra");

const tempDir = path.resolve(__dirname, "../temp");
const repoDir = `${tempDir}/next`;
const nuxtModuleDir = `${repoDir}/packages/core/nuxt-module`;
const corePackagesDir = path.resolve(__dirname, "../vsf-core-packages");
const nuxtModuleDestinationDir = `${corePackagesDir}/nuxt-module`;

async function run() {
  /**
   * Clone newest Next repo
   */
  if (fs.existsSync(repoDir)) {
    fs.removeSync(repoDir);
  }
  await execa("git", ["clone", "https://github.com/DivanteLtd/next", repoDir], {
    stdio: "inherit"
  });
  if (!fs.existsSync(corePackagesDir)) {
    fs.mkdirSync(corePackagesDir);
  }

  /**
   * Prepare nuxt-module package
   */
  if (fs.existsSync(nuxtModuleDestinationDir)) {
    fs.removeSync(nuxtModuleDestinationDir);
  }
  await execa("cp", ["-r", nuxtModuleDir, nuxtModuleDestinationDir], {
    stdio: "inherit"
  });
}

run();
