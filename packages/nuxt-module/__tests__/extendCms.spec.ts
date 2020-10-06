import { extendCMS } from "../src/cms";
import jetpack from "fs-jetpack";
import path from "path";
import { ShopwarePwaConfigFile } from "../src/interfaces";

jest.mock("fs-jetpack");
const mockedJetpack = jetpack as jest.Mocked<typeof jetpack>;

describe("nuxt-module - extendCMS", () => {
  let webpackConfig: any = {
    resolve: {
      alias: {},
    },
  };
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
    nuxt: jest.fn(),
    addPlugin: jest.fn(),
    extendBuild: (method: Function): number => methods.push(method),
  };
  const mockedConfig: ShopwarePwaConfigFile = {
    shopwareAccessToken: "qwe",
    shopwareEndpoint: "http://localhost:3000/",
    theme: "mocked-theme",
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
    expect(() => extendCMS(moduleObject, mockedConfig)).toThrow(
      "[shopware-pwa] CMS module is not initialized properly, please run 'shopware-pwa init'"
    );
  });

  it("should add global alias for sw-cms", () => {
    mockedJetpack.list.mockReturnValueOnce([]);
    extendCMS(moduleObject, mockedConfig);
    resolveBuilds();
    expect(webpackConfig.resolve.alias).toEqual({
      [`sw-cms`]: path.join(__dirname, ".shopware-pwa", "sw-cms"),
    });
  });

  it("should add global alias for sw-cms if there are no cms files found", () => {
    mockedJetpack.list.mockReturnValueOnce(undefined);
    extendCMS(moduleObject, mockedConfig);
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

    extendCMS(moduleObject, mockedConfig);
    resolveBuilds();
    expect(webpackConfig.resolve.alias["sw-cms/SomeComponent"]).toContain(
      path.join("mocked-theme", "cms", "SomeComponent.vue")
    );
  });
});
