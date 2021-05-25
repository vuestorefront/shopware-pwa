import { getCustomerAddresses } from "@shopware-pwa/shopware-6-client";
import { defaultInstance } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;

describe("CustomerService - register", () => {
  const mockedGet = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockedApiInstance.invoke = {
      get: mockedGet,
    } as any;
  });

  it("should return object of addresses", async () => {
    mockedGet.mockResolvedValueOnce({ data: { data: {} } });
    const result = await getCustomerAddresses();
    expect(mockedGet).toBeCalledTimes(1);
    expect(mockedGet).toBeCalledWith(`/store-api/account/list-address`);
    expect(result).toMatchObject({});
  });
});
