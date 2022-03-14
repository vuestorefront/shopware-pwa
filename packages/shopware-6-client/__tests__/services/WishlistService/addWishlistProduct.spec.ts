import {
  addWishlistProduct,
  getAddWishlistProductEndpoint,
} from "@shopware-pwa/shopware-6-client";
import { defaultInstance } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;

describe("WishlistService - addWishlistProduct", () => {
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
    const result = await addWishlistProduct("some-product-uuid");
    expect(mockedPost).toBeCalledTimes(1);
    expect(mockedPost).toBeCalledWith(
      getAddWishlistProductEndpoint("some-product-uuid")
    );
    expect(result).toHaveProperty("apiAlias");
  });
});
