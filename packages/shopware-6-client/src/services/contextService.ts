import { Currency } from "../interfaces/models/system/currency/Currency";
import { apiService } from "../apiService";
import { config } from "../settings";
import {
  getContextCurrencyEndpoint,
  getContextCountryEndpoint,
  getContextPaymentMethodEndpoint,
  getContextShippingMethodEndpoint,
  getContextLanguageEndpoint
} from "../endpoints";
import { Country } from "../interfaces/models/system/country/Country";
import { ShippingMethod } from "../interfaces/models/checkout/shipping/ShippingMethod";
import { PaymentMethod } from "../interfaces/models/checkout/payment/PaymentMethod";
import { Language } from "../interfaces/models/framework/language/Language";
import { SearchResult } from "../interfaces/response/SearchResult";

const getCurrencies = async function(): Promise<SearchResult<Currency[]>> {
  const resp = await apiService.get(
    config.endpoint + getContextCurrencyEndpoint()
  );

  return resp.data;
};

const getLanguages = async function(): Promise<SearchResult<Language[]>> {
  const resp = await apiService.get(
    config.endpoint + getContextLanguageEndpoint()
  );

  return resp.data;
};

const getCountries = async function(): Promise<SearchResult<Country[]>> {
  const resp = await apiService.get(
    config.endpoint + getContextCountryEndpoint()
  );

  return resp.data;
};

const getPaymentMethods = async function(): Promise<
  SearchResult<PaymentMethod[]>
> {
  const resp = await apiService.get(
    config.endpoint + getContextPaymentMethodEndpoint()
  );

  return resp.data;
};

const getShippingMethods = async function(): Promise<
  SearchResult<ShippingMethod[]>
> {
  const resp = await apiService.get(
    config.endpoint + getContextShippingMethodEndpoint()
  );

  return resp.data;
};

interface ContextService {
  getCurrencies: () => Promise<SearchResult<Currency[]>>;
  getLanguages: () => Promise<SearchResult<Language[]>>;
  getCountries: () => Promise<SearchResult<Country[]>>;
  getPaymentMethods: () => Promise<SearchResult<PaymentMethod[]>>;
  getAvailableCurrencies: () => Promise<SearchResult<Currency[]>>;
  getAvailableLanguages: () => Promise<SearchResult<Language[]>>;
  getAvailableCountries: () => Promise<SearchResult<Country[]>>;
  getAvailablePaymentMethods: () => Promise<SearchResult<PaymentMethod[]>>;
  getAvailableShippingMethods: () => Promise<SearchResult<ShippingMethod[]>>;
}

export const ContextService: ContextService = {
  getCurrencies,
  getLanguages,
  getCountries,
  getPaymentMethods,
  getShippingMethods
};
