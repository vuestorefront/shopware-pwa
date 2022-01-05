import { GluegunCommand } from "gluegun";

const command: GluegunCommand = {
  name: "build",
  description: "Build your project for production",
  run: async (toolbox) => {
    const {
      system: { spawn },
      print: { info },
    } = toolbox;

    const devMode = !!toolbox.inputParameters.devMode;
    info(
      `[CLI > build] Starting Shopware PWA project building (devMode: ${
        devMode ? "enabled" : "disabled"
      })...`
    );

    // initial config invoke
    await toolbox.plugins.invokeRefreshPlugins(devMode);
    await toolbox.cms.invokeRefreshCMS();
    await toolbox.languages.invokeRefreshLanguages();

    const result = await spawn("nuxt build", {
      stdio: "inherit",
    });
    if (result.status !== 0) {
      throw new Error("[CLI > build] Unable to build project");
    }
  },
};

module.exports = command;
