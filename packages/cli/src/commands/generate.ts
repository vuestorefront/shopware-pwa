import { GluegunToolbox } from "gluegun";
import axios from "axios";

module.exports = {
  name: "generate",
  alias: ["g"],
  hidden: true,
  run: async (toolbox: GluegunToolbox) => {
    const {
      // parameters,
      template: { generate },
      print: { success, spin, error }
    } = toolbox;

    // TODO move it somewhere for having single source
    const PLUGIN_SLOTS = ["SwPluginTopNavigation"];

    if (!toolbox.parameters.options.u || !toolbox.parameters.options.p) {
      error("Please provide -u and -p params for plugins authentication");
      return;
    }
    try {
      const respo = await axios.post(
        "https://shopware-2.vuestorefront.io/api/oauth/token",
        {
          client_id: "administration",
          grant_type: "password",
          scopes: "write",
          username: toolbox.parameters.options.u,
          password: toolbox.parameters.options.p
        }
      );
      // console.error("RESPO", respo);
      const token = respo.data.access_token;
      // console.error("token", token);
      const respo2 = await axios.post(
        "https://shopware-2.vuestorefront.io/api/v1/_action/pwa/dump-bundles",
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      const jsonConfigAddress = respo2.data.buildArtifact.config;
      const assetFileAddress = respo2.data.buildArtifact.asset;
      const respo3 = await axios.get(
        "https://shopware-2.vuestorefront.io/" + jsonConfigAddress
      );

      await toolbox.filesystem.removeAsync(`.shopware-pwa/pwa-bundles.json`);
      await toolbox.filesystem.removeAsync(`.shopware-pwa/pwa-bundles-assets`);
      await toolbox.filesystem.removeAsync(
        `.shopware-pwa/pwa-bundles-assets.zip`
      );
      await toolbox.filesystem.writeAsync(
        ".shopware-pwa/pwa-bundles.json",
        respo3.data
      );

      const fileUrl = "https://shopware-2.vuestorefront.io/" + assetFileAddress;

      const request = require("request");

      const testPromise = function() {
        return new Promise((resolve, reject) => {
          request({ url: fileUrl, encoding: null }, function(err, resp, body) {
            if (err) reject(err);
            toolbox.filesystem.write(
              ".shopware-pwa/pwa-bundles-assets.zip",
              body
            );
            resolve();
          });
        });
      };

      await testPromise();
      // console.error("respo4", respo4.data);
    } catch (e) {
      console.error("ERROR", e.response);
      return;
    }

    const generateFilesSpinner = spin("Generating plugins files");

    // remove plugin files
    await toolbox.filesystem.removeAsync(`.shopware-pwa/sw-plugins`);

    const assetsZipFileExists = !!toolbox.filesystem.exists(
      `.shopware-pwa/pwa-bundles-assets.zip`
    );
    if (assetsZipFileExists) {
      // unzip plugins folder
      const unzipper = require("unzipper");
      const d = await unzipper.Open.file(
        ".shopware-pwa/pwa-bundles-assets.zip"
      );
      await d.extract({
        path: ".shopware-pwa/pwa-bundles-assets"
      });

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
