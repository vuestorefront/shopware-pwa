import { GluegunToolbox } from "gluegun";

module.exports = {
  name: "generate",
  alias: ["g"],
  hidden: true,
  run: async (toolbox: GluegunToolbox) => {
    const {
      // parameters,
      template: { generate },
      print: { success, spin }
    } = toolbox;

    // TODO move it somewhere for having single source
    const PLUGIN_SLOTS = ["SwPluginTopNavigation"];

    const generateFilesSpinner = spin("Generating plugins files");

    // remove plugin files
    await toolbox.filesystem.removeAsync(`.shopware-pwa/sw-plugins`);

    const assetsZipFileExists = !!toolbox.filesystem.exists(
      `.shopware-pwa/pwa-bundles-assets.zip`
    );
    if (assetsZipFileExists) {
      // unzip plugins folder
      const unzipper = require("unzipper");
      toolbox.filesystem
        .createReadStream(".shopware-pwa/pwa-bundles-assets.zip")
        .pipe(unzipper.Extract({ path: ".shopware-pwa/pwa-bundles-assets" }));

      // generate all files from config
      const pluginsConfigFile = toolbox.filesystem.read(
        `.shopware-pwa/pwa-bundles.json`,
        "json"
      );
      if (pluginsConfigFile) {
        const pluginNames = Object.keys(pluginsConfigFile);
        pluginNames.forEach(pluginName => {
          const pluginDirectory = `.shopware-pwa/pwa-bundles-assets/${pluginName}`;
          const pluginDirExist = toolbox.filesystem.exists(pluginDirectory);
          if (pluginDirExist) {
            const pluginConfig = toolbox.filesystem.read(
              `${pluginDirectory}/config.json`,
              "json"
            );
            if (pluginConfig) {
              pluginConfig.slots.forEach(async slot => {
                const body = `--> <${slot.name} /> <!--`;
                const componentImports = `\nimport ${slot.name} from '~/${pluginDirectory}/${slot.file}'`;
                const components = `\n ${slot.name}`;
                await generate({
                  template: `/plugins/GenericPlugin.vue`,
                  target: `.shopware-pwa/sw-plugins/${slot.name}.vue`,
                  props: { body, componentImports, components }
                });
              });
            } else {
              generateFilesSpinner.fail(
                `Plugin ${pluginName} has no config file!`
              );
            }
          }
        });
      }
      generateFilesSpinner.succeed();
    } else {
      generateFilesSpinner.fail(
        "There is no plugin data files loaded from Shopware instance"
      );
    }

    // Generate not overrided plugin files
    PLUGIN_SLOTS.forEach(async pluginSlotName => {
      const pluginPath = `.shopware-pwa/sw-plugins/${pluginSlotName}.vue`;
      const pluginOverrided = !!toolbox.filesystem.exists(pluginPath);
      if (!pluginOverrided) {
        await generate({
          template: `/plugins/GenericPlugin.vue`,
          target: pluginPath,
          props: {}
        });
      }
    });

    success(`Plugins generated`);
  }
};
