import { GluegunToolbox } from "gluegun";

module.exports = (toolbox: GluegunToolbox) => {
  toolbox.languages = {};

  /**
   * Returns list of filenames from directory
   */
  toolbox.languages.getDirLocalesList = async (directoryPath) => {
    return (await toolbox.filesystem.listAsync(directoryPath)) || [];
  };

  /**
   * Returns locales map for specified directory
   */
  toolbox.languages.getLocalesMap = async (directoryPath) => {
    const path = require("path");
    const languageKeys = await toolbox.languages.getDirLocalesList(
      directoryPath
    );
    const resultMap = {};
    languageKeys.forEach((languageKey) => {
      resultMap[languageKey] = toolbox.filesystem.read(
        path.join(directoryPath, languageKey),
        "json"
      );
    });
    return resultMap;
  };

  toolbox.languages.mergeLocalesMap = async (baseMap, newMap) => {
    const { merge } = require("lodash");
    const newMapKeys = Object.keys(newMap);
    newMapKeys.forEach((newMapKey) => {
      baseMap[newMapKey] = merge(baseMap[newMapKey], newMap[newMapKey]);
    });
  };

  /**
   * Returns directory paths for installed plugins
   */
  toolbox.languages.getPluginsLocalesPaths = async ({
    pluginsConfig,
    rootDirectory,
  }: any) => {
    const path = require("path");
    const pluginsRootDirectory =
      rootDirectory || ".shopware-pwa/pwa-bundles-assets";
    const localesPaths = [];
    if (pluginsConfig) {
      const pluginNames = Object.keys(pluginsConfig);
      pluginNames.forEach((pluginName) => {
        if (!pluginsConfig[pluginName]) return;
        localesPaths.push(
          path.join(pluginsRootDirectory, pluginName, "locales")
        );
      });
    }
    return localesPaths;
  };
};
