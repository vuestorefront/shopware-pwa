import { GluegunToolbox } from "gluegun";
import axios from "axios";

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
    var flatSet = {};

    for (let [key, value] of Object.entries(snippetObject)) {
      if (typeof value == "object") {
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
   * Helper for Stackoverflow hack
   */
  const isObject = (item) => {
    return item && typeof item === "object" && !Array.isArray(item);
  };

  /**
   * Deep merge two objects.
   *
   * Taken from - https://stackoverflow.com/questions/27936772/how-to-deep-merge-instead-of-shallow-merge
   *
   * Is there a better way to do that?
   * @param target
   * @param ...sources
   */
  const mergeDeep = (target, ...sources) => {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
      for (const key in source) {
        if (isObject(source[key])) {
          if (!target[key]) Object.assign(target, { [key]: {} });
          mergeDeep(target[key], source[key]);
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }

    return mergeDeep(target, ...sources);
  };

  /**
   * Work
   */
  const _deepCopy = (object, path: Array<string>, value) => {
    let currentKey = path.shift();

    if (path.length == 0) {
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
  toolbox.snippets.inflateSnippetObject = (flatSnippets, nestedObject) => {
    var objectSet = [];
    for (var i = 0; i < flatSnippets.length; i++) {
      var value = flatSnippets[i];
      var path = value.translationKey.split(".");

      objectSet.push(_deepCopy({}, path, value));
    }

    var deepSet = mergeDeep({}, ...objectSet);

    toolbox.print.success(JSON.stringify(deepSet));
  };

  /**
   * Reads snippets from the API
   */
  toolbox.snippets.fetchFromApi = async (
    shopwareEndpoint: string,
    authToken: string
  ) => {
    const fetchSnippetsResponse = await axios.post(
      `${shopwareEndpoint}/api/v1/search/snippet`,
      {
        filter: [
          {
            type: "contains",
            field: "translationKey",
            value: "pwa.",
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
    var payload = [];
    const md5Hex = require("md5-hex");

    for (let [key, value] of Object.entries(snippetSet)) {
      payload.push({
        author: "app/pwa",
        id: md5Hex(`${snippetSetIdentifier}-${key}`),
        value: value,
        translationKey: key,
        setId: snippetSetIdentifier,
      });
    }

    const writeSnippetsResponse = await axios.post(
      `${shopwareEndpoint}/api/v1/_action/sync`,
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

    if (writeSnippetsResponse.status === 200) {
      return;
    } else {
      toolbox.print.error(writeSnippetsResponse.data);
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
      `${shopwareEndpoint}/api/v1/search/snippet-set`,
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

    for (var i = 0; i < data.length; i++) {
      snippetSetsMap[data[i].iso] = data[i].id;
    }

    return snippetSetsMap;
  };
};
