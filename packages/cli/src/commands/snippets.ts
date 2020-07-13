import { GluegunToolbox } from "gluegun";
import axios from "axios";

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

    const snippetSetsMap = await toolbox.snippets.getSnippetSetsByLocales(
      isoCodes,
      toolbox.inputParameters.shopwareEndpoint,
      authToken
    );

    // Fetch snippets
    // const fetchSnippets = async (
    //   shopwareEndpoint: string,
    //   authToken: string
    // ) => {

    //   const snippetsResponse = await axios.post(
    //     `${shopwareEndpoint}/api/v1/_action/snippet-set`,
    //     {
    //       filters: {
    //          term: "pwa.*"
    //       }
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${authToken}`,
    //       },
    //     }
    //   )
    //   return snippetsResponse.data
    // }

    // const snippets = await fetchSnippets(toolbox.inputParameters.shopwareEndpoint, authToken)

    const importSnippets = async () => {
      const flatSnippets = await toolbox.snippets.fetchFromApi(
        toolbox.inputParameters.shopwareEndpoint,
        authToken
      );

      const nestedSnippets = toolbox.snippets.inflateSnippetObject(
        flatSnippets,
        {}
      );

      toolbox.print.success(nestedSnippets);
    };

    importSnippets();

    const doExport = toolbox.parameters.options.export;

    if (!doExport) {
      toolbox.print.success(
        "Stopping after import. Run with --export option to synchronize all snippets to your backend"
      );
      return;
    }

    // Export snippets from locales files
    const exportSnippets = async () => {
      const localesPath = path.join(".shopware-pwa", "sw-plugins", "locales");
      const files = await toolbox.filesystem.listAsync(localesPath);

      for (var i = 0; i < files.length; i++) {
        const snippetSet = require(path.join(localesPath, files[i]));

        const flatSnippets = toolbox.snippets.flattenSnippetObject(
          snippetSet,
          "pwa"
        );

        // I feel ashamed for that
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

    exportSnippets();
    toolbox.print.success("Snippets exported to Shopware API");
  },
};
