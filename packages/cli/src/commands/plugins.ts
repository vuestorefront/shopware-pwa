import { ShopwarePwaToolbox } from "src/types";

module.exports = {
  name: "plugins",
  hidden: true,
  run: async (toolbox: ShopwarePwaToolbox) => {
    const {
      template: { generate },
      print: { success, spin },
    } = toolbox;

    const inputParameters = toolbox.inputParameters;
    const isCIrun = inputParameters.ci;

    if (!isCIrun) {
      toolbox.print.info(
        "[CLI > plugins] Please provide username and password for plugins authentication. You can leave the fields empty if connecting to demo instance or if you don't need plugins :)"
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

      const answers = await toolbox.prompt.ask([
        shopwareUsernameQuestion,
        shopwarePasswordQuestion,
      ]);
      Object.assign(inputParameters, answers);
    }

    const allowDevMode = !!inputParameters.devMode;

    toolbox.debug("loading plugin assets from Shopware API");
    await toolbox.loadPluginsAssets();

    const generateFilesSpinner = spin(
      "[CLI > plugins] Generating plugins files"
    );

    // remove plugin files
    // toolbox.debug("removing .shopware-pwa/sw-plugins");
    // await toolbox.filesystem.removeAsync(`.shopware-pwa/sw-plugins`);

    toolbox.debug(
      "generating .shopware-pwa/sw-plugins/usePlugins.js with devMode:",
      allowDevMode
    );
    await generate({
      template: "/plugins/usePlugins.js",
      target: ".shopware-pwa/sw-plugins/usePlugins.js",
      props: {
        allowDevMode,
      },
    });

    toolbox.debug(
      "generating .shopware-pwa/sw-plugins/SwPluginSlotPlaceholder.vue"
    );
    await generate({
      template: "/plugins/SwPluginSlotPlaceholder.vue",
      target: ".shopware-pwa/sw-plugins/SwPluginSlotPlaceholder.vue",
      props: {},
    });

    toolbox.debug(
      "generating .shopware-pwa/sw-plugins/SwPluginSlotPlaceholderSwitcher.vue"
    );
    await generate({
      template: "/plugins/SwPluginSlotPlaceholderSwitcher.vue",
      target: ".shopware-pwa/sw-plugins/SwPluginSlotPlaceholderSwitcher.vue",
      props: {},
    });

    toolbox.debug("removing .shopware-pwa/sw-plugins/pages");
    await toolbox.filesystem.removeAsync(".shopware-pwa/sw-plugins/pages");
    toolbox.debug("removing .shopware-pwa/sw-plugins/layouts");
    await toolbox.filesystem.removeAsync(".shopware-pwa/sw-plugins/layouts");

    const pluginsConfig = await toolbox.plugins.getPluginsConfig();
    toolbox.debug("plugins config", pluginsConfig);
    const shopwarePluginsTrace = await toolbox.buildPluginsTrace({
      pluginsConfig,
      disabledPlugins: toolbox.config.disabledPlugins,
    });
    toolbox.debug("plugins trace", shopwarePluginsTrace);
    toolbox.debug("disabled plugins", toolbox.config.disabledPlugins);
    // extend plugins trace from local project
    const localPluginsConfig = await toolbox.plugins.getPluginsConfig({
      localPlugins: true,
    });
    toolbox.debug("local plugins config", localPluginsConfig);
    const pluginsTrace = await toolbox.buildPluginsTrace({
      pluginsConfig: localPluginsConfig,
      pluginsTrace: shopwarePluginsTrace,
      rootDirectory: "sw-plugins",
    });
    toolbox.debug("new plugins trace", pluginsTrace);
    // In dev mode we're injecting to footer to provide plugin slots switcher
    if (allowDevMode) {
      if (!pluginsTrace["footer-content"]) pluginsTrace["footer-content"] = [];
      pluginsTrace["footer-content"].push(
        "sw-plugins/SwPluginSlotPlaceholderSwitcher.vue"
      );
    }

    generateFilesSpinner.succeed();

    const finalMap = await toolbox.buildPluginsMap(pluginsTrace);
    toolbox.debug("plugins map", finalMap);

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

    success(`[CLI > plugins] Plugins generated`);
  },
};
