import { GluegunToolbox } from "gluegun";

// add your CLI-specific functionality here, which will then be accessible
// to your commands
module.exports = (toolbox: GluegunToolbox) => {
  toolbox.foo = () => {
    toolbox.print.info("called foo extension");
  };

  toolbox.themeFolders = ["components", "layouts", "pages", "store", "assets"];

  toolbox.defaultThemeLocation = `${toolbox.meta.src}/../../default-theme`;
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
