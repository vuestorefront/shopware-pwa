import { getProductPage } from "@shopware-pwa/shopware-6-client";
import { defaultInstance } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;

describe("PageService - getProductPage", () => {
  const mockedPost = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockedApiInstance.invoke = {
      post: mockedPost,
    } as any;
  });
  it("should return product object for given path", async () => {
    mockedPost.mockResolvedValueOnce({
      data: { product: { id: "b218f861361042f3a58a2a9d1b3575b5" } },
    });
    const result = await getProductPage(
      "detail/b218f861361042f3a58a2a9d1b3575b5"
    );
    expect(mockedPost).toBeCalledTimes(1);
    expect(mockedPost).toBeCalledWith("/store-api/pwa/page", {
      path: "detail/b218f861361042f3a58a2a9d1b3575b5",
    });
    expect(result).toHaveProperty("product");
    expect(result.product.id).toEqual("b218f861361042f3a58a2a9d1b3575b5");
  });
});
