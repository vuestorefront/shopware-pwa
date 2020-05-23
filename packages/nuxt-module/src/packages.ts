import path from "path";
import { NuxtModuleOptions, WebpackConfig } from "./interfaces";

/* istanbul ignore next */
export function useCorePackages(
  moduleObject: NuxtModuleOptions,
  corePackages: string[]
) {
  const useRawSource = (packageName: string) => {
    const pkgPath = path.resolve("node_modules/" + packageName);
    const pkg = require(pkgPath + "/package.json");

    if (pkg.module) {
      moduleObject.extendBuild((config: WebpackConfig) => {
        config.resolve.alias[pkg.name + "$"] = path.resolve(
          pkgPath,
          pkg.module
        );
      });
    }
    moduleObject.options.build = moduleObject.options.build || {};
    moduleObject.options.build.transpile =
      moduleObject.options.build.transpile || [];
    moduleObject.options.build.transpile.push(packageName);
  };

  corePackages.forEach((packageName) => {
    useRawSource(packageName);
  });
}
