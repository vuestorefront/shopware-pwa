const path = require("path");
import { addThemePages } from "./pages";
import { addThemeLayouts, extendComponents } from "./utils";
import { Module } from "@nuxt/types";

export interface NuxtModuleOptions {
  options: {
    rootDir: string;
  };
}

const ShopwarePWAModule: Module<NuxtModuleOptions> = function(
  moduleOptions: NuxtModuleOptions
) {
  const config = require(path.join(
    this.options.rootDir,
    "shopware-pwa.config.js"
  ));

  extendComponents(this);
  addThemeLayouts(this);
  addThemePages(this);

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

  this.extendBuild(config => {
    const swPluginsDirectory = path.join(
      this.options.rootDir,
      ".shopware-pwa/sw-plugins"
    );
    if (config && config.resolve && config.resolve.alias) {
      config.resolve.alias["sw-plugins"] = swPluginsDirectory;
    }
  });

  // TODO watch files in development mode
  // if (jetpack.exists(componentsPath)) {
  //   fs.watch(componentsPath, { recursive: true }, async () => {
  //     extendComponents(this, true);
  //   });
  // }
};

export default ShopwarePWAModule;
