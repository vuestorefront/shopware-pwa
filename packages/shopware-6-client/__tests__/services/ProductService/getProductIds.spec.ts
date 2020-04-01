import { getProductsIds } from "@shopware-pwa/shopware-6-client";
import { apiService } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("ProductService - getProductsIds", () => {
  it("should return array of products' ids (default amount of 10)", async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: { total: 3, data: [1, 2, 3] },
    });

    const result = await getProductsIds();
    expect(result.total).toEqual(3);
    expect(result.data).toHaveLength(result.total);
  });
});
