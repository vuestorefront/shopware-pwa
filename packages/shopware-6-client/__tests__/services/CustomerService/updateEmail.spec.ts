import { getCustomerUpdateEmailEndpoint } from "../../../src/endpoints";
import { defaultInstance } from "../../../src/apiService";
import { internet } from "faker";
import { updateEmail } from "@shopware-pwa/shopware-6-client";

const credentials = {
  email: internet.email(),
  password: internet.password(8),
};

jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;

describe("CustomerService - updateEmail", () => {
  const mockedPost = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockedApiInstance.invoke = {
      post: mockedPost,
    } as any;
  });

  it("rejects the promise if the email confirmation is wrong", async () => {
    mockedPost.mockRejectedValueOnce(
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
    expect(mockedPost).toBeCalledTimes(1);
    expect(mockedPost).toBeCalledWith(getCustomerUpdateEmailEndpoint(), {
      email: credentials.email,
      emailConfirmation: differentEmail,
      password: credentials.password,
    });
  });

  it("returns no data if successfully updated", async () => {
    mockedPost.mockResolvedValueOnce(null);
    await updateEmail({
      email: credentials.email,
      emailConfirmation: credentials.email,
      password: credentials.password,
    });
    expect(mockedPost).toBeCalledTimes(1);
    expect(mockedPost).toBeCalledWith(getCustomerUpdateEmailEndpoint(), {
      email: credentials.email,
      emailConfirmation: credentials.email,
      password: credentials.password,
    });
  });
});
