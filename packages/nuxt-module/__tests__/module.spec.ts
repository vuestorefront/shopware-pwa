import InterfacesDefault from "../src/interfaces";
import { runModule } from "../src/module";
import path from "path";
import * as utils from "../src/utils";
import * as layouts from "../src/layouts";
import * as components from "../src/components";
import * as pages from "../src/pages";
import * as cms from "../src/cms";
import * as locales from "../src/locales";
import * as packages from "../src/packages";
jest.mock("../src/utils");
jest.mock("../src/layouts");
jest.mock("../src/components");
jest.mock("../src/pages");
jest.mock("../src/cms");
jest.mock("../src/locales");
jest.mock("../src/packages");
const mockedUtils = utils as jest.Mocked<typeof utils>;
const consoleErrorSpy = jest.spyOn(console, "error");

describe("nuxt-module - ShopwarePWAModule runModule", () => {
  let webpackConfig: any = {};
  let webpackContext: any = {};
  let methods: Function[] = [];
  const moduleObject: any = {
    options: {
      rootDir: __dirname,
      router: {
        middleware: [],
      },
    },
    addLayout: jest.fn(),
    extendRoutes: jest.fn(),
    addPlugin: jest.fn(),
    nuxt: jest.fn(),
    extendBuild: (method: Function): number => methods.push(method),
  };
  /**
   * To resolve extendBuild we need to invoke resolveBuilds after method
   * invocation to test real impact on webpack configuration
   */
  const resolveBuilds = () =>
    methods.forEach((method) => method(webpackConfig, webpackContext));

  beforeEach(() => {
    jest.resetAllMocks();

    mockedUtils.loadConfig.mockReturnValueOnce({
      shopwareEndpoint: "mockedEndpoint",
      shopwareAccessToken: "mockedToken",
    });
    webpackConfig = {
      resolve: {
        alias: {},
      },
      optimization: {
        splitChunks: {
          cacheGroups: {
            commons: {
              minChunks: 0,
            },
          },
        },
      },
    };
    methods = [];
    webpackContext = {
      isClient: true,
      isDev: false,
    };

    consoleErrorSpy.mockImplementationOnce(() => {});
  });

  it("should invoke config load", () => {
    runModule(moduleObject, {});
    expect(mockedUtils.loadConfig).toBeCalledWith(moduleObject);
  });

  it("should invoke extendComponents", () => {
    runModule(moduleObject, {});
    expect(components.extendComponents).toBeCalledWith(moduleObject);
  });

  it("should invoke addThemeLayouts", () => {
    runModule(moduleObject, {});
    expect(layouts.addThemeLayouts).toBeCalledWith(moduleObject);
  });

  it("should invoke addThemePages", () => {
    runModule(moduleObject, {});
    expect(pages.addThemePages).toBeCalledWith(moduleObject);
  });

  it("should show info when config is not loaded", () => {
    jest.resetAllMocks();
    mockedUtils.loadConfig.mockReturnValueOnce(undefined);

    runModule(moduleObject, {});
    expect(pages.addThemePages).toBeCalledWith(moduleObject);
  });

  it("should add api-client plugin", () => {
    runModule(moduleObject, {});
    const pathForApiClientPlugin = path.join(
      __dirname,
      "..",
      "plugins",
      "api-client.js"
    );
    expect(moduleObject.addPlugin).toBeCalledWith({
      fileName: "api-client.js",
      options: {
        shopwareAccessToken: "mockedToken",
        shopwareEndpoint: "mockedEndpoint",
      },
      src: pathForApiClientPlugin,
    });
  });

  it("should add entities-parser client plugin", () => {
    runModule(moduleObject, {});
    const pathForEntitiesParserClientPlugin = path.join(
      __dirname,
      "..",
      "plugins",
      "entities-parser",
      "entities-parser.csr.js"
    );
    expect(moduleObject.addPlugin).toBeCalledWith({
      fileName: "entities-parser.csr.js",
      mode: "client",
      options: {},
      src: pathForEntitiesParserClientPlugin,
    });
  });

  it("should add entities-parser server plugin", () => {
    runModule(moduleObject, {});
    const pathForEntitiesParserServerPlugin = path.join(
      __dirname,
      "..",
      "plugins",
      "entities-parser",
      "entities-parser.ssr.js"
    );
    expect(moduleObject.addPlugin).toBeCalledWith({
      fileName: "entities-parser.ssr.js",
      mode: "server",
      options: {},
      src: pathForEntitiesParserServerPlugin,
    });
  });

  it("should show console error when shopwareEndpoint contains api endpoint instead of just domain", () => {
    jest.resetAllMocks();

    mockedUtils.loadConfig.mockReturnValueOnce({
      shopwareEndpoint: "mockedEndpoint/sales-channel-api/v1",
      shopwareAccessToken: "mockedToken",
    });
    runModule(moduleObject, {});
    expect(consoleErrorSpy).toBeCalledWith(
      "Please change your shopwareEndpoint in shopware-pwa.config.js to contain just domain, example: https://github.com/DivanteLtd/shopware-pwa#running-shopware-pwa-on-custom-shopware-instance"
    );
  });

  it("should add cookies plugin", () => {
    runModule(moduleObject, {});
    expect(moduleObject.addPlugin).toBeCalled();
    const pathForCookiesPlugin = path.join(
      __dirname,
      "..",
      "plugins",
      "cookie-universal-nuxt.js"
    );
    expect(moduleObject.addPlugin).toBeCalledWith({
      fileName: "cookie-universal-nuxt.js",
      options: {
        alias: "cookies",
        parseJSON: true,
      },
      src: pathForCookiesPlugin,
    });
  });

  it("should extend build wirh sw-plugins alias", () => {
    runModule(moduleObject, {});
    resolveBuilds();
    expect(webpackConfig.resolve.alias["sw-plugins"]).toEqual(
      path.join(__dirname, ".shopware-pwa", "sw-plugins")
    );
  });

  it("should not change webpack chunks config if it's server build", () => {
    webpackContext.isClient = false;
    runModule(moduleObject, {});
    resolveBuilds();
    expect(
      webpackConfig.optimization.splitChunks.cacheGroups.commons.minChunks
    ).toEqual(0);
  });

  it("should not change webpack chunks config if it's a dev build", () => {
    webpackContext.isClient = true;
    webpackContext.isDev = true;
    runModule(moduleObject, {});
    resolveBuilds();
    expect(
      webpackConfig.optimization.splitChunks.cacheGroups.commons.minChunks
    ).toEqual(0);
  });

  it("should change webpack chunks config if it's client prod build", () => {
    webpackContext.isClient = true;
    webpackContext.isDev = false;
    runModule(moduleObject, {});
    resolveBuilds();
    expect(
      webpackConfig.optimization.splitChunks.cacheGroups.commons.minChunks
    ).toEqual(2);
  });

  it("should invoke extendCMS", () => {
    runModule(moduleObject, {});
    expect(cms.extendCMS).toBeCalledWith(moduleObject);
  });

  it("should invoke extendLocales", () => {
    runModule(moduleObject, {});
    expect(locales.extendLocales).toBeCalledWith(moduleObject, {
      shopwareAccessToken: "mockedToken",
      shopwareEndpoint: "mockedEndpoint",
    });
  });

  it("should invoke useCorePackages", () => {
    runModule(moduleObject, {});
    expect(packages.useCorePackages).toBeCalledWith(moduleObject, [
      "@shopware-pwa/composables",
      "@shopware-pwa/helpers",
      "@shopware-pwa/shopware-6-client",
      "@shopware-pwa/default-theme",
      "@storefront-ui/vue",
      "@storefront-ui/shared",
    ]);
  });

  it("should add babel preset to config", () => {
    runModule(moduleObject, {});
    expect(moduleObject.options.build.babel.presets).toBeTruthy();
  });

  it("interfaces should return default empty object", () => {
    expect(InterfacesDefault).toEqual({});
  });
});
