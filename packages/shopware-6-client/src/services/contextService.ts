import { Currency } from "../interfaces/models/system/currency/Currency";
import { apiService } from "../apiService";
import {
  getContextCurrencyEndpoint,
  getContextCountryEndpoint,
  getContextPaymentMethodEndpoint,
  getContextShippingMethodEndpoint,
  getContextLanguageEndpoint,
  getContextEndpoint
} from "../endpoints";
import { Country } from "../interfaces/models/system/country/Country";
import { ShippingMethod } from "../interfaces/models/checkout/shipping/ShippingMethod";
import { PaymentMethod } from "../interfaces/models/checkout/payment/PaymentMethod";
import { Language } from "../interfaces/models/framework/language/Language";
import { SearchResult } from "../interfaces/response/SearchResult";
import { UpdateContextParams } from "../interfaces/request/UpdateContextParams";
import { UpdateContextResponse } from "../interfaces/response/UpdateContextResponse";

export const getAvailableCurrencies = async function(): Promise<
  SearchResult<Currency[]>
> {
  const resp = await apiService.get(getContextCurrencyEndpoint());

  return resp.data;
};

export const setCurrentCurrency = async function(
  contextToken: string | null,
  newCurrencyID: string
): Promise<UpdateContextResponse> {
  let params = { currencyId: newCurrencyID };
  const resp = await updateContext(contextToken, params);

  return resp;
};

export const getAvailableLanguages = async function(): Promise<
  SearchResult<Language[]>
> {
  const resp = await apiService.get(getContextLanguageEndpoint());

  return resp.data;
};

export const setCurrentLanguage = async function(
  contextToken: string | null,
  newLanguageId: string
): Promise<UpdateContextResponse> {
  let params = { languageId: newLanguageId };
  const resp = await updateContext(contextToken, params);

  return resp;
};

export const getAvailableCountries = async function(): Promise<
  SearchResult<Country[]>
> {
  const resp = await apiService.get(getContextCountryEndpoint());

  return resp.data;
};

export const getAvailablePaymentMethods = async function(): Promise<
  SearchResult<PaymentMethod[]>
> {
  const resp = await apiService.get(getContextPaymentMethodEndpoint());

  return resp.data;
};

export const setCurrentPaymentMethod = async function(
  contextToken: string | null,
  newPaymentMethodId: string
): Promise<UpdateContextResponse> {
  let params = { paymentMethodId: newPaymentMethodId };
  const resp = await updateContext(contextToken, params);

  return resp;
};

export const getAvailableShippingMethods = async function(): Promise<
  SearchResult<ShippingMethod[]>
> {
  const resp = await apiService.get(getContextShippingMethodEndpoint());

  return resp.data;
};

export const setCurrentShippingMethod = async function(
  contextToken: string | null,
  newShippingMethodId: string
): Promise<UpdateContextResponse> {
  let params = { shippingMethodId: newShippingMethodId };
  const resp = await updateContext(contextToken, params);

  return resp;
};

const updateContext = async function(
  contextToken: string | null,
  params: UpdateContextParams
): Promise<UpdateContextResponse> {
  const resp = contextToken
    ? await apiService.patch(getContextEndpoint(), params, {
        headers: { "sw-context-token": contextToken }
      })
    : await apiService.patch(getContextEndpoint(), params, undefined);

  return resp.data;
};
