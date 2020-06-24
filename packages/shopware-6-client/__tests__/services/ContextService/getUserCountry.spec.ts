import { defaultInstance } from "../../../src/apiService";
import { getUserCountry } from "@shopware-pwa/shopware-6-client";

jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;

describe("ContextService - getUserCountry", () => {
  const mockedGet = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockedApiInstance.invoke = {
      get: mockedGet,
    } as any;
  });
  it("should return user salutation object", async () => {
    mockedGet.mockResolvedValueOnce({ data: { name: "Poland" } });

    const countryId = "123123123";
    const result = await getUserCountry(countryId);
    expect(mockedGet).toBeCalledTimes(1);
    expect(mockedGet).toBeCalledWith(
      `/sales-channel-api/v1/country/${countryId}`
    );
    expect(result.name).toEqual("Poland");
  });
});
