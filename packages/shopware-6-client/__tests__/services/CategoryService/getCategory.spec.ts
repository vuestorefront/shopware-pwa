import { getCategory } from "@shopware-pwa/shopware-6-client";
import { apiService } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("CategoryService - getCategory", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("should return chosen category - without associated products by default", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        data: {
          id: "3a64e872ca404522a2c5d43ebc751e6b",
          products: null,
        },
      },
    });
    const categoryId = "3a64e872ca404522a2c5d43ebc751e6b";
    const result = await getCategory(categoryId);
    expect(mockedAxios.get).toBeCalledTimes(1);
    expect(mockedAxios.get).toBeCalledWith(
      "/category/3a64e872ca404522a2c5d43ebc751e6b"
    );
    expect(result).toHaveProperty("id");
    expect(result.id).toEqual(categoryId);
    expect(result).toHaveProperty("products");
    expect(result.products).toBeNull();
  });
});
