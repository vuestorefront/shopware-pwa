import { GluegunToolbox } from "gluegun";
import { merge } from "lodash";

module.exports = {
  name: "languages",
  alias: ["lang"],
  hidden: true,
  run: async (toolbox: GluegunToolbox) => {
    const path = require("path");
    const inputParameters = toolbox.inputParameters;
    const shopwarePwaPath = path.join(".shopware-pwa", "sw-plugins");
    const shopwarePwaLocalesPath = path.join(
      ".shopware-pwa",
      "sw-plugins",
      "locales"
    );

    const themeLanguagesDir = path.join(
      toolbox.defaultThemeLocation,
      "locales"
    );
    const projectLocales =
      (await toolbox.filesystem.listAsync("locales")) || [];

    await toolbox.filesystem.removeAsync(shopwarePwaLocalesPath);

    if (await toolbox.filesystem.existsAsync(themeLanguagesDir)) {
      await toolbox.filesystem.copyAsync(
        themeLanguagesDir,
        shopwarePwaLocalesPath
      );
    }

    // Override theme translations by project translations
    for (let index = 0; index < projectLocales.length; index++) {
      const localeFileName = projectLocales[index];
      const pwaLocaleFilePath = path.join(
        shopwarePwaLocalesPath,
        localeFileName
      );
      const isOverridingThemeLocale = await toolbox.filesystem.existsAsync(
        pwaLocaleFilePath
      );
      const projectLocalePath = path.join("locales", localeFileName);
      if (isOverridingThemeLocale) {
        const themeLocales = await toolbox.filesystem.readAsync(
          pwaLocaleFilePath,
          "json"
        );
        const projectLocales = await toolbox.filesystem.readAsync(
          projectLocalePath,
          "json"
        );
        merge(themeLocales, projectLocales);
        await toolbox.filesystem.writeAsync(pwaLocaleFilePath, themeLocales);
      } else {
        await toolbox.filesystem.copyAsync(
          projectLocalePath,
          pwaLocaleFilePath
        );
      }
    }

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

        const langs: any = await apiClient.getAvailableLanguages();
        langs.forEach((lang) => {
          const language = {
            id: lang.id,
            code: lang.translationCode.code,
            name: lang.translationCode.name,
          };
          languagesMap[language.code] = language;
        });
      } catch (e) {
        console.error("[CLI] There is a problem with languages", e);
      } finally {
        // Write merged map to file
        await toolbox.filesystem.writeAsync(
          path.join(shopwarePwaPath, "languages.json"),
          languagesMap
        );
      }
    }

    toolbox.print.success(`Shopware languages refreshed`);
  },
};
