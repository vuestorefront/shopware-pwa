const path = require("path");
const jetpack = require("fs-jetpack");
import { sortRoutes, createRoutes } from "@nuxt/utils";
import { overrideRoutes } from "./pages";
import { getAllFiles } from "./files";

interface NuxtModuleOptions {
  options: {
    rootDir: string;
  };
}

// TODO: find a nuxt trigger which do the same
const invokeRebuild = function(moduleObject) {
  jetpack.copy(
    `${moduleObject.options.rootDir}/nuxt.config.js`,
    `${moduleObject.options.rootDir}/nuxt.config.js`,
    { overwrite: true }
  );
};

let lastThemeFiles = [];
const extendComponents = function(moduleObject) {
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

  moduleObject.extendBuild((config, { isClient }) => {
    themeFiles.forEach(themeFile => {
      config.resolve.alias[
        themeFile
          .replace(moduleObject.options.rootDir, "@shopware-pwa/default-theme")
          .replace(".vue", "")
      ] = themeFile;
    });
    lastThemeFiles = themeFiles;
  });
};

const addThemeLayouts = function(moduleObject) {
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
    const templateName = layoutMatch[1];
    const overrideExists = !!jetpack.exists(
      path.join(moduleObject.options.rootDir, "layouts", templateName + ".vue")
    );
    if (!overrideExists) moduleObject.addLayout({ src: layout }, templateName);
  });
};

const addThemePages = function(moduleObject) {
  const pagesDir = path.join(
    moduleObject.options.rootDir,
    "node_modules/@shopware-pwa/default-theme"
  );

  const allPages = getAllFiles(pagesDir + "/pages")
    .map(page => page.replace(pagesDir + "/", ""))
    .filter(page => /.+.(vue|js)$/.test(page))
    .sort();
  const allOverridedPages = getAllFiles(moduleObject.options.rootDir + "/pages")
    .map(page => page.replace(moduleObject.options.rootDir + "/", ""))
    .filter(page => /.+.(vue|js)$/.test(page))
    .sort();

  // TODO uncomment after unit tests
  // console.error("ALL PAGES", allPages);
  // console.error("route Pages", allOverridedPages);
  // allOverridedPages.forEach(page => {
  //   if (!allPages.includes(page)) {
  //     allPages.push(page);
  //   }
  // });
  // allPages.sort();
  // console.error("ALL PAGES MERGED", allPages);

  const createdRoutes = createRoutes({
    files: allPages,
    srcDir: pagesDir,
    pagesDir: "pages"
  });
  overrideRoutes(moduleObject, createdRoutes, allOverridedPages);

  moduleObject.extendRoutes((rootRoutes, resolve) => {
    rootRoutes.splice(0, rootRoutes.length, ...createdRoutes);
    sortRoutes(rootRoutes);
  });
};

const addThemeMiddlewares = function(moduleObject) {
  // TODO: override middlewares from theme folder like with components
};

export default async function ShopwarePWAModule(
  moduleOptions: NuxtModuleOptions
) {
  const componentsPath = path.join(this.options.rootDir, "components");

  const config = require(path.join(
    this.options.rootDir,
    "shopware-pwa.config.js"
  ));

  extendComponents(this);
  addThemeLayouts(this);
  addThemePages(this);
  addThemeMiddlewares(this);

  if (!config.shopwareAccessToken)
    console.error("shopwareAccessToken in shopware-pwa.config.js is missing");
  if (!config.shopwareEndpoint)
    console.error("shopwareEndpoint in shopware-pwa.config.js is missing");

  this.addPlugin({
    fileName: "api-client.js",
    src: path.join(__dirname, "..", "plugins", "api-client.js"),
    options: {
      shopwareEndpoint: config.shopwareEndpoint,
      shopwareAccessToken: config.shopwareAccessToken
    }
  });

  const defaults = {
    alias: "cookies",
    parseJSON: true
  };
  const options = Object.assign({}, defaults, moduleOptions);
  this.addPlugin({
    src: path.join(__dirname, "..", "plugins", "cookie-universal-nuxt.js"),
    fileName: "cookie-universal-nuxt.js",
    options
  });

  this.extendBuild((config, { isClient }) => {
    const swPluginsDirectory = path.join(
      this.options.rootDir,
      ".shopware-pwa/sw-plugins"
    );
    config.resolve.alias["sw-plugins"] = swPluginsDirectory;
  });

  // TODO watch files in development mode
  // if (jetpack.exists(componentsPath)) {
  //   fs.watch(componentsPath, { recursive: true }, async () => {
  //     extendComponents(this, true);
  //   });
  // }
}
