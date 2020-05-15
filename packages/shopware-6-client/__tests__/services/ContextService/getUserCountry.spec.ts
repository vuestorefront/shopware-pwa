import { apiService } from "../../../src/apiService";
import { getUserCountry } from "@shopware-pwa/shopware-6-client";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("ContextService - getUserCountry", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("should return user salutation object", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { name: "Poland" } });

    const countryId = "123123123";
    const result = await getUserCountry(countryId);
    expect(mockedAxios.get).toBeCalledTimes(1);
    expect(mockedAxios.get).toBeCalledWith(
      `/sales-channel-api/v1/country/${countryId}`
    );
    expect(result.name).toEqual("Poland");
  });
});
