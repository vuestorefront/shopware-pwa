import InterfacesDefault, {
  NuxtModuleOptions,
  WebpackConfig,
} from "../src/interfaces";
import { runModule } from "../src/module";
import path from "path";
import * as utils from "../src/utils";
import * as layouts from "../src/layouts";
import * as components from "../src/components";
import * as pages from "../src/pages";
jest.mock("../src/utils");
jest.mock("../src/layouts");
jest.mock("../src/components");
jest.mock("../src/pages");
const mockedUtils = utils as jest.Mocked<typeof utils>;
const consoleErrorSpy = jest.spyOn(console, "error");

describe("nuxt-module - ShopwarePWAModule runModule", () => {
  let webpackConfig: WebpackConfig = {
    resolve: {
      alias: {},
    },
  };
  let methods: Function[] = [];
  const moduleObject: NuxtModuleOptions = {
    options: {
      rootDir: __dirname,
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
    methods.forEach((method) => method(webpackConfig));

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
    };
    methods = [];

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
        shopwareEndpoint: "mockedEndpoint/sales-channel-api/v1",
      },
      src: pathForApiClientPlugin,
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

  it("interfaces should return default empty object", () => {
    expect(InterfacesDefault).toEqual({});
  });
});
