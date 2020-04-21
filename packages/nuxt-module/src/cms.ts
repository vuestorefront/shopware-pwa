import path from "path";
import { NuxtModuleOptions, WebpackConfig } from "./interfaces";
import jetpack from "fs-jetpack";

export function extendCMS(moduleObject: NuxtModuleOptions) {
  // Throw error with instruction if CMS module is not prepared
  const cmsModuleExists = jetpack.exists(
    path.join(
      moduleObject.options.rootDir,
      ".shopware-pwa",
      "sw-cms",
      "cmsNameMapper.js"
    )
  );
  if (!cmsModuleExists) {
    throw new Error(
      "[shopware-pwa] CMS module is not initialized properly, please run 'shopware-pwa init'"
    );
  }

  // Get main cms vue files to create aliases for them
  const allThemeCmsFiles =
    jetpack.list(
      path.join(
        moduleObject.options.rootDir,
        "node_modules",
        "@shopware-pwa",
        "default-theme",
        "cms"
      )
    ) || [];
  const cmsCatalogFiles = allThemeCmsFiles.filter((name) =>
    name.includes(".vue")
  );

  // Extend webpack config and add aliases
  moduleObject.extendBuild((config: WebpackConfig) => {
    const swCmsDirectory = path.join(
      moduleObject.options.rootDir,
      ".shopware-pwa",
      "sw-cms"
    );

    cmsCatalogFiles.forEach((cmsFile) => {
      config.resolve.alias["sw-cms/" + cmsFile.replace(".vue", "")] = path.join(
        moduleObject.options.rootDir,
        "node_modules",
        "@shopware-pwa",
        "default-theme",
        "cms",
        cmsFile
      );
    });

    config.resolve.alias["sw-cms"] = swCmsDirectory;
  });
}
