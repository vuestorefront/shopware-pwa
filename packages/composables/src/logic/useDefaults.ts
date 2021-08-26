import {
  ApplicationVueContext,
  getApplicationContext,
} from "@shopware-pwa/composables";
import {
  Includes,
  ShopwareSearchParams,
} from "@shopware-pwa/commons/interfaces/search/SearchCriteria";
import { ShopwareAssociation } from "@shopware-pwa/commons/interfaces/search/Association";
import { warning } from "@shopware-pwa/commons";

/**
 * Returns default config depending on config key.
 * It is used in composables, so defaultsKey is in most cases composable name (ex. `useDefaults(rootContext, "useCms")`)
 *
 * @remarks
 * To extend defaults you need to add configuration to `shopware-pwa.config.js` file.
 * Let's say we want to add product new_option field and change listing limit on CMS pages. We need to add to configuration file:
 * ```js
 * // inside shopware-pwa.config.js
 * const defaultsConfigBuilder =
 *   require("@shopware-pwa/nuxt-module/api-defaults").default
 *`
 * defaultsConfigBuilder()
 *   .replace("useCms.limit", 8) // change default listing limit to 8
 *   .add("useCms.includes.product", "new_option") // add product new_option to returned fields
 *
 * module.exports = {
 *   // ... your standard Shopware PWA settings
 * }
 * ```
 * We need to remember the structure of includes and associations. You can read more about this {@link https://docs.shopware.com/en/shopware-platform-dev-en/admin-api-guide/reading-entities?category=shopware-platform-dev-en/admin-api-guide#parameter-overview | in shopware docs}.
 *
 * @beta
 */
export function useDefaults(
  rootContext: ApplicationVueContext | null | undefined,
  defaultsKey: string
): {
  getIncludesConfig: () => Includes;
  getAssociationsConfig: () => ShopwareAssociation;
  getDefaults: () => ShopwareSearchParams;
} {
  const COMPOSABLE_NAME = "useDefaults";
  const contextName = COMPOSABLE_NAME;

  const { shopwareDefaults } = getApplicationContext({ contextName });
  if (!shopwareDefaults) {
    throw new Error(
      "[composables][useDefaults]: applicationContext does not have shopwareDefaults!"
    );
  }

  const getDefaultsFor = (keyName: string) => {
    if (!shopwareDefaults[keyName]) {
      warning({
        packageName: "composables",
        methodName: contextName,
        notes: `there is no defaults configuration for key: ${keyName}`,
      });
      return;
    }
    return shopwareDefaults[keyName];
  };

  const getIncludesConfig = () => getDefaultsFor(defaultsKey)?.includes || {};
  const getAssociationsConfig = () =>
    getDefaultsFor(defaultsKey)?.associations || {};
  const getDefaults = () => getDefaultsFor(defaultsKey) || {};

  return {
    getIncludesConfig,
    getAssociationsConfig,
    getDefaults,
  };
}
