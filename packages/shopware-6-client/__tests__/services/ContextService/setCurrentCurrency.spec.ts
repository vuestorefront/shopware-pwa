import { apiService } from "../../../src/apiService";
import { setCurrentCurrency } from "@shopware-pwa/shopware-6-client";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("ContextService - setCurrentCurrency with contextToken given", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should return context token", async () => {
    mockedAxios.patch.mockResolvedValueOnce({
      data: { "sw-context-token": "NWDdcRTTWoPk4Ngv13z5NDMMsDFRb9W6" }
    });

    let contextToken = "NWDdcRTTWoPk4Ngv13z5NDMMsDFRb9W6";
    let newCurrencyId = "45f96f681f9d4834b29e9e15df3a7149";

    const result = await setCurrentCurrency(contextToken, newCurrencyId);

    expect(mockedAxios.patch).toBeCalledTimes(1);
    expect(mockedAxios.patch).toBeCalledWith(
      "/context",
      { currencyId: "45f96f681f9d4834b29e9e15df3a7149" },
      { headers: { "sw-context-token": "NWDdcRTTWoPk4Ngv13z5NDMMsDFRb9W6" } }
    );

    expect(result).toHaveProperty("sw-context-token");
  });
});

describe("ContextService - setCurrentCurrency without contextToken given", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should return context token", async () => {
    mockedAxios.patch.mockResolvedValueOnce({
      data: { "sw-context-token": "NWDdcRTTWoPk4Ngv13z5NDMMsDFRb9W6" }
    });

    let newCurrencyId = "45f96f681f9d4834b29e9e15df3a7149";

    const result = await setCurrentCurrency(null, newCurrencyId);

    expect(mockedAxios.patch).toBeCalledTimes(1);
    expect(mockedAxios.patch).toBeCalledWith(
      "/context",
      { currencyId: "45f96f681f9d4834b29e9e15df3a7149" },
      undefined
    );

    expect(result).toHaveProperty("sw-context-token");
  });
});
