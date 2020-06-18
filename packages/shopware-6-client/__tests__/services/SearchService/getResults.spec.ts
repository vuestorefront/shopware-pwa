import { getSearchResults } from "@shopware-pwa/shopware-6-client";
import { apiService } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("SearchService - getSearchResults", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("should return ProductListingResult", async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: { apiAlias: "product_listing" },
    });
    const result = await getSearchResults("some term");
    expect(mockedAxios.post).toBeCalledTimes(1);
    expect(mockedAxios.post).toBeCalledWith(
      "/store-api/v1/search?search=some term",
      {
        limit: 10,
        p: 1,
      }
    );
    expect(result).toHaveProperty("apiAlias");
  });
});
