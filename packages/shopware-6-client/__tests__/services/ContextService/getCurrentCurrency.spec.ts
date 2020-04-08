import { apiService } from "../../../src/apiService";
import { getCurrentCurrency } from "@shopware-pwa/shopware-6-client";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("ContextService - getCurrentCurrency", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("should return data with current session's currency", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { currency: {
      isoCode: "EUR"
    } } });

    const result = await getCurrentCurrency();
    expect(mockedAxios.get).toBeCalledTimes(1);
    expect(mockedAxios.get).toBeCalledWith("/context");
    expect(result.isoCode).toEqual("EUR");
  });
  it("should return undefined on lack of currency data in context", async () => {
    mockedAxios.get.mockResolvedValueOnce({ });

    const result = await getCurrentCurrency();
    expect(mockedAxios.get).toBeCalledTimes(1);
    expect(mockedAxios.get).toBeCalledWith("/context");
    expect(result).toBeUndefined();
  });
});
