import InterfacesDefault from "../src/interfaces";
import { runModule } from "../src/module";
import path from "path";
import * as utils from "../src/utils";
import * as cms from "../src/cms";
import * as locales from "../src/locales";
import * as packages from "../src/packages";
import * as theme from "../src/theme";
import chokidar from "chokidar";
jest.mock("../src/utils");
jest.mock("../src/cms");
jest.mock("../src/locales");
jest.mock("../src/packages");
jest.mock("../src/theme");
jest.mock("chokidar");
const mockedUtils = utils as jest.Mocked<typeof utils>;
const mockedTheme = theme as jest.Mocked<typeof theme>;
const consoleErrorSpy = jest.spyOn(console, "error");
const mockedChokidar = chokidar as jest.Mocked<typeof chokidar>;

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
  let BASE_SOURCE = path.join("node_modules", "theme");
  let PROJECT_SOURCE = "src";
  let TARGET_SOURCE = path.join(".shopware-pwa", "source");
  /**
   * To resolve extendBuild we need to invoke resolveBuilds after method
   * invocation to test real impact on webpack configuration
   */
  const resolveBuilds = () =>
    methods.forEach((method) => method(webpackConfig, webpackContext));

  beforeEach(() => {
    jest.resetAllMocks();

    mockedUtils.loadConfig.mockResolvedValue({
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
    mockedTheme.getBaseSourcePath.mockReturnValue(BASE_SOURCE);
    mockedTheme.getTargetSourcePath.mockReturnValue(TARGET_SOURCE);
    mockedTheme.getProjectSourcePath.mockReturnValue(PROJECT_SOURCE);
    mockedChokidar.watch.mockReturnValue({ on: () => {} });
  });

  it("should invoke config load", async () => {
    await runModule(moduleObject, {});
    expect(mockedUtils.loadConfig).toBeCalledWith(moduleObject);
  });

  it("should invoke useThemeAndProjectFiles", async () => {
    await runModule(moduleObject, {});
    expect(mockedTheme.useThemeAndProjectFiles).toBeCalledWith({
      BASE_SOURCE,
      PROJECT_SOURCE,
      TARGET_SOURCE,
    });
  });

  it("should add api-client plugin", async () => {
    await runModule(moduleObject, {});
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

  it("should add entities-parser client plugin", async () => {
    await runModule(moduleObject, {});
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

  it("should add entities-parser server plugin", async () => {
    await runModule(moduleObject, {});
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

  it("should show console info, that shopware-pwa.config.js is missing endpoint settings", async () => {
    mockedUtils.loadConfig.mockResolvedValueOnce(undefined);
    await runModule(moduleObject, {});
    expect(consoleErrorSpy).toBeCalledWith(
      "shopwareAccessToken in shopware-pwa.config.js is missing"
    );
    expect(consoleErrorSpy).toBeCalledWith(
      "shopwareEndpoint in shopware-pwa.config.js is missing"
    );
  });

  it("should show console error when shopwareEndpoint contains api endpoint instead of just domain", async () => {
    mockedUtils.loadConfig.mockResolvedValueOnce({
      shopwareEndpoint: "mockedEndpoint/sales-channel-api/v1",
      shopwareAccessToken: "mockedToken",
    });
    await runModule(moduleObject, {});
    expect(consoleErrorSpy).toBeCalledWith(
      "Please change your shopwareEndpoint in shopware-pwa.config.js to contain just domain, example: https://github.com/DivanteLtd/shopware-pwa#running-shopware-pwa-on-custom-shopware-instance"
    );
  });

  it("should add cookies plugin", async () => {
    await runModule(moduleObject, {});
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

  it("should extend build wirh sw-plugins alias", async () => {
    await runModule(moduleObject, {});
    resolveBuilds();
    expect(webpackConfig.resolve.alias["sw-plugins"]).toEqual(
      path.join(__dirname, ".shopware-pwa", "sw-plugins")
    );
  });

  it("should not change webpack chunks config if it's server build", async () => {
    webpackContext.isClient = false;
    await runModule(moduleObject, {});
    resolveBuilds();
    expect(
      webpackConfig.optimization.splitChunks.cacheGroups.commons.minChunks
    ).toEqual(0);
  });

  it("should not change webpack chunks config if it's a dev build", async () => {
    webpackContext.isClient = true;
    webpackContext.isDev = true;
    await runModule(moduleObject, {});
    resolveBuilds();
    expect(
      webpackConfig.optimization.splitChunks.cacheGroups.commons.minChunks
    ).toEqual(0);
  });

  it("should change webpack chunks config if it's client prod build", async () => {
    webpackContext.isClient = true;
    webpackContext.isDev = false;
    await runModule(moduleObject, {});
    resolveBuilds();
    expect(
      webpackConfig.optimization.splitChunks.cacheGroups.commons.minChunks
    ).toEqual(2);
  });

  it("should invoke extendCMS", async () => {
    await runModule(moduleObject, {});
    expect(cms.extendCMS).toBeCalledWith(moduleObject);
  });

  it("should invoke extendLocales", async () => {
    await runModule(moduleObject, {});
    expect(locales.extendLocales).toBeCalledWith(moduleObject, {
      shopwareAccessToken: "mockedToken",
      shopwareEndpoint: "mockedEndpoint",
    });
  });

  it("should invoke useCorePackages", async () => {
    await runModule(moduleObject, {});
    expect(packages.useCorePackages).toBeCalledWith(moduleObject, [
      "@shopware-pwa/composables",
      "@shopware-pwa/helpers",
      "@shopware-pwa/shopware-6-client",
      "@storefront-ui/vue",
      "@storefront-ui/shared",
    ]);
  });

  it("should add babel preset to config", async () => {
    await runModule(moduleObject, {});
    expect(moduleObject.options.build.babel.presets).toBeTruthy();
  });

  it("interfaces should return default empty object", () => {
    expect(InterfacesDefault).toEqual({});
  });

  it("should change build chunk names", async () => {
    await runModule(moduleObject, {});
    expect(moduleObject.options.build.filenames.chunk).toBeTruthy();
    expect(
      moduleObject.options.build.filenames.chunk({ isDev: false })
    ).toEqual("[id].[contenthash].js");
    expect(moduleObject.options.build.filenames.chunk({ isDev: true })).toEqual(
      "[name].js"
    );
  });

  it("should not watch files if not in development mode", async () => {
    await runModule(moduleObject, {});
    expect(mockedChokidar.watch).not.toBeCalled();
  });

  it("should start watching files on development mode", async () => {
    moduleObject.options.dev = true;
    await runModule(moduleObject, {});
    expect(mockedChokidar.watch).toBeCalledWith([BASE_SOURCE], {
      followSymlinks: true,
      ignoreInitial: true,
      ignored: path.join(BASE_SOURCE, "node_modules/**/*"),
    });
    expect(mockedChokidar.watch).toBeCalledWith(["src"], {
      ignoreInitial: true,
    });
  });

  it("should invoke onThemeFilesChanged when theme files change", async () => {
    moduleObject.options.dev = true;
    const invocationList: any[] = [];
    const onMock = jest
      .fn()
      .mockImplementation((name, fn) => invocationList.push(fn));
    mockedChokidar.watch.mockReturnValueOnce({ on: onMock });
    await runModule(moduleObject, {});
    expect(onMock).toBeCalledWith("all", expect.any(Function));
    expect(invocationList.length).toEqual(1);
    invocationList[0]("add", "some/filepath.vue");
    expect(mockedTheme.onThemeFilesChanged).toBeCalledWith({
      BASE_SOURCE,
      PROJECT_SOURCE,
      TARGET_SOURCE,
      event: "add",
      filePath: "some/filepath.vue",
    });
  });
  it("should invoke onProjectFilesChanged when project files change", async () => {
    moduleObject.options.dev = true;
    const invocationList: any[] = [];
    const onMock = jest
      .fn()
      .mockImplementation((name, fn) => invocationList.push(fn));
    // first invocation is for onThemeFilesChanged
    mockedChokidar.watch.mockReturnValueOnce({
      on: () => {},
    });
    mockedChokidar.watch.mockReturnValueOnce({
      on: onMock,
    });
    await runModule(moduleObject, {});
    expect(onMock).toBeCalledWith("all", expect.any(Function));
    expect(invocationList.length).toEqual(1);
    invocationList[0]("add", "some/project/filepath.vue");
    expect(mockedTheme.onProjectFilesChanged).toBeCalledWith({
      BASE_SOURCE,
      PROJECT_SOURCE,
      TARGET_SOURCE,
      event: "add",
      filePath: "some/project/filepath.vue",
    });
  });
});
