import { Ref, ref } from "vue-demi";
// Mock API client
import * as shopwareClient from "@shopware-pwa/shopware-6-client";
jest.mock("@shopware-pwa/shopware-6-client");

const mockedApiClient = shopwareClient as jest.Mocked<typeof shopwareClient>;
const consoleErrorSpy = jest.spyOn(console, "error");

import * as Composables from "@shopware-pwa/composables";
jest.mock("@shopware-pwa/composables");
const mockedComposables = Composables as jest.Mocked<typeof Composables>;

import { useSessionContext } from "../src/logic/useSessionContext";
import { SessionContext } from "@shopware-pwa/commons/interfaces/response/SessionContext";

describe("Composables - useSessionContext", () => {
  const stateContext: Ref<Partial<SessionContext> | null> = ref(null);

  const apiMock = jest.fn();
  const rootContextMock: any = {
    $shopwareApiInstance: apiMock,
    apiInstance: apiMock,
  };
  const interceptMock = jest.fn();
  const broadcastMock = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
    stateContext.value = null;
    consoleErrorSpy.mockImplementationOnce(() => {});
    mockedComposables.useIntercept.mockImplementation(() => {
      return {
        broadcast: broadcastMock,
        intercept: interceptMock,
      } as any;
    });
    mockedComposables.useNotifications.mockImplementation(() => {
      return {
        pushWarning: jest.fn(),
        pushSuccess: jest.fn(),
        pushError: jest.fn(),
      } as any;
    });
    mockedComposables.getApplicationContext.mockImplementation(() => {
      return rootContextMock as any;
    });
    mockedComposables.useSharedState.mockImplementation(() => {
      return {
        sharedRef: () => stateContext,
      } as any;
    });
  });

  describe("computed", () => {
    describe("countryId", () => {
      it("should return default sales channel's country id", () => {
        stateContext.value = {
          salesChannel: {
            countryId: "some-country-id",
          },
        } as any;
        const { countryId } = useSessionContext();
        expect(countryId.value).toBe("some-country-id");
      });

      it("should return undefined if there's no sales channel's country id", () => {
        stateContext.value = undefined as any;
        const { countryId } = useSessionContext();
        expect(countryId.value).toBeUndefined();
      });
    });
    describe("sessionContext", () => {
      it("should return null when no session context", () => {
        const { sessionContext } = useSessionContext();
        expect(sessionContext.value).toBeNull();
      });

      it("should return a proper session context", () => {
        stateContext.value = { token: "qwe" };
        const { sessionContext } = useSessionContext();
        expect(sessionContext.value).toEqual({ token: "qwe" });
      });
    });

    describe("shippingMethod", () => {
      it("should return null when there is no shipping method", () => {
        const { shippingMethod } = useSessionContext();
        expect(shippingMethod.value).toBeNull();
      });

      it("should return shipping method when is set", () => {
        stateContext.value = { shippingMethod: { id: "qwe" } as any };
        const { shippingMethod } = useSessionContext();
        expect(shippingMethod.value).toEqual({ id: "qwe" });
      });
    });

    describe("paymentMethod", () => {
      it("should return null when there is no shipping method", () => {
        const { paymentMethod } = useSessionContext();
        expect(paymentMethod.value).toBeNull();
      });

      it("should return shipping method when is set", () => {
        stateContext.value = { paymentMethod: { id: "qwe" } as any };
        const { paymentMethod } = useSessionContext();
        expect(paymentMethod.value).toEqual({ id: "qwe" });
      });
    });

    describe("currency", () => {
      it("should return null when session context value is null", () => {
        stateContext.value = null;
        const { currency } = useSessionContext();
        expect(currency.value).toBeNull();
      });

      it("should return null when session context doesn't have currency property", () => {
        stateContext.value = {};
        const { currency } = useSessionContext();
        expect(currency.value).toBeNull();
      });
      it("should return currency from context", () => {
        stateContext.value = { currency: { sign: "$$" } } as any;
        const { currency } = useSessionContext();
        expect(currency.value).toEqual({ sign: "$$" });
      });
    });
    describe("activeBillingAddress", () => {
      it("should return activeBillingAddress from context", () => {
        stateContext.value = {
          customer: {
            activeBillingAddress: {
              id: "address-billing-id",
            },
          },
        } as any;
        const { activeBillingAddress } = useSessionContext();
        expect(activeBillingAddress.value).toStrictEqual({
          id: "address-billing-id",
        });
      });
      it("should not return activeBillingAddress from context if there is no customer", () => {
        stateContext.value = {
          customer: undefined,
        } as any;
        const { activeBillingAddress } = useSessionContext();
        expect(activeBillingAddress.value).toBeNull();
      });
      it("should not return activeBillingAddress from context if there is no context", () => {
        stateContext.value = null as any;
        const { activeBillingAddress } = useSessionContext();
        expect(activeBillingAddress.value).toBeNull();
      });
    });
    describe("activeShippingAddress", () => {
      it("should return activeShippingAddress from context", () => {
        stateContext.value = {
          customer: {
            activeShippingAddress: {
              id: "address-shipping-id",
            },
          },
        } as any;
        const { activeShippingAddress } = useSessionContext();
        expect(activeShippingAddress.value).toStrictEqual({
          id: "address-shipping-id",
        });
      });
      it("should not return activeShippingAddress from context if there is no customer", () => {
        stateContext.value = {
          customer: undefined,
        } as any;
        const { activeShippingAddress } = useSessionContext();
        expect(activeShippingAddress.value).toBeNull();
      });
      it("should not return activeShippingAddress from context if there is no context", () => {
        stateContext.value = null as any;
        const { activeShippingAddress } = useSessionContext();
        expect(activeShippingAddress.value).toBeNull();
      });
    });
  });

  describe("methods", () => {
    describe("setCurrency", () => {
      it("should not call API client setCurrentCurrency with not argument provided", async () => {
        const { setCurrency } = useSessionContext();
        try {
          await setCurrency(undefined as any);
        } catch (e) {
          expect(e.message).toBe(
            "You need to provide currency id in order to set currency."
          );
        }
        expect(mockedApiClient.setCurrentCurrency).toBeCalledTimes(0);
      });
      it("should not call API client setCurrentCurrency ", async () => {
        const { setCurrency } = useSessionContext();
        try {
          await setCurrency({ id: null } as any);
        } catch (e) {
          expect(e.message).toBe(
            "You need to provide currency id in order to set currency."
          );
        }
        expect(mockedApiClient.setCurrentCurrency).toBeCalledTimes(0);
      });
      it("should call API client setCurrentCurrency ", async () => {
        const { setCurrency } = useSessionContext();
        await setCurrency({ id: "euro-id" } as any);

        expect(mockedApiClient.setCurrentCurrency).toBeCalledTimes(1);
        expect(mockedApiClient.setCurrentCurrency).toBeCalledWith(
          "euro-id",
          rootContextMock.$shopwareApiInstance
        );
      });
    }),
      describe("refreshSessionContext", () => {
        it("should get context from api", async () => {
          mockedApiClient.getSessionContext.mockResolvedValueOnce({
            token: "qwe",
          } as any);
          const { sessionContext, refreshSessionContext } = useSessionContext();
          await refreshSessionContext();
          expect(sessionContext.value).toEqual({ token: "qwe" });
        });

        it("should not set context on api rejection and show console error", async () => {
          mockedApiClient.getSessionContext.mockRejectedValueOnce({
            message: "Some error",
          } as any);
          const { sessionContext, refreshSessionContext } = useSessionContext();
          await refreshSessionContext();
          expect(sessionContext.value).toBeNull();
          expect(stateContext.value).toBeNull();
          expect(consoleErrorSpy).toBeCalledWith(
            "[UseSessionContext][refreshSessionContext]",
            {
              message: "Some error",
            }
          );
        });
      });

    describe("setShippingMethod", () => {
      it("should set shipping method", async () => {
        mockedApiClient.setCurrentShippingMethod.mockResolvedValueOnce({
          shippingMethod: {
            id: "qwe",
          },
        } as any);
        const { setShippingMethod } = useSessionContext();
        await setShippingMethod({ id: "methodId" });
        expect(mockedApiClient.setCurrentShippingMethod).toBeCalledWith(
          "methodId",
          rootContextMock.$shopwareApiInstance
        );
      });

      it("should throw an error if shipping method cannot be set", async () => {
        mockedApiClient.setCurrentShippingMethod.mockRejectedValueOnce({
          message: "Some error",
        } as any);
        const { setShippingMethod } = useSessionContext();
        await expect(setShippingMethod({ id: "qwe" })).rejects.toEqual({
          message: "Some error",
        });
      });

      it("should throw an error if shipping method is not provided", async () => {
        const { setShippingMethod } = useSessionContext();
        await expect(setShippingMethod(undefined as any)).rejects.toThrowError(
          "You need to provide shipping method id in order to set shipping method."
        );
      });

      it("should throw an error if shipping method is empty reference", async () => {
        const { setShippingMethod } = useSessionContext();
        await expect(setShippingMethod(null as any)).rejects.toThrowError(
          "You need to provide shipping method id in order to set shipping method."
        );
      });
    });

    describe("setPaymentMethod", () => {
      it("should set payment method", async () => {
        mockedApiClient.setCurrentPaymentMethod.mockResolvedValueOnce({
          paymentMethod: {
            id: "qwe",
          },
        } as any);
        const { setPaymentMethod } = useSessionContext();
        await setPaymentMethod({ id: "methodId" });
        expect(mockedApiClient.setCurrentPaymentMethod).toBeCalledWith(
          "methodId",
          rootContextMock.$shopwareApiInstance
        );
      });

      it("should throw an error if payment method cannot be set", async () => {
        mockedApiClient.setCurrentPaymentMethod.mockRejectedValueOnce({
          message: "Some error",
        } as any);
        const { setPaymentMethod } = useSessionContext();
        await expect(setPaymentMethod({ id: "qwe" })).rejects.toEqual({
          message: "Some error",
        });
      });

      it("should throw an error if payment method is not provided", async () => {
        const { setPaymentMethod } = useSessionContext();
        await expect(setPaymentMethod(undefined as any)).rejects.toThrowError(
          "You need to provide payment method id in order to set payment method."
        );
      });

      it("should throw an error if payment method is empty reference", async () => {
        const { setPaymentMethod } = useSessionContext();
        await expect(setPaymentMethod(null as any)).rejects.toThrowError(
          "You need to provide payment method id in order to set payment method."
        );
      });
    });

    describe("setActiveShippingAddress", () => {
      it("should invoke a proper method if address has an id", async () => {
        const { setActiveShippingAddress } = useSessionContext();
        await setActiveShippingAddress({ id: "address-id" });
        expect(mockedApiClient.setCurrentShippingAddress).toBeCalledWith(
          "address-id",
          rootContextMock.$shopwareApiInstance
        );
      });
      it("should throw an exception if there is no address.id provided", async () => {
        const { setActiveShippingAddress } = useSessionContext();
        await expect(
          setActiveShippingAddress(null as any)
        ).rejects.toThrowError(
          "You need to provide address id in order to set the address."
        );
      });
    });
    describe("setActiveBillingAddress", () => {
      it("should invoke a proper method if address has an id", async () => {
        mockedApiClient.getSessionContext.mockResolvedValueOnce({} as any);
        const { setActiveBillingAddress } = useSessionContext();
        await setActiveBillingAddress({ id: "address-id" });
        expect(mockedApiClient.setCurrentBillingAddress).toBeCalledWith(
          "address-id",
          rootContextMock.$shopwareApiInstance
        );
      });
      it("should throw an exception if there is no address.id provided", async () => {
        const { setActiveBillingAddress } = useSessionContext();
        await expect(setActiveBillingAddress(null as any)).rejects.toThrowError(
          "You need to provide address id in order to set the address."
        );
      });
    });
    describe("onCurrencyChange", () => {
      it("should add interceptor method", () => {
        const { onCurrencyChange } = useSessionContext();
        onCurrencyChange(() => {});
        expect(interceptMock).toHaveBeenCalledWith(
          "onCurrencyChange",
          expect.any(Function)
        );
      });
    });
    describe("onShippingMethodChange", () => {
      it("should add interceptor method", () => {
        const { onShippingMethodChange } = useSessionContext();
        onShippingMethodChange(() => {});
        expect(interceptMock).toHaveBeenCalledWith(
          "onShippingMethodChange",
          expect.any(Function)
        );
      });
    });
    describe("onPaymentMethodChange", () => {
      it("should add interceptor method", () => {
        const { onPaymentMethodChange } = useSessionContext();
        onPaymentMethodChange(() => {});
        expect(interceptMock).toHaveBeenCalledWith(
          "onPaymentMethodChange",
          expect.any(Function)
        );
      });
    });
  });
});
