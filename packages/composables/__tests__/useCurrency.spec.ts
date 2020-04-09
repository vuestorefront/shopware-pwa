import Vue from "vue";

//Mock Vue Composition API onMounted method
import VueCompostionApi, * as vueComp from "@vue/composition-api";
Vue.use(VueCompostionApi);
(vueComp.onMounted as any) = jest.fn();

// Mock API client
import * as shopwareClient from "@shopware-pwa/shopware-6-client";
jest.mock("@shopware-pwa/shopware-6-client");
const mockedApiClient = shopwareClient as jest.Mocked<typeof shopwareClient>;

import { useCurrency } from "@shopware-pwa/composables";

describe("Composables - useCurrency", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("computed", () => {
    describe("currentCurrency", () => {
      it("should return an empty string by default - if no currency was loaded", async () => {
        mockedApiClient.getSessionContext.mockReturnValueOnce({
          data: {
            currency: {
              iso: "EUR",
            },
          },
        } as any);
        const { currentCurrency } = useCurrency();
        expect(mockedApiClient.getSessionContext).toBeCalledTimes(0);
        expect(currentCurrency.value).toBe(null);
      });
    });
    describe("currentCurrencySymbol", () => {
      it("should return an empty string by default - if no currency was loaded", async () => {
        const { currentCurrencySymbol } = useCurrency();
        expect(mockedApiClient.getSessionContext).toBeCalledTimes(0);
        expect(currentCurrencySymbol.value).toBe("");
      });
      it("should not return a symbol if currency object is falsy or does not exist", async () => {
        mockedApiClient.getSessionContext.mockReturnValueOnce({
          data: {
            currency: null,
          },
        } as any);
        const { currentCurrencySymbol, onMountedCallback } = useCurrency();
        await onMountedCallback();
        expect(currentCurrencySymbol.value).toBe("");
      });
      it("should return an empty string if currency symbol object is missing", async () => {
        mockedApiClient.getSessionContext.mockReturnValueOnce({
          data: {
            currency: {
              symbol: null,
            },
          },
        } as any);
        const { currentCurrencySymbol, onMountedCallback } = useCurrency();
        await onMountedCallback();
        expect(currentCurrencySymbol).toBeTruthy();
        expect(currentCurrencySymbol.value).toBe("");
      });
      it("should return an empty string if currentCurrency is null", async () => {
        const { currentCurrencySymbol } = useCurrency();
        expect(currentCurrencySymbol.value).toBe("");
      });
      it("should return a symbol if exists in currency response", async () => {
        mockedApiClient.getSessionContext.mockReturnValueOnce({
          currency: {
            symbol: "$",
          },
        } as any);
        const { currentCurrencySymbol, onMountedCallback } = useCurrency();
        await onMountedCallback();
        expect(mockedApiClient.getSessionContext).toBeCalledTimes(1);
        expect(currentCurrencySymbol.value).toBe("$");
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

    describe("switchCurrency", () => {
      it("should not call apiClient:setCurrentCurrency if no currencyId was provided ", async () => {
        const { switchCurrency, currentCurrency } = useCurrency();
        const oldCurrency = currentCurrency.value;
        const wasChanged = await switchCurrency(null as any);
        expect(wasChanged).toBeFalsy();
        expect(currentCurrency.value).toBe(oldCurrency);
        expect(mockedApiClient.setCurrentCurrency).toBeCalledTimes(0);
      });
      it("should call apiClient:setCurrentCurrency if currencyId was provided ", async () => {
        const { switchCurrency, currentCurrency } = useCurrency();
        mockedApiClient.getSessionContext.mockReturnValueOnce({
          currency: {
            iso: "USD",
          },
        } as any);
        const oldCurrency = currentCurrency.value;
        const wasChanged = await switchCurrency("some-currency-id");
        expect(wasChanged).toBeTruthy();
        expect(currentCurrency.value).not.toBe(oldCurrency);
        expect(mockedApiClient.setCurrentCurrency).toBeCalledTimes(1);
        expect(mockedApiClient.setCurrentCurrency).toBeCalledWith(
          "some-currency-id"
        );
        expect(mockedApiClient.getSessionContext).toBeCalledTimes(1);
      });
      it("should return false without fetching current currency on api client rejection", async () => {
        mockedApiClient.setCurrentCurrency.mockRejectedValueOnce({
          message: "Something went wrong...",
        });

        const { switchCurrency, currentCurrency } = useCurrency();
        const oldCurrency = currentCurrency.value;
        const wasChanged = await switchCurrency("some-currency-id");
        expect(wasChanged).toBeFalsy();
        expect(currentCurrency.value).toBe(oldCurrency);
        expect(mockedApiClient.setCurrentCurrency).toBeCalledTimes(1);
        expect(mockedApiClient.getSessionContext).toBeCalledTimes(0);
      });
    });
  });
});
