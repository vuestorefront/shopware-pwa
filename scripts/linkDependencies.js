/**
 * Setup core dependencies as they're not published yet
 */

const execa = require("execa");
const path = require("path");

const apiClientDir = path.resolve(__dirname, "../packages/shopware-6-client");
const composablesDir = path.resolve(__dirname, "../packages/composables");
const defaultThemeDir = path.resolve(__dirname, "../packages/default-theme");
const helpersDir = path.resolve(__dirname, "../packages/helpers");
const cliDir = path.resolve(__dirname, "../packages/cli");
const commonsDir = path.resolve(__dirname, "../packages/commons");

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
   * Link composables
   */
  await execa("yarn", ["link"], {
    stdio: "inherit",
    cwd: composablesDir
  });
  await execa("yarn", ["link", "@shopware-pwa/composables"], {
    stdio: "inherit",
    cwd: defaultThemeDir
  });

  /**
   * Link helpers
   */
  await execa("yarn", ["link"], {
    stdio: "inherit",
    cwd: helpersDir
  });
  await execa("yarn", ["link", "@shopware-pwa/helpers"], {
    stdio: "inherit",
    cwd: defaultThemeDir
  });
  
  /**
   * Link commons
   */
  await execa("yarn", ["link"], {
    stdio: "inherit",
    cwd: commonsDir
  });
  await execa("yarn", ["link", "@shopware-pwa/commons"], {
    stdio: "inherit",
    cwd: apiClientDir
  });
  await execa("yarn", ["link", "@shopware-pwa/commons"], {
    stdio: "inherit",
    cwd: helpersDir
  });
  await execa("yarn", ["link", "@shopware-pwa/commons"], {
    stdio: "inherit",
    cwd: composablesDir
  });

  /**
   * Link CLI dir
   */
  await execa("yarn", ["link"], {
    stdio: "inherit",
    cwd: cliDir
  });

  /**
   * Link default-theme dir
   */
  await execa("yarn", ["link"], {
    stdio: "inherit",
    cwd: defaultThemeDir
  });

  /**
   * link local storefront-ui
   */
  // await execa("yarn", ["link", "@storefront-ui/vue"], {
  //   stdio: "inherit",
  //   cwd: defaultThemeDir
  // });
}

run();
