import { getProduct } from "@shopware-pwa/shopware-6-client";
import { apiService } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("ProductService - getProduct", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("should return chosen product", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: { data: { id: "044a190a54ab4f06803909c3ee8063ef" } }
    });
    const productId = "044a190a54ab4f06803909c3ee8063ef";
    const result = await getProduct(productId);
    expect(mockedAxios.get).toBeCalledTimes(1);
    expect(mockedAxios.get).toBeCalledWith(
      "/product/044a190a54ab4f06803909c3ee8063ef",
      { params: null }
    );
    expect(result).toHaveProperty("id");
    expect(result.id).toEqual(productId);
  });
});
