import { GluegunToolbox } from "gluegun";
import axios from "axios";
import md5Hex from "md5-hex";

module.exports = (toolbox: GluegunToolbox) => {
  toolbox.snippets = {};

  /**
   * Converts a nested object into a flat, dot-cased dictionary of values
   *
   * {
   *   foo: {
   *     bar: "value"
   *   }
   * }
   * =>
   * {
   *   "foo.bar": "value"
   * }
   *
   */
  toolbox.snippets.flattenSnippetObject = (
    snippetObject: object,
    prefix: string
  ) => {
    let flatSet = {};

    for (let [key, value] of Object.entries(snippetObject)) {
      if (typeof value === "object") {
        flatSet = {
          ...flatSet,
          ...toolbox.snippets.flattenSnippetObject(value, `${prefix}.${key}`),
        };
      } else {
        flatSet[`${prefix}.${key}`] = value;
      }
    }

    return flatSet;
  };

  /**
   * Creates a nested structure within object, given the path and places a value at the deepest place
   */
  const _deepCopy = (object, path: Array<string>, value) => {
    let currentKey = path.shift();

    if (!path.length) {
      object[currentKey] = value.value;
      return object;
    } else {
      object[currentKey] = {};
      object[currentKey] = _deepCopy(object[currentKey], path, value);

      return object;
    }
  };

  /**
   * Converts a flat, dot-cased dictionary of values into a nested object (flattenSnippetObject(inflateSnippetOject) = identity)
   */
  toolbox.snippets.inflateSnippetObject = (flatSnippets) => {
    let objectSet = [];
    for (let i = 0; i < flatSnippets.length; i++) {
      let value = flatSnippets[i];
      let path = value.translationKey.split(".");

      objectSet.push(_deepCopy({}, path, value));
    }

    const { merge } = require("lodash");
    let deepSet = merge(...objectSet);

    return deepSet;
  };

  /**
   * Reads snippets from the API
   */
  toolbox.snippets.fetchFromApi = async (
    shopwareEndpoint: string,
    authToken: string,
    snippetSetIdentifier: string
  ) => {
    const fetchSnippetsResponse = await axios.post(
      `${toolbox.normalizeBaseUrl(shopwareEndpoint)}/api/search/snippet`,
      {
        filter: [
          {
            type: "contains",
            field: "translationKey",
            value: "pwa.",
          },
          {
            type: "equals",
            field: "setId",
            value: snippetSetIdentifier,
          },
        ],
        includes: {
          snippet: ["translationKey", "value", "setId"],
        },
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    return fetchSnippetsResponse.data.data;
  };

  /**
   * Takes a snippet set as well as a snippet set identifier and synchronizes it using the SW6 API
   *
   * We are generating snippet identifiers by hashing the key and snippet set id
   */
  toolbox.snippets.writeToApi = async (
    snippetSet: object,
    snippetSetIdentifier: string,
    shopwareEndpoint: string,
    authToken: string
  ) => {
    let payload = [];

    for (let [key, value] of Object.entries(snippetSet)) {
      payload.push({
        author: "app/pwa",
        id: md5Hex(`${snippetSetIdentifier}-${key}`),
        value: value,
        translationKey: key,
        setId: snippetSetIdentifier,
      });
    }

    try {
      await axios.post(
        `${toolbox.normalizeBaseUrl(shopwareEndpoint)}/api/_action/sync`,
        [
          {
            action: "upsert",
            entity: "snippet",
            payload,
          },
        ],
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      toolbox.print.success(
        `Exported ${payload.length} snippets to '${shopwareEndpoint}/api/_action/sync'`
      );
    } catch (error) {
      toolbox.print.error(
        "Error exporting snippets to API (PWA snippets should never be created through the Admin panel)"
      );
      toolbox.print.error(JSON.stringify(error.response.data.data));
      return;
    }
  };

  /**
   * Returns a dictionary of locale => snippet set id
   *
   * {
   *   'de-DE': '3836d70f38844fefa5782ebe8a66f9ce',
   *   'en-GB': 'b71b46ae56544837bbd41f2413049138'
   * }
   */
  toolbox.snippets.getSnippetSetsByLocales = async (
    isoCodes: string[],
    shopwareEndpoint: string,
    authToken: string
  ) => {
    const snippetSetsResponse = await axios.post(
      `${toolbox.normalizeBaseUrl(shopwareEndpoint)}/api/search/snippet-set`,
      {
        filter: [
          {
            type: "equalsAny",
            field: "iso",
            value: isoCodes,
          },
        ],
        includes: {
          snippet_set: ["iso", "id"],
        },
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    const data = snippetSetsResponse.data.data;
    let snippetSetsMap = {};

    for (let i = 0; i < data.length; i++) {
      snippetSetsMap[data[i].iso] = data[i].id;
    }

    return snippetSetsMap;
  };

  toolbox.snippets.importSnippets = async ({
    inputParameters,
    snippetSetsMap,
    authToken,
  }) => {
    toolbox.print.info("Importing Snippets from Shopware");

    if (!inputParameters.keepLocal) {
      toolbox.print.warning(
        "Local Snippets will be overridden (run with --keep-local to keep local changes)"
      );
    }

    // For every locale
    for (let [locale, snippetSetIdentifier] of Object.entries(snippetSetsMap)) {
      // Fetch snippets from API
      let flatRemoteSnippets = [];
      try {
        flatRemoteSnippets = await toolbox.snippets.fetchFromApi(
          inputParameters.shopwareEndpoint,
          authToken,
          snippetSetIdentifier
        );
      } catch (error) {
        toolbox.print.error(`Fetch from API error: ${error}`);
      }

      // Make them objects that we can write to locale files
      const remoteSnippets = toolbox.snippets.inflateSnippetObject(
        flatRemoteSnippets,
        {}
      );

      // Generate locale file path
      const path = require("path");
      const localSnippetsPath = path.join("locales", `${locale}.json`);

      if (!toolbox.filesystem.exists(localSnippetsPath)) {
        toolbox.print.warning(
          `Creating '${localSnippetsPath}, have you deleted your local snippets?`
        );
        toolbox.filesystem.write(localSnippetsPath, {});
      }
      const localSnippets = await toolbox.filesystem.readAsync(
        localSnippetsPath,
        "json"
      );

      let mergedSnippets = {};
      const { merge } = require("lodash");

      if (inputParameters.keepLocal) {
        // First apply remote ones and then apply local ones
        mergedSnippets = merge(remoteSnippets.pwa, localSnippets);
      } else {
        mergedSnippets = merge(localSnippets, remoteSnippets.pwa);
      }

      // Merge old and new and write them into the local snippets file
      await toolbox.filesystem.writeAsync(localSnippetsPath, mergedSnippets);

      toolbox.print.success(
        `Wrote ${flatRemoteSnippets.length} snippets to '${localSnippetsPath}'.`
      );
    }
  };

  toolbox.snippets.exportSnippets = async ({
    inputParameters,
    snippetSetsMap,
    authToken,
  }) => {
    toolbox.print.info("Exporting Snippets to Shopware");
    const path = require("path");

    const localesPath = "locales";
    const files = await toolbox.filesystem.listAsync(localesPath);

    for (let i = 0; i < files.length; i++) {
      const snippetSet = await toolbox.filesystem.readAsync(
        path.join(localesPath, files[i]),
        "json"
      );

      const flatSnippets = toolbox.snippets.flattenSnippetObject(
        snippetSet,
        "pwa"
      );

      // Get locale from file name
      let locale = files[i].split(".")[0];

      // Get correct snippet set id for that locale
      try {
        toolbox.snippets.writeToApi(
          flatSnippets,
          snippetSetsMap[locale],
          inputParameters.shopwareEndpoint,
          authToken
        );
      } catch (error) {
        toolbox.print.error(`Export to API error: ${error}`);
      }
    }
  };
};
