import jetpack from "fs-jetpack";
import { invokeRebuild, loadConfig } from "../src/utils";
import { NuxtModuleOptions } from "../src/interfaces";
jest.mock("fs-jetpack");
const mockedJetpack = jetpack as jest.Mocked<typeof jetpack>;

describe("nuxt-module - utils", () => {
  const moduleObject: NuxtModuleOptions = {
    options: {
      rootDir: __dirname
    },
    addLayout: jest.fn(),
    extendRoutes: jest.fn(),
    addPlugin: jest.fn(),
    extendBuild: jest.fn(),
    nuxt: jest.fn()
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("invokeRebuild", () => {
    it("should touch nuxt config file to invoke rebuild", () => {
      mockedJetpack.copy.mockReturnValueOnce();
      invokeRebuild(moduleObject);
      expect(mockedJetpack.copy).toBeCalledWith(
        `${__dirname}/nuxt.config.js`,
        `${__dirname}/nuxt.config.js`,
        {
          overwrite: true
        }
      );
    });
  });

  describe("loadConfig", () => {
    it("should load config from module root directory", () => {
      moduleObject.options.rootDir = `${__dirname}/files_tests`;
      const result = loadConfig(moduleObject);
      expect(result).toEqual({
        shopwareAccessToken: "qweqwe",
        shopwareEndpoint: "https://instance.com"
      });
    });
  });
});
