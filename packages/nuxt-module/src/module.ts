import { NuxtModuleOptions, WebpackConfig, WebpackContext } from "./interfaces";
import path from "path";
import { loadConfig } from "./utils";
import { extendCMS } from "./cms";
import { setupDomains } from "./domains";

import { extendLocales } from "./locales";
import { useCorePackages } from "./packages";
import {
  getTargetSourcePath,
  getThemeSourcePath,
  getProjectSourcePath,
  useThemeAndProjectFiles,
  onThemeFilesChanged,
  onProjectFilesChanged,
} from "./theme";
import chokidar from "chokidar";
import { getDefaultApiParams } from "@shopware-pwa/composables";
import merge from "lodash/merge";
import fse from "fs-extra";
import { ShopwarePwaConfigFile } from "@shopware-pwa/commons";
import { getAllFiles } from "@shopware-pwa/commons/node";

export async function runModule(
  moduleObject: NuxtModuleOptions,
  moduleOptions: {}
) {
  const shopwarePwaConfig: ShopwarePwaConfigFile = await loadConfig(
    moduleObject
  );

  if (!shopwarePwaConfig.shopwareAccessToken)
    console.error("shopwareAccessToken in shopware-pwa.config.js is missing");
  if (!shopwarePwaConfig.shopwareEndpoint)
    console.error("shopwareEndpoint in shopware-pwa.config.js is missing");

  moduleObject.options.alias = moduleObject.options.alias || {};
  // fixes problem with multiple composition-api instances
  moduleObject.options.alias[
    "@vue/composition-api/dist/vue-composition-api.esm.js"
  ] = moduleObject.nuxt.resolver.resolveModule(
    "@vue/composition-api/dist/vue-composition-api.esm.js"
  );
  moduleObject.options.alias["@vue/composition-api"] =
    moduleObject.nuxt.resolver.resolveModule(
      "@vue/composition-api/dist/vue-composition-api.esm.js"
    );

  const TARGET_SOURCE: string = getTargetSourcePath(moduleObject);
  const THEME_SOURCE: string = getThemeSourcePath(
    moduleObject,
    shopwarePwaConfig
  );
  console.info(`Using theme: ${shopwarePwaConfig.theme}`);
  shopwarePwaConfig.theme = THEME_SOURCE;
  const PROJECT_SOURCE: string = getProjectSourcePath(moduleObject);

  // Change project source root to Target path
  moduleObject.options.srcDir = TARGET_SOURCE;
  moduleObject.options.store = false; // disable store generation
  moduleObject.options.features.store = false;
  // resolve project src aliases
  moduleObject.options.alias["~"] = TARGET_SOURCE;
  moduleObject.options.alias["@"] = TARGET_SOURCE;
  moduleObject.options.alias["assets"] = path.join(TARGET_SOURCE, "assets");
  moduleObject.options.alias["static"] = path.join(TARGET_SOURCE, "static");

  // theme resolve
  moduleObject.options.alias["@theme"] = THEME_SOURCE;

  await useThemeAndProjectFiles({
    TARGET_SOURCE,
    PROJECT_SOURCE,
    THEME_SOURCE,
  });

  // Warning about wrong API address
  // TODO: remove in 1.0
  if (shopwarePwaConfig.shopwareEndpoint?.includes("/sales-channel-api/v1")) {
    console.error(
      "Please change your shopwareEndpoint in shopware-pwa.config.js to contain just domain, example: https://github.com/DivanteLtd/shopware-pwa#running-shopware-pwa-on-custom-shopware-instance"
    );
  }

  /* i18n plugin has to be registered before routing-plugin, because the execution order will be the other way round,
   * as addPlugin() prepends to the plugins-array (https://nuxtjs.org/docs/2.x/internals-glossary/internals-module-container#addplugin-template)
   * So by registering the i18n-plugin before the routing-plugin, the routing-plugin will be executed before the i18n-plugin
   * and as a result the currentDomain will be set correctly in the i18n-plugin on initialization. This results in the SSR-result being
   * in the correct locale.
   */
  extendLocales(moduleObject, shopwarePwaConfig);

  /* In here instantiate new routing */
  await setupDomains(moduleObject, shopwarePwaConfig);

  moduleObject.addPlugin({
    src: path.join(
      __dirname,
      "..",
      "plugins",
      "entities-parser",
      "entities-parser.csr.js"
    ),
    fileName: "entities-parser.csr.js",
    mode: "client",
    options: moduleOptions,
  });

  moduleObject.addPlugin({
    src: path.join(
      __dirname,
      "..",
      "plugins",
      "entities-parser",
      "entities-parser.ssr.js"
    ),
    fileName: "entities-parser.ssr.js",
    mode: "server",
    options: {},
  });

  // Add plugins registered in theme
  const pluginFiles = getAllFiles(
    path.join(moduleObject.options.srcDir, "plugins")
  ).filter((filePath) => /.+.(js)$/.test(filePath)); // get only js files
  pluginFiles.forEach((pluginPath) => {
    const pluginFilename = pluginPath.replace(/^.*[\\\/]/, "");
    moduleObject.addPlugin({
      src: pluginPath,
      fileName: pluginFilename,
      options: moduleOptions,
    });
  });

  moduleObject.addPlugin({
    fileName: "api-client.js",
    src: path.join(__dirname, "..", "plugins", "api-client.js"),
    options: {
      shopwareEndpoint: shopwarePwaConfig.shopwareEndpoint,
      shopwareAccessToken: shopwarePwaConfig.shopwareAccessToken,
      shopwareApiClient: shopwarePwaConfig.shopwareApiClient,
    },
  });

  let config = merge({}, getDefaultApiParams(), shopwarePwaConfig.apiDefaults);
  try {
    const defaultsConfigBuilder =
      require("@shopware-pwa/nuxt-module/api-defaults").default;
    config = defaultsConfigBuilder().get();
  } catch (e) {
    console.error("Cannot resolve API defaults config", e);
  }
  moduleObject.addPlugin({
    fileName: "api-defaults.js",
    src: path.join(__dirname, "..", "plugins", "api-defaults.js"),
    options: {
      apiDefaults: config,
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
    src: path.join(__dirname, "..", "plugins", "composition-api.js"),
    fileName: "composition-api.js",
    options: moduleOptions,
  });

  moduleObject.extendBuild((config: WebpackConfig, ctx: WebpackContext) => {
    const swPluginsDirectory = path.join(
      moduleObject.options.rootDir,
      ".shopware-pwa",
      "sw-plugins"
    );
    config.resolve.alias["sw-plugins"] = swPluginsDirectory;
    if (ctx.isClient && !ctx.isDev) {
      config.optimization.splitChunks.cacheGroups.commons.minChunks = 2;
    }
  });

  extendCMS(moduleObject, shopwarePwaConfig);

  // TODO: start - remove this, only for default-theme
  moduleObject.options.build = moduleObject.options.build || {};
  moduleObject.options.build.babel = moduleObject.options.build.babel || {};
  /* istanbul ignore next */
  moduleObject.options.build.babel.presets = ({ isServer }) => {
    return [
      [
        path.join(
          moduleObject.options.rootDir,
          "node_modules",
          "@nuxt",
          "babel-preset-app"
        ),
        // require.resolve('@nuxt/babel-preset-app-edge'), // For nuxt-edge users
        {
          buildTarget: isServer ? "server" : "client",
          corejs: { version: 3 },
        },
      ],
    ];
  };

  moduleObject.options.build.filenames =
    moduleObject.options.build.filenames || {};
  moduleObject.options.build.filenames.chunk = ({ isDev }) =>
    isDev ? "[name].js" : "[id].[contenthash].js";

  const corePackages: string[] = [
    "@shopware-pwa/composables",
    "@shopware-pwa/helpers",
    "@shopware-pwa/shopware-6-client",
    "@storefront-ui/vue",
    "@storefront-ui/shared",
  ];

  useCorePackages(moduleObject, corePackages);

  // backward compatibility for default-theme alias
  moduleObject.options.alias["@shopware-pwa/default-theme"] = TARGET_SOURCE;
  moduleObject.options.build.transpile =
    moduleObject.options.build.transpile || [];
  moduleObject.options.build.transpile.push("@shopware-pwa/default-theme");

  // TODO: --- END

  // Watching files in development mode
  if (moduleObject.options.dev) {
    // Observing theme
    chokidar
      .watch([THEME_SOURCE], {
        ignored: `${THEME_SOURCE}/node_modules/**/*`,
        ignoreInitial: true,
        followSymlinks: true,
      })
      .on("all", (event: string, filePath: string) =>
        onThemeFilesChanged({
          event,
          filePath,
          TARGET_SOURCE,
          PROJECT_SOURCE,
          THEME_SOURCE,
        })
      );

    // Observe project
    chokidar
      .watch([PROJECT_SOURCE], {
        ignoreInitial: true,
      })
      .on("all", (event: string, filePath: string) =>
        onProjectFilesChanged({
          event,
          filePath,
          TARGET_SOURCE,
          PROJECT_SOURCE,
          THEME_SOURCE,
        })
      );
  }

  // On build copy combined static files to rootStatic folder
  if (!moduleObject.options.dev) {
    moduleObject.nuxt.hook("build:done", async (builder: NuxtModuleOptions) => {
      const sourceDir = path.join(TARGET_SOURCE, "static");
      const destinationDir = path.join(builder.options.rootDir, "static");
      await fse.copy(sourceDir, destinationDir);
      console.info(
        "Moved static files to root directory static folder. Make sure your static files are placed inside `src/static` directory."
      );
    });
  }
}
