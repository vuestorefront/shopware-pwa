import { extendLocales } from "../src/locales";
import { NuxtModuleOptions, ShopwarePwaConfigFile } from "../src/interfaces";
import jetpack from "fs-jetpack";
import path from "path";

jest.mock("fs-jetpack");
const mockedJetpack = jetpack as jest.Mocked<typeof jetpack>;

describe("nuxt-module - extendLocales", () => {
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

  const mockedConfig: ShopwarePwaConfigFile = {
    shopwareEndpoint: "mockedEndpoint",
    shopwareAccessToken: "mockedToken",
  };

  beforeEach(() => {
    jest.resetAllMocks();
    moduleObject.options.router.middleware = [];
    methods = [];
    mockedJetpack.exists.mockReturnValue("file");
  });

  it("should throw an exception when languages.json is not created", () => {
    mockedJetpack.exists.mockReturnValueOnce(false);
    expect(() => extendLocales(moduleObject, mockedConfig)).toThrow(
      "[shopware-pwa] Languages config is not initialized properly, please run 'shopware-pwa init'"
    );
  });

  it("should throw an exception when there is no language file for default language", () => {
    mockedJetpack.exists.mockReturnValueOnce("file");
    mockedJetpack.exists.mockReturnValueOnce(false);
    expect(() => extendLocales(moduleObject, mockedConfig)).toThrow(
      "[shopware-pwa] There is no default language file for en-GB code, please add translation file to locales folder."
    );
  });

  it("should throw an exception when there is no language file for custom language", () => {
    const conf = { ...mockedConfig, defaultLanguageCode: "de-DE" };
    mockedJetpack.exists.mockReturnValueOnce("file");
    mockedJetpack.exists.mockReturnValueOnce(false);
    expect(() => extendLocales(moduleObject, conf)).toThrow(
      "[shopware-pwa] There is no default language file for de-DE code, please add translation file to locales folder."
    );
  });

  it("should add i18n plugin with empty locales and default en-GB locale", () => {
    extendLocales(moduleObject, null as any);
    expect(moduleObject.addPlugin).toBeCalled();
    const pluginPath = path.join(__dirname, "..", "plugins", "i18n.js");
    expect(moduleObject.addPlugin).toBeCalledWith({
      fileName: "i18n.js",
      options: {
        defaultLanguage: "en-GB",
        availableLocales: [],
      },
      src: pluginPath,
    });
  });

  it("should add i18n plugin with empty locales", () => {
    extendLocales(moduleObject, mockedConfig);
    expect(moduleObject.addPlugin).toBeCalled();
    const pluginPath = path.join(__dirname, "..", "plugins", "i18n.js");
    expect(moduleObject.addPlugin).toBeCalledWith({
      fileName: "i18n.js",
      options: {
        defaultLanguage: "en-GB",
        availableLocales: [],
      },
      src: pluginPath,
    });
  });

  it("should add i18n plugin with locales from list", () => {
    mockedJetpack.list.mockReturnValueOnce(["en-GB.json", "de-DE.json"]);
    extendLocales(moduleObject, mockedConfig);
    expect(moduleObject.addPlugin).toBeCalled();
    const pluginPath = path.join(__dirname, "..", "plugins", "i18n.js");
    expect(moduleObject.addPlugin).toBeCalledWith({
      fileName: "i18n.js",
      options: {
        defaultLanguage: "en-GB",
        availableLocales: ["en-GB", "de-DE"],
      },
      src: pluginPath,
    });
  });

  it("should add middleware to module", () => {
    extendLocales(moduleObject, mockedConfig);
    expect(moduleObject.options.router.middleware).toEqual(["i18n"]);
  });
});
