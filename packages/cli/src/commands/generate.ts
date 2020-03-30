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
      print: { success, spin, error, warning },
      inputParameters,
    } = toolbox;

    // TODO move it somewhere for having single source
    const PLUGIN_SLOTS = ["SwPluginTopNavigation"];

    // Generate clean plugin files to override later
    PLUGIN_SLOTS.forEach(async (pluginSlotName) => {
      const pluginPath = `.shopware-pwa/sw-plugins/${pluginSlotName}.vue`;
      const pluginOverrided = !!toolbox.filesystem.exists(pluginPath);
      if (!pluginOverrided) {
        await generate({
          template: `/plugins/GenericPlugin.vue`,
          target: pluginPath,
          props: {},
        });
      }
    });

    if (!inputParameters.username || !inputParameters.password) {
      warning(
        "Please provide --username and --password params for plugins authentication. You can safely ignore this warning if connecting to demo instance and if you don't need plugins :)"
      );
      return;
    }
    try {
      const respo = await axios.post(
        `${inputParameters.shopwareEndpoint}/api/oauth/token`,
        {
          client_id: "administration",
          grant_type: "password",
          scopes: "write",
          username: inputParameters.username,
          password: inputParameters.password,
        }
      );
      // console.error("RESPO", respo);
      const token = respo.data.access_token;
      // console.error("token", token);
      const respo2 = await axios.post(
        `${inputParameters.shopwareEndpoint}/api/v1/_action/pwa/dump-bundles`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const jsonConfigAddress = respo2.data.buildArtifact.config;
      const assetFileAddress = respo2.data.buildArtifact.asset;
      const respo3 = await axios.get(
        `${inputParameters.shopwareEndpoint}/${jsonConfigAddress}`
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

      const fileUrl = `${inputParameters.shopwareEndpoint}/${assetFileAddress}`;

      const request = require("request");

      const testPromise = function () {
        return new Promise((resolve, reject) => {
          request(
            {
              url: fileUrl,
              encoding: null,
            },
            function (err, resp, body) {
              if (err) reject(err);
              toolbox.filesystem.write(
                ".shopware-pwa/pwa-bundles-assets.zip",
                body
              );
              resolve();
            }
          );
        });
      };

      await testPromise();
      // console.error("respo4", respo4.data);
    } catch (e) {
      if (e?.response?.status === 401) {
        error(
          `You provided bad cridentials for your shopware instance: ${inputParameters.shopwareEndpoint} - plugins will not be added`
        );
      } else {
        console.error("UNEXPECTED ERROR", e?.response || e);
      }
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
        path: ".shopware-pwa/pwa-bundles-assets",
      });

      // generate all files from config
      const pluginsConfigFile = toolbox.filesystem.read(
        `.shopware-pwa/pwa-bundles.json`,
        "json"
      );
      if (pluginsConfigFile) {
        const pluginNames = Object.keys(pluginsConfigFile);
        pluginNames.forEach((pluginName) => {
          const pluginDirectory = `.shopware-pwa/pwa-bundles-assets/${pluginName}`;
          const pluginDirExist = toolbox.filesystem.exists(pluginDirectory);
          if (pluginDirExist) {
            const pluginConfig = toolbox.filesystem.read(
              `${pluginDirectory}/config.json`,
              "json"
            );
            if (pluginConfig) {
              pluginConfig.slots.forEach(async (slot) => {
                const body = `--> <${slot.name} /> <!--`;
                const componentImports = `\nimport ${slot.name} from '~/${pluginDirectory}/${slot.file}'`;
                const components = `\n ${slot.name}`;
                await generate({
                  template: `/plugins/GenericPlugin.vue`,
                  target: `.shopware-pwa/sw-plugins/${slot.name}.vue`,
                  props: {
                    body,
                    componentImports,
                    components,
                  },
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

    success(`Plugins generated`);
  },
};
