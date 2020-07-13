import { GluegunToolbox } from "gluegun";
import axios from "axios";

/**
 * Provides snippets support for Shopware PWA
 *
 * shopware-pwa snippets will only import snippets from Shopware and append them to your locale file (currently in .shopware-pwa)
 *  adding the --export flag will also use that file to write snippets back to Shopware (in case you've added new ones)
 *
 * IMPORTANT: You cannot create snippets from the admin and import them into the PWA.
 * First they have to be created within your locales/[iso-code].json file and exported to Shopware.
 *
 * 1. Create PWA project with custom snippets
 * 2. Run shopware-pwa languages
 * 3. Run shopware-pwa snippets --export --username="admin" --password="shopware"
 */

module.exports = {
  name: "snippets",
  hidden: "true",
  run: async (toolbox: GluegunToolbox) => {
    // Get languages from configuration file
    const path = require("path");

    const languageConfig = path.join(
      ".shopware-pwa",
      "sw-plugins",
      "languages.json"
    );
    const languages = require(languageConfig);

    const isoCodes = Object.keys(languages);

    // Get Auth Token for API
    const fetchAuthToken = async (
      { shopwareEndpoint, username, password } = toolbox.inputParameters
    ) => {
      const authTokenResponse = await axios.post(
        `${shopwareEndpoint}/api/oauth/token`,
        {
          client_id: "administration",
          grant_type: "password",
          scopes: "write",
          username,
          password,
        }
      );

      return authTokenResponse.data.access_token;
    };

    const authToken = await fetchAuthToken(toolbox.inputParameters);

    // We get all snippet sets and create a map locale => snippet set id
    const snippetSetsMap = await toolbox.snippets.getSnippetSetsByLocales(
      isoCodes,
      toolbox.inputParameters.shopwareEndpoint,
      authToken
    );

    // Import all snippets through the API and recursively merge them with our local snippets
    const importSnippets = async () => {
      // For every locale
      for (let [locale, snippetSetIdentifier] of Object.entries(
        snippetSetsMap
      )) {
        // Fetch snippets from API
        const flatSnippets = await toolbox.snippets.fetchFromApi(
          toolbox.inputParameters.shopwareEndpoint,
          authToken,
          snippetSetIdentifier
        );

        // Make them objects that we can write to locale files
        const nestedSnippets = toolbox.snippets.inflateSnippetObject(
          flatSnippets,
          {}
        );

        // Generate locale file path
        const localePath = path.join(
          ".shopware-pwa",
          "sw-plugins",
          "locales",
          `${locale}.json`
        );

        const oldSnippets = require(localePath);

        const { merge } = require("lodash");

        // Merge old and new and write them into a file
        await toolbox.filesystem.writeAsync(
          localePath,
          merge(nestedSnippets.pwa, oldSnippets)
        );

        toolbox.print.success(
          `Wrote ${flatSnippets.length} snippets to '${localePath}'.`
        );
      }

      toolbox.print.success("Snippets have been imported");
    };

    await importSnippets();

    const doExport = toolbox.parameters.options.export;

    if (!doExport) {
      toolbox.print.success(
        "Stopping after import. Run with --export option to synchronize all snippets to your backend"
      );
      return;
    }

    // Export snippets from locales files and send them to the API
    const exportSnippets = async () => {
      const localesPath = path.join(".shopware-pwa", "sw-plugins", "locales");
      const files = await toolbox.filesystem.listAsync(localesPath);

      for (var i = 0; i < files.length; i++) {
        const snippetSet = require(path.join(localesPath, files[i]));

        const flatSnippets = toolbox.snippets.flattenSnippetObject(
          snippetSet,
          "pwa"
        );

        // Get locale from file name
        let locale = files[i].split(".")[0];

        // Get correct snippet set id for that locale
        toolbox.snippets.writeToApi(
          flatSnippets,
          snippetSetsMap[locale],
          toolbox.inputParameters.shopwareEndpoint,
          authToken
        );
      }
    };

    await exportSnippets();
    toolbox.print.success("Snippets exported to Shopware API");
  },
};
