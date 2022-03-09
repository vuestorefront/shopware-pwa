import {
  getMergeWishlistProductsEndpoint,
  mergeWishlistProducts,
} from "@shopware-pwa/shopware-6-client";
import { defaultInstance } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;

describe("WishlistService - mergeWishlistProducts", () => {
  const mockedPost = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockedApiInstance.invoke = {
      post: mockedPost,
    } as any;
  });
  it("should invoke a post method for specific endpoint", async () => {
    mockedPost.mockResolvedValueOnce({
      data: { success: true },
    });
    const result = await mergeWishlistProducts([
      "some-product-uuid-1",
      "some-product-uuid-2",
    ]);
    expect(mockedPost).toBeCalledTimes(1);
    expect(mockedPost).toBeCalledWith(getMergeWishlistProductsEndpoint(), {
      productIds: ["some-product-uuid-1", "some-product-uuid-2"],
    });
    expect(result).toHaveProperty("success");
  });
});
