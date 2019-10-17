import { getCategoryWithAssociation } from "@shopware-pwa/shopware-6-client";
import { apiService } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("CategoryService - getCategoryWithAssociation", () => {
  it("should return chosen category - associated products", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        data: {
          id: "3a64e872ca404522a2c5d43ebc751e6b",
          products: [
            {
              id: "044a190a54ab4f06803909c3ee8063ef"
            }
          ]
        }
      }
    });
    const categoryId = "3a64e872ca404522a2c5d43ebc751e6b";
    const result = await getCategoryWithAssociation(categoryId, "products");
    expect(mockedAxios.get).toBeCalledTimes(1);
    expect(mockedAxios.get).toBeCalledWith(
      "/category/3a64e872ca404522a2c5d43ebc751e6b?associations[products][]"
    );
    expect(result).toHaveProperty("id");
    expect(result.id).toEqual(categoryId);
    expect(result).toHaveProperty("products");
    expect(result.products).toHaveLength(1);
  });
});
