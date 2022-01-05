/**
 * Setup SFUI develop branch and locally publish dependencies
 */

const execa = require("execa");
const path = require("path");
const fs = require("fs-extra");

const tempDir = path.resolve(__dirname, "../temp");
const repoDir = `${tempDir}/storefront-ui`;
const vuePackageDir = `${repoDir}/packages/vue`;
const sharedPackageDir = `${repoDir}/packages/shared`;
const themeDir = path.resolve(__dirname, "../packages/default-theme");
const createIndexScriptPath = `${vuePackageDir}/scripts/create-index-files.js`;
const setScssScriptPath = `${vuePackageDir}/scripts/set-styles-variables-root-path.js`;
async function run() {
  /**
   * Clone develop SFUI
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
      repoDir,
    ],
    {
      stdio: "inherit",
    }
  );

  /**
   * Init repo
   */
  await execa("yarn", [], {
    stdio: "inherit",
    cwd: repoDir,
  });

  // When script added
  // await execa("yarn", ["prepublish"], {
  //   stdio: "inherit",
  //   cwd: vuePackageDir
  // });
  // else
  const { createIndexFiles } = require(createIndexScriptPath);
  const { setStylesVariablesRootPath } = require(setScssScriptPath);
  function runPrePublish() {
    createIndexFiles();
    setStylesVariablesRootPath();
  }
  runPrePublish();

  // Publish shared pashage
  await execa("npx", ["yalc", "publish"], {
    stdio: "inherit",
    cwd: sharedPackageDir,
  });

  // Publish vue package
  await execa("npx", ["yalc", "publish"], {
    stdio: "inherit",
    cwd: vuePackageDir,
  });

  /**
   * Add vue and shared package into theme
   */
  await execa("npx", ["yalc", "add", "@storefront-ui/vue"], {
    stdio: "inherit",
    cwd: themeDir,
  });
  await execa("npx", ["yalc", "add", "@storefront-ui/shared"], {
    stdio: "inherit",
    cwd: themeDir,
  });
}

run();
