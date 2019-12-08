import axios from "axios";
import { config } from "./settings";
// import { responseInterceptor, errorInterceptor } from "./apiInterceptors";

export const apiService = axios.create({});

export function reloadConfiguration() {
  console.error("Try to change axios config!");
  if (apiService.defaults.baseURL !== config.endpoint)
    apiService.defaults.baseURL = config.endpoint;
  if (
    apiService.defaults.headers.common["sw-access-key"] !== config.accessToken
  )
    apiService.defaults.headers.common["sw-access-key"] = config.accessToken;
  if (
    config.contextToken &&
    apiService.defaults.headers.common["sw-context-token"] !==
      config.contextToken
  ) {
    apiService.defaults.headers.common["sw-context-token"] =
      config.contextToken;
  } else if (!config.contextToken) {
    delete apiService.defaults.headers.common["sw-context-token"];
  }
}
reloadConfiguration();

// apiService.interceptors.response.use(responseInterceptor, errorInterceptor);
