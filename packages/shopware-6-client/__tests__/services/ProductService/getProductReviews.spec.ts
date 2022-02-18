import { getProductReviews } from "@shopware-pwa/shopware-6-client";
import { defaultInstance } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;

describe("ProductService - getProductReviews", () => {
  const mockedPost = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockedApiInstance.invoke = {
      post: mockedPost,
    } as any;
  });
  it("should return reviews of chosen product", async () => {
    mockedPost.mockResolvedValueOnce({
      data: { "elements": [{ "productId": "044a190a54ab4f06803909c3ee8063ef",}] }
    });
    const productId = "044a190a54ab4f06803909c3ee8063ef";
    const result = await getProductReviews(productId);
    expect(mockedPost).toBeCalledTimes(1);
    expect(mockedPost).toBeCalledWith(
      "/store-api/product/044a190a54ab4f06803909c3ee8063ef/reviews",
      {}
    );
    expect(result).toHaveProperty("elements");
  });
});
