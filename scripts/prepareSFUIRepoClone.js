/**
 * Setup core dependencies as they're not published yet
 */

const execa = require("execa");
const path = require("path");
const fs = require("fs-extra");

const tempDir = path.resolve(__dirname, "../temp");
const repoDir = `${tempDir}/storefront-ui`;
const vuePackageDir = `${repoDir}/packages/vue`;
const themeDir = path.resolve(__dirname, "../packages/default-theme");

async function run() {
  /**
   * Clone newest Next repo
   */
  if (fs.existsSync(repoDir)) {
    fs.removeSync(repoDir);
  }
  await execa(
    "git",
    [
      "clone",
      "--single-branch",
      "--branch",
      "develop",
      "https://github.com/DivanteLtd/storefront-ui",
      repoDir
    ],
    {
      stdio: "inherit"
    }
  );

  await execa("yarn", [], {
    stdio: "inherit",
    cwd: repoDir
  });

  await execa("npx", ["yalc", "publish"], {
    stdio: "inherit",
    cwd: vuePackageDir
  });

  await execa("npx", ["yalc", "add", "@storefront-ui/vue"], {
    stdio: "inherit",
    cwd: themeDir
  });
}

run();
