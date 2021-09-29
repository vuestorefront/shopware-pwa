import { defaultInstance, ShopwareApiInstance } from "../apiService";

/**
 * Invoke custom POST request to shopware API. Mostly for plugins usage.
 * You can skip domain and pass only endpoint ex. `/api/my/endpoint`
 * @throws ClientApiError
 * @public
 */
export function invokePost(
  {
    address,
    payload,
  }: {
    address: string;
    payload?: any;
  },
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<any> {
  return contextInstance.invoke.post(address, payload);
}

/**
 * Invoke custom GET request to shopware API. Mostly for plugins usage.
 * You can skip domain and pass only endpoint ex. `/api/my/endpoint`
 * @throws ClientApiError
 * @public
 */
export function invokeGet(
  { address }: { address: string },
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<any> {
  return contextInstance.invoke.get(address);
}
