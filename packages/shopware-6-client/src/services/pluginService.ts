import { getPluginsEndpoint } from "../endpoints";
import { apiService } from "../apiService";

/**
 * @alpha
 */
export interface PluginRequest {
  code: string;
  resource: string;
  payload?: any; // only for POST requests
}

/**
 * @throws ClientApiError
 * @alpha
 */
export function pluginPost({
  code,
  resource,
  payload,
}: PluginRequest): Promise<any> {
  return apiService.post(getPluginsEndpoint(code, resource), payload);
}

/**
 * @throws ClientApiError
 * @alpha
 */
export function pluginGet({ code, resource }: PluginRequest): Promise<any> {
  return apiService.get(getPluginsEndpoint(code, resource));
}
