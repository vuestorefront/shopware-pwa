import { Currency } from "@shopware-pwa/commons/interfaces/models/system/currency/Currency";
import { defaultInstance, ShopwareApiInstance } from "../apiService";
import {
  getContextCurrencyEndpoint,
  getContextCountryEndpoint,
  getContextPaymentMethodEndpoint,
  getContextShippingMethodEndpoint,
  getContextLanguageEndpoint,
  getContextSalutationEndpoint,
  getContextEndpoint,
  getContextCountryItemEndpoint,
  getContextSalutationItemEndpoint,
  getContextPaymentMethodDetailsEndpoint,
  getContextShippingMethodDetailsEndpoint,
} from "../endpoints";
import { Country } from "@shopware-pwa/commons/interfaces/models/system/country/Country";
import { ShippingMethod } from "@shopware-pwa/commons/interfaces/models/checkout/shipping/ShippingMethod";
import { PaymentMethod } from "@shopware-pwa/commons/interfaces/models/checkout/payment/PaymentMethod";
import { Language } from "@shopware-pwa/commons/interfaces/models/framework/language/Language";
import { Salutation } from "@shopware-pwa/commons/interfaces/models/system/salutation/Salutation";
import { SearchResult } from "@shopware-pwa/commons/interfaces/response/SearchResult";
import { UpdateContextParams } from "@shopware-pwa/commons/interfaces/request/UpdateContextParams";
import {
  ContextTokenResponse,
  SessionContext,
} from "@shopware-pwa/commons/interfaces/response/SessionContext";
import { extractContextToken } from "../helpers/context";

/**
 * @throws ClientApiError
 * @beta
 */
async function updateContext(
  params: UpdateContextParams,
  contextInstance: ShopwareApiInstance
): Promise<ContextTokenResponse> {
  const resp = await contextInstance.invoke.patch(getContextEndpoint(), params);
  const contextToken = extractContextToken(resp);
  return { contextToken };
}

/**
 * Loads session context, containing all session-related data.
 *
 * @throws ClientApiErrosr
 * @beta
 */
export async function getSessionContext(
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<SessionContext> {
  const resp = await contextInstance.invoke.get(getContextEndpoint());
  return resp.data;
}

/**
 * Set the current session's shipping address to correspoding to id
 * @throws ClientApiError
 * @beta
 */
export function setCurrentShippingAddress(
  shippingAddressId: string,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<ContextTokenResponse> {
  return updateContext({ shippingAddressId }, contextInstance);
}

/**
 * Set the current session's billing address to correspoding to id
 * @throws ClientApiError
 * @beta
 */
export function setCurrentBillingAddress(
  billingAddressId: string,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<ContextTokenResponse> {
  return updateContext({ billingAddressId }, contextInstance);
}

/**
 * @throws ClientApiError
 * @beta
 */
export async function getAvailableCurrencies(
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<Currency[]> {
  const resp = await contextInstance.invoke.get(getContextCurrencyEndpoint());

  return resp.data;
}

/**
 * @throws ClientApiError
 * @beta
 */
export async function setCurrentCurrency(
  newCurrencyID: string,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<ContextTokenResponse> {
  let params = { currencyId: newCurrencyID };
  const resp = await updateContext(params, contextInstance);

  return resp;
}

/**
 * @throws ClientApiError
 * @beta
 */
export async function getAvailableLanguages(
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<Language[]> {
  const resp = await contextInstance.invoke.get(getContextLanguageEndpoint());

  return resp.data;
}

/**
 * @throws ClientApiError
 * @beta
 */
export async function setCurrentLanguage(
  newLanguageId: string,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<ContextTokenResponse> {
  let params = { languageId: newLanguageId };
  const resp = await updateContext(params, contextInstance);

  return resp;
}

/**
 * Get all available countries
 *
 * @throws ClientApiError
 * @beta
 */
export async function getAvailableCountries(
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<SearchResult<Country[]>> {
  const resp = await contextInstance.invoke.get(getContextCountryEndpoint());
  return resp.data;
}

/**
 * Get all available salutations
 *
 * @throws ClientApiError
 * @beta
 */
export async function getAvailableSalutations(
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<SearchResult<Salutation[]>> {
  const resp = await contextInstance.invoke.get(getContextSalutationEndpoint());
  return resp.data;
}

/**
 * @throws ClientApiError
 * @beta
 */
export async function getAvailablePaymentMethods(
  contextInstance: ShopwareApiInstance = defaultInstance,
  params: any = {}
): Promise<PaymentMethod[]> {
  const resp = await contextInstance.invoke.get(
    getContextPaymentMethodEndpoint(),
    {
      params, // passing it as a last parameter won't cause a BC - to consider
    }
  );

  return resp.data;
}

/**
 * @throws ClientApiError
 * @beta
 */
export async function getPaymentMethodDetails(
  paymentId: string,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<PaymentMethod> {
  const resp = await contextInstance.invoke.get(
    getContextPaymentMethodDetailsEndpoint(paymentId)
  );

  return resp.data.data;
}

/**
 * @throws ClientApiError
 * @beta
 */
export async function setCurrentPaymentMethod(
  newPaymentMethodId: string,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<ContextTokenResponse> {
  let params = { paymentMethodId: newPaymentMethodId };
  const resp = await updateContext(params, contextInstance);

  return resp;
}

/**
 * @throws ClientApiError
 * @beta
 */
export async function getAvailableShippingMethods(
  contextInstance: ShopwareApiInstance = defaultInstance,
  params: any = {} // passing it as a last parameter won't cause a BC - to consider
): Promise<ShippingMethod[]> {
  const resp = await contextInstance.invoke.get(
    getContextShippingMethodEndpoint(),
    {
      params,
    }
  );

  return resp.data;
}

/**
 * @throws ClientApiError
 * @beta
 */
export async function getShippingMethodDetails(
  shippingId: string,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<ShippingMethod> {
  const resp = await contextInstance.invoke.get(
    getContextShippingMethodDetailsEndpoint(shippingId)
  );

  return resp.data.data;
}

/**
 * @throws ClientApiError
 * @beta
 */
export async function setCurrentShippingMethod(
  newShippingMethodId: string,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<ContextTokenResponse> {
  let params = { shippingMethodId: newShippingMethodId };
  const resp = await updateContext(params, contextInstance);

  return resp;
}
/**
 * @throws ClientApiError
 * @beta
 */
export async function getUserCountry(
  countryId: string,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<Country> {
  const { data } = await contextInstance.invoke.get(
    getContextCountryItemEndpoint(countryId)
  );

  return data;
}
/**
 * @throws ClientApiError
 * @beta
 */
export async function getUserSalutation(
  salutationId: string,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<Salutation> {
  const { data } = await contextInstance.invoke.get(
    getContextSalutationItemEndpoint(salutationId)
  );

  return data;
}
