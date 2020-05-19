import { getOrderPaymentUrl } from "@shopware-pwa/shopware-6-client";
import { apiService } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("CheckoutService getOrderPaymentUrl", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("should throw an error when orderId is not provided", async () => {
    mockedAxios.post.mockResolvedValueOnce({});

    await expect(
      getOrderPaymentUrl({ orderId: null as any })
    ).rejects.toThrowError("getOrderPaymentUrl method requires orderId");
  });
  it("should return paymentUrl from API", async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        paymentUrl: "/some/payment/url",
      },
    });

    const result = await getOrderPaymentUrl({ orderId: "qwe" });
    expect(mockedAxios.post).toBeCalledTimes(1);
    expect(mockedAxios.post).toBeCalledWith(
      "/sales-channel-api/v1/checkout/order/qwe/pay",
      {
        finishUrl: undefined,
      }
    );
    expect(result.paymentUrl).toEqual("/some/payment/url");
  });

  it("should add finishUrl to payload", async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        paymentUrl: "/some/payment/url",
      },
    });

    await getOrderPaymentUrl({
      orderId: "qwe",
      finishUrl: "/finish/url",
    });
    expect(mockedAxios.post).toBeCalledTimes(1);
    expect(mockedAxios.post).toBeCalledWith(
      "/sales-channel-api/v1/checkout/order/qwe/pay",
      {
        finishUrl: "/finish/url",
      }
    );
  });
});
