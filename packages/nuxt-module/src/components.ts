import path from "path";
import { getAllFiles } from "./files";
import { NuxtModuleOptions } from "./interfaces";
// import { invokeRebuild } from "./utils";

// let lastThemeFiles: any = [];
export function extendComponents(moduleObject: NuxtModuleOptions) {
  const componentsPath = path.join(moduleObject.options.rootDir, "components");
  const themeFiles = getAllFiles(componentsPath);

  // invoking rebuild in development mode
  // if (
  //   themeFiles.length !== lastThemeFiles.length ||
  //   themeFiles.filter(filename => !lastThemeFiles.includes(filename)).length
  // ) {
  //   invokeRebuild(moduleObject);
  // } else {
  //   console.warn("no rebuild");
  // }

  if (themeFiles.length) {
    moduleObject.extendBuild((config: any) => {
      themeFiles.forEach((themeFile) => {
        config.resolve.alias[
          themeFile
            .replace(
              moduleObject.options.rootDir,
              "@shopware-pwa/default-theme"
            )
            .replace(".vue", "")
            .replace(/\\/g, "/") // windows fix
        ] = themeFile;
      });
      // lastThemeFiles = themeFiles;
    });
  }
}
