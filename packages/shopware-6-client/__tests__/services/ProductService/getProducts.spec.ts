import { getProducts } from "@shopware-pwa/shopware-6-client";
import { apiService } from "../../../src/apiService";
import { Sort } from "packages/shopware-6-client/src/interfaces/search/SearchCriteria";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("ProductService - getProducts", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("should return array of products (default amount of 10)", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: { total: 3, data: [1, 2, 3] }
    });

    const result = await getProducts();
    expect(result.total).toEqual(3);
    expect(result.data).toHaveLength(result.total);
    expect(mockedAxios.get).toBeCalledTimes(1);
  });
  it("should invoke api with limit", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: { total: 3, data: [1, 2, 3] }
    });
    const pagination = {
      page: 1,
      limit: 5
    };
    await getProducts({ pagination });
    expect(mockedAxios.get).toBeCalledTimes(1);
    expect(mockedAxios.get).toBeCalledWith("/product", {
      params: { limit: 5, page: 1 }
    });
  });
  it("should invoke api with limit and sort", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: { total: 3, data: [1, 2, 3] }
    });
    const pagination = {
      page: 1,
      limit: 2
    };
    const sort: Sort = {
      field: `name`,
      desc: true
    };
    await getProducts({ pagination, sort });
    expect(mockedAxios.get).toBeCalledTimes(1);
    expect(mockedAxios.get).toBeCalledWith("/product", {
      params: { limit: 2, page: 1, sort: "-name" }
    });
  });
});
