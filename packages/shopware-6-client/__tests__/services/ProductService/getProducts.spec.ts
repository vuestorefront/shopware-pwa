import { getProducts } from "@shopware-pwa/shopware-6-client/src";
import { apiService } from "../../../src/apiService";
import { Sort } from "../../../src/interfaces/search/SearchCriteria";
import { PaginationLimit } from "../../../src/interfaces/search/Pagination";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("ProductService - getProducts", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("should return array of products (default amount of 10)", async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: { total: 3, data: [1, 2, 3] }
    });

    const result = await getProducts();
    expect(result.total).toEqual(3);
    expect(result.data).toHaveLength(result.total);
    expect(mockedAxios.post).toBeCalledTimes(1);
  });
  it("should invoke api with limit", async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: { total: 3, data: [1, 2, 3] }
    });
    const pagination = {
      page: 1,
      limit: 5
    };
    await getProducts({ pagination });
    expect(mockedAxios.post).toBeCalledTimes(1);
    expect(mockedAxios.post).toBeCalledWith("/product", { limit: 5, page: 1 });
  });
  it("should invoke api with limit and sort", async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: { total: 3, data: [1, 2, 3] }
    });
    const pagination = {
      page: 1,
      limit: PaginationLimit.SEVENTY_FIVE
    };
    const sort: Sort = {
      field: `name`,
      desc: true
    };
    await getProducts({ pagination, sort });
    expect(mockedAxios.post).toBeCalledTimes(1);
    expect(mockedAxios.post).toBeCalledWith("/product", {
      limit: 75,
      page: 1,
      sort: "-name"
    });
  });
});
