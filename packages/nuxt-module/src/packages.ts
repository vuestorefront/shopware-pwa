import path from "path";
import jetpack from "fs-jetpack";
import { NuxtModuleOptions } from "./interfaces";

/* istanbul ignore next */
export function useCorePackages(
  moduleObject: NuxtModuleOptions,
  corePackages: string[]
) {
  const useRawSource = (packageName: string) => {
    const pkgPath = path.resolve(path.join("node_modules", packageName));
    const pkg = jetpack.read(path.join(pkgPath, "package.json"), "json");

    if (pkg && pkg.module) {
      moduleObject.options.alias[pkg.name + "$"] = path.resolve(
        pkgPath,
        pkg.module
      );
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
