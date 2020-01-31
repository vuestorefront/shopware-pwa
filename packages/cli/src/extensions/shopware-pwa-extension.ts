import { GluegunToolbox } from "gluegun";

const defaultConfig = {
  shopwareEndpoint: "https://shopware-2.vuestorefront.io/sales-channel-api/v1",
  shopwareAccessToken: "SWSCMUDKAKHSRXPJEHNOSNHYAG"
};
// add your CLI-specific functionality here, which will then be accessible
// to your commands
module.exports = (toolbox: GluegunToolbox) => {
  toolbox.foo = () => {
    toolbox.print.info("called foo extension");
  };

  toolbox.coreDependencyPackageNames = [
    "@shopware-pwa/composables",
    "@shopware-pwa/helpers",
    "@shopware-pwa/shopware-6-client",
    "@shopware-pwa/default-theme"
  ];

  toolbox.themeFolders = [
    "components",
    "layouts",
    "pages",
    "store",
    "assets",
    "middleware",
    "static",
    ".eslintrc.js",
    "helpers"
  ];

  toolbox.defaultThemeLocation = `node_modules/@shopware-pwa/default-theme`;
  // enable this if you want to read configuration in from
  // the current folder's package.json (in a "shopware-pwa" property),
  // shopware-pwa.config.json, etc.
  toolbox.config = {
    ...toolbox.config,
    // load default config
    ...defaultConfig,
    // load config file from generated project
    ...toolbox.config.loadConfig("shopware-pwa", process.cwd())
  };

  /**
   * isProduction returns information if process is running from npm package.
   * Locally can be forced with flag `--compiled-build`
   */
  const devMode = require("fs").existsSync(`${__dirname}/../../src`);
  toolbox.isProduction = !devMode || process.argv.includes("--compiled-build");
};
