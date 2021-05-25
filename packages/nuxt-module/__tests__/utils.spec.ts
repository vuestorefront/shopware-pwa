import jetpack from "fs-jetpack";
import { invokeRebuild, loadConfig } from "../src/utils";
import * as cosmiconfigPackage from "cosmiconfig";
jest.mock("fs-jetpack");
jest.mock("cosmiconfig");
const mockedJetpack = jetpack as jest.Mocked<typeof jetpack>;
const mockedCosmiconfigPackage = cosmiconfigPackage as jest.Mocked<
  typeof cosmiconfigPackage
>;

describe("nuxt-module - utils", () => {
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
    extendBuild: jest.fn(),
    nuxt: jest.fn(),
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
          overwrite: true,
        }
      );
    });
  });

  describe("loadConfig", () => {
    it("should load config from module root directory", async () => {
      mockedCosmiconfigPackage.cosmiconfig.mockReturnValueOnce({
        search: () => ({
          config: {
            shopwareAccessToken: "qweqwe",
            shopwareEndpoint: "https://instance.com",
          },
        }),
      } as never);
      moduleObject.options.rootDir = `${__dirname}/files_tests`;
      const result = await loadConfig(moduleObject);
      expect(result).toEqual({
        shopwareAccessToken: "qweqwe",
        shopwareEndpoint: "https://instance.com",
        theme: "@shopware-pwa/default-theme",
        shopwareApiClient: {
          timeout: 10000,
        },
      });
    });

    it("should return default config object when no config found", async () => {
      mockedCosmiconfigPackage.cosmiconfig.mockReturnValueOnce({
        search: () => null,
      } as never);
      moduleObject.options.rootDir = `${__dirname}/files_tests`;
      const result = await loadConfig(moduleObject);
      expect(result).toBeTruthy();
      expect(result.shopwareEndpoint).toBeTruthy();
    });
  });
});
