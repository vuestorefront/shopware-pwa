import Vue from "vue";
import VueCompositionApi, { ref, Ref } from "@vue/composition-api";
Vue.use(VueCompositionApi);

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

describe("Composables - useCheckout", () => {
  let isLoggedIn = ref(false);
  const stateContext: Ref<Partial<SessionContext> | null> = ref(null);
  const sessionContextMock: Ref<Partial<SessionContext> | null> = ref(null);
  const rootContextMock: any = {
    $shopwareApiInstance: jest.fn(),
  };
  const interceptMock = jest.fn();
  const broadcastMock = jest.fn();
  const refreshCartMock = jest.fn(async () => {});
  beforeEach(() => {
    jest.resetAllMocks();
    isLoggedIn.value = false;
    sessionContextMock.value = null;

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
    stateContext.value = null;
    consoleErrorSpy.mockImplementationOnce(() => {});
  });

  describe("computed", () => {
    describe("isGuestOrder", () => {
      it("should show false if user is logged in", () => {
        isLoggedIn.value = true;
        const { isGuestOrder } = useCheckout(rootContextMock);
        expect(isGuestOrder.value).toBe(false);
      });

      it("should show true it user is not logged in", () => {
        isLoggedIn.value = false;
        const { isGuestOrder } = useCheckout(rootContextMock);
        expect(isGuestOrder.value).toBe(true);
      });
    });

    describe("guestOrderParams", () => {
      it("should return an empty object when prams are not set", () => {
        const { guestOrderParams } = useCheckout(rootContextMock);
        expect(guestOrderParams.value).toEqual({});
      });
    });

    describe("shippingAddress", () => {
      it("should return guest order address if is guest order", () => {
        const { shippingAddress, updateGuestOrderParams } = useCheckout(
          rootContextMock
        );
        updateGuestOrderParams({
          shippingAddress: {
            street: "first street",
          },
        } as any);
        expect(shippingAddress.value).toEqual({ street: "first street" });
        updateGuestOrderParams({
          shippingAddress: undefined,
        } as any);
      });

      it("should undefined when guest address is not set", () => {
        const { shippingAddress } = useCheckout(rootContextMock);
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
        const { shippingAddress } = useCheckout(rootContextMock);
        expect(shippingAddress.value).toEqual({ street: "some street" });
      });

      it("should return undefined if address is not set", async () => {
        isLoggedIn.value = true;
        stateContext.value = {} as any;
        const { shippingAddress } = useCheckout(rootContextMock);
        expect(shippingAddress.value).toBeUndefined();
      });

      it("should return undefined if no session context", async () => {
        isLoggedIn.value = true;
        stateContext.value = null as any;
        const { shippingAddress } = useCheckout(rootContextMock);
        expect(shippingAddress.value).toBeUndefined();
      });
    });

    describe("billingAddress", () => {
      it("should return guest order address if is guest order", () => {
        const { billingAddress, updateGuestOrderParams } = useCheckout(
          rootContextMock
        );
        updateGuestOrderParams({
          billingAddress: {
            street: "third street",
          },
        } as any);
        expect(billingAddress.value).toEqual({ street: "third street" });
        updateGuestOrderParams({
          billingAddress: undefined,
        } as any);
      });

      it("should return undefined when guest billing address is not set", () => {
        const { billingAddress, updateGuestOrderParams } = useCheckout(
          rootContextMock
        );
        updateGuestOrderParams({
          billingAddress: {
            street: "third street",
          },
        } as any);
        expect(billingAddress.value).toEqual({ street: "third street" });
        updateGuestOrderParams({
          billingAddress: undefined,
        } as any);
      });

      it("should return address in case of user order", async () => {
        isLoggedIn.value = true;
        sessionContextMock.value = {
          customer: {
            activeBillingAddress: {
              street: "some street",
            },
          },
        } as any;
        const { billingAddress } = useCheckout(rootContextMock);
        await Vue.nextTick();
        expect(billingAddress.value).toEqual({ street: "some street" });
      });

      it("should return undefined if address is not set", async () => {
        isLoggedIn.value = true;
        stateContext.value = {} as any;
        const { billingAddress } = useCheckout(rootContextMock);
        expect(billingAddress.value).toBeUndefined();
      });

      it("should return undefined if no session context", async () => {
        isLoggedIn.value = true;
        stateContext.value = null as any;
        const { billingAddress } = useCheckout(rootContextMock);
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
        const { getShippingMethods } = useCheckout(rootContextMock);
        await getShippingMethods({ forceReload: true });
      });
      it("should return Shipping methods from API", async () => {
        mockedApiClient.getAvailableShippingMethods.mockResolvedValueOnce([
          {
            name: "Shipping method 1",
          },
          { name: "Shipping method 2" },
        ] as any);
        const { getShippingMethods } = useCheckout(rootContextMock);
        const result = await getShippingMethods();
        expect(result.value).toEqual([
          { name: "Shipping method 1" },
          { name: "Shipping method 2" },
        ]);
      });

      it("should return an empty array if response data is an empty array", async () => {
        mockedApiClient.getAvailableShippingMethods.mockResolvedValueOnce(
          [] as any
        );
        const { getShippingMethods } = useCheckout(rootContextMock);
        const result = await getShippingMethods();
        expect(result.value).toEqual([]);
      });

      it("should throw an error if there is a problem with fetching the data", async () => {
        mockedApiClient.getAvailableShippingMethods.mockRejectedValueOnce({
          message: "Some error",
        } as any);
        const { getShippingMethods } = useCheckout(rootContextMock);
        await expect(getShippingMethods()).rejects.toEqual({
          message: "Some error",
        });
      });

      it("should not call api if Shipping methods are already in cache", async () => {
        mockedApiClient.getAvailableShippingMethods.mockResolvedValueOnce([
          {
            name: "Shipping method 1",
          },
          { name: "Shipping method 2" },
        ] as any);
        const { getShippingMethods } = useCheckout(rootContextMock);

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
        const { getShippingMethods } = useCheckout(rootContextMock);
        const result = await getShippingMethods();
        expect(result.value).toEqual([]);
      });
    });

    describe("getPaymentMethods", () => {
      // clear cache after every test
      afterEach(async () => {
        mockedApiClient.getAvailablePaymentMethods.mockResolvedValueOnce(
          [] as any
        );
        const { getPaymentMethods } = useCheckout(rootContextMock);
        await getPaymentMethods({ forceReload: true });
      });
      it("should return Payment methods from API", async () => {
        mockedApiClient.getAvailablePaymentMethods.mockResolvedValueOnce([
          {
            name: "Payment method 1",
          },
          { name: "Payment method 2" },
        ] as any);
        const { getPaymentMethods } = useCheckout(rootContextMock);
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
        const { getPaymentMethods } = useCheckout(rootContextMock);
        const result = await getPaymentMethods();
        expect(result.value).toEqual([]);
      });

      it("should return an empty array if response data is not defined", async () => {
        mockedApiClient.getAvailablePaymentMethods.mockResolvedValueOnce(
          undefined as any
        );
        const { getPaymentMethods } = useCheckout(rootContextMock);
        const result = await getPaymentMethods();
        expect(result.value).toEqual([]);
      });

      it("should throw an error if there is a problem with fetching the data", async () => {
        mockedApiClient.getAvailablePaymentMethods.mockRejectedValueOnce({
          message: "Some error",
        } as any);
        const { getPaymentMethods } = useCheckout(rootContextMock);
        await expect(getPaymentMethods()).rejects.toEqual({
          message: "Some error",
        });
      });

      it("should not call api if Payment methods are already in cache", async () => {
        mockedApiClient.getAvailablePaymentMethods.mockResolvedValueOnce([
          {
            name: "Payment method 1",
          },
          { name: "Payment method 2" },
        ] as any);
        const { getPaymentMethods } = useCheckout(rootContextMock);

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
    });
    describe("createOrder", () => {
      it("should refresh cart after method called", async () => {
        isLoggedIn.value = true;
        mockedApiClient.createOrder.mockResolvedValueOnce({} as any);
        const { createOrder } = useCheckout(rootContextMock);
        await createOrder();
        expect(refreshCartMock).toHaveBeenCalled();
      });

      describe("for logged in user", () => {
        beforeEach(() => {
          isLoggedIn.value = true;
        });
        it("should invoke createOrder API method if user is logged in", async () => {
          mockedApiClient.createOrder.mockResolvedValueOnce({
            id: "newOrderId",
          } as any);
          const { createOrder } = useCheckout(rootContextMock);
          const result = await createOrder();
          expect(mockedApiClient.createOrder).toHaveBeenCalled();
          expect(result).toEqual({ id: "newOrderId" });
        });

        it("should throw an error if api rejects", async () => {
          mockedApiClient.createOrder.mockRejectedValueOnce({
            message: "some error",
          } as any);
          const { createOrder } = useCheckout(rootContextMock);
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

      describe("for guest", () => {
        beforeEach(() => {
          isLoggedIn.value = false;
        });
        it("should invoke createGuestOrder API method if user is a guest", async () => {
          mockedApiClient.createGuestOrder.mockResolvedValueOnce({
            id: "newOrderId",
          } as any);
          const { createOrder } = useCheckout(rootContextMock);
          const result = await createOrder();
          expect(mockedApiClient.createGuestOrder).toHaveBeenCalled();
          expect(result).toEqual({ id: "newOrderId" });
        });

        it("should add guestOrderParams to guest order", async () => {
          mockedApiClient.createGuestOrder.mockResolvedValueOnce({
            id: "newOrderId",
          } as any);
          const { createOrder, updateGuestOrderParams } = useCheckout(
            rootContextMock
          );
          updateGuestOrderParams({
            firstName: "John",
          });
          await createOrder();
          expect(mockedApiClient.createGuestOrder).toHaveBeenCalledWith(
            {
              firstName: "John",
            },
            rootContextMock.$shopwareApiInstance
          );
        });

        it("should throw an error if guest api rejects", async () => {
          mockedApiClient.createGuestOrder.mockRejectedValueOnce({
            message: "some guest error",
          } as any);
          const { createOrder } = useCheckout(rootContextMock);
          await expect(createOrder()).rejects.toEqual({
            message: "some guest error",
          });
          expect(broadcastMock).toBeCalledWith("error", {
            error: { message: "some guest error" },
            inputParams: {},
            methodName: "[useCheckout][createOrder]",
          });
        });
      });
    });
    describe("onOrderPlace", () => {
      it("should add interceptor method", () => {
        const { onOrderPlace } = useCheckout(rootContextMock);
        onOrderPlace(() => {});
        expect(interceptMock).toHaveBeenCalledWith(
          "onOrderPlace",
          expect.any(Function)
        );
      });
    });
  });
});
