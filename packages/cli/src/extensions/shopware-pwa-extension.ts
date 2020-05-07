import { GluegunToolbox } from "gluegun";

const defaultConfig = {
  shopwareEndpoint: "https://shopware-2.vuestorefront.io",
  shopwareAccessToken: "SWSCTXJOZMQWCXA4OUTNZ0REYG",
};
// add your CLI-specific functionality here, which will then be accessible
// to your commands
module.exports = (toolbox: GluegunToolbox) => {
  toolbox.foo = () => {
    toolbox.print.info("called foo extension");
  };

  toolbox.themeFolders = ["store", "static", ".eslintrc.js"];

  toolbox.defaultThemeLocation = `node_modules/@shopware-pwa/default-theme`;
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
