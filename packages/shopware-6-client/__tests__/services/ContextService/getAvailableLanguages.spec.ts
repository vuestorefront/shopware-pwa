import { apiService } from "../../../src/apiService";
import { getAvailableLanguages } from "@shopware-pwa/shopware-6-client";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("ContextService - getAvailableLanguages", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("should return array with languages", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [{ id: 2, code: "en" }] });

    const result = await getAvailableLanguages();
    expect(mockedAxios.get).toBeCalledTimes(1);
    expect(mockedAxios.get).toBeCalledWith("/store-api/v1/language");
    expect(result).toEqual([{ id: 2, code: "en" }]);
  });
});
