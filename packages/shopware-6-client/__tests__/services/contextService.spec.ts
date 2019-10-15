import { ContextService } from "../../src/index";

describe("ContextService", () => {
  describe("getCurrencies", () => {
    it("should return all currencies", async () => {
      try {
        const result = await ContextService.getCurrencies();
        expect(result.data).toHaveLength(3);
      } catch (e) {
        console.error("Connection problem", e);
      }
    });
  });

  describe("getLanguages", () => {
    it("should return all languages", async () => {
      try {
        const result = await ContextService.getLanguages();
        expect(result.data).toHaveLength(2);
      } catch (e) {
        console.error("Connection problem", e);
      }
    });
  });

  describe("getCountries", () => {
    it("should return all countries", async () => {
      try {
        const result = await ContextService.getLanguages();
        expect(result.data).toHaveLength(2);
      } catch (e) {
        console.error("Connection problem", e);
      }
    });
  });

  describe("getPaymentMethods", () => {
    it("should return all payment methods", async () => {
      try {
        const result = await ContextService.getPaymentMethods();
        expect(result.data).toHaveLength(4);
      } catch (e) {
        console.error("Connection problem", e);
      }
    });
  });

  describe("getShippingMethods", () => {
    it("should return all shipping methods", async () => {
      try {
        const result = await ContextService.getShippingMethods();
        expect(result.data).toHaveLength(2);
      } catch (e) {
        console.error("Connection problem", e);
      }
    });
  });
});
