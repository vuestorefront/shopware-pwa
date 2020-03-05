import { addThemePages } from "./pages";
import { NuxtModuleOptions, WebpackConfig } from "./interfaces";
import { addThemeLayouts } from "./layouts";
import { extendComponents } from "./components";
import path from "path";
import { loadConfig } from "./utils";

export function runModule(moduleObject: NuxtModuleOptions, moduleOptions: {}) {
  const shopwarePwaConfig = loadConfig(moduleObject);
  extendComponents(moduleObject);
  addThemeLayouts(moduleObject);
  addThemePages(moduleObject);

  if (!shopwarePwaConfig?.shopwareAccessToken)
    console.error("shopwareAccessToken in shopware-pwa.config.js is missing");
  if (!shopwarePwaConfig?.shopwareEndpoint)
    console.error("shopwareEndpoint in shopware-pwa.config.js is missing");

  moduleObject.addPlugin({
    fileName: "api-client.js",
    src: path.join(__dirname, "..", "plugins", "api-client.js"),
    options: {
      shopwareEndpoint: shopwarePwaConfig?.shopwareEndpoint,
      shopwareAccessToken: shopwarePwaConfig?.shopwareAccessToken
    }
  });

  const defaults = {
    alias: "cookies",
    parseJSON: true
  };
  moduleObject.addPlugin({
    src: path.join(__dirname, "..", "plugins", "cookie-universal-nuxt.js"),
    fileName: "cookie-universal-nuxt.js",
    options: Object.assign({}, defaults, moduleOptions)
  });

  moduleObject.extendBuild((config: WebpackConfig) => {
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
