import { getCustomerUpdateEmailEndpoint } from "../../../src/endpoints";
import { apiService } from "../../../src/apiService";
import { internet, random } from "faker";
import { updateEmail, update, config } from "@shopware-pwa/shopware-6-client";

const credentials = {
  email: internet.email(),
  password: internet.password(8),
};

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("CustomerService - updateEmail", () => {
  let contextToken: string;
  beforeEach(() => {
    jest.resetAllMocks();
    contextToken = random.uuid();
    update({ contextToken });
  });
  afterEach(() => {
    expect(config.contextToken).toEqual(contextToken);
  });

  it("rejects the promise if the email confirmation is wrong", async () => {
    mockedAxios.patch.mockRejectedValueOnce(
      new Error("400 - email confirmation is wrong")
    );
    const differentEmail = internet.email();
    expect(
      updateEmail({
        email: credentials.email,
        emailConfirmation: differentEmail,
        password: credentials.password,
      })
    ).rejects.toThrow("400 - email confirmation is wrong");
    expect(mockedAxios.patch).toBeCalledTimes(1);
    expect(mockedAxios.patch).toBeCalledWith(getCustomerUpdateEmailEndpoint(), {
      email: credentials.email,
      emailConfirmation: differentEmail,
      password: credentials.password,
    });
  });

  it("returns no data if successfully updated", async () => {
    mockedAxios.patch.mockResolvedValueOnce(null);
    await updateEmail({
      email: credentials.email,
      emailConfirmation: credentials.email,
      password: credentials.password,
    });
    expect(mockedAxios.patch).toBeCalledTimes(1);
    expect(mockedAxios.patch).toBeCalledWith(getCustomerUpdateEmailEndpoint(), {
      email: credentials.email,
      emailConfirmation: credentials.email,
      password: credentials.password,
    });
  });
});
