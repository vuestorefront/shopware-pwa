import { useDefaults } from "../src/logic/useDefaults";
import { getDefaultApiParams } from "../src/getDefaultApiParams";
import { prepareRootContextMock } from "./contextRunner";
const consoleWarnSpy = jest.spyOn(console, "warn");

import * as Composables from "@shopware-pwa/composables";
jest.mock("@shopware-pwa/composables");
const mockedComposables = Composables as jest.Mocked<typeof Composables>;

describe("Composables - useDefaults", () => {
  const rootContextMock = prepareRootContextMock();
  beforeEach(() => {
    jest.resetAllMocks();
    rootContextMock.shopwareDefaults = getDefaultApiParams();
    consoleWarnSpy.mockImplementation(() => {});

    mockedComposables.useVueContext.mockReturnValue({
      isVueComponent: false,
      isVueScope: true,
    });
    mockedComposables.getApplicationContext.mockReturnValue(rootContextMock);
  });
  describe("validation", () => {
    it("should throw an error when shopwareDefaults are not set", async () => {
      rootContextMock.shopwareDefaults = undefined;
      expect(() => useDefaults({ defaultsKey: "anyKey" })).toThrow(
        "[composables][useDefaults]: applicationContext does not have shopwareDefaults!"
      );
    });

    it("should show a warning when accessing not existing key", async () => {
      const { getAssociationsConfig } = useDefaults({
        defaultsKey: "somethingNotExisting",
      });
      getAssociationsConfig();
      expect(consoleWarnSpy).toBeCalledWith(
        "[WARNING][@shopware-pwa/composables][useDefaults]: there is no defaults configuration for key: somethingNotExisting"
      );
    });

    it("should return an empty object for includes when there is no config", async () => {
      const { getIncludesConfig } = useDefaults({
        defaultsKey: "somethingNotExisting",
      });
      expect(getIncludesConfig()).toEqual({});
    });

    it("should return an empty object for associations when there is no config", async () => {
      const { getAssociationsConfig } = useDefaults({
        defaultsKey: "somethingNotExisting",
      });
      expect(getAssociationsConfig()).toEqual({});
    });
  });
  describe("CMS", () => {
    it("should correctly get the cms includes", async () => {
      const { getIncludesConfig } = useDefaults({ defaultsKey: "useCms" });
      expect(getIncludesConfig()).toStrictEqual(
        getDefaultApiParams()?.["useCms"]?.includes
      );
    });
    it("should correctly get the cms associations", async () => {
      const { getAssociationsConfig } = useDefaults({ defaultsKey: "useCms" });
      expect(getAssociationsConfig()).toStrictEqual(
        getDefaultApiParams()?.["useCms"]?.associations
      );
    });
  });
  describe("PRODUCT", () => {
    it("should correctly get the product details includes", async () => {
      const { getIncludesConfig } = useDefaults({ defaultsKey: "useProduct" });
      expect(getIncludesConfig()).toStrictEqual(
        getDefaultApiParams()?.["useProduct"]?.includes
      );
    });
    it("should correctly get the product details associations", async () => {
      const { getAssociationsConfig } = useDefaults({
        defaultsKey: "useProduct",
      });
      expect(getAssociationsConfig()).toStrictEqual(
        getDefaultApiParams()?.["useProduct"]?.associations
      );
    });
  });
  describe("PRODUCT_LISTING", () => {
    it("should correctly get the product listing includes", async () => {
      const { getIncludesConfig } = useDefaults({
        defaultsKey: "useProductListing",
      });
      expect(getIncludesConfig()).toStrictEqual(
        getDefaultApiParams()?.["useProductListing"]?.includes
      );
    });
    it("should correctly get the product listing associations", async () => {
      const { getAssociationsConfig } = useDefaults({
        defaultsKey: "useProductListing",
      });
      expect(getAssociationsConfig()).toStrictEqual(
        getDefaultApiParams()?.["useProductListing"]?.associations || {}
      );
    });
  });

  describe("getDefaults", () => {
    it("should return defaults for productListing", () => {
      const { getDefaults } = useDefaults({ defaultsKey: "useProductListing" });
      expect(getDefaults()).toEqual(
        getDefaultApiParams()?.["useProductListing"]
      );
    });

    it("should return empty object for unknown defaults", () => {
      const { getDefaults } = useDefaults({ defaultsKey: "someUnknownKey" });
      expect(getDefaults()).toEqual({});
    });

    it("should warn when accessing for non existing defaults", () => {
      const { getDefaults } = useDefaults({ defaultsKey: "someUnknownKey" });
      expect(getDefaults()).toEqual({});
      expect(consoleWarnSpy).toBeCalledWith(
        "[WARNING][@shopware-pwa/composables][useDefaults]: there is no defaults configuration for key: someUnknownKey"
      );
    });
  });
});
