import { apiService } from "../../../src/apiService";
import { getAvailableCurrencies } from "@shopware-pwa/shopware-6-client";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("ContextService - getAvailableCurrencies", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("should return array with currencies", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { data: [{ iso: "EUR" }] } });
    const result = await getAvailableCurrencies();
    expect(mockedAxios.get).toBeCalledTimes(1);
    expect(mockedAxios.get).toBeCalledWith("/sales-channel-api/v1/currency");
    expect(result).toEqual([{ iso: "EUR" }]);
  });
});
