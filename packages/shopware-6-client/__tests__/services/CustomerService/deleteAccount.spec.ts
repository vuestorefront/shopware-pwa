import { deleteAccount } from "@shopware-pwa/shopware-6-client";
import { getCustomerDeleteEndpoint } from "../../../src/endpoints";
import { defaultInstance } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;

describe("CustomerService - delete", () => {
  const mockedPost = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockedApiInstance.invoke = {
      delete: mockedPost,
    } as any;
  });

  it("should delete the customer account", async () => {
    mockedPost.mockResolvedValueOnce({ data: null });
    await deleteAccount();
    expect(mockedPost).toBeCalledTimes(1);
    expect(mockedPost).toBeCalledWith(getCustomerDeleteEndpoint());
  });
});
