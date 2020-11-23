import { getProduct } from "@shopware-pwa/shopware-6-client";
import { defaultInstance } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;

describe("ProductService - getProduct", () => {
  const mockedGet = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockedApiInstance.invoke = {
      get: mockedGet,
    } as any;
  });
  it("should return chosen product", async () => {
    mockedGet.mockResolvedValueOnce({
      data: { data: { id: "044a190a54ab4f06803909c3ee8063ef" } },
    });
    const productId = "044a190a54ab4f06803909c3ee8063ef";
    const result = await getProduct(productId);
    expect(mockedGet).toBeCalledTimes(1);
    expect(mockedGet).toBeCalledWith(
      "/store-api/v3/product/044a190a54ab4f06803909c3ee8063ef",
      {
        params: null,
      }
    );
    expect(result).toHaveProperty("id");
    expect(result.id).toEqual(productId);
  });
});
