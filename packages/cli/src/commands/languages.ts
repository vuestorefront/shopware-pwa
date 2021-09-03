import { GluegunToolbox } from "gluegun";

/**
 * 1. get theme locales
 * 2. get plugin locales
 * 3. get local plugin locales
 * 4. get local project locales
 * -> save merged locales
 */
module.exports = {
  name: "languages",
  alias: ["lang"],
  hidden: true,
  run: async (toolbox: GluegunToolbox) => {
    const path = require("path");
    toolbox.checkThemePath();

    const inputParameters = toolbox.inputParameters;
    const shopwarePwaPath = path.join(".shopware-pwa", "sw-plugins");
    const shopwarePwaLocalesPath = path.join(
      ".shopware-pwa",
      "sw-plugins",
      "locales"
    );

    const themeLanguagesDir = path.join(toolbox.getThemePath(), "locales");

    /**
     * -> Create results map
     */
    const resultLocalesMap = {};

    /**
     * 1. get theme locales
     */
    const themeLocalesMap = await toolbox.languages.getLocalesMap(
      themeLanguagesDir
    );
    await toolbox.languages.mergeLocalesMap(resultLocalesMap, themeLocalesMap);

    /**
     * 2. get plugins locales
     */
    const pluginsConfig = await toolbox.plugins.getPluginsConfig();
    const pluginsLocalesPaths = await toolbox.languages.getPluginsLocalesPaths({
      pluginsConfig: pluginsConfig,
    });
    for (let index = 0; index < pluginsLocalesPaths.length; index++) {
      const localePath = pluginsLocalesPaths[index];
      const localeMap = await toolbox.languages.getLocalesMap(localePath);
      await toolbox.languages.mergeLocalesMap(resultLocalesMap, localeMap);
    }

    /**
     * 3. get local plugins locales
     */
    const localPluginsConfig = await toolbox.plugins.getPluginsConfig({
      localPlugins: true,
    });
    const localPluginsLocalesPaths =
      await toolbox.languages.getPluginsLocalesPaths({
        pluginsConfig: localPluginsConfig,
        rootDirectory: "sw-plugins",
      });
    for (let index = 0; index < localPluginsLocalesPaths.length; index++) {
      const localePath = localPluginsLocalesPaths[index];
      const localeMap = await toolbox.languages.getLocalesMap(localePath);
      await toolbox.languages.mergeLocalesMap(resultLocalesMap, localeMap);
    }

    /**
     * 4. get local project locales
     */
    const localProjectLocalesMap = await toolbox.languages.getLocalesMap(
      "locales"
    );
    await toolbox.languages.mergeLocalesMap(
      resultLocalesMap,
      localProjectLocalesMap
    );

    await toolbox.languages.writeLanguages(
      resultLocalesMap,
      shopwarePwaLocalesPath
    );

    const isLocalReload = !!toolbox.parameters.options.local;
    // reload language files from shopware instance
    if (!isLocalReload) {
      const apiClient = require("@shopware-pwa/shopware-6-client");
      const languagesMap = {};

      try {
        apiClient.setup({
          endpoint: inputParameters.shopwareEndpoint,
          accessToken: inputParameters.shopwareAccessToken,
        });
        apiClient.onConfigChange(() => {
          // nothing to do for now
        });

        const response: any = await apiClient.invokeGet({
          address: "/store-api/language",
        });
        response.data?.elements.forEach((lang) => {
          const language = {
            id: lang.id,
            code: lang.translationCode.code,
            name: lang.translationCode.name,
          };
          languagesMap[language.code] = language;
        });
      } catch (e) {
        console.error("[CLI > languages] There is a problem with languages", e);
      } finally {
        // Write merged map to file
        await toolbox.filesystem.writeAsync(
          path.join(shopwarePwaPath, "languages.json"),
          languagesMap
        );
      }
    }

    toolbox.print.success(`[CLI > languages] Shopware languages refreshed`);
  },
};
