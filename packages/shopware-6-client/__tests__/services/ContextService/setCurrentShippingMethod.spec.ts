import { apiService } from "../../../src/apiService";
import { setCurrentShippingMethod } from "@shopware-pwa/shopware-6-client";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("ContextService - setCurrentShippingMethod with contextToken given", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should return context token", async () => {
    mockedAxios.patch.mockResolvedValueOnce({
      data: { "sw-context-token": "NWDdcRTTWoPk4Ngv13z5NDMMsDFRb9W6" }
    });

    let contextToken = "NWDdcRTTWoPk4Ngv13z5NDMMsDFRb9W6";
    let newShippingMethodId = "45f96f681f9d4834b29e9e15df3a7149";

    const result = await setCurrentShippingMethod(
      contextToken,
      newShippingMethodId
    );

    expect(mockedAxios.patch).toBeCalledTimes(1);
    expect(mockedAxios.patch).toBeCalledWith(
      "/context",
      { shippingMethodId: "45f96f681f9d4834b29e9e15df3a7149" },
      { headers: { "sw-context-token": "NWDdcRTTWoPk4Ngv13z5NDMMsDFRb9W6" } }
    );

    expect(result).toHaveProperty("sw-context-token");
  });
});

describe("ContextService - setCurrentShippingMethod without contextToken given", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should return context token", async () => {
    mockedAxios.patch.mockResolvedValueOnce({
      data: { "sw-context-token": "NWDdcRTTWoPk4Ngv13z5NDMMsDFRb9W6" }
    });

    let newShippingMethodId = "45f96f681f9d4834b29e9e15df3a7149";

    const result = await setCurrentShippingMethod(null, newShippingMethodId);

    expect(mockedAxios.patch).toBeCalledTimes(1);
    expect(mockedAxios.patch).toBeCalledWith(
      "/context",
      { shippingMethodId: "45f96f681f9d4834b29e9e15df3a7149" },
      undefined
    );

    expect(result).toHaveProperty("sw-context-token");
  });
});
