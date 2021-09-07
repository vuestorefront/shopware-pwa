import { mergeWith, set, get } from "lodash";
import { getDefaultApiParams } from "@shopware-pwa/composables";
function _customizer(objValue: Object, srcValue: string[]) {
  if (Array.isArray(objValue)) {
    return [...new Set([...objValue, ...srcValue])];
  }
}

function _getDefaultConfig() {
  return JSON.parse(JSON.stringify(getDefaultApiParams()));
}

let finalConfig = _getDefaultConfig();
export default function defaultsConfigBuilder() {
  return {
    /**
     * Add value to existing config. Objects and arrays are merged recursively.
     * Primitives are overridden (example limit property).
     */
    add: (key: string, config: unknown) => {
      const property = get(finalConfig, key);
      if (!property) {
        set(finalConfig, key, config);
      } else if (Array.isArray(property)) {
        const newArray = Array.isArray(config) ? config : [config];
        const combinedArray = [...property, ...newArray];
        set(finalConfig, key, [...new Set(combinedArray)]);
      } else {
        mergeWith(property, config, _customizer);
      }
      return defaultsConfigBuilder();
    },
    /**
     * Replace config for specific key with given value.
     */
    replace(key: string, value: unknown) {
      set(finalConfig, key, value);
      return defaultsConfigBuilder();
    },
    /**
     * Remove config value for specific key.
     */
    remove(key: string, value?: unknown) {
      if (value) {
        const property = get(finalConfig, key);
        if (Array.isArray(property)) {
          const newValue = property.filter((item) => item !== value);
          set(finalConfig, key, newValue);
          return defaultsConfigBuilder();
        }
      }
      set(finalConfig, key, undefined);
      return defaultsConfigBuilder();
    },
    /**
     * Reset the config to the default. Do not use this method unless you know what you are doing.
     */
    _resetToDefault: () => {
      finalConfig = _getDefaultConfig();
    },
    /**
     * Get config for specific key. If not specified whole config will be returned.
     */
    get: (key?: string) => {
      return key ? get(finalConfig, key) : finalConfig;
    },
  };
}
