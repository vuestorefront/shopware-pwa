import { update, config } from "./";
import { AxiosResponse, AxiosRequestConfig } from "axios";

export function responseInterceptor(response: AxiosResponse) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  const contextToken = response.headers["sw-context-token"];
  if (contextToken !== config.contextToken) update({ contextToken });
  return response;
}
export async function errorInterceptor(error: any) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  throw error;
}

export function requestInterceptor(request: AxiosRequestConfig) {
  request.baseURL = config.endpoint;

  request.headers.common["sw-access-key"] = config.accessToken;
  if (config.contextToken)
    request.headers.common["sw-context-token"] = config.contextToken;
  return request;
}
