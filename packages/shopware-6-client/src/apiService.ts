import axios from "axios";
// import { config } from "./settings";
import { responseInterceptor, errorInterceptor } from "./apiInterceptors";

export const apiService = axios.create({});

export function reloadConfiguration() {
  console.error('NOT CHANGING AXIOS CONFIG!')
  // apiService.defaults.baseURL = config.endpoint;
  // apiService.defaults.headers.common["sw-access-key"] = config.accessToken;
  // if (config.contextToken) {
  //   apiService.defaults.headers.common["sw-context-token"] =
  //     config.contextToken;
  // } else {
  //   delete apiService.defaults.headers.common["sw-context-token"];
  // }
}
reloadConfiguration();

apiService.interceptors.response.use(responseInterceptor, errorInterceptor);
