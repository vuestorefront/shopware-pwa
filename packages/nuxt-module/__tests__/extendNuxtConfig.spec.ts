import extendNuxtConfig from "../src/extendNuxtConfig";

describe("nuxt-module - extendNuxtConfig", () => {
  it("should return default config keys", () => {
    const result = extendNuxtConfig({});
    expect(Object.keys(result)).toMatchSnapshot();
  });

  it("should overwrite server port", () => {
    const result = extendNuxtConfig({
      server: {
        port: 2000,
      },
    });
    expect(result.server?.port).toEqual(2000);
  });

  it("should add new build module", () => {
    const result = extendNuxtConfig({
      buildModules: ["some-new-module"],
    });
    expect(result.buildModules).toEqual([
      "@nuxt/typescript-build",
      "@shopware-pwa/nuxt-module",
      "some-new-module",
    ]);
  });

  describe("env properties", () => {
    const ORIGINAL_ENV = process.env;

    beforeEach(() => {
      jest.resetModules(); // clears the cache
      process.env = { ...ORIGINAL_ENV };
    });

    afterAll(() => {
      process.env = ORIGINAL_ENV;
    });

    it("should have default env values", () => {
      process.env.NODE_ENV = undefined;

      const extendNuxtConfig = require("../src/extendNuxtConfig").default;
      const result = extendNuxtConfig({});

      expect(result.env?.CHOKIDAR_USEPOLLING).toEqual("1");
      expect(result.env?.EXPERIMENTAL_IMAGE_PROCESSING_SERVER).toEqual("");
      expect(result.env?.NODE_ENV).toEqual("");
      expect(result.env?.ENABLE_DEVTOOLS).toEqual("");
    });

    it("should pass env properties to config", () => {
      process.env.NODE_ENV = "production";
      process.env.EXPERIMENTAL_IMAGE_PROCESSING_SERVER = "https://example.com";
      process.env.ENABLE_DEVTOOLS = "true";

      const extendNuxtConfig = require("../src/extendNuxtConfig").default;
      const result = extendNuxtConfig({});

      expect(result.env?.CHOKIDAR_USEPOLLING).toEqual("0");
      expect(result.env?.EXPERIMENTAL_IMAGE_PROCESSING_SERVER).toEqual(
        "https://example.com"
      );
      expect(result.env?.NODE_ENV).toEqual("production");
      expect(result.env?.ENABLE_DEVTOOLS).toEqual("true");
    });
  });
});
