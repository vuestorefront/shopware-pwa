import { ref, Ref, reactive } from "vue-demi";

// // Mock API client
import * as shopwareClient from "@shopware-pwa/shopware-6-client";
jest.mock("@shopware-pwa/shopware-6-client");

const mockedApiClient = shopwareClient as jest.Mocked<typeof shopwareClient>;
const consoleErrorSpy = jest.spyOn(console, "error");
import { SessionContext } from "@shopware-pwa/commons/interfaces/response/SessionContext";
import * as Composables from "@shopware-pwa/composables";
jest.mock("@shopware-pwa/composables");
const mockedComposables = Composables as jest.Mocked<typeof Composables>;
import { useCheckout } from "../src/logic/useCheckout";
import { PaymentMethod } from "@shopware-pwa/commons/interfaces/models/checkout/payment/PaymentMethod";
import { ShippingMethod } from "@shopware-pwa/commons/interfaces/models/checkout/shipping/ShippingMethod";
import { prepareRootContextMock } from "./contextRunner";

describe("Composables - useCheckout", () => {
  let isLoggedIn = ref(false);
  const stateContext: Ref<Partial<SessionContext> | null> = ref(null);
  const sessionContextMock: Ref<Partial<SessionContext> | null> = ref(null);
  const rootContextMock = prepareRootContextMock({
    contextName: "useCheckout",
  });
  const interceptMock = jest.fn();
  const broadcastMock = jest.fn();
  const refreshCartMock = jest.fn(async () => {});
  const stateShippingMethods: Ref<ShippingMethod[]> = ref([]);
  const stateBillingMethods: Ref<PaymentMethod[]> = ref([]);

  beforeEach(() => {
    jest.resetAllMocks();
    isLoggedIn.value = false;
    sessionContextMock.value = null;
    rootContextMock.sharedStore = reactive({});

    mockedComposables.useUser.mockImplementation(() => {
      return {
        isLoggedIn,
        user: ref({ firstName: "Elton" }),
      } as any;
    });
    mockedComposables.useCart.mockImplementation(() => {
      return {
        refreshCart: refreshCartMock,
      } as any;
    });
    mockedComposables.useSessionContext.mockImplementation(() => {
      return {
        sessionContext: sessionContextMock,
      } as any;
    });
    mockedComposables.useIntercept.mockImplementation(() => {
      return {
        broadcast: broadcastMock,
        intercept: interceptMock,
      } as any;
    });
    mockedComposables.useSharedState.mockImplementation(() => {
      return {
        sharedRef: (name: string) => {
          if (name === "useCheckout-ShippingMethods")
            return stateShippingMethods;
          return stateBillingMethods;
        },
      } as any;
    });
    mockedComposables.useVueContext.mockReturnValue({
      isVueComponent: false,
      isVueScope: true,
    });
    mockedComposables.getApplicationContext.mockReturnValue(rootContextMock);

    stateContext.value = null;
    consoleErrorSpy.mockImplementationOnce(() => {});
  });

  describe("computed", () => {
    describe("shippingAddress", () => {
      it("should undefined when guest address is not set", () => {
        const { shippingAddress } = useCheckout();
        expect(shippingAddress.value).toBeUndefined();
      });

      it("should return user address in case of user order", async () => {
        isLoggedIn.value = true;
        sessionContextMock.value = {
          shippingLocation: {
            address: {
              street: "some street",
            },
          },
        } as any;
        const { shippingAddress } = useCheckout();
        expect(shippingAddress.value).toEqual({ street: "some street" });
      });

      it("should return undefined if address is not set", async () => {
        isLoggedIn.value = true;
        stateContext.value = {} as any;
        const { shippingAddress } = useCheckout();
        expect(shippingAddress.value).toBeUndefined();
      });

      it("should return undefined if no session context", async () => {
        isLoggedIn.value = true;
        stateContext.value = null as any;
        const { shippingAddress } = useCheckout();
        expect(shippingAddress.value).toBeUndefined();
      });
    });

    describe("billingAddress", () => {
      it("should return address in case of user order", async () => {
        isLoggedIn.value = true;
        sessionContextMock.value = {
          customer: {
            activeBillingAddress: {
              street: "some street",
            },
          },
        } as any;
        const { billingAddress } = useCheckout();
        expect(billingAddress.value).toEqual({ street: "some street" });
      });

      it("should return undefined if address is not set", async () => {
        isLoggedIn.value = true;
        stateContext.value = {} as any;
        const { billingAddress } = useCheckout();
        expect(billingAddress.value).toBeUndefined();
      });

      it("should return undefined if no session context", async () => {
        isLoggedIn.value = true;
        stateContext.value = null as any;
        const { billingAddress } = useCheckout();
        expect(billingAddress.value).toBeUndefined();
      });
    });
  });

  describe("methods", () => {
    describe("getShippingMethods", () => {
      // clear cache after every test
      afterEach(async () => {
        mockedApiClient.getAvailableShippingMethods.mockResolvedValueOnce(
          [] as any
        );
        const { getShippingMethods } = useCheckout();
        await getShippingMethods({ forceReload: true });
      });
      it("should return Shipping methods from API", async () => {
        mockedApiClient.getAvailableShippingMethods.mockResolvedValueOnce({
          elements: [
            {
              name: "Shipping method 1",
            },
            { name: "Shipping method 2" },
          ],
        } as any);
        const { getShippingMethods } = useCheckout();
        const result = await getShippingMethods();
        expect(result.value).toEqual([
          { name: "Shipping method 1" },
          { name: "Shipping method 2" },
        ]);
      });

      it("should return an empty array if response data is an empty array", async () => {
        mockedApiClient.getAvailableShippingMethods.mockResolvedValueOnce({
          elements: [],
        } as any);
        const { getShippingMethods } = useCheckout();
        const result = await getShippingMethods();
        expect(result.value).toEqual([]);
      });

      it("should return an empty array if response data elements are undefined", async () => {
        stateShippingMethods.value = undefined as any;
        const { getShippingMethods } = useCheckout();
        const result = await getShippingMethods();
        expect(result.value).toEqual([]);
      });

      it("should throw an error if there is a problem with fetching the data", async () => {
        mockedApiClient.getAvailableShippingMethods.mockRejectedValueOnce({
          message: "Some error",
        } as any);
        const { getShippingMethods } = useCheckout();
        await expect(getShippingMethods()).rejects.toEqual({
          message: "Some error",
        });
      });

      it("should not call api if Shipping methods are already in cache", async () => {
        mockedApiClient.getAvailableShippingMethods.mockResolvedValueOnce({
          elements: [
            {
              name: "Shipping method 1",
            },
            { name: "Shipping method 2" },
          ],
        } as any);
        const { getShippingMethods } = useCheckout();

        const result = await getShippingMethods();
        expect(result.value).toEqual([
          { name: "Shipping method 1" },
          { name: "Shipping method 2" },
        ]);
        const secondCallResult = await getShippingMethods();
        expect(secondCallResult.value).toEqual([
          { name: "Shipping method 1" },
          { name: "Shipping method 2" },
        ]);

        expect(mockedApiClient.getAvailableShippingMethods).toBeCalledTimes(1);
      });
      it("should return an empty array if response data is not defined", async () => {
        mockedApiClient.getAvailableShippingMethods.mockResolvedValueOnce(
          undefined as any
        );
        const { getShippingMethods } = useCheckout();
        const result = await getShippingMethods();
        expect(result.value).toEqual([]);
      });
    });

    describe("getPaymentMethods", () => {
      // clear cache after every test
      afterEach(async () => {
        mockedApiClient.getAvailablePaymentMethods.mockResolvedValueOnce({
          elements: [],
        } as any);
        const { getPaymentMethods } = useCheckout();
        await getPaymentMethods({ forceReload: true });
      });
      it("should return Payment methods from API", async () => {
        mockedApiClient.getAvailablePaymentMethods.mockResolvedValueOnce({
          elements: [
            {
              name: "Payment method 1",
            },
            { name: "Payment method 2" },
          ],
        } as any);
        const { getPaymentMethods } = useCheckout();
        const result = await getPaymentMethods();
        expect(result.value).toEqual([
          { name: "Payment method 1" },
          { name: "Payment method 2" },
        ]);
      });

      it("should return an empty array if response data is an empty array", async () => {
        mockedApiClient.getAvailablePaymentMethods.mockResolvedValueOnce(
          [] as any
        );
        const { getPaymentMethods } = useCheckout();
        const result = await getPaymentMethods();
        expect(result.value).toEqual([]);
      });

      it("should return an empty array if response data is not defined", async () => {
        mockedApiClient.getAvailablePaymentMethods.mockResolvedValueOnce(
          undefined as any
        );
        const { getPaymentMethods } = useCheckout();
        const result = await getPaymentMethods();
        expect(result.value).toEqual([]);
      });

      it("should throw an error if there is a problem with fetching the data", async () => {
        mockedApiClient.getAvailablePaymentMethods.mockRejectedValueOnce({
          message: "Some error",
        } as any);
        const { getPaymentMethods } = useCheckout();
        await expect(getPaymentMethods()).rejects.toEqual({
          message: "Some error",
        });
      });

      it("should not call api if Payment methods are already in cache", async () => {
        mockedApiClient.getAvailablePaymentMethods.mockResolvedValueOnce({
          elements: [
            {
              name: "Payment method 1",
            },
            { name: "Payment method 2" },
          ],
        } as any);
        const { getPaymentMethods } = useCheckout();

        const result = await getPaymentMethods();
        expect(result.value).toEqual([
          { name: "Payment method 1" },
          { name: "Payment method 2" },
        ]);
        const secondCallResult = await getPaymentMethods();
        expect(secondCallResult.value).toEqual([
          { name: "Payment method 1" },
          { name: "Payment method 2" },
        ]);

        expect(mockedApiClient.getAvailablePaymentMethods).toBeCalledTimes(1);
      });

      it("should return an empty array if response data elements are undefined", async () => {
        stateBillingMethods.value = undefined as any;
        const { getPaymentMethods } = useCheckout();
        const result = await getPaymentMethods();
        expect(result.value).toEqual([]);
      });
    });
    describe("createOrder", () => {
      it("should refresh cart after method called", async () => {
        isLoggedIn.value = true;
        mockedApiClient.createOrder.mockResolvedValueOnce({} as any);
        const { createOrder } = useCheckout();
        await createOrder();
        expect(refreshCartMock).toHaveBeenCalled();
      });

      it("should pass additional params to the API client's method", async () => {
        mockedApiClient.createOrder.mockResolvedValueOnce({} as any);
        const { createOrder } = useCheckout();
        await createOrder({
          customerComment: "Please don't use plastic materials.",
        });
        expect(mockedApiClient.createOrder).toBeCalledWith(
          { customerComment: "Please don't use plastic materials." },
          expect.any(Function)
        );
      });

      describe("for logged in user", () => {
        beforeEach(() => {
          isLoggedIn.value = true;
        });
        it("should invoke createOrder API method if user is logged in", async () => {
          mockedApiClient.createOrder.mockResolvedValueOnce({
            id: "newOrderId",
          } as any);
          const { createOrder } = useCheckout();
          const result = await createOrder();
          expect(mockedApiClient.createOrder).toHaveBeenCalled();
          expect(result).toEqual({ id: "newOrderId" });
        });

        it("should throw an error if api rejects", async () => {
          mockedApiClient.createOrder.mockRejectedValueOnce({
            message: "some error",
          } as any);
          const { createOrder } = useCheckout();
          await expect(createOrder()).rejects.toEqual({
            message: "some error",
          });
          expect(broadcastMock).toBeCalledWith("error", {
            error: { message: "some error" },
            inputParams: {},
            methodName: "[useCheckout][createOrder]",
          });
        });
      });
    });
    describe("onOrderPlace", () => {
      it("should add interceptor method", () => {
        const { onOrderPlace } = useCheckout();
        onOrderPlace(() => {});
        expect(interceptMock).toHaveBeenCalledWith(
          "onOrderPlace",
          expect.any(Function)
        );
      });
    });
  });
});
