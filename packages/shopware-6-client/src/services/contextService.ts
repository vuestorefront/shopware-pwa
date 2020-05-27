import { Currency } from "@shopware-pwa/commons/interfaces/models/system/currency/Currency";
import { apiService } from "../apiService";
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
 * @alpha
 */
async function updateContext(
  params: UpdateContextParams
): Promise<ContextTokenResponse> {
  const resp = await apiService.patch(getContextEndpoint(), params);
  const contextToken = extractContextToken(resp);
  return { contextToken };
}

/**
 * Loads session context, containing all session-related data.
 *
 * @throws ClientApiErrosr
 * @alpha
 */
export async function getSessionContext(): Promise<SessionContext> {
  const resp = await apiService.get(getContextEndpoint());
  return resp.data;
}

/**
 * Set the current session's shipping address to correspoding to id
 * @throws ClientApiError
 * @alpha
 */
export function setCurrentShippingAddress(
  shippingAddressId: string
): Promise<ContextTokenResponse> {
  return updateContext({ shippingAddressId });
}

/**
 * Set the current session's billing address to correspoding to id
 * @throws ClientApiError
 * @alpha
 */
export function setCurrentBillingAddress(
  billingAddressId: string
): Promise<ContextTokenResponse> {
  return updateContext({ billingAddressId });
}

/**
 * @throws ClientApiError
 * @alpha
 */
export async function getAvailableCurrencies(): Promise<Currency[]> {
  const resp = await apiService.get(getContextCurrencyEndpoint());

  return resp.data;
}

/**
 * @throws ClientApiError
 * @alpha
 */
export async function setCurrentCurrency(
  newCurrencyID: string
): Promise<ContextTokenResponse> {
  let params = { currencyId: newCurrencyID };
  const resp = await updateContext(params);

  return resp;
}

/**
 * @throws ClientApiError
 * @alpha
 */
export async function getAvailableLanguages(): Promise<Language[]> {
  const resp = await apiService.get(getContextLanguageEndpoint());

  return resp.data;
}

/**
 * @throws ClientApiError
 * @alpha
 */
export async function setCurrentLanguage(
  newLanguageId: string
): Promise<ContextTokenResponse> {
  let params = { languageId: newLanguageId };
  const resp = await updateContext(params);

  return resp;
}

/**
 * Get all available countries
 *
 * @throws ClientApiError
 * @alpha
 */
export async function getAvailableCountries(): Promise<
  SearchResult<Country[]>
> {
  const resp = await apiService.get(getContextCountryEndpoint());
  return resp.data;
}

/**
 * Get all available salutations
 *
 * @throws ClientApiError
 * @alpha
 */
export async function getAvailableSalutations(): Promise<
  SearchResult<Salutation[]>
> {
  const resp = await apiService.get(getContextSalutationEndpoint());
  return resp.data;
}

/**
 * @throws ClientApiError
 * @alpha
 */
export async function getAvailablePaymentMethods(): Promise<PaymentMethod[]> {
  const resp = await apiService.get(getContextPaymentMethodEndpoint());

  return resp.data;
}

/**
 * @throws ClientApiError
 * @alpha
 */
export async function getPaymentMethodDetails(
  paymentId: string
): Promise<PaymentMethod> {
  const resp = await apiService.get(
    getContextPaymentMethodDetailsEndpoint(paymentId)
  );

  return resp.data.data;
}

/**
 * @throws ClientApiError
 * @alpha
 */
export async function setCurrentPaymentMethod(
  newPaymentMethodId: string
): Promise<ContextTokenResponse> {
  let params = { paymentMethodId: newPaymentMethodId };
  const resp = await updateContext(params);

  return resp;
}

/**
 * @throws ClientApiError
 * @alpha
 */
export async function getAvailableShippingMethods(): Promise<ShippingMethod[]> {
  const resp = await apiService.get(getContextShippingMethodEndpoint());

  return resp.data;
}

/**
 * @throws ClientApiError
 * @alpha
 */
export async function getShippingMethodDetails(
  shippingId: string
): Promise<ShippingMethod> {
  const resp = await apiService.get(
    getContextShippingMethodDetailsEndpoint(shippingId)
  );

  return resp.data.data;
}

/**
 * @throws ClientApiError
 * @alpha
 */
export async function setCurrentShippingMethod(
  newShippingMethodId: string
): Promise<ContextTokenResponse> {
  let params = { shippingMethodId: newShippingMethodId };
  const resp = await updateContext(params);

  return resp;
}
/**
 * @throws ClientApiError
 * @alpha
 */
export async function getUserCountry(countryId: string): Promise<Country> {
  const { data } = await apiService.get(
    getContextCountryItemEndpoint(countryId)
  );

  return data;
}
/**
 * @throws ClientApiError
 * @alpha
 */
export async function getUserSalutation(
  salutationId: string
): Promise<Salutation> {
  const { data } = await apiService.get(
    getContextSalutationItemEndpoint(salutationId)
  );

  return data;
}
