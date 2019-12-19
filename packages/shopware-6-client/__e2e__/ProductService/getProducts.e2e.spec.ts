import { getProducts } from "@shopware-pwa/shopware-6-client";
import { PaginationLimit } from "../../src/interfaces/search/Pagination";

describe("shopware-6-client - E2E - ProductService - getProducts", () => {
  it("should fetch default amount of products", async () => {
    const result = await getProducts();
    expect(result).toMatchSnapshot();
  });

  it("should fetch products with limit", async () => {
    const pagination = {
      page: 1,
      limit: PaginationLimit.FIVE
    };
    const result = await getProducts({ pagination });
    expect(result).toMatchSnapshot();
  });

  it("should fetch products with limit and sorting", async () => {
    const pagination = {
      page: 1,
      limit: PaginationLimit.FIVE
    };
    const sort = {
      field: `name`,
      desc: true
    };
    const result = await getProducts({ pagination, sort });
    expect(result).toMatchSnapshot();
  });
});
