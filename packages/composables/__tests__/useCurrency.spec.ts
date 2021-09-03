import { Ref, ref } from "vue-demi";
import { SessionContext } from "@shopware-pwa/commons/interfaces/response/SessionContext";
import * as shopwareClient from "@shopware-pwa/shopware-6-client";
import { Currency } from "@shopware-pwa/commons/interfaces/models/system/currency/Currency";

jest.mock("@shopware-pwa/shopware-6-client");
const mockedApiClient = shopwareClient as jest.Mocked<typeof shopwareClient>;
const consoleErrorSpy = jest.spyOn(console, "error");
consoleErrorSpy.mockImplementation(() => {});

import * as Composables from "@shopware-pwa/composables";
jest.mock("@shopware-pwa/composables");
const mockedComposables = Composables as jest.Mocked<typeof Composables>;
import { useCurrency } from "../src/hooks/useCurrency";
import { prepareRootContextMock } from "./contextRunner";

describe("Composables - useCurrency", () => {
  const stateContext: Ref<Partial<SessionContext> | null> = ref(null);
  const mockedCurrentCurrency: Ref<Currency | null> = ref(null);
  const refreshSessionContextMock = jest.fn(async () => {});
  const setCurrencyContextMock = jest.fn(async () => {});
  const refreshCartMock = jest.fn(async () => {});
  const rootContextMock = prepareRootContextMock();
  const stateSharedRef = ref();

  beforeEach(async () => {
    jest.resetAllMocks();
    stateContext.value = null;
    mockedCurrentCurrency.value = null;
    stateSharedRef.value = null;
    mockedComposables.useSessionContext.mockImplementation(() => {
      return {
        refreshSessionContext: refreshSessionContextMock,
        setCurrency: setCurrencyContextMock,
        currency: mockedCurrentCurrency,
      } as any;
    });
    mockedComposables.useCart.mockImplementation(() => {
      return {
        refreshCart: refreshCartMock,
      } as any;
    });
    mockedApiClient.getAvailableCurrencies.mockResolvedValue({
      elements: [],
    } as any);

    mockedComposables.useSharedState.mockImplementation(() => {
      return {
        sharedRef: () => stateSharedRef,
      } as any;
    });

    mockedComposables.useVueContext.mockReturnValue({
      isVueComponent: false,
      isVueScope: true,
    });
    mockedComposables.getApplicationContext.mockReturnValue(rootContextMock);
  });

  afterEach(async () => {
    // clear shared available currencies array
    const { loadAvailableCurrencies } = useCurrency();
    await loadAvailableCurrencies({ forceReload: true });
  });

  describe("computed", () => {
    describe("currency", () => {
      it("should return currency from useSessionContext", async () => {
        mockedCurrentCurrency.value = { symbol: "$$$" } as any;
        const { currency } = useCurrency();
        expect(currency.value).toEqual({ symbol: "$$$" });
      });
    });
    describe("currencySymbol", () => {
      it("should return an empty string if currency symbol object is missing", async () => {
        mockedCurrentCurrency.value = {} as any;
        const { currencySymbol } = useCurrency();
        expect(currencySymbol.value).toBe("");
      });
      it("should return an empty string if currency is null", async () => {
        mockedCurrentCurrency.value = null;
        const { currencySymbol } = useCurrency();
        expect(currencySymbol.value).toBe("");
      });
      it("should return a symbol of current currency", async () => {
        mockedCurrentCurrency.value = { symbol: "$" } as any;
        const { currencySymbol } = useCurrency();
        expect(currencySymbol.value).toEqual("$");
      });
    });
    describe("availableCurrencies", () => {
      it("should return empty array if there are no currencies loaded", async () => {
        const { availableCurrencies } = useCurrency();
        expect(availableCurrencies.value).toStrictEqual([]);
      });

      it("should return fetched array of currencies", async () => {
        mockedApiClient.getAvailableCurrencies.mockResolvedValueOnce({
          elements: [
            {
              iso: "EUR",
            },
          ],
        } as any);

        const { loadAvailableCurrencies, availableCurrencies } = useCurrency();
        await loadAvailableCurrencies();
        expect(availableCurrencies.value).toEqual([
          {
            iso: "EUR",
          },
        ]);
      });

      it("should not override an empty currencies if the response does not have any", async () => {
        mockedApiClient.getAvailableCurrencies.mockResolvedValueOnce({
          elements: [
            {
              iso: "EUR",
            },
          ],
        } as any);

        const { loadAvailableCurrencies, availableCurrencies } = useCurrency();
        await loadAvailableCurrencies();
        mockedApiClient.getAvailableCurrencies.mockResolvedValueOnce(
          undefined as any
        );
        await loadAvailableCurrencies();
        expect(availableCurrencies.value).toEqual([
          {
            iso: "EUR",
          },
        ]);
      });

      it("should return array with current currenry inside, when no currencies loaded", async () => {
        mockedCurrentCurrency.value = { symbol: "$$$" } as any;
        const { availableCurrencies } = useCurrency();
        expect(availableCurrencies.value).toEqual([{ symbol: "$$$" }]);
      });
    });
  });
  describe("methods", () => {
    describe("loadAvailableCurrencies", () => {
      it("should call apiClient:getAvailableCurrencies to fetch and set available currencies ", async () => {
        const { loadAvailableCurrencies } = useCurrency();
        await loadAvailableCurrencies();
        expect(mockedApiClient.getAvailableCurrencies).toBeCalledTimes(1);
      });

      it("should not call apiClient:getAvailableCurrencies second time if values are fetched", async () => {
        mockedApiClient.getAvailableCurrencies.mockResolvedValueOnce({
          elements: [
            {
              iso: "EUR",
            },
          ],
        } as any);

        const { loadAvailableCurrencies } = useCurrency();
        await loadAvailableCurrencies();
        await loadAvailableCurrencies();
        expect(mockedApiClient.getAvailableCurrencies).toBeCalledTimes(1);
      });

      it("should call apiClient:getAvailableCurrencies second if forceReload flag is used", async () => {
        mockedApiClient.getAvailableCurrencies.mockResolvedValueOnce({
          elements: [
            {
              iso: "EUR",
            },
          ],
        } as any);

        const { loadAvailableCurrencies } = useCurrency();
        await loadAvailableCurrencies();
        await loadAvailableCurrencies({ forceReload: true });
        expect(mockedApiClient.getAvailableCurrencies).toBeCalledTimes(2);
      });
    });

    describe("setCurrency", () => {
      it("should call setCurrency from useSessionContext", async () => {
        const { setCurrency } = useCurrency();
        await setCurrency({ id: "some-currency-id" });
        expect(setCurrencyContextMock).toBeCalledWith({
          id: "some-currency-id",
        });
      });

      it("should call refreshCart from useCart", async () => {
        const { setCurrency } = useCurrency();
        await setCurrency({ id: "some-currency-id" });
        expect(refreshCartMock).toBeCalled();
      });

      it("should sidplay error when one of method throws an error", async () => {
        setCurrencyContextMock.mockRejectedValueOnce({
          message: "Some error",
        } as any);
        const { setCurrency } = useCurrency();
        await setCurrency({ id: "some-currency-id" });
        expect(setCurrencyContextMock).toBeCalled();
        expect(consoleErrorSpy).toBeCalledWith(
          "[useCurrency][setCurrency] Problem with currency change",
          {
            message: "Some error",
          }
        );
      });
    });
  });
});
