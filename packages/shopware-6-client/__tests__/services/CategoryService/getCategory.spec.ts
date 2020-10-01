import { getCategory } from "@shopware-pwa/shopware-6-client";
import { defaultInstance } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;

describe("CategoryService - getCategory", () => {
  const mockedGet = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockedApiInstance.invoke = {
      get: mockedGet,
    } as any;
  });
  it("should return chosen category - without associated products by default", async () => {
    mockedGet.mockResolvedValueOnce({
      data: {
        id: "3a64e872ca404522a2c5d43ebc751e6b",
        products: null,
      },
    });
    const categoryId = "3a64e872ca404522a2c5d43ebc751e6b";
    const result = await getCategory(categoryId);
    expect(mockedGet).toBeCalledTimes(1);
    expect(mockedGet).toBeCalledWith("/store-api/v4/category", {
      params: { ids: "3a64e872ca404522a2c5d43ebc751e6b" },
    });
    expect(result).toStrictEqual({
      id: "3a64e872ca404522a2c5d43ebc751e6b",
      products: null,
    });
    expect(result.id).toEqual(categoryId);
    expect(result.products).toBeNull();
  });
});
