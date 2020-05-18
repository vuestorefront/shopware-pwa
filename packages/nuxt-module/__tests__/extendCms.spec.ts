import { extendCMS } from "../src/cms";
import { NuxtModuleOptions, WebpackConfig } from "../src/interfaces";
import jetpack from "fs-jetpack";
import path from "path";

jest.mock("fs-jetpack");
const mockedJetpack = jetpack as jest.Mocked<typeof jetpack>;

describe("nuxt-module - extendCMS", () => {
  let webpackConfig: WebpackConfig = {
    resolve: {
      alias: {},
    },
  };
  let methods: Function[] = [];
  const moduleObject: NuxtModuleOptions = {
    options: {
      rootDir: __dirname,
      router: {
        middleware: [],
      },
    },
    addLayout: jest.fn(),
    extendRoutes: jest.fn(),
    nuxt: jest.fn(),
    addPlugin: jest.fn(),
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
    webpackConfig = {
      resolve: {
        alias: {},
      },
    };
    methods = [];
    mockedJetpack.exists.mockReturnValue("file");
  });

  it("should throw an exception when cmsNameMapper.js is not created", () => {
    mockedJetpack.exists.mockReturnValueOnce(false);
    expect(() => extendCMS(moduleObject)).toThrow(
      "[shopware-pwa] CMS module is not initialized properly, please run 'shopware-pwa init'"
    );
  });

  it("should add global alias for sw-cms", () => {
    mockedJetpack.list.mockReturnValueOnce([]);
    extendCMS(moduleObject);
    resolveBuilds();
    expect(webpackConfig.resolve.alias).toEqual({
      [`sw-cms`]: path.join(__dirname, ".shopware-pwa", "sw-cms"),
    });
  });

  it("should add global alias for sw-cms if there are no cms files found", () => {
    mockedJetpack.list.mockReturnValueOnce(undefined);
    extendCMS(moduleObject);
    resolveBuilds();
    expect(webpackConfig.resolve.alias).toEqual({
      [`sw-cms`]: path.join(__dirname, ".shopware-pwa", "sw-cms"),
    });
  });

  it("should add aliases with components from top level of CMS theme folder", () => {
    mockedJetpack.list.mockReturnValueOnce([
      "SomeComponent.vue",
      "otherFile.txt",
    ]);

    extendCMS(moduleObject);
    resolveBuilds();
    expect(webpackConfig.resolve.alias["sw-cms/SomeComponent"]).toContain(
      path.join(
        __dirname,
        "node_modules",
        "@shopware-pwa",
        "default-theme",
        "cms",
        "SomeComponent.vue"
      )
    );
  });
});
