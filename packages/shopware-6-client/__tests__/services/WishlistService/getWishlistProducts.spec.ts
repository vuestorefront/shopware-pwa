import {
  getGetWishlistProductsEndpoint,
  getWishlistProducts,
} from "@shopware-pwa/shopware-6-client";
import { defaultInstance } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;

describe("WishlistService - getWishlistProducts", () => {
  const mockedPost = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockedApiInstance.invoke = {
      post: mockedPost,
    } as any;
  });
  it("should invoke a post method for specific endpoint", async () => {
    mockedPost.mockResolvedValueOnce({
      data: { apiAlias: "wishlist_products" },
    });
    const result = await getWishlistProducts({
      includes: {
        product: ["name"],
      },
    });
    expect(mockedPost).toBeCalledTimes(1);
    expect(mockedPost).toBeCalledWith(getGetWishlistProductsEndpoint(), {
      includes: { product: ["name"] },
    });
    expect(result).toHaveProperty("apiAlias");
  });
});
