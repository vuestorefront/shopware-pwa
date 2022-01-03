import { getRemoveWishlistProductEndpoint, removeWishlistProduct } from "@shopware-pwa/shopware-6-client";
import { defaultInstance } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;

describe("WishlistService - removeWishlistProduct", () => {
  const mockedDelete = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockedApiInstance.invoke = {
      delete: mockedDelete,
    } as any;
  });
  it("should invoke a delete method for specific endpoint", async () => {
    mockedDelete.mockResolvedValueOnce({
      data: { success: true },
    });
    const result = await removeWishlistProduct("some-product-uuid");
    expect(mockedDelete).toBeCalledTimes(1);
    expect(mockedDelete).toBeCalledWith(getRemoveWishlistProductEndpoint("some-product-uuid"));
    expect(result).toHaveProperty("success");
  });
});
