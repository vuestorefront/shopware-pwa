import { addThemePages } from "./pages";
import { NuxtModuleOptions, WebpackConfig, WebpackContext } from "./interfaces";
import { addThemeLayouts } from "./layouts";
import { extendComponents } from "./components";
import path from "path";
import { loadConfig } from "./utils";
import { extendCMS } from "./cms";
import { extendLocales } from "./locales";
import { useCorePackages } from "./packages";

export function runModule(moduleObject: NuxtModuleOptions, moduleOptions: {}) {
  const shopwarePwaConfig = loadConfig(moduleObject);
  extendComponents(moduleObject);
  addThemeLayouts(moduleObject);
  addThemePages(moduleObject);

  if (!shopwarePwaConfig?.shopwareAccessToken)
    console.error("shopwareAccessToken in shopware-pwa.config.js is missing");
  if (!shopwarePwaConfig?.shopwareEndpoint)
    console.error("shopwareEndpoint in shopware-pwa.config.js is missing");

  // Warning about wrong API address
  if (
    shopwarePwaConfig?.shopwareEndpoint &&
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
      shopwareEndpoint: shopwarePwaConfig?.shopwareEndpoint,
      shopwareAccessToken: shopwarePwaConfig?.shopwareAccessToken,
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

  moduleObject.addPlugin({
    src: path.join(__dirname, "..", "plugins", "price-filter.js"),
    fileName: "price-filter.js",
    options: moduleOptions,
  });

  moduleObject.addPlugin({
    src: path.join(__dirname, "..", "plugins", "composition-api.js"),
    fileName: "composition-api.js",
    options: moduleOptions,
  });
  // fixes problem with multiple composition-api instances
  moduleObject.extendBuild((config: WebpackConfig) => {
    config.resolve.alias["@vue/composition-api"] = path.resolve(
      "node_modules/@vue/composition-api"
    );
  });

  // locales
  extendLocales(moduleObject, shopwarePwaConfig);

  moduleObject.extendBuild((config: WebpackConfig, ctx: WebpackContext) => {
    const swPluginsDirectory = path.join(
      moduleObject.options.rootDir,
      ".shopware-pwa/sw-plugins"
    );
    config.resolve.alias["sw-plugins"] = swPluginsDirectory;
    if (ctx.isClient && !ctx.isDev) {
      config.optimization.splitChunks.cacheGroups.commons.minChunks = 2;
    }
  });

  extendCMS(moduleObject);

  moduleObject.options.build = moduleObject.options.build || {};
  moduleObject.options.build.babel = moduleObject.options.build.babel || {};
  /* istanbul ignore next */
  moduleObject.options.build.babel.presets = ({ isServer }) => {
    return [
      [
        require.resolve(
          path.join(
            moduleObject.options.rootDir,
            "node_modules",
            "@nuxt",
            "babel-preset-app"
          )
        ),
        // require.resolve('@nuxt/babel-preset-app-edge'), // For nuxt-edge users
        {
          buildTarget: isServer ? "server" : "client",
          corejs: { version: 3 },
        },
      ],
    ];
  };

  const corePackages: string[] = [
    "@shopware-pwa/composables",
    "@shopware-pwa/helpers",
    "@shopware-pwa/shopware-6-client",
    "@shopware-pwa/default-theme",
    "@storefront-ui/vue",
    "@storefront-ui/shared",
  ];

  useCorePackages(moduleObject, corePackages);
  // TODO watch files in development mode
  // if (jetpack.exists(componentsPath)) {
  //   fs.watch(componentsPath, { recursive: true }, async () => {
  //     extendComponents(moduleObject, true);
  //   });
  // }
}
