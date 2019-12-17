import { getProductsIds } from "@shopware-pwa/shopware-6-client";

describe("shopware-6-client - E2E - ProductService - getProductsIds", () => {
  it("should fetch product ids", async () => {
    const result = await getProductsIds();
    expect(result).toMatchSnapshot();
  });
});
