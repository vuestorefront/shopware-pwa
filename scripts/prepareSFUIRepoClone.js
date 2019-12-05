/**
 * Setup core dependencies as they're not published yet
 */

const execa = require("execa");
const path = require("path");
const fs = require("fs-extra");

const tempDir = path.resolve(__dirname, "../temp");
const repoDir = `${tempDir}/storefront-ui`;
const vuePackageDir = `${repoDir}/packages/vue`;
const sharedPackageDir = `${repoDir}/packages/shared`;
// const sharedPackageDir = `${repoDir}/packages/shared`;
const themeDir = path.resolve(__dirname, "../packages/default-theme");
const createIndexScriptPath = `${vuePackageDir}/scripts/create-index-files.js`;
const setScssScriptPath = `${vuePackageDir}/scripts/set-styles-variables-root-path.js`;
// const corePackagesDir = path.resolve(__dirname, "../vsf-core-packages");
// const vueCorePackageDir = `${corePackagesDir}/vue`;
// const sharedCorePackageDir = `${corePackagesDir}/shared`;

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

  /**
   * Prepare nuxt-module package
   */
  // if (fs.existsSync(vueCorePackageDir)) {
  //   fs.removeSync(vueCorePackageDir);
  // }
  // await execa("cp", ["-r", vuePackageDir, vueCorePackageDir], {
  //   stdio: "inherit"
  // });

  // if (fs.existsSync(sharedCorePackageDir)) {
  //   fs.removeSync(sharedCorePackageDir);
  // }
  // await execa("cp", ["-r", sharedPackageDir, sharedCorePackageDir], {
  //   stdio: "inherit"
  // });

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

  await execa("npx", ["yalc", "publish"], {
    stdio: "inherit",
    cwd: sharedPackageDir
  });

  await execa("npx", ["yalc", "publish"], {
    stdio: "inherit",
    cwd: vuePackageDir
  });

  await execa("npx", ["yalc", "add", "@storefront-ui/vue"], {
    stdio: "inherit",
    cwd: themeDir
  });

  await execa("npx", ["yalc", "add", "@storefront-ui/shared"], {
    stdio: "inherit",
    cwd: themeDir
  });

  // if (fs.existsSync(repoDir)) {
  //   fs.removeSync(repoDir);
  // }
}

run();
