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

async function updateContext(
  contextToken: string | null,
  params: UpdateContextParams
): Promise<UpdateContextResponse> {
  const resp = contextToken
    ? await apiService.patch(getContextEndpoint(), params, {
        headers: { "sw-context-token": contextToken }
      })
    : await apiService.patch(getContextEndpoint(), params, undefined);

  return resp.data;
}

export async function getAvailableCurrencies(): Promise<
  SearchResult<Currency[]>
> {
  const resp = await apiService.get(getContextCurrencyEndpoint());

  return resp.data;
}

export async function setCurrentCurrency(
  contextToken: string | null,
  newCurrencyID: string
): Promise<UpdateContextResponse> {
  let params = { currencyId: newCurrencyID };
  const resp = await updateContext(contextToken, params);

  return resp;
}

export async function getAvailableLanguages(): Promise<
  SearchResult<Language[]>
> {
  const resp = await apiService.get(getContextLanguageEndpoint());

  return resp.data;
}

export async function setCurrentLanguage(
  contextToken: string | null,
  newLanguageId: string
): Promise<UpdateContextResponse> {
  let params = { languageId: newLanguageId };
  const resp = await updateContext(contextToken, params);

  return resp;
}

export async function getAvailableCountries(): Promise<
  SearchResult<Country[]>
> {
  const resp = await apiService.get(getContextCountryEndpoint());

  return resp.data;
}

export async function getAvailablePaymentMethods(): Promise<
  SearchResult<PaymentMethod[]>
> {
  const resp = await apiService.get(getContextPaymentMethodEndpoint());

  return resp.data;
}

export async function setCurrentPaymentMethod(
  contextToken: string | null,
  newPaymentMethodId: string
): Promise<UpdateContextResponse> {
  let params = { paymentMethodId: newPaymentMethodId };
  const resp = await updateContext(contextToken, params);

  return resp;
}

export async function getAvailableShippingMethods(): Promise<
  SearchResult<ShippingMethod[]>
> {
  const resp = await apiService.get(getContextShippingMethodEndpoint());

  return resp.data;
}

export async function setCurrentShippingMethod(
  contextToken: string | null,
  newShippingMethodId: string
): Promise<UpdateContextResponse> {
  let params = { shippingMethodId: newShippingMethodId };
  const resp = await updateContext(contextToken, params);

  return resp;
}
