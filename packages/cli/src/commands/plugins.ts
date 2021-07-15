import { GluegunToolbox } from "gluegun";

module.exports = {
  name: "plugins",
  hidden: true,
  run: async (toolbox: GluegunToolbox) => {
    const {
      template: { generate },
      print: { success, spin },
    } = toolbox;

    const inputParameters = toolbox.inputParameters;
    const isCIrun = inputParameters.ci;

    if (!isCIrun) {
      toolbox.print.info(
        "Please provide username and password for plugins authentication. You can leave the fields empty if connecting to demo instance or if you don't need plugins :)"
      );
      const shopwareUsernameQuestion = !inputParameters.username && {
        type: "input",
        name: "username",
        message: "Shopware admin username:",
        initial: process.env.ADMIN_USER,
        footer: process.env.ADMIN_USER && "username is taken from .env",
      };
      const shopwarePasswordQuestion = !inputParameters.password && {
        type: "password",
        name: "password",
        message: "Shopware admin password:",
        initial: process.env.ADMIN_PASSWORD,
        footer: process.env.ADMIN_PASSWORD && "password from .env is hidden",
      };

      const devModeQuestion = !inputParameters.devMode && {
        type: "confirm",
        name: "devMode",
        message:
          "Do you want to allow dev mode for slots? (Don't use for production!)",
      };

      const answers = await toolbox.prompt.ask([
        shopwareUsernameQuestion,
        shopwarePasswordQuestion,
        devModeQuestion,
      ]);
      Object.assign(inputParameters, answers);
    }

    const allowDevMode = !!inputParameters.devMode;

    await toolbox.loadPluginsAssets();

    const generateFilesSpinner = spin("Generating plugins files");

    // remove plugin files
    // await toolbox.filesystem.removeAsync(`.shopware-pwa/sw-plugins`);

    await generate({
      template: "/plugins/usePlugins.js",
      target: ".shopware-pwa/sw-plugins/usePlugins.js",
      props: {
        allowDevMode,
      },
    });

    await generate({
      template: "/plugins/SwPluginSlotPlaceholder.vue",
      target: ".shopware-pwa/sw-plugins/SwPluginSlotPlaceholder.vue",
      props: {},
    });

    await generate({
      template: "/plugins/SwPluginSlotPlaceholderSwitcher.vue",
      target: ".shopware-pwa/sw-plugins/SwPluginSlotPlaceholderSwitcher.vue",
      props: {},
    });

    await toolbox.filesystem.removeAsync(".shopware-pwa/sw-plugins/pages");
    await toolbox.filesystem.removeAsync(".shopware-pwa/sw-plugins/layouts");

    const pluginsConfig = await toolbox.plugins.getPluginsConfig();
    const shopwarePluginsTrace = await toolbox.buildPluginsTrace({
      pluginsConfig,
    });
    // extend plugins trace from local project
    const localPluginsConfig = await toolbox.plugins.getPluginsConfig({
      localPlugins: true,
    });
    const pluginsTrace = await toolbox.buildPluginsTrace({
      pluginsConfig: localPluginsConfig,
      pluginsTrace: shopwarePluginsTrace,
      rootDirectory: "sw-plugins",
    });
    // In dev mode we're injecting to footer to provide plugin slots switcher
    if (allowDevMode) {
      if (!pluginsTrace["footer-content"]) pluginsTrace["footer-content"] = [];
      pluginsTrace["footer-content"].push(
        "sw-plugins/SwPluginSlotPlaceholderSwitcher.vue"
      );
    }

    generateFilesSpinner.succeed();

    const finalMap = await toolbox.buildPluginsMap(pluginsTrace);

    await generate({
      template: "/plugins/SwPluginSlot.vue",
      target: ".shopware-pwa/sw-plugins/SwPluginSlot.vue",
      props: {
        pluginsMap: finalMap,
      },
    });

    const langParams = {
      local: true,
      ...inputParameters,
    };
    await toolbox?.runtime?.run(`languages`, langParams);

    success(`Plugins generated`);
  },
};
