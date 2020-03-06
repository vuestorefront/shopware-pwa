import { extendComponents } from "../src/components";
import * as files from "../src/files";
import { NuxtModuleOptions, WebpackConfig } from "../src/interfaces";

jest.mock("../src/files");
const mockedFiles = files as jest.Mocked<typeof files>;
const { getAllFiles } = mockedFiles;

describe("nuxt-module - extendComponents", () => {
  let webpackConfig: WebpackConfig = {
    resolve: {
      alias: {}
    }
  };
  let methods: Function[] = [];
  const moduleObject: NuxtModuleOptions = {
    options: {
      rootDir: __dirname
    },
    addLayout: jest.fn(),
    extendRoutes: jest.fn(),
    nuxt: jest.fn(),
    addPlugin: jest.fn(),
    extendBuild: (method: Function): number => methods.push(method)
  };
  /**
   * To resolve extendBuild we need to invoke resolveBuilds after method
   * invocation to test real impact on webpack configuration
   */
  const resolveBuilds = () => methods.forEach(method => method(webpackConfig));

  beforeEach(() => {
    jest.resetAllMocks();
    webpackConfig = {
      resolve: {
        alias: {}
      }
    };
    methods = [];
  });

  it("should not extend build if there is no theme components", () => {
    getAllFiles.mockImplementationOnce(() => []);
    extendComponents(moduleObject);
    expect(methods).toEqual([]);
  });

  it("should add aliases with components from project", () => {
    getAllFiles.mockImplementationOnce(() => [
      `${__dirname}/components/SomeComponent.vue`
    ]);
    extendComponents(moduleObject);
    resolveBuilds();
    expect(webpackConfig.resolve.alias).toEqual({
      [`@shopware-pwa/default-theme/components/SomeComponent`]: `${__dirname}/components/SomeComponent.vue`
    });
  });

  it("should override aliases with components from project", () => {
    webpackConfig.resolve.alias[
      `@shopware-pwa/default-theme/components/SomeComponent`
    ] = "some/custom/path";
    webpackConfig.resolve.alias[
      `@shopware-pwa/default-theme/components/AnotherComponent`
    ] = "other/path";
    getAllFiles.mockImplementationOnce(() => [
      `${__dirname}/components/SomeComponent.vue`
    ]);
    extendComponents(moduleObject);
    resolveBuilds();
    expect(webpackConfig.resolve.alias).toEqual({
      "@shopware-pwa/default-theme/components/AnotherComponent": "other/path",
      [`@shopware-pwa/default-theme/components/SomeComponent`]: `${__dirname}/components/SomeComponent.vue`
    });
  });
});
