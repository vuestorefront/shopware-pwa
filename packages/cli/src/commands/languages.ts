import { GluegunToolbox } from "gluegun";
import { getAvailableLanguages, setup } from "@shopware-pwa/shopware-6-client";

module.exports = {
  name: "languages",
  alias: ["lang"],
  hidden: true,
  run: async (toolbox: GluegunToolbox) => {
    const path = require("path");
    const inputParameters = toolbox.inputParameters;
    const shopwarePwaPath = path.join(".shopware-pwa", "sw-plugins");

    const languagesMap = {};

    try {
      setup({
        endpoint: inputParameters.shopwareEndpoint,
        accessToken: inputParameters.shopwareAccessToken,
      });

      const langs: any = await getAvailableLanguages();
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

    toolbox.print.success(`Shopware languages refreshed`);
  },
};
