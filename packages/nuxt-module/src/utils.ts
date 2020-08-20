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

export async function loadConfig(
  moduleObject: NuxtModuleOptions
): Promise<ShopwarePwaConfigFile | undefined> {
  const explorer = cosmiconfig("shopware-pwa");
  const result = await explorer.search();
  return result?.config;
}
