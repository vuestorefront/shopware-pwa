import { defaultInstance } from "../../../src/apiService";
import { getAvailableCurrencies } from "@shopware-pwa/shopware-6-client";

jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;

describe("ContextService - getAvailableCurrencies", () => {
  const mockedGet = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockedApiInstance.invoke = {
      get: mockedGet,
    } as any;
  });
  it("should return array with currencies", async () => {
    mockedGet.mockResolvedValueOnce({ data: [{ iso: "EUR" }] });
    const result = await getAvailableCurrencies();
    expect(mockedGet).toBeCalledTimes(1);
    expect(mockedGet).toBeCalledWith("/store-api/v1/currency");
    expect(result).toEqual([{ iso: "EUR" }]);
  });
});
