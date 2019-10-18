import { apiService } from "../../../src/apiService";
import { getAvailableCountries } from "@shopware-pwa/shopware-6-client";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("ContextService - getAvailableCountries", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("should return array with countries", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { total: 2 } });

    const result = await getAvailableCountries();
    expect(mockedAxios.get).toBeCalledTimes(1);
    expect(mockedAxios.get).toBeCalledWith("/country");
    expect(result.total).toEqual(2);
  });
});
