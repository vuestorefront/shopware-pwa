import axios from "axios";
import https from "https";
import { config } from "./settings";
import { responseInterceptor, errorInterceptor } from "./interceptors";

export const apiService = axios.create({
  // temporary fix to prevent TLS issues
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
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
}
reloadConfiguration();

apiService.interceptors.response.use(responseInterceptor, errorInterceptor);
