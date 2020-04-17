import Vue from "vue";

//Mock Vue Composition API onMounted method
import VueCompostionApi, * as vueComp from "@vue/composition-api";
import { Ref, ref, reactive, computed } from "@vue/composition-api";
import { SessionContext } from "@shopware-pwa/commons/interfaces/response/SessionContext";
import * as shopwareClient from "@shopware-pwa/shopware-6-client";

Vue.use(VueCompostionApi);
(vueComp.onMounted as any) = jest.fn();

// Mock API client
jest.mock("@shopware-pwa/shopware-6-client");
const mockedApiClient = shopwareClient as jest.Mocked<typeof shopwareClient>;

import { useCurrency, setStore } from "@shopware-pwa/composables";
describe("Composables - useCurrency", () => {
  const stateContext: Ref<Partial<SessionContext> | null> = ref(null);

  beforeEach(() => {
    jest.resetAllMocks();
    stateContext.value = null;
    setStore({
      getters: reactive({
        getSessionContext: computed(() => stateContext.value),
      }),
      commit: (name: string, value: SessionContext) => {
        stateContext.value = value;
      },
    });
  });
  describe("computed", () => {
    describe("currency", () => {
      it("should return an empty string by default - if no currency was loaded", async () => {
        mockedApiClient.getSessionContext.mockReturnValueOnce({
          data: {
            currency: {
              iso: "EUR",
            },
          },
        } as any);
        const { currency } = useCurrency();
        expect(mockedApiClient.getSessionContext).toBeCalledTimes(0);
        expect(currency.value).toBe(null);
      });
    });
    describe("currencySymbol", () => {
      it("should return an empty string by default - if no currency was loaded", async () => {
        const { currencySymbol } = useCurrency();
        expect(mockedApiClient.getSessionContext).toBeCalledTimes(0);
        expect(currencySymbol.value).toBe("");
      });
      it("should not return a symbol if currency object is falsy or does not exist", async () => {
        mockedApiClient.getSessionContext.mockReturnValueOnce({
          data: {
            currency: null,
          },
        } as any);
        const { currencySymbol, onMountedCallback } = useCurrency();
        await onMountedCallback();
        expect(currencySymbol.value).toBe("");
      });
      it("should return an empty string if currency symbol object is missing", async () => {
        mockedApiClient.getSessionContext.mockReturnValueOnce({
          data: {
            currency: {
              symbol: null,
            },
          },
        } as any);
        const { currencySymbol, onMountedCallback } = useCurrency();
        await onMountedCallback();
        expect(currencySymbol).toBeTruthy();
        expect(currencySymbol.value).toBe("");
      });
      it("should return an empty string if currency is null", async () => {
        const { currencySymbol } = useCurrency();
        expect(currencySymbol.value).toBe("");
      });
      it("should return a symbol if exists in currency response", async () => {
        mockedApiClient.getSessionContext.mockReturnValueOnce({
          currency: {
            symbol: "$",
          },
        } as any);
        const { currencySymbol, onMountedCallback } = useCurrency();
        await onMountedCallback();
        expect(mockedApiClient.getSessionContext).toBeCalledTimes(1);
        expect(currencySymbol.value).toBe("$");
      });
    });
    describe("availableCurrencies", () => {
      it("should not return any currency if no onMounted event was fired", async () => {
        mockedApiClient.getSessionContext.mockReturnValueOnce({
          data: {
            currency: {
              iso: "EUR",
            },
          },
        } as any);
        const { availableCurrencies } = useCurrency();

        expect(mockedApiClient.getSessionContext).toBeCalledTimes(0);
        expect(availableCurrencies.value).toStrictEqual([]);
      });
    });
  });
  describe("methods", () => {
    describe("fetchCurrencies", () => {
      it("should call apiClient:getAvailableCurrencies to fetch and set available currencies ", async () => {
        mockedApiClient.getSessionContext.mockReturnValueOnce({} as any);
        mockedApiClient.getAvailableCurrencies.mockReturnValueOnce([
          {
            iso: "EUR",
          },
        ] as any);

        const { availableCurrencies, onMountedCallback } = useCurrency();
        expect(availableCurrencies.value).toStrictEqual([]);
        await onMountedCallback();
        expect(mockedApiClient.getAvailableCurrencies).toBeCalledTimes(1);
        expect(availableCurrencies.value).toStrictEqual([
          {
            iso: "EUR",
          },
        ]);
        await onMountedCallback();
        expect(mockedApiClient.getAvailableCurrencies).toBeCalledTimes(1);
      });
    });

    describe("setCurrency", () => {
      it("should not call apiClient:setCurrency if no currencyId was provided ", async () => {
        const { setCurrency, currency } = useCurrency();
        const oldCurrency = currency.value;
        const wasChanged = await setCurrency({} as any);
        expect(wasChanged).toBeFalsy();
        expect(currency.value).toBe(oldCurrency);
        expect(mockedApiClient.setCurrentCurrency).toBeCalledTimes(0);
      });
      it("should call apiClient:setCurrency if currencyId was provided ", async () => {
        const { setCurrency } = useCurrency();
        mockedApiClient.getSessionContext.mockReturnValueOnce({
          currency: {
            iso: "USD",
          },
        } as any);
        //const oldCurrency = currency.value;
        const wasChanged = await setCurrency({ id: "some-currency-id" });
        expect(wasChanged).toBeTruthy();
        //expect(currency.value).not.toBe(oldCurrency);
        expect(mockedApiClient.setCurrentCurrency).toBeCalledTimes(1);
        expect(mockedApiClient.setCurrentCurrency).toBeCalledWith(
          "some-currency-id"
        );
      });
      it("should return false without fetching current currency on api client rejection", async () => {
        mockedApiClient.setCurrentCurrency.mockRejectedValueOnce({
          message: "Something went wrong...",
        });
        mockedApiClient.getSessionContext.mockReturnValueOnce({} as any);

        const { setCurrency, currency } = useCurrency();
        const oldCurrency = currency.value;
        const wasChanged = await setCurrency({ id: "some-currency-id" });
        expect(wasChanged).toBeFalsy();
        expect(currency.value).toBe(oldCurrency);
        expect(mockedApiClient.setCurrentCurrency).toBeCalledTimes(1);
        expect(mockedApiClient.getSessionContext).toBeCalledTimes(0);
      });
    });
  });
});
