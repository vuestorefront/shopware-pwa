import jetpack from "fs-jetpack";
import { NuxtModuleOptions, ShopwarePwaConfigFile } from "./interfaces";
import { cosmiconfig } from "cosmiconfig";

// TODO: find a nuxt trigger which do the same
export function invokeRebuild(moduleObject: NuxtModuleOptions) {
  jetpack.copy(
    `${moduleObject.options.rootDir}/nuxt.config.js`,
    `${moduleObject.options.rootDir}/nuxt.config.js`,
    { overwrite: true }
  );
}

// TODO move to commons with shopware-pwa-extension.ts
const defaultConfig: ShopwarePwaConfigFile = {
  shopwareEndpoint: "https://pwa-demo-api.shopware.com",
  shopwareAccessToken: "SWSC40-LJTNO6COUEN7CJMXKLA",
  theme: "@shopware-pwa/default-theme",
  shopwareApiClient: {
    timeout: 10000,
  },
};

export async function loadConfig(
  moduleObject: NuxtModuleOptions
): Promise<ShopwarePwaConfigFile> {
  const explorer = cosmiconfig("shopware-pwa");
  const result = await explorer.search();
  const loadedConfig = result?.config || {};
  return {
    // load default config
    ...defaultConfig,
    // overwrite by user config
    ...loadedConfig,
  };
}
