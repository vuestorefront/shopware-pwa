import { GluegunToolbox } from "gluegun";

const defaultConfig = {
  shopwareEndpoint: "https://pwa-demo-api.shopware.com",
  shopwareAccessToken: "SWSC40-LJTNO6COUEN7CJMXKLA",
  theme: "@shopware-pwa/default-theme",
};
// add your CLI-specific functionality here, which will then be accessible
// to your commands
module.exports = (toolbox: GluegunToolbox) => {
  toolbox.foo = () => {
    toolbox.print.info("called foo extension");
  };

  toolbox.themeFolders = [".eslintrc.js"];

  /**
   * Project theme can be placed in one of the places
   * 1. direct relative path to project root folder ex. `./my-theme` directory and `theme: "my-theme"` setting in shopware-pwa.config.js
   * 2. in node_modules directory, like base theme ex. `theme: "@shopware-pwa/default-theme"` setting in shopware-pwa.config.js
   */
  toolbox.getThemePath = () => {
    const path = require("path");

    const directPath = toolbox.config.theme;
    const directPathExist = require("fs").existsSync(directPath);
    if (directPathExist) return directPath;

    const nodePackagePath = path.join("node_modules", toolbox.config.theme);
    const nodePackagePathExist = require("fs").existsSync(nodePackagePath);
    if (nodePackagePathExist) return nodePackagePath;

    throw new Error(`No theme found for "${directPath}". Please make sure that path is correct or theme is installed from NPM.`);
  };

  toolbox.checkThemePath = () => {
    try {
      toolbox.getThemePath();
    } catch (e) {
      toolbox.print.error(e);
      process.exit(1);
    }
  };

  // enable this if you want to read configuration in from
  // the current folder's package.json (in a "shopware-pwa" property),
  // shopware-pwa.config.json, etc.
  toolbox.config = {
    ...toolbox.config,
    // load default config
    ...defaultConfig,
    // load config file from generated project
    ...toolbox.config.loadConfig("shopware-pwa", process.cwd()),
  };

  /**
   * isProduction returns information if process is running from npm package.
   * Locally can be forced with flag `--compiled-build`
   */
  const devMode = require("fs").existsSync(`${__dirname}/../../src`);
  toolbox.isProduction = !devMode || process.argv.includes("--compiled-build");

  /**
   * inputs for commands
   * - most important are params passed to CLI
   * - fallback is shopware-pwa.config.js file
   * - next fallback are default values
   */
  toolbox.inputParameters = {
    shopwareEndpoint:
      toolbox.parameters.options.shopwareEndpoint ||
      toolbox.config.shopwareEndpoint,
    shopwareAccessToken:
      toolbox.parameters.options.shopwareAccessToken ||
      toolbox.config.shopwareAccessToken,
    username:
      toolbox.parameters.options.username || toolbox.parameters.options.u,
    password:
      toolbox.parameters.options.password || toolbox.parameters.options.p,
    devMode: toolbox.parameters.options.devMode,
    ci: toolbox.parameters.options.ci,
    stage: toolbox.parameters.options.stage,
  };
};
