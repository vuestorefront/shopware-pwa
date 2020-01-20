import { GluegunToolbox } from "gluegun";

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
  toolbox.coreDevDependencyPackageNames = ["@vue-storefront/nuxt"];

  toolbox.themeFolders = [
    "components",
    "layouts",
    "pages",
    "store",
    "assets",
    "middleware",
    "static",
    ".eslintrc.js"
  ];

  toolbox.defaultThemeLocation = `node_modules/@shopware-pwa/default-theme`;
  // enable this if you want to read configuration in from
  // the current folder's package.json (in a "shopware-pwa" property),
  // shopware-pwa.config.json, etc.
  toolbox.config = {
    ...toolbox.config,
    // load default config from cli
    ...toolbox.config.loadConfig("cli", toolbox.meta.src),
    // load config file from generated project
    ...toolbox.config.loadConfig("shopware-pwa", process.cwd())
  };
};
