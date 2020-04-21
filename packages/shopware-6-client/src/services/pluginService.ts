import { getPluginsEndpoint } from "../endpoints";
import { apiService } from "../apiService";

/**
 * @alpha
 */
export interface PluginRequest {
  code: string,
  resource: string,
  payload?: any // only for POST requests
}

/**
 * @throws ClientApiError
 * @alpha
 */
export async function pluginPost({code, resource, payload}: PluginRequest): Promise<any> {
  const resp = await apiService.post(getPluginsEndpoint(code, resource), payload);

  return resp;
}

/**
 * @throws ClientApiError
 * @alpha
 */
export async function pluginGet({code, resource}: PluginRequest): Promise<any> {
  const resp = await apiService.get(getPluginsEndpoint(code, resource));

  return resp;
}