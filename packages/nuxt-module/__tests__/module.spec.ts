import InterfacesDefault from "../src/interfaces";
import { runModule } from "../src/module";
import path from "path";
import * as utils from "../src/utils";
import * as cms from "../src/cms";
import * as locales from "../src/locales";
import * as packages from "../src/packages";
import * as theme from "../src/theme";
import chokidar from "chokidar";
import fse from "fs-extra";
import { ShopwarePwaConfigFile } from "@shopware-pwa/commons";
import * as files from "@shopware-pwa/commons/node";
jest.mock("../src/utils");
jest.mock("../src/cms");
jest.mock("../src/locales");
jest.mock("../src/packages");
jest.mock("../src/theme");
jest.mock("chokidar");
jest.mock("fs-extra");
jest.mock("@shopware-pwa/commons/node");
const mockedUtils = utils as jest.Mocked<typeof utils>;
const mockedTheme = theme as jest.Mocked<typeof theme>;
const mockedFiles = files as jest.Mocked<typeof files>;
const consoleErrorSpy = jest.spyOn(console, "error");
const consoleInfoSpy = jest.spyOn(console, "info");
const mockedChokidar = chokidar as jest.Mocked<typeof chokidar>;
const mockedFse = fse as jest.Mocked<typeof fse>;

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
      features: {
        store: null,
      },
    },
    addLayout: jest.fn(),
    extendRoutes: jest.fn(),
    addPlugin: jest.fn(),
    nuxt: {
      hook: jest.fn(),
      resolver: {
        resolveModule: jest.fn(),
      },
    },
    extendBuild: (method: Function): number => methods.push(method),
  };
  let THEME_SOURCE = path.join("node_modules", "theme-name");
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
      theme: "theme-name",
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
    consoleInfoSpy.mockImplementationOnce(() => {});
    mockedTheme.getThemeSourcePath.mockReturnValue(THEME_SOURCE);
    mockedTheme.getTargetSourcePath.mockReturnValue(TARGET_SOURCE);
    mockedTheme.getProjectSourcePath.mockReturnValue(PROJECT_SOURCE);
    mockedChokidar.watch.mockReturnValue({ on: () => {} });
    mockedFiles.getAllFiles.mockReturnValue([]);
  });

  it("should invoke config load", async () => {
    await runModule(moduleObject, {});
    expect(mockedUtils.loadConfig).toBeCalledWith(moduleObject);
  });

  it("should display a meesage when default config cannot be fetched", async () => {
    await runModule(moduleObject, {});
    expect(consoleErrorSpy).toBeCalledWith(
      "Cannot resolve API defaults config",
      expect.anything()
    );
  });

  it("should invoke useThemeAndProjectFiles", async () => {
    await runModule(moduleObject, {});
    expect(mockedTheme.useThemeAndProjectFiles).toBeCalledWith({
      THEME_SOURCE,
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
        apiDefaults: expect.anything(),
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
    mockedUtils.loadConfig.mockResolvedValueOnce({} as ShopwarePwaConfigFile);
    await runModule(moduleObject, {});
    expect(consoleErrorSpy).toBeCalledWith(
      "shopwareAccessToken in shopware-pwa.config.js is missing"
    );
    expect(consoleErrorSpy).toBeCalledWith(
      "shopwareEndpoint in shopware-pwa.config.js is missing"
    );
  });

  it("should show info which theme is used from config", async () => {
    mockedUtils.loadConfig.mockResolvedValueOnce({
      theme: "my-theme-name",
    } as ShopwarePwaConfigFile);
    await runModule(moduleObject, {});
    expect(consoleInfoSpy).toBeCalledWith("Using theme: my-theme-name");
  });

  it("should have extra API client related config", async () => {
    mockedUtils.loadConfig.mockResolvedValueOnce({
      shopwareEndpoint:
        "https://shopware-pwa.storefrontcloud.io/sales-channel-api/v1",
      shopwareAccessToken: "mockedToken",
      theme: "@shopware-pwa/default-theme",
      shopwareApiClient: {
        timeout: 5,
      },
    });
    const pathForApiClientPlugin = path.join(
      __dirname,
      "..",
      "plugins",
      "api-client.js"
    );
    await runModule(moduleObject, {});
    expect(moduleObject.addPlugin).toBeCalledWith({
      fileName: "api-client.js",
      options: {
        shopwareAccessToken: "mockedToken",
        shopwareEndpoint:
          "https://shopware-pwa.storefrontcloud.io/sales-channel-api/v1",
        shopwareApiClient: {
          timeout: 5,
        },
        apiDefaults: expect.anything(),
      },
      src: pathForApiClientPlugin,
    });
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
    expect(cms.extendCMS).toBeCalledWith(moduleObject, {
      shopwareAccessToken: "mockedToken",
      shopwareEndpoint: "mockedEndpoint",
      theme: THEME_SOURCE,
    });
  });

  it("should invoke extendLocales", async () => {
    await runModule(moduleObject, {});
    expect(locales.extendLocales).toBeCalledWith(moduleObject, {
      shopwareAccessToken: "mockedToken",
      shopwareEndpoint: "mockedEndpoint",
      theme: THEME_SOURCE,
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
    expect(mockedChokidar.watch).toBeCalledWith([THEME_SOURCE], {
      followSymlinks: true,
      ignoreInitial: true,
      ignored: path.join(THEME_SOURCE, "node_modules/**/*"),
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
    mockedChokidar.watch.mockReturnValueOnce({ on: onMock } as any);
    await runModule(moduleObject, {});
    expect(onMock).toBeCalledWith("all", expect.any(Function));
    expect(invocationList.length).toEqual(1);
    invocationList[0]("add", "some/filepath.vue");
    expect(mockedTheme.onThemeFilesChanged).toBeCalledWith({
      THEME_SOURCE,
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
    } as any);
    mockedChokidar.watch.mockReturnValueOnce({
      on: onMock,
    } as any);
    await runModule(moduleObject, {});
    expect(onMock).toBeCalledWith("all", expect.any(Function));
    expect(invocationList.length).toEqual(1);
    invocationList[0]("add", "some/project/filepath.vue");
    expect(mockedTheme.onProjectFilesChanged).toBeCalledWith({
      THEME_SOURCE,
      PROJECT_SOURCE,
      TARGET_SOURCE,
      event: "add",
      filePath: "some/project/filepath.vue",
    });
  });

  it("should copy target static directory to project root directory after production build", async () => {
    moduleObject.options.dev = false;
    const afterBuildMethods: any[] = [];
    moduleObject.nuxt.hook.mockImplementation(
      (hookName: string, method: Function) => {
        hookName === "build:done" && afterBuildMethods.push(method);
      }
    );
    await runModule(moduleObject, {});
    expect(moduleObject.nuxt.hook).toBeCalledWith(
      "build:done",
      expect.any(Function)
    );
    expect(afterBuildMethods.length).toEqual(1);
    await afterBuildMethods[0](moduleObject);
    const fromPath = path.join(TARGET_SOURCE, "static");
    const toPath = path.join(moduleObject.options.rootDir, "static");
    expect(mockedFse.copy).toBeCalledWith(fromPath, toPath);
    expect(consoleInfoSpy).toBeCalledWith(
      "Moved static files to root directory static folder. Make sure your static files are placed inside `src/static` directory."
    );
  });

  it("should add plugins registered in theme - js files only", async () => {
    mockedFiles.getAllFiles.mockReturnValueOnce([
      "/file/path/plugins/notifications.js",
      "/file/path/plugins/README.md",
      "/file/path/plugins/custom-plugin.ts",
    ]);
    await runModule(moduleObject, {});
    expect(moduleObject.addPlugin).toHaveBeenCalledWith({
      src: "/file/path/plugins/notifications.js",
      fileName: "notifications.js",
      options: expect.anything(),
    });
    expect(moduleObject.addPlugin).toHaveBeenCalledWith({
      src: "/file/path/plugins/custom-plugin.ts",
      fileName: "custom-plugin.ts",
      options: expect.anything(),
    });
    expect(moduleObject.addPlugin).not.toHaveBeenCalledWith({
      src: "/file/path/plugins/README.md",
      fileName: "README.md",
      options: expect.anything(),
    });
  });
});
