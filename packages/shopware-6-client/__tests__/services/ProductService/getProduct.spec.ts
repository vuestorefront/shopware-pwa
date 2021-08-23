import { getProduct } from "@shopware-pwa/shopware-6-client";
import { defaultInstance } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;

describe("ProductService - getProduct", () => {
  const mockedPost = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockedApiInstance.invoke = {
      post: mockedPost,
    } as any;
  });
  it("should return chosen product", async () => {
    mockedPost.mockResolvedValueOnce({
      data: { product: { id: "044a190a54ab4f06803909c3ee8063ef" } },
    });
    const productId = "044a190a54ab4f06803909c3ee8063ef";
    const result = await getProduct(productId);
    expect(mockedPost).toBeCalledTimes(1);
    expect(mockedPost).toBeCalledWith(
      "/store-api/product/044a190a54ab4f06803909c3ee8063ef",
      null
    );
    expect(result.product?.id).toEqual(productId);
  });
});
