import * as Composables from "@shopware-pwa/composables";
jest.mock("@shopware-pwa/composables");
const mockedComposables = Composables as jest.Mocked<typeof Composables>;
import { useOrderDetails } from "../src/logic/useOrderDetails";
import * as shopwareClient from "@shopware-pwa/shopware-6-client";
import { ref, Ref } from "@vue/composition-api";
import { prepareRootContextMock } from "./contextRunner";

jest.mock("@shopware-pwa/shopware-6-client");
const mockedAxios = shopwareClient as jest.Mocked<typeof shopwareClient>;

describe("Composables - useOrderDetails", () => {
  const stateOrderDetails: Ref<Object | null> = ref(null);

  const mockedBroadcast = jest.fn();
  const rootContextMock = prepareRootContextMock();

  beforeEach(() => {
    jest.resetAllMocks();
    mockedComposables.useSharedState.mockImplementation(() => {
      return {
        sharedRef: () => stateOrderDetails,
      } as any;
    });
    mockedAxios.getProductDetailsEndpoint.mockReturnValue(
      "/product/v4/product-id"
    );
    mockedComposables.useDefaults.mockReturnValue({
      getDefaults: () => ({}),
    } as any);

    mockedComposables.useIntercept.mockReturnValue({
      broadcast: mockedBroadcast,
    } as any);

    mockedComposables.useVueContext.mockReturnValue({
      isVueComponent: false,
      isVueScope: true,
    });
    mockedComposables.getApplicationContext.mockReturnValue(rootContextMock);
  });
  describe("on init", () => {
    it("should export exact the same order and other properties as undefined or default", () => {
      stateOrderDetails.value = {
        id: "order-id",
      };
      const {
        order,
        status,
        total,
        subtotal,
        shippingCosts,
        shippingAddress,
        billingAddress,
        personalDetails,
        paymentUrl,
        shippingMethod,
        paymentMethod,
        errors,
        loaders,
      } = useOrderDetails({ order: { id: "order-id" } } as any);
      expect(order.value).toStrictEqual({
        id: "order-id",
      });
      expect(status.value).toBeUndefined();
      expect(subtotal.value).toBeUndefined();
      expect(total.value).toBeUndefined();
      expect(shippingCosts.value).toBeUndefined();
      expect(shippingAddress.value).toBeUndefined();
      expect(billingAddress.value).toBeUndefined();
      expect(personalDetails.value).toStrictEqual({
        email: undefined,
        firstName: undefined,
        lastName: undefined,
      });
      expect(paymentUrl.value).toBeUndefined();
      expect(shippingMethod.value).toBeUndefined();
      expect(paymentMethod.value).toBeUndefined();
      expect(errors.value).toBeUndefined();
      expect(loaders.value).toBeUndefined();
    });
  });
  describe("computed", () => {
    beforeEach(() => {
      stateOrderDetails.value = {
        id: "order-id",
        transactions: [
          {
            paymentMethod: {
              name: "PayPal",
            },
          },
        ],
        deliveries: [
          {
            location: {
              address: {
                id: "delivery-address-id",
              },
            },
            shippingMethod: {
              name: "Express",
            },
          },
        ],
        orderCustomer: {
          email: "customer@shopware",
          firstName: "Joe",
          lastName: "Doe",
        },
        billingAddressId: "billing-address-id",
        addresses: [
          {
            id: "billing-address-id",
          },
          {
            id: "shipping-address-id",
          },
        ],
        shippingCosts: {
          totalPrice: 10.0,
        },
        price: {
          positionPrice: 90.0,
          totalPrice: 100.0,
        },
        stateMachineState: {
          name: "Open",
        },
      };
    });
    it("should have proper status extracted from order object", () => {
      const { status } = useOrderDetails({
        order: {
          id: "some-order-id",
        } as any,
      });
      expect(status.value).toBe("Open");
    });
    it("should have total status extracted from order object", () => {
      const { total } = useOrderDetails({
        order: {
          id: "some-order-id",
        } as any,
      });
      expect(total.value).toBe(100);
    });
    it("should have proper subtotal extracted from order object", () => {
      const { subtotal } = useOrderDetails({
        order: {
          id: "some-order-id",
        } as any,
      });
      expect(subtotal.value).toBe(90);
    });
    it("should have proper shippingCosts extracted from order object", () => {
      const { shippingCosts } = useOrderDetails({
        order: {
          id: "some-order-id",
        } as any,
      });
      expect(shippingCosts.value).toBe(10);
    });
    it("should have proper shippingCosts extracted from order object", () => {
      const { shippingCosts } = useOrderDetails({
        order: {
          id: "some-order-id",
        } as any,
      });
      expect(shippingCosts.value).toBe(10);
    });
    it("should have proper shippingAddress extracted from order object", () => {
      const { shippingAddress } = useOrderDetails({
        order: {
          id: "some-order-id",
        } as any,
      });
      expect(shippingAddress.value).toStrictEqual({
        id: "delivery-address-id",
      });
    });
    it("should have proper billingAddress extracted from order object", () => {
      const { billingAddress } = useOrderDetails({
        order: {
          id: "some-order-id",
        } as any,
      });
      expect(billingAddress.value).toStrictEqual({ id: "billing-address-id" });
    });
    it("should have proper personalDetails extracted from order object", () => {
      const { personalDetails } = useOrderDetails({
        order: {
          id: "some-order-id",
        } as any,
      });
      expect(personalDetails.value).toStrictEqual({
        email: "customer@shopware",
        firstName: "Joe",
        lastName: "Doe",
      });
    });
    it("should have proper shippingMethod extracted from order object", () => {
      const { shippingMethod } = useOrderDetails({
        order: {
          id: "some-order-id",
        } as any,
      });
      expect(shippingMethod.value).toStrictEqual({ name: "Express" });
    });
    it("should have proper paymentMethod extracted from order object", () => {
      const { paymentMethod } = useOrderDetails({
        order: {
          id: "some-order-id",
        } as any,
      });
      expect(paymentMethod.value).toStrictEqual({ name: "PayPal" });
    });
  });
  describe("methods", () => {
    beforeEach(() => {
      stateOrderDetails.value = null;
    });
    describe("loadOrderDetails", () => {
      it("should invoke getOrderDetails method from api-client package", async () => {
        mockedAxios.getOrderDetails.mockResolvedValueOnce({
          id: "some-order-id",
          translated: {},
        } as any);
        const { loadOrderDetails, order } = useOrderDetails({
          order: {
            id: "some-order-id",
          } as any,
        });
        await loadOrderDetails();
        expect(order.value).toStrictEqual({
          id: "some-order-id",
          translated: {},
        });
        expect(mockedAxios.getOrderDetails).toBeCalledTimes(1);
      });
      it("should invoke getOrderDetails method from api-client package and catch the rejection from API", async () => {
        mockedAxios.getOrderDetails.mockRejectedValueOnce({
          messages: "Some error",
        } as any);
        const { loadOrderDetails, errors, order } = useOrderDetails({
          order: { id: "some-order-id" } as any,
        });
        await loadOrderDetails();
        expect(mockedAxios.getOrderDetails).toBeCalledWith(
          "some-order-id",
          expect.any(Object),
          rootContextMock.apiInstance
        );
        expect(mockedAxios.getOrderDetails).toBeCalledTimes(1);
        expect(errors.loadOrderDetails).toBe("Some error");
        expect(order.value).toBeNull();
      });
      it("should return undefined for computed values that depends on order object fetched from order details endpoint - in case of undefined response", async () => {
        mockedAxios.getOrderDetails.mockResolvedValueOnce(undefined as any);
        const {
          loadOrderDetails,
          order,
          status,
          total,
          subtotal,
          shippingCosts,
          shippingAddress,
          billingAddress,
          personalDetails,
          paymentUrl,
          shippingMethod,
          paymentMethod,
        } = useOrderDetails({ order: undefined as any });

        await loadOrderDetails();

        expect(order.value).toBeNull();
        expect(status.value).toBeUndefined();
        expect(subtotal.value).toBeUndefined();
        expect(total.value).toBeUndefined();
        expect(shippingCosts.value).toBeUndefined();
        expect(shippingAddress.value).toBeUndefined();
        expect(billingAddress.value).toBeUndefined();
        expect(personalDetails.value).toStrictEqual({
          email: undefined,
          firstName: undefined,
          lastName: undefined,
        });
        expect(paymentUrl.value).toBeUndefined();
        expect(shippingMethod.value).toBeUndefined();
        expect(paymentMethod.value).toBeUndefined();
      });
    });
    describe("handlePayment", () => {
      it("should invoke handlePayment method from api-client package and assign paymentUrl from the response", async () => {
        mockedAxios.handlePayment.mockResolvedValueOnce({
          redirectUrl: "https://external-payment-url",
        } as any);
        const { handlePayment, paymentUrl } = useOrderDetails({
          order: {
            id: "some-order-id",
          } as any,
        });
        await handlePayment("https://success-url", "https://failure-url");
        expect(mockedAxios.handlePayment).toBeCalledWith(
          {
            orderId: "some-order-id",
            finishUrl: "https://success-url",
            errorUrl: "https://failure-url",
          },
          rootContextMock.apiInstance
        );
        expect(mockedAxios.handlePayment).toBeCalledTimes(1);
        expect(paymentUrl.value).toBe("https://external-payment-url");
      });
      it("should invoke handlePayment method from api-client package and assign undefined if there is no url in the response", async () => {
        mockedAxios.handlePayment.mockResolvedValueOnce(undefined as any);
        const { handlePayment, paymentUrl } = useOrderDetails({
          order: {
            id: "some-order-id",
          } as any,
        });
        await handlePayment("https://success-url", "https://failure-url");
        expect(paymentUrl.value).toBeUndefined();
      });
      it("should invoke handlePayment method from api-client package and catch the rejection from API", async () => {
        mockedAxios.handlePayment.mockRejectedValueOnce({
          messages: "Some error",
        } as any);
        const { handlePayment, errors, paymentUrl } = useOrderDetails({
          order: { id: "some-order-id" } as any,
        });
        await handlePayment();
        expect(paymentUrl.value).toBeUndefined();
        expect(errors.handlePayment).toBe("Some error");
      });
    });
    describe("cancel", () => {
      it("should invoke cancelOrder method from api-client package and assign paymentUrl from the response", async () => {
        mockedAxios.cancelOrder.mockResolvedValueOnce({} as any);
        const { cancel } = useOrderDetails({
          order: {
            id: "some-order-id",
          } as any,
        });
        await cancel();
        expect(mockedAxios.cancelOrder).toBeCalledWith(
          "some-order-id",
          rootContextMock.apiInstance
        );
        expect(mockedAxios.cancelOrder).toBeCalledTimes(1);
      });
      it("should invoke cancelOrder method from api-client package and catch the rejection from API", async () => {
        mockedAxios.cancelOrder.mockRejectedValueOnce({
          messages: "Some error",
        } as any);
        const { cancel, errors } = useOrderDetails({
          order: {
            id: "some-order-id",
          } as any,
        });
        await cancel();
        expect(errors.cancel).toBe("Some error");
      });
    });
    describe("changePaymentMethod", () => {
      it("should invoke changePaymentMethod method from api-client package and assign paymentUrl from the response", async () => {
        mockedAxios.changeOrderPaymentMethod.mockResolvedValueOnce({} as any);
        const { changePaymentMethod } = useOrderDetails({
          order: {
            id: "some-order-id",
          } as any,
        });
        await changePaymentMethod("new-payment-method-id");
        expect(mockedAxios.changeOrderPaymentMethod).toBeCalledWith(
          "some-order-id",
          "new-payment-method-id",
          rootContextMock.apiInstance
        );
        expect(mockedAxios.changeOrderPaymentMethod).toBeCalledTimes(1);
      });
      it("should invoke changePaymentMethod method from api-client package and catch the rejection from API", async () => {
        mockedAxios.changeOrderPaymentMethod.mockRejectedValueOnce({
          messages: "Some error",
        } as any);
        const { changePaymentMethod, errors } = useOrderDetails({
          order: { id: "some-order-id" } as any,
        });
        await changePaymentMethod("new-payment-method-id");
        expect(errors.changePaymentMethod).toBe("Some error");
      });
    });
  });
});
