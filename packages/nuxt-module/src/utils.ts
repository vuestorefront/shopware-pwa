import jetpack from "fs-jetpack";
import path from "path";
import { NuxtModuleOptions, ShopwarePwaConfigFile } from "./interfaces";

// TODO: find a nuxt trigger which do the same
export function invokeRebuild(moduleObject: NuxtModuleOptions) {
  jetpack.copy(
    `${moduleObject.options.rootDir}/nuxt.config.js`,
    `${moduleObject.options.rootDir}/nuxt.config.js`,
    { overwrite: true }
  );
}

export function loadConfig(
  moduleObject: NuxtModuleOptions
): ShopwarePwaConfigFile | undefined {
  return require(path.join(
    moduleObject.options.rootDir,
    "shopware-pwa.config.js"
  ));
}
