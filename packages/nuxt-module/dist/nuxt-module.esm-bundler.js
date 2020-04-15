import path from "path";
import jetpack from "fs-jetpack";
import { createRoutes, sortRoutes } from "@nuxt/utils";

function getAllFiles(dirPath, arrayOfFiles = [], excludeHidden = true) {
  if (!dirPath || !jetpack.exists(dirPath)) return [];
  const files = jetpack.list(dirPath);
  files.forEach((file) => {
    if (jetpack.exists(path.join(dirPath, file)) === "dir") {
      arrayOfFiles = getAllFiles(path.join(dirPath, file), arrayOfFiles);
    } else {
      const fileName = path.join(dirPath, file).replace(__dirname + "/", "");
      if (!(excludeHidden && file.startsWith("."))) {
        arrayOfFiles.push(path.normalize(fileName));
      }
    }
  });
  return arrayOfFiles;
}

function overrideRoutes(moduleObject, routes, overrides) {
  const pagesDir = path.join(
    moduleObject.options.rootDir,
    "node_modules/@shopware-pwa/default-theme"
  );
  routes.forEach((route) => {
    const pageComponentPath = path
      .normalize(route.component)
      .replace(pagesDir + path.sep, "");
    if (overrides.includes(pageComponentPath)) {
      route.component = path
        .normalize(route.component)
        .replace(pagesDir, moduleObject.options.rootDir);
    }
    route.component = path.normalize(route.component);
    if (route.children) {
      overrideRoutes(moduleObject, route.children, overrides);
    }
  });
}
function addThemePages(moduleObject) {
  const pagesDir = path.join(
    moduleObject.options.rootDir,
    "node_modules/@shopware-pwa/default-theme"
  );
  const themePages = getAllFiles(path.join(pagesDir, "pages"));
  const projectPages = getAllFiles(
    path.join(moduleObject.options.rootDir, "pages")
  );
  const allPages = themePages
    .map((page) => page.replace(path.normalize(pagesDir + path.sep), ""))
    .map((page) => page.replace(/\\/g, "/"))
    .filter((page) => /.+.(vue|js)$/.test(page))
    .sort();
  const allOverridedPages = projectPages
    .map((page) =>
      page.replace(path.normalize(moduleObject.options.rootDir + path.sep), "")
    )
    .filter((page) => /.+.(vue|js)$/.test(page))
    .sort();
  allOverridedPages.forEach((page) => {
    const p = page.replace(/\\/g, "/");
    if (!allPages.includes(p)) {
      allPages.push(p);
    }
  });
  allPages.sort();
  const createdRoutes = createRoutes({
    files: allPages,
    srcDir: pagesDir,
    pagesDir: "pages",
  });
  overrideRoutes(moduleObject, createdRoutes, allOverridedPages);
  moduleObject.extendRoutes((rootRoutes, resolve) => {
    rootRoutes.splice(0, rootRoutes.length, ...createdRoutes);
    sortRoutes(rootRoutes);
  });
}

function addThemeLayouts(moduleObject) {
  const layouts = getAllFiles(
    path.join(
      moduleObject.options.rootDir,
      "node_modules/@shopware-pwa/default-theme/layouts"
    )
  );
  layouts.forEach((layout) => {
    var _a;
    const layoutMatch = layout.match(
      /@shopware-pwa[\/\\\\]+default-theme[\/\\\\]+layouts[\/\\\\]+(.+)?.vue$/
    );
    const templateName =
      (_a = layoutMatch) === null || _a === void 0 ? void 0 : _a[1];
    const overrideExists = !!jetpack.exists(
      path.join(moduleObject.options.rootDir, "layouts", templateName + ".vue")
    );
    if (!overrideExists && templateName)
      moduleObject.addLayout({ src: layout }, templateName);
  });
}

// import { invokeRebuild } from "./utils";
// let lastThemeFiles: any = [];
function extendComponents(moduleObject) {
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
    moduleObject.extendBuild((config) => {
      themeFiles.forEach((themeFile) => {
        config.resolve.alias[
          themeFile
            .replace(
              moduleObject.options.rootDir,
              "@shopware-pwa/default-theme"
            )
            .replace(".vue", "")
        ] = themeFile;
      });
      // lastThemeFiles = themeFiles;
    });
  }
}

function loadConfig(moduleObject) {
  return require(path.join(
    moduleObject.options.rootDir,
    "shopware-pwa.config.js"
  ));
}

function runModule(moduleObject, moduleOptions) {
  var _a, _b, _c, _d, _e;
  const shopwarePwaConfig = loadConfig(moduleObject);
  extendComponents(moduleObject);
  addThemeLayouts(moduleObject);
  addThemePages(moduleObject);
  if (
    !((_a = shopwarePwaConfig) === null || _a === void 0
      ? void 0
      : _a.shopwareAccessToken)
  )
    console.error("shopwareAccessToken in shopware-pwa.config.js is missing");
  if (
    !((_b = shopwarePwaConfig) === null || _b === void 0
      ? void 0
      : _b.shopwareEndpoint)
  )
    console.error("shopwareEndpoint in shopware-pwa.config.js is missing");
  // Warning about wrong API address
  if (
    ((_c = shopwarePwaConfig) === null || _c === void 0
      ? void 0
      : _c.shopwareEndpoint) &&
    shopwarePwaConfig.shopwareEndpoint.includes("/sales-channel-api/v1")
  ) {
    console.error(
      "Please change your shopwareEndpoint in shopware-pwa.config.js to contain just domain, example: https://github.com/DivanteLtd/shopware-pwa#running-shopware-pwa-on-custom-shopware-instance"
    );
  }
  moduleObject.addPlugin({
    fileName: "api-client.js",
    src: path.join(__dirname, "..", "plugins", "api-client.js"),
    options: {
      shopwareEndpoint:
        ((_d = shopwarePwaConfig) === null || _d === void 0
          ? void 0
          : _d.shopwareEndpoint) + "/sales-channel-api/v1",
      shopwareAccessToken:
        (_e = shopwarePwaConfig) === null || _e === void 0
          ? void 0
          : _e.shopwareAccessToken,
    },
  });
  const defaults = {
    alias: "cookies",
    parseJSON: true,
  };
  moduleObject.addPlugin({
    src: path.join(__dirname, "..", "plugins", "cookie-universal-nuxt.js"),
    fileName: "cookie-universal-nuxt.js",
    options: Object.assign({}, defaults, moduleOptions),
  });
  moduleObject.extendBuild((config) => {
    const swPluginsDirectory = path.join(
      moduleObject.options.rootDir,
      ".shopware-pwa/sw-plugins"
    );
    config.resolve.alias["sw-plugins"] = swPluginsDirectory;
  });
  // TODO watch files in development mode
  // if (jetpack.exists(componentsPath)) {
  //   fs.watch(componentsPath, { recursive: true }, async () => {
  //     extendComponents(moduleObject, true);
  //   });
  // }
}

/* istanbul ignore next */
/* istanbul ignore next */
const ShopwarePWAModule = function (moduleOptions) {
  const moduleObject = this;
  runModule(moduleObject, moduleOptions);
};

export default ShopwarePWAModule;
