import Vue from "vue";
import VueCompositionApi, { ref } from "@vue/composition-api";
Vue.use(VueCompositionApi);

// // Mock API client
import * as shopwareClient from "@shopware-pwa/shopware-6-client";
jest.mock("@shopware-pwa/shopware-6-client");

const mockedApiClient = shopwareClient as jest.Mocked<typeof shopwareClient>;
const consoleErrorSpy = jest.spyOn(console, "error");
import * as Composables from "@shopware-pwa/composables";
import { useCheckout } from "@shopware-pwa/composables";

describe("Composables - useCheckout", () => {
  let isLoggedIn = ref(false);
  const refreshCartMock = jest.fn(async () => {});
  beforeEach(() => {
    jest.resetAllMocks();
    isLoggedIn.value = false;
    jest.spyOn(Composables, "useUser").mockImplementation(() => {
      return {
        isLoggedIn,
      } as any;
    });
    jest.spyOn(Composables, "useCart").mockImplementation(() => {
      return {
        refreshCart: refreshCartMock,
      } as any;
    });
    consoleErrorSpy.mockImplementationOnce(() => {});
  });

  describe("computed", () => {
    describe("isGuestOrder", () => {
      it("should show false if user is logged in", () => {
        isLoggedIn.value = true;
        const { isGuestOrder } = useCheckout();
        expect(isGuestOrder.value).toBe(false);
      });

      it("should show true it user is not logged in", () => {
        isLoggedIn.value = false;
        const { isGuestOrder } = useCheckout();
        expect(isGuestOrder.value).toBe(true);
      });
    });

    describe("guestOrderParams", () => {
      it("should return an empty object when prams are not set", () => {
        const { guestOrderParams } = useCheckout();
        expect(guestOrderParams.value).toEqual({});
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
          total: 2,
          data: [
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

      it("should return an empty array if response data is not defined", async () => {
        mockedApiClient.getAvailableShippingMethods.mockResolvedValueOnce({
          total: 2,
        } as any);
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
          total: 2,
          data: [
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
    });

    describe("getPaymentMethods", () => {
      // clear cache after every test
      afterEach(async () => {
        mockedApiClient.getAvailablePaymentMethods.mockResolvedValueOnce(
          [] as any
        );
        const { getPaymentMethods } = useCheckout();
        await getPaymentMethods({ forceReload: true });
      });
      it("should return Payment methods from API", async () => {
        mockedApiClient.getAvailablePaymentMethods.mockResolvedValueOnce({
          total: 2,
          data: [
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

      it("should return an empty array if response data is not defined", async () => {
        mockedApiClient.getAvailablePaymentMethods.mockResolvedValueOnce({
          total: 2,
        } as any);
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
          total: 2,
          data: [
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
    });
    describe("createOrder", () => {
      it("should refresh cart after method called", async () => {
        isLoggedIn.value = true;
        mockedApiClient.createOrder.mockResolvedValueOnce({} as any);
        const { createOrder } = useCheckout();
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
          expect(consoleErrorSpy).toBeCalledWith(
            "[useCheckout][createOrder] isGuest:false",
            {
              message: "some error",
            }
          );
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
          const { createOrder } = useCheckout();
          const result = await createOrder();
          expect(mockedApiClient.createGuestOrder).toHaveBeenCalled();
          expect(result).toEqual({ id: "newOrderId" });
        });

        it("should add guestOrderParams to guest order", async () => {
          mockedApiClient.createGuestOrder.mockResolvedValueOnce({
            id: "newOrderId",
          } as any);
          const { createOrder, updateGuestOrderParams } = useCheckout();
          updateGuestOrderParams({
            firstName: "John",
          });
          await createOrder();
          expect(mockedApiClient.createGuestOrder).toHaveBeenCalledWith({
            firstName: "John",
          });
        });

        it("should throw an error if guest api rejects", async () => {
          mockedApiClient.createGuestOrder.mockRejectedValueOnce({
            message: "some guest error",
          } as any);
          const { createOrder } = useCheckout();
          await expect(createOrder()).rejects.toEqual({
            message: "some guest error",
          });
          expect(consoleErrorSpy).toBeCalledWith(
            "[useCheckout][createOrder] isGuest:true",
            {
              message: "some guest error",
            }
          );
        });
      });
    });
  });
});
