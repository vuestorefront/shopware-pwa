const path = require("path");
const fs = require("fs");
const jetpack = require("fs-jetpack");

const getAllFiles = function(dirPath, arrayOfFiles) {
  if (!jetpack.exists(dirPath)) return [];
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(file => {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push((dirPath + "/" + file).split(__dirname + "/").pop());
    }
  });

  return arrayOfFiles;
};

// TODO: find a nuxt trigger which do the same
const invokeRebuild = function(moduleObject) {
  console.error("==== REBUILD INVOKED!");
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
  const pages = getAllFiles(
    path.join(
      moduleObject.options.rootDir,
      "node_modules/@shopware-pwa/default-theme/pages"
    )
  );
  pages.forEach(page => {
    const pagesMatch = page.match(
      /@shopware-pwa\/default-theme\/pages\/(.+)?.vue$/
    );
    const templateName = pagesMatch[1];
    const overrideExists = !!jetpack.exists(
      path.join(moduleObject.options.rootDir, "pages", templateName + ".vue")
    );
    if (!overrideExists) {
      const name = templateName === "_" ? "DynamicRoute" : templateName;
      const routePath =
        templateName === "_" ? "*" : path.join("/", templateName);
      moduleObject.extendRoutes((routes, resolve) => {
        routes.push({
          name,
          path: routePath,
          component: resolve(page)
        });
      });
    }
  });
};

const addThemeMiddlewares = function(moduleObject) {
  // TODO: override middlewares from theme folder like with components
};

module.exports = async function ShopwarePWAModule(moduleOptions) {
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
    src: path.join(__dirname, "plugins", "api-client.js"),
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
    src: path.join(__dirname, "plugins", "cookie-universal-nuxt.js"),
    fileName: "cookie-universal-nuxt.js",
    options
  });

  // TODO add watching files only in development mode
  // if (jetpack.exists(componentsPath)) {
  //   fs.watch(componentsPath, { recursive: true }, async () => {
  //     extendComponents(this, true);
  //   });
  // }
};
