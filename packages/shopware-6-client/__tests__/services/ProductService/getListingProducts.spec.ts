import { apiService } from "../../../src/apiService";
import { getCategoryProductsListing } from "@shopware-pwa/shopware-6-client";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("ProductService - getCategoryProductsListing", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("should return listing data with no searchCriteria", async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: { elements: [{ id: "044a190a54ab4f06803909c3ee8063ef" }] },
    });
    const categoryId = "044a190a54ab4f06803909c3ee8063ef";
    const result = await getCategoryProductsListing(categoryId);
    expect(mockedAxios.post).toBeCalledTimes(1);
    expect(mockedAxios.post).toBeCalledWith(
      "/store-api/v1/product-listing/044a190a54ab4f06803909c3ee8063ef",
      {}
    );
    expect(result).toHaveProperty("elements");
  });
  it("should return listing data with searchCriteria provided", async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: { elements: [{ id: "044a190a54ab4f06803909c3ee8063ef" }] },
    });
    const categoryId = "044a190a54ab4f06803909c3ee8063ef";
    const result = await getCategoryProductsListing(categoryId, {
      sort: { field: "name" },
    });
    expect(mockedAxios.post).toBeCalledTimes(1);
    expect(
      mockedAxios.post
    ).toBeCalledWith(
      "/store-api/v1/product-listing/044a190a54ab4f06803909c3ee8063ef",
      { sort: "name-asc" }
    );
    expect(result).toHaveProperty("elements");
  });
});
