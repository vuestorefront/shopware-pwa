import axios from "axios";
import { config } from "./settings";

export const apiService = axios.create({
  timeout: 1000
});

export function reloadConfiguration() {
  apiService.defaults.baseURL = config.endpoint;
  apiService.defaults.headers.common["sw-access-key"] = config.accessToken;
  apiService.defaults.headers.common["sw-context-token"] = config.contextToken;
}
reloadConfiguration();
