import { defaultInstance } from "../../../src/apiService";
import { getAvailableLanguages } from "@shopware-pwa/shopware-6-client";

jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;

describe("ContextService - getAvailableLanguages", () => {
  const mockedGet = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockedApiInstance.invoke = {
      get: mockedGet,
    } as any;
  });
  it("should return array with languages", async () => {
    mockedGet.mockResolvedValueOnce({ data: [{ id: 2, code: "en" }] });

    const result = await getAvailableLanguages();
    expect(mockedGet).toBeCalledTimes(1);
    expect(mockedGet).toBeCalledWith("/store-api/v1/language");
    expect(result).toEqual([{ id: 2, code: "en" }]);
  });
});
