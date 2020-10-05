import { searchProducts } from "@shopware-pwa/shopware-6-client";
import { defaultInstance } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;

describe("SearchService - searchProducts", () => {
  const mockedPost = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockedApiInstance.invoke = {
      post: mockedPost,
    } as any;
  });
  it("should return ProductListingResult", async () => {
    mockedPost.mockResolvedValueOnce({
      data: { apiAlias: "product_listing" },
    });
    const result = await searchProducts({
      query: "searchTerm",
      limit: 10,
      p: 1,
    });
    expect(mockedPost).toBeCalledTimes(1);
    expect(mockedPost).toBeCalledWith(
      "/store-api/v3/search?search=searchTerm",
      {
        query: "searchTerm",
        limit: 10,
        p: 1,
      }
    );
    expect(result).toHaveProperty("apiAlias");
  });

  it("should call for empty queery", async () => {
    mockedPost.mockResolvedValueOnce({
      data: { apiAlias: "product_listing" },
    });
    const result = await searchProducts(undefined);
    expect(mockedPost).toBeCalledTimes(1);
    expect(mockedPost).toBeCalledWith(
      "/store-api/v3/search?search=",
      undefined
    );
    expect(result).toHaveProperty("apiAlias");
  });
});
