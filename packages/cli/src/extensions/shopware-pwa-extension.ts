import { GluegunToolbox } from "gluegun";
/**
 * read keys for contribution purposes - it's being used during the project initialization
 */
const INSTANCE_READ_API_KEY = "SWIACLLVSWNJQZKYRUDJYJHIWA";
const INSTANCE_READ_API_SECRET =
  "S0FMSjU4R3VFZ1Bkdjc1RGlhcE52MkNZbU1LVkhENHRFU1NxNjE";
const defaultConfig = {
  shopwareEndpoint: "https://pwa.swstage.store",
  shopwareAccessToken: "SWSCD1BWSUFUQVDHUEPHATRPTW",
  theme: "@shopware-pwa/default-theme",
  shopwareApiClient: {
    timeout: 10000,
  },
};
// add your CLI-specific functionality here, which will then be accessible
// to your commands
module.exports = (toolbox: GluegunToolbox) => {
  toolbox.foo = () => {
    toolbox.print.info("called foo extension");
  };
  toolbox.defaultInitConfig = {
    ...defaultConfig,
    INSTANCE_READ_API_KEY,
    INSTANCE_READ_API_SECRET,
  };
  toolbox.themeFolders = [".eslintrc.js"];

  /**
   * Project theme can be placed in one of the places
   * 1. direct relative path to project root folder ex. `./my-theme` directory and `theme: "my-theme"` setting in shopware-pwa.config.js
   * 2. in node_modules directory, like base theme ex. `theme: "@shopware-pwa/default-theme"` setting in shopware-pwa.config.js
   */
  toolbox.getThemePath = (themeName = toolbox.config.theme) => {
    const path = require("path");

    const directDistPath = path.join(themeName, "dist");
    const directDistPathExist = require("fs").existsSync(directDistPath);
    if (directDistPathExist) return directDistPath;

    const directPath = themeName;
    const directPathExist = require("fs").existsSync(directPath);
    if (directPathExist) return directPath;

    const nodePackageDistPath = path.join("node_modules", themeName, "dist");
    const nodePackageDistPathExist = require("fs").existsSync(
      nodePackageDistPath
    );
    if (nodePackageDistPathExist) return nodePackageDistPath;

    const nodePackagePath = path.join("node_modules", themeName);
    const nodePackagePathExist = require("fs").existsSync(nodePackagePath);
    if (nodePackagePathExist) return nodePackagePath;

    throw new Error(
      `No theme found for "${directPath}". Please make sure that path is correct or theme is installed from NPM.`
    );
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
    pwaHost: toolbox.parameters.options.pwaHost || toolbox.config.pwaHost,
    username:
      toolbox.parameters.options.username || toolbox.parameters.options.u,
    password:
      toolbox.parameters.options.password || toolbox.parameters.options.p,
    devMode: toolbox.parameters.options.devMode,
    ci: toolbox.parameters.options.ci,
    stage: toolbox.parameters.options.stage,
  };
};
