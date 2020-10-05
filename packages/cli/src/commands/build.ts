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

    const result = await spawn("yarn nuxt build", {
      stdio: "inherit",
    });
    if (result.status !== 0) throw new Error("Unable to build project");
  },
};

module.exports = command;
