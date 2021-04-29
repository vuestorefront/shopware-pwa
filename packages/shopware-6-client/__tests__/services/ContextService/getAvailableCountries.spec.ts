import { defaultInstance } from "../../../src/apiService";
import { getAvailableCountries } from "@shopware-pwa/shopware-6-client";

jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;

describe("ContextService - getAvailableCountries", () => {
  const mockedGet = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockedApiInstance.invoke = {
      get: mockedGet,
    } as any;
  });
  it("should return array with countries", async () => {
    mockedGet.mockResolvedValueOnce({ data: { total: 2 } });

    const result = await getAvailableCountries();
    expect(mockedGet).toBeCalledTimes(1);
    expect(mockedGet).toBeCalledWith("/store-api/country");
    expect(result.total).toEqual(2);
  });
});
