import { getProductsIds } from "@shopware-pwa/shopware-6-client";
import { defaultInstance } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;

describe("ProductService - getProductsIds", () => {
  const mockedPost = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockedApiInstance.invoke = {
      post: mockedPost,
    } as any;
  });
  it("should return array of products' ids (default amount of 10)", async () => {
    mockedPost.mockResolvedValueOnce({
      data: { total: 3, data: [1, 2, 3] },
    });

    const result = await getProductsIds();
    expect(result.total).toEqual(3);
    expect(result.data).toHaveLength(result.total);
  });
});
