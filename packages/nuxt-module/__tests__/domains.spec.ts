import { setupDomains } from "../src/domains";
import jetpack from "fs-jetpack";
import { ShopwarePwaConfigFile } from "@shopware-pwa/commons";

jest.mock("fs-jetpack");
const mockedJetpack = jetpack as jest.Mocked<typeof jetpack>;

describe("nuxt-module - setupDomains", () => {
  let methods: Function[] = [];
  const hook = jest.fn();
  const moduleObject: any = {
    options: {
      rootDir: __dirname,
      router: {
        middleware: [],
      },
    },
    addLayout: jest.fn(),
    extendRoutes: jest.fn(),
    nuxt: {
      hook,
    },
    addPlugin: jest.fn(),
    extendBuild: (method: Function): number => methods.push(method),
  };

  const mockedConfig: ShopwarePwaConfigFile = {
    shopwareEndpoint: "mockedEndpoint",
    shopwareAccessToken: "mockedToken",
    theme: "some-theme",
  };

  beforeEach(() => {
    jest.resetAllMocks();
    moduleObject.options.router.middleware = [];
    methods = [];
    mockedJetpack.exists.mockReturnValue("file");
  });

  it("should throw an exception when domains.json is empty", async () => {
    mockedJetpack.readAsync.mockResolvedValueOnce(null);
    expect(
      async () => await setupDomains(moduleObject, mockedConfig)
    ).rejects.toThrow(
      "[shopware-pwa] Domains config is not initialized properly, please run 'shopware-pwa init'"
    );
  });

  it("should add middleware to module", async () => {
    mockedJetpack.readAsync.mockResolvedValue(`
    {
      "/": {
        "url": "/",
        "domainId": "7e3183812b7543928a71734f24682f39",
        "currencyId": "b7d2554b0ce847cd82f3ac9bd1c0dfca",
        "snippetSetId": "4d820a16d1f544d4a89cd500be736c58",
        "languageId": "2fbb5fe2e29a4d70aa5854ce7ce3e20b",
        "languageName": "English",
        "languageLocaleCode": "en-GB"
      }
    }
    `);
    await setupDomains(moduleObject, mockedConfig);
    expect(moduleObject.options.router.middleware).toEqual(["routing"]);
  });

  it("should trigger 'build:extendRoutes' hook", async () => {
    mockedJetpack.readAsync.mockResolvedValue(`
    {
      "/": {
        "url": "/",
        "domainId": "7e3183812b7543928a71734f24682f39",
        "currencyId": "b7d2554b0ce847cd82f3ac9bd1c0dfca",
        "snippetSetId": "4d820a16d1f544d4a89cd500be736c58",
        "languageId": "2fbb5fe2e29a4d70aa5854ce7ce3e20b",
        "languageName": "English",
        "languageLocaleCode": "en-GB"
      }
    }
    `);
    await setupDomains(moduleObject, mockedConfig);
    expect(moduleObject.nuxt.hook).toBeCalledTimes(1);
  });
});
