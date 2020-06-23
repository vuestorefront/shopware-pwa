import { logout } from "@shopware-pwa/shopware-6-client";
import { getCustomerLogoutEndpoint } from "../../../src/endpoints";
import { defaultInstance } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;

describe("CustomerService - logout", () => {
  const mockedPost = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockedApiInstance.invoke = {
      post: mockedPost,
    } as any;
  });

  it("should log out the customer", async () => {
    mockedPost.mockResolvedValueOnce({ data: null });
    await logout();
    expect(mockedPost).toBeCalledTimes(1);
    expect(mockedPost).toBeCalledWith(getCustomerLogoutEndpoint());
  });
});
