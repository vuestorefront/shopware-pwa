import { apiService } from "../../../src/apiService";
import { getAvailableSalutations } from "@shopware-pwa/shopware-6-client";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("ContextService - getAvailableSalutations", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("should return array with available salutations", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { total: 2 } });

    const result = await getAvailableSalutations();
    expect(mockedAxios.get).toBeCalledTimes(1);
    expect(mockedAxios.get).toBeCalledWith("/salutation");
    expect(result.total).toEqual(2);
  });
});
