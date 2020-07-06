import { EntityType } from "@shopware-pwa/commons/interfaces/internal/EntityType";
import { useDefaults } from "@shopware-pwa/composables";
import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
import { getAssociationsForEntity } from "../src/internalHelpers/associationsParameter";
import { getIncludesForEntity } from "../src/internalHelpers/includesParameter";
Vue.use(VueCompositionApi);
describe("Composables - useDefaults", () => {
  describe("validation", () => {
    it("should return undefined when the entity type is not set", async () => {
      const { getIncludesConfig, getAssociationsConfig } = useDefaults(
        undefined as any
      );
      expect(getIncludesConfig()).toBeUndefined();
      expect(getAssociationsConfig()).toBeUndefined();
    });
  });
  describe("CMS", () => {
    it("should correctly get the cms includes", async () => {
      const { getIncludesConfig } = useDefaults(EntityType.CMS);
      expect(getIncludesConfig()).toStrictEqual(
        getIncludesForEntity(EntityType.CMS)
      );
    });
    it("should correctly get the cms associations", async () => {
      const { getAssociationsConfig } = useDefaults(EntityType.CMS);
      expect(getAssociationsConfig()).toStrictEqual(
        getAssociationsForEntity(EntityType.CMS)
      );
    });
  });
  describe("PRODUCT", () => {
    it("should correctly get the product details includes", async () => {
      const { getIncludesConfig } = useDefaults(EntityType.PRODUCT);
      expect(getIncludesConfig()).toStrictEqual(
        getIncludesForEntity(EntityType.PRODUCT)
      );
    });
    it("should correctly get the product details associations", async () => {
      const { getAssociationsConfig } = useDefaults(EntityType.PRODUCT);
      expect(getAssociationsConfig()).toStrictEqual(
        getAssociationsForEntity(EntityType.PRODUCT)
      );
    });
  });
  describe("PRODUCT_LISTING", () => {
    it("should correctly get the product listing includes", async () => {
      const { getIncludesConfig } = useDefaults(EntityType.PRODUCT_LISTING);
      expect(getIncludesConfig()).toStrictEqual(
        getIncludesForEntity(EntityType.PRODUCT_LISTING)
      );
    });
    it("should correctly get the product listing associations", async () => {
      const { getAssociationsConfig } = useDefaults(EntityType.PRODUCT_LISTING);
      expect(getAssociationsConfig()).toStrictEqual(
        getAssociationsForEntity(EntityType.PRODUCT_LISTING)
      );
    });
  });
});
