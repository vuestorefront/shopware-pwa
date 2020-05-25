import axios, { AxiosInstance } from "axios";
import { Agent } from "https";
import { config } from "./settings";
import { responseInterceptor, errorInterceptor } from "./interceptors";

export const apiService: AxiosInstance = axios.create({
  // temporary fix to prevent TLS issues
  httpsAgent: new Agent({
    rejectUnauthorized: false,
  }),
});

export function reloadConfiguration() {
  apiService.defaults.baseURL = config.endpoint;
  apiService.defaults.timeout = config.timeout;
  apiService.defaults.headers.common["sw-access-key"] = config.accessToken;
  if (config.contextToken) {
    apiService.defaults.headers.common["sw-context-token"] =
      config.contextToken;
  } else {
    delete apiService.defaults.headers.common["sw-context-token"];
  }
  if (config.languageId) {
    apiService.defaults.headers.common["sw-language-id"] = config.languageId;
  } else {
    delete apiService.defaults.headers.common["sw-language-id"];
  }
}
reloadConfiguration();

apiService.interceptors.response.use(responseInterceptor, errorInterceptor);
