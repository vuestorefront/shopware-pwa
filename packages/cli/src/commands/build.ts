import { GluegunCommand } from "gluegun";

const command: GluegunCommand = {
  name: "build",
  description: "Build your project for production",
  run: async (toolbox) => {
    const {
      system: { spawn },
      print: { info },
    } = toolbox;

    info(`Starting Shopware PWA project building...`);

    // initial config invoke
    await toolbox.plugins.invokeRefreshPlugins(true);
    await toolbox.cms.invokeRefreshCMS();
    await toolbox.languages.invokeRefreshLanguages();

    await spawn("yarn nuxt build", {
      stdio: "inherit",
    });
  },
};

module.exports = command;
