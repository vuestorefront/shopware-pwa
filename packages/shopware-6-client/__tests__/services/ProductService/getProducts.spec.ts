import { getProducts } from "@shopware-pwa/shopware-6-client";
import { defaultInstance } from "../../../src/apiService";
import { Sort } from "@shopware-pwa/commons/interfaces/search/SearchCriteria";
import { PaginationLimit } from "@shopware-pwa/commons/interfaces/search/Pagination";

jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;
describe("ProductService - getProducts", () => {
  const mockedPost = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockedApiInstance.invoke = {
      post: mockedPost,
    } as any;
  });
  it("should return array of products (default amount of 10)", async () => {
    mockedPost.mockResolvedValueOnce({
      data: { total: 3, data: [1, 2, 3] },
    });

    const result = await getProducts();
    expect(result.total).toEqual(3);
    expect(result.data).toHaveLength(result.total);
    expect(mockedPost).toBeCalledTimes(1);
  });
  it("should invoke api with limit", async () => {
    mockedPost.mockResolvedValueOnce({
      data: { total: 3, data: [1, 2, 3] },
    });
    const pagination = {
      page: 1,
      limit: 5,
    };
    await getProducts({ pagination });
    expect(mockedPost).toBeCalledTimes(1);
    expect(mockedPost).toBeCalledWith("/sales-channel-api/v1/product", {
      limit: 5,
      page: 1,
    });
  });
  it("should invoke api with limit and sort", async () => {
    mockedPost.mockResolvedValueOnce({
      data: { total: 3, data: [1, 2, 3] },
    });
    const pagination = {
      page: 1,
      limit: PaginationLimit.SEVENTY_FIVE,
    };
    const sort: Sort = {
      field: `name`,
      desc: true,
    };
    await getProducts({ pagination, sort });
    expect(mockedPost).toBeCalledTimes(1);
    expect(mockedPost).toBeCalledWith("/sales-channel-api/v1/product", {
      limit: 75,
      page: 1,
      sort: "-name",
    });
  });
});
