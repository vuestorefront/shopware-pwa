import { defaultInstance } from "../../../src/apiService";
import { getAvailableSalutations } from "@shopware-pwa/shopware-6-client";

jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;

describe("ContextService - getAvailableSalutations", () => {
  const mockedGet = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockedApiInstance.invoke = {
      get: mockedGet,
    } as any;
  });
  it("should return array with available salutations", async () => {
    mockedGet.mockResolvedValueOnce({ data: { total: 2 } });

    const result = await getAvailableSalutations();
    expect(mockedGet).toBeCalledTimes(1);
    expect(mockedGet).toBeCalledWith("/store-api/v1/salutation");
    expect(result.total).toEqual(2);
  });
});
