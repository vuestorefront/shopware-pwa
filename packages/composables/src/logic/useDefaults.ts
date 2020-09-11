import { ApplicationVueContext, getApplicationContext } from "../appContext";
import {
  Includes,
  ShopwareSearchParams,
} from "@shopware-pwa/commons/interfaces/search/SearchCriteria";
import { Association } from "@shopware-pwa/commons/interfaces/search/Association";
import { warning } from "@shopware-pwa/commons";

/**
 * Returns default config depending on config key.
 * It is used in composables, so defaultsKey is in most cases composable name (ex. `useDefaults(rootContext, "useCms")`)
 *
 * @remarks
 * To extend defaults you need to add configuration to `shopware-pwa.config.js` file.
 * Let's say we want to have a product manufacturer, media associations and listing limit on CMS pages. We need to add to configuration file:
 * ```js
 * // inside shopware-pwa.config.js
 *
 * module.exports = {
 *   // ... other settings
 *   apiDefaults: {
 *    useCms: {
 *      limit: 8,
 *      includes: {
 *        product: ["manufacturer"]
 *      },
 *      associations: [
 *        { name: "media" }
 *      ]
 *    },
 *   },
 * }
 * ```
 * We need to remember the structure of includes and associations. You can read more about this {@link https://docs.shopware.com/en/shopware-platform-dev-en/admin-api-guide/reading-entities?category=shopware-platform-dev-en/admin-api-guide#parameter-overview | in shopware docs}.
 *
 * @beta
 */
export const useDefaults = (
  rootContext: ApplicationVueContext,
  defaultsKey: string
): {
  getIncludesConfig: () => Includes;
  getAssociationsConfig: () => Association[];
  getDefaults: () => ShopwareSearchParams;
} => {
  const { shopwareDefaults } = getApplicationContext(
    rootContext,
    "useDefaults"
  );
  if (!shopwareDefaults) {
    throw new Error(
      "[composables][useDefaults]: applicationContext does not have shopwareDefaults!"
    );
  }

  const getDefaultsFor = (keyName: string) => {
    if (!shopwareDefaults[keyName]) {
      warning({
        packageName: "composables",
        methodName: "useDefaults",
        notes: `there is no defaults configuration for key: ${keyName}`,
      });
      return;
    }
    return shopwareDefaults[keyName];
  };

  const getIncludesConfig = () => getDefaultsFor(defaultsKey)?.includes || {};
  const getAssociationsConfig = () =>
    getDefaultsFor(defaultsKey)?.associations || [];
  const getDefaults = () => getDefaultsFor(defaultsKey) || {};

  return {
    getIncludesConfig,
    getAssociationsConfig,
    getDefaults,
  };
};
