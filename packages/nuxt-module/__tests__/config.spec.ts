import { extendNuxtConfig } from "../src/index";

describe("nuxt-module - extendNuxtConfig", () => {
  it("should return default config", () => {
    const result = extendNuxtConfig({});
    expect(result).toMatchSnapshot();
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

    it("should pass env properties to config", () => {
      process.env.NODE_ENV = "production";
      process.env.EXPERIMENTAL_IMAGE_PROCESSING_SERVER = "https://example.com";

      const { extendNuxtConfig } = require("../src/index");
      const result = extendNuxtConfig({});

      expect(result.env?.CHOKIDAR_USEPOLLING).toEqual("0");
      expect(result.env?.EXPERIMENTAL_IMAGE_PROCESSING_SERVER).toEqual(
        "https://example.com"
      );
    });
  });
});
