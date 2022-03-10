import { defaultInstance } from "../../../src/apiService";
import { setDefaultCustomerPaymentMethod } from "@shopware-pwa/shopware-6-client";

jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;

describe("CustomerService - setDefaultCustomerPaymentMethod", () => {
  const mockedPost = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockedApiInstance.invoke = {
      post: mockedPost,
    } as any;
  });

  it("rejects the promise if provided payment method ID does not exist", async () => {
    mockedPost.mockRejectedValueOnce(
      new Error("400 - payment method does not exist")
    );
    expect(setDefaultCustomerPaymentMethod("1234")).rejects.toThrow(
      "400 - payment method does not exist"
    );
    expect(mockedPost).toBeCalledTimes(1);
    expect(mockedPost).toBeCalledWith("/account/change-payment-method/1234");
  });

  it("returns some data if successfully set", async () => {
    mockedPost.mockResolvedValueOnce({ data: {} });
    const result = await setDefaultCustomerPaymentMethod("12345");
    expect(result).toStrictEqual({});
    expect(mockedPost).toBeCalledTimes(1);
    expect(mockedPost).toBeCalledWith("/account/change-payment-method/12345");
  });
});
