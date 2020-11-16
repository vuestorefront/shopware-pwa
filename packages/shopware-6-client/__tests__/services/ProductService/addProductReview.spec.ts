import { addProductReview } from "@shopware-pwa/shopware-6-client";
import { defaultInstance } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;

describe("ProductService - addProductReview", () => {
  const mockedPost = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockedApiInstance.invoke = {
      post: mockedPost,
    } as any;
  });
  it("should invoke a specific POST call in order to add a review", async () => {
    const productId = "044a190a54ab4f06803909c3ee8063ef";
    const reviewData = {
      title: "Some title",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      points: 5,
    };

    const result = await addProductReview(
      productId,
      reviewData,
      mockedApiInstance
    );
    expect(mockedPost).toBeCalledTimes(1);
    expect(mockedPost).toBeCalledWith(
      "/store-api/v3/product/044a190a54ab4f06803909c3ee8063ef/review",
      reviewData
    );
    expect(result).toBeUndefined();
  });
  it("should invoke a specific POST call using default API instance", async () => {
    const productId = "044a190a54ab4f06803909c3ee8063ef";
    const reviewData = {
      title: "Some title",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      points: 5,
    };

    await addProductReview(productId, reviewData);
  });
});
