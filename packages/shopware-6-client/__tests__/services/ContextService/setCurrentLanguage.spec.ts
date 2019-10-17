import { apiService } from "../../../src/apiService";
import { setCurrentLanguage } from "@shopware-pwa/shopware-6-client";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("ContextService - setCurrentLanguage with contextToken given", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should return context token", async () => {
    mockedAxios.patch.mockResolvedValueOnce({
      data: { "sw-context-token": "NWDdcRTTWoPk4Ngv13z5NDMMsDFRb9W6" }
    });

    let contextToken = "NWDdcRTTWoPk4Ngv13z5NDMMsDFRb9W6";
    let newLanguageId = "45f96f681f9d4834b29e9e15df3a7149";

    const result = await setCurrentLanguage(contextToken, newLanguageId);

    expect(mockedAxios.patch).toBeCalledTimes(1);
    expect(mockedAxios.patch).toBeCalledWith(
      "/context",
      { languageId: "45f96f681f9d4834b29e9e15df3a7149" },
      { headers: { "sw-context-token": "NWDdcRTTWoPk4Ngv13z5NDMMsDFRb9W6" } }
    );

    expect(result).toHaveProperty("sw-context-token");
  });
});

describe("ContextService - setCurrentLanguage without contextToken given", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should return context token", async () => {
    mockedAxios.patch.mockResolvedValueOnce({
      data: { "sw-context-token": "NWDdcRTTWoPk4Ngv13z5NDMMsDFRb9W6" }
    });

    let newLanguageId = "45f96f681f9d4834b29e9e15df3a7149";

    const result = await setCurrentLanguage(null, newLanguageId);

    expect(mockedAxios.patch).toBeCalledTimes(1);
    expect(mockedAxios.patch).toBeCalledWith(
      "/context",
      { languageId: "45f96f681f9d4834b29e9e15df3a7149" },
      undefined
    );

    expect(result).toHaveProperty("sw-context-token");
  });
});
