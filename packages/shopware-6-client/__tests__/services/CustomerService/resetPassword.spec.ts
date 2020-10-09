import { getCustomerResetPasswordEndpoint } from "../../../src/endpoints";
import { defaultInstance } from "../../../src/apiService";
import { internet } from "faker";
import { resetPassword, config } from "@shopware-pwa/shopware-6-client";

const DEFAULT_ENDPOINT = "https://shopware-2.vuestorefront.io";
const email = internet.email("John", "Doe");
const credentials = {
  email: email,
  storefrontUrl: config.endpoint ?? DEFAULT_ENDPOINT,
};

jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;

describe("CustomerService - resetPassword", () => {
  const mockedPost = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockedApiInstance.invoke = {
      post: mockedPost,
    } as any;
  });

  it("rejects the promise if the email do not mach any in Sales Channel", async () => {
    mockedPost.mockRejectedValueOnce(new Error("400 - invalid email address"));
    expect(
      resetPassword({
        email: credentials.email,
        storefrontUrl: credentials.storefrontUrl,
      })
    ).rejects.toThrow("400 - invalid email");
    expect(mockedPost).toBeCalledTimes(1);
    expect(mockedPost).toBeCalledWith(getCustomerResetPasswordEndpoint(), {
      email: credentials.email,
      storefrontUrl: credentials.storefrontUrl,
    });
  });

  it("returns no data if successfully updated", async () => {
    mockedPost.mockResolvedValueOnce(null);

    const resultWithFullParams = await resetPassword({
      email: credentials.email,
      storefrontUrl: credentials.storefrontUrl,
    });
    expect(resultWithFullParams).toBeFalsy();

    const resultWithEmptyUrl = await resetPassword({
      email: credentials.email,
      storefrontUrl: "",
    });
    expect(resultWithEmptyUrl).toBeFalsy();

    const resultWithoutUrl = await resetPassword({
      email: credentials.email,
    });
    expect(resultWithoutUrl).toBeFalsy();

    expect(mockedPost).toBeCalledTimes(3);
    expect(mockedPost).toBeCalledWith(getCustomerResetPasswordEndpoint(), {
      email: credentials.email,
      storefrontUrl: credentials.storefrontUrl,
    });
  });

  it("should set storefrontUrl from config if not provided with params ", async () => {
    await resetPassword({
      email: credentials.email,
    });
    expect(mockedPost).toBeCalledWith(
      "/store-api/v3/account/recovery-password",
      {
        email: credentials.email,
        storefrontUrl: "https://pwa-demo-api.shopware.com",
      }
    );
  });

  it("should invokde post method with null if params are not provided", async () => {
    await resetPassword(null as any);
    expect(mockedPost).toBeCalledWith(
      "/store-api/v3/account/recovery-password",
      null
    );
  });
});
