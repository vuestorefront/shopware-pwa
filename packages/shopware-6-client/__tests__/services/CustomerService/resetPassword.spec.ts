import { getCustomerResetPasswordEndpoint } from "../../../src/endpoints";
import { apiService } from "../../../src/apiService";
import { internet, random } from "faker";
import { resetPassword, update, config } from "@shopware-pwa/shopware-6-client";

const DEFAULT_ENDPOINT = "https://shopware-2.vuestorefront.io";
const email = internet.email("John", "Doe");
const credentials = {
  email: email,
  storefrontUrl: config.endpoint ?? DEFAULT_ENDPOINT,
};

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("CustomerService - resetPassword", () => {
  let contextToken: string;
  beforeEach(() => {
    jest.resetAllMocks();
    contextToken = random.uuid();
    update({ contextToken });
  });
  afterEach(() => {
    expect(config.contextToken).toEqual(contextToken);
  });

  it("rejects the promise if the email do not mach any in Sales Channel", async () => {
    mockedAxios.post.mockRejectedValueOnce(
      new Error("400 - invalid email address")
    );
    expect(
      resetPassword({
        email: credentials.email,
        storefrontUrl: credentials.storefrontUrl,
      })
    ).rejects.toThrow("400 - invalid email");
    expect(mockedAxios.post).toBeCalledTimes(1);
    expect(mockedAxios.post).toBeCalledWith(
      getCustomerResetPasswordEndpoint(),
      {
        email: credentials.email,
        storefrontUrl: credentials.storefrontUrl,
      }
    );
  });

  it("returns no data if successfully updated", async () => {
    mockedAxios.post.mockResolvedValueOnce(null);

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

    expect(mockedAxios.post).toBeCalledTimes(3);
    expect(mockedAxios.post).toBeCalledWith(
      getCustomerResetPasswordEndpoint(),
      {
        email: credentials.email,
        storefrontUrl: credentials.storefrontUrl,
      }
    );
  });

  it("should set storefrontUrl from config if not provided with params ", async () => {
    await resetPassword({
      email: credentials.email,
    });
    expect(mockedAxios.post).toBeCalledWith(
      "/store-api/v1/account/recovery-password",
      {
        email: credentials.email,
        storefrontUrl: "https://shopware6-demo.vuestorefront.io",
      }
    );
  });

  it("should invokde post method with null if params are not provided", async () => {
    await resetPassword(null as any);
    expect(mockedAxios.post).toBeCalledWith(
      "/store-api/v1/account/recovery-password",
      null
    );
  });
});
