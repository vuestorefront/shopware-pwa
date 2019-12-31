import { apiService } from "../../../src/apiService";
import { getAvailableCurrencies } from "@shopware-pwa/shopware-6-client/src";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("ContextService - getAvailableCurrencies", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("should return array with currencies", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { total: 2 } });

    const result = await getAvailableCurrencies();
    expect(mockedAxios.get).toBeCalledTimes(1);
    expect(mockedAxios.get).toBeCalledWith("/currency");
    expect(result.total).toEqual(2);
  });
});
