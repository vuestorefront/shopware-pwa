import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
import { getAssociationsForEntity } from "../src/internalHelpers/associationsParameter";
import { getIncludesForEntity } from "../src/internalHelpers/includesParameter";
import { useDefaults } from "../src/logic/useDefaults";

Vue.use(VueCompositionApi);
describe("Composables - useDefaults", () => {
  describe("validation", () => {
    it("should return undefined when the entity type is not set", async () => {
      try {
        useDefaults(undefined as any);
      } catch (e) {
        expect(e.message).toEqual("useDefaults: key has not been provided.");
      }
    });
  });
  describe("CMS", () => {
    it("should correctly get the cms includes", async () => {
      const { getIncludesConfig } = useDefaults("useCms");
      expect(getIncludesConfig.value).toStrictEqual(
        getIncludesForEntity("useCms")
      );
    });
    it("should correctly get the cms associations", async () => {
      const { getAssociationsConfig } = useDefaults("useCms");
      expect(getAssociationsConfig.value).toStrictEqual(
        getAssociationsForEntity("useCms")
      );
    });
  });
  describe("PRODUCT", () => {
    it("should correctly get the product details includes", async () => {
      const { getIncludesConfig } = useDefaults("useProduct");
      expect(getIncludesConfig.value).toStrictEqual(
        getIncludesForEntity("useProduct")
      );
    });
    it("should correctly get the product details associations", async () => {
      const { getAssociationsConfig } = useDefaults("useProduct");
      expect(getAssociationsConfig.value).toStrictEqual(
        getAssociationsForEntity("useProduct")
      );
    });
  });
  describe("PRODUCT_LISTING", () => {
    it("should correctly get the product listing includes", async () => {
      const { getIncludesConfig } = useDefaults("useProductListing");
      expect(getIncludesConfig.value).toStrictEqual(
        getIncludesForEntity("useProductListing")
      );
    });
    it("should correctly get the product listing associations", async () => {
      const { getAssociationsConfig } = useDefaults("useProductListing");
      expect(getAssociationsConfig.value).toStrictEqual(
        getAssociationsForEntity("useProductListing")
      );
    });
  });
});
