import { getProduct } from "@shopware-pwa/shopware-6-client";

describe("shopware-6-client - E2E - ProductService - getProduct", () => {
  it("should fetch real product", async () => {
    const result = await getProduct("044a190a54ab4f06803909c3ee8063ef");
    expect(result).toMatchSnapshot();
  });

  it("should return error on not existing product", async () => {
    try {
      await getProduct("proooduct");
      expect("didn't throw an error").toEqual("should throw an error");
    } catch (e) {
      expect(e).toMatchSnapshot();
    }
  });
});
