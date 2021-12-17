import jetpack from "fs-jetpack";
import { NuxtModuleOptions } from "./interfaces";
import { cosmiconfig } from "cosmiconfig";
import {
  getDefaultConfigFile,
  ShopwarePwaConfigFile,
} from "@shopware-pwa/commons";

// TODO: find a nuxt trigger which do the same
export function invokeRebuild(moduleObject: NuxtModuleOptions) {
  jetpack.copy(
    `${moduleObject.options.rootDir}/nuxt.config.js`,
    `${moduleObject.options.rootDir}/nuxt.config.js`,
    { overwrite: true }
  );
}

export async function loadConfig(
  moduleObject: NuxtModuleOptions
): Promise<ShopwarePwaConfigFile> {
  const explorer = cosmiconfig("shopware-pwa");
  const defaultConfig = await getDefaultConfigFile();
  const result = await explorer.search();
  const loadedConfig = result?.config || {};
  return {
    // load default config
    ...defaultConfig,
    // overwrite by user config
    ...loadedConfig,
  };
}
