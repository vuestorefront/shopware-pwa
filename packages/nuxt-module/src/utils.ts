const path = require("path");
const jetpack = require("fs-jetpack");

import { getAllFiles } from "./files";

export function addThemeLayouts(moduleObject: any) {
  const layouts = getAllFiles(
    path.join(
      moduleObject.options.rootDir,
      "node_modules/@shopware-pwa/default-theme/layouts"
    )
  );
  layouts.forEach(layout => {
    const layoutMatch = layout.match(
      /@shopware-pwa\/default-theme\/layouts\/(.+)?.vue$/
    );
    const templateName = layoutMatch?.[1];
    const overrideExists = !!jetpack.exists(
      path.join(moduleObject.options.rootDir, "layouts", templateName + ".vue")
    );
    if (!overrideExists) moduleObject.addLayout({ src: layout }, templateName);
  });
}

// TODO: find a nuxt trigger which do the same
const invokeRebuild = function(moduleObject: any) {
  jetpack.copy(
    `${moduleObject.options.rootDir}/nuxt.config.js`,
    `${moduleObject.options.rootDir}/nuxt.config.js`,
    { overwrite: true }
  );
};

let lastThemeFiles: any = [];
export function extendComponents(moduleObject: any) {
  const componentsPath = path.join(moduleObject.options.rootDir, "components");
  const themeFiles = getAllFiles(componentsPath);

  if (
    themeFiles.length !== lastThemeFiles.length ||
    themeFiles.filter(filename => !lastThemeFiles.includes(filename)).length
  ) {
    invokeRebuild(moduleObject);
  } else {
    console.warn("no rebuild");
  }

  moduleObject.extendBuild((config: any) => {
    themeFiles.forEach(themeFile => {
      config.resolve.alias[
        themeFile
          .replace(moduleObject.options.rootDir, "@shopware-pwa/default-theme")
          .replace(".vue", "")
      ] = themeFile;
    });
    lastThemeFiles = themeFiles;
  });
}
