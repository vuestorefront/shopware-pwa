import { getOrderPaymentUrl } from "@shopware-pwa/shopware-6-client";
import { defaultInstance } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;

describe("CheckoutService getOrderPaymentUrl", () => {
  const mockedPost = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockedApiInstance.invoke = {
      post: mockedPost,
    } as any;
  });
  it("should throw an error when orderId is not provided", async () => {
    mockedPost.mockResolvedValueOnce({});

    await expect(
      getOrderPaymentUrl({ orderId: null as any })
    ).rejects.toThrowError("getOrderPaymentUrl method requires orderId");
  });
  it("should return paymentUrl from API", async () => {
    mockedPost.mockResolvedValueOnce({
      data: {
        paymentUrl: "/some/payment/url",
      },
    });

    const result = await getOrderPaymentUrl({ orderId: "qwe" });
    expect(mockedPost).toBeCalledTimes(1);
    expect(mockedPost).toBeCalledWith(
      "/sales-channel-api/v3/checkout/order/qwe/pay",
      {
        finishUrl: undefined,
      }
    );
    expect(result.paymentUrl).toEqual("/some/payment/url");
  });

  it("should add finishUrl to payload", async () => {
    mockedPost.mockResolvedValueOnce({
      data: {
        paymentUrl: "/some/payment/url",
      },
    });

    await getOrderPaymentUrl({
      orderId: "qwe",
      finishUrl: "/finish/url",
    });
    expect(mockedPost).toBeCalledTimes(1);
    expect(mockedPost).toBeCalledWith(
      "/sales-channel-api/v3/checkout/order/qwe/pay",
      {
        finishUrl: "/finish/url",
      }
    );
  });
});
