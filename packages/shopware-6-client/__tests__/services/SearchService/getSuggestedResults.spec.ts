import { getSuggestedResults } from "@shopware-pwa/shopware-6-client";
import { defaultInstance } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;
const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});

describe("SearchService - getSuggestedResults", () => {
  const mockedPost = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockedApiInstance.invoke = {
      post: mockedPost,
    } as any;
  });

  it("should display deprecation info on invocation", async () => {
    mockedPost.mockResolvedValueOnce({
      data: {},
    });
    await getSuggestedResults("some term");
    expect(consoleWarnSpy).toBeCalledWith(
      '[DEPRECATED][@shopware-pwa/shopware-6-client][getSuggestedResults] This method has been deprecated. Use "searchSuggestedProducts" instead.'
    );
  });

  it("should return ProductListingResult", async () => {
    mockedPost.mockResolvedValueOnce({
      data: { apiAlias: "product_listing" },
    });
    const result = await getSuggestedResults("some term");
    expect(mockedPost).toBeCalledTimes(1);
    expect(mockedPost).toBeCalledWith(
      "/store-api/v3/search-suggest?search=some term",
      {
        limit: 10,
      }
    );
    expect(result).toHaveProperty("apiAlias");
  });
});
