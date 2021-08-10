import { getCustomerAddresses } from "@shopware-pwa/shopware-6-client";
import { defaultInstance } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;

describe("CustomerService - getCustomerAddresses", () => {
  const mockedPost = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockedApiInstance.invoke = {
      post: mockedPost,
    } as any;
  });

  it("should return object of addresses", async () => {
    mockedPost.mockResolvedValueOnce({ data: { data: {} } });
    const result = await getCustomerAddresses();
    expect(mockedPost).toBeCalledTimes(1);
    expect(mockedPost).toBeCalledWith(`/store-api/account/list-address`, {});
    expect(result).toMatchObject({});
  });
});
