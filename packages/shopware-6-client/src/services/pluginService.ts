import { apiService } from "../apiService";

/**
 * Invoke custom POST request to shopware API. Mostly for plugins usage.
 * You can skip domain and pass only endpoint ex. `/api/my/endpoint`
 * @throws ClientApiError
 * @beta
 */
export function invokePost({
  address,
  payload,
}: {
  address: string;
  payload?: any;
}): Promise<any> {
  return apiService.post(address, payload);
}

/**
 * Invoke custom GET request to shopware API. Mostly for plugins usage.
 * You can skip domain and pass only endpoint ex. `/api/my/endpoint`
 * @throws ClientApiError
 * @beta
 */
export function invokeGet({ address }: { address: string }): Promise<any> {
  return apiService.get(address);
}
