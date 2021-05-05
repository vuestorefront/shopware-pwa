import { getCategories } from "@shopware-pwa/shopware-6-client";
import { defaultInstance } from "../../../src/apiService";
const consoleWarnSpy = jest.spyOn(console, "warn");

jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;

describe("CategoryService - getCategories", () => {
  const mockedPost = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockedApiInstance.invoke = {
      post: mockedPost,
    } as any;
    consoleWarnSpy.mockImplementation(() => {});
  });
  it("should return array with categories", async () => {
    mockedPost.mockResolvedValueOnce({ data: { total: 22 } });

    const result = await getCategories();
    expect(mockedPost).toBeCalledTimes(1);
    expect(mockedPost).toBeCalledWith("/store-api/category", undefined);
    expect(result.total).toEqual(22);
  });
});
