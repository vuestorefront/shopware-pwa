import { getResults } from "@shopware-pwa/shopware-6-client";
import { apiService } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("SearchService - getResults", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("should return ProductListingResult", async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: { apiAlias: "product_listing" },
    });
    const result = await getResults("some term");
    expect(mockedAxios.post).toBeCalledTimes(1);
    expect(mockedAxios.post).toBeCalledWith(
      "/store-api/v1/search?search=some term",
      {
        limit: 10,
      }
    );
    expect(result).toHaveProperty("apiAlias");
  });
});
