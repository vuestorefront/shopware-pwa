/**
 * Setup core dependencies as they're not published yet
 */

const execa = require("execa");
const path = require("path");

const apiClientDir = path.resolve(__dirname, "../packages/shopware-6-client");
const defaultThemeDir = path.resolve(__dirname, "../packages/default-theme");

const nuxtPackageCoreDir = path.resolve(
  __dirname,
  "../vsf-core-packages/nuxt-module"
);

async function run() {
  /**
   * Link shopware-6-client
   */
  await execa("yarn", ["link"], {
    stdio: "inherit",
    cwd: apiClientDir
  });
  await execa("yarn", ["link", "@shopware-pwa/shopware-6-client"], {
    stdio: "inherit",
    cwd: defaultThemeDir
  });

  /**
   * link core nuxt-module package
   */
  await execa("yarn", ["link"], {
    stdio: "inherit",
    cwd: nuxtPackageCoreDir
  });
  await execa("yarn", ["link", "@vue-storefront/nuxt"], {
    stdio: "inherit",
    cwd: defaultThemeDir
  });
}

run();
