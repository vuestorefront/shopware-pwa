import { getProducts } from "@shopware-pwa/shopware-6-client";
import { deepChangeProperties } from "../helpers";

describe("shopware-6-client - E2E - ProductService - getProducts", () => {
  it("should fetch default amount of products", async () => {
    const result = await getProducts();
    deepChangeProperties(result, [
      "listingPrices",
      "categoryTree",
      "cover",
      "childCount",
    ]);
    expect(result).toMatchSnapshot();
  });

  it("should fetch products with limit", async () => {
    const pagination = {
      page: 1,
      limit: 5,
    };
    const result = await getProducts({ pagination });
    deepChangeProperties(result, [
      "listingPrices",
      "categoryTree",
      "cover",
      "childCount",
    ]);
    expect(result).toMatchSnapshot();
  });

  it("should fetch products with limit and sorting", async () => {
    const pagination = {
      page: 1,
      limit: 5,
    };
    const sort = {
      field: `name`,
      desc: true,
    };
    const result = await getProducts({ pagination, sort });
    deepChangeProperties(result, [
      "listingPrices",
      "categoryTree",
      "cover",
      "childCount",
    ]);
    expect(result).toMatchSnapshot();
  });
});
