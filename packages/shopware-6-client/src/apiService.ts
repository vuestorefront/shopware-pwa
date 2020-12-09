import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";
import { createResponseInterceptor, errorInterceptor } from "./interceptors";
import { ClientSettings, defaultConfig } from "./settings";
import { getQueryString } from "./helpers/queryParamsBuilder";
/**
 * @beta
 */
export interface ConfigChangedArgs {
  config: ClientSettings;
}

/**
 * @beta
 */
export interface ShopwareApiInstance {
  onConfigChange: (fn: (context: ConfigChangedArgs) => void) => void;
  config: ClientSettings;
  setup: (config?: ClientSettings) => void;
  update: (config?: ClientSettings) => void;

  invoke: {
    post: AxiosInstance["post"];
    get: AxiosInstance["get"];
    put: AxiosInstance["put"];
    patch: AxiosInstance["patch"];
    delete: AxiosInstance["delete"];
  };
  defaults: AxiosInstance["defaults"];
}

/**
 * Internal method for creating new instance, exported only for tests, not exported by package
 */
export function _createInstance(initialConfig: ClientSettings = {}) {
  const callbackMethods: ((context: ConfigChangedArgs) => void)[] = [];
  let clientConfig: ClientSettings = {};
  const apiService: AxiosInstance = axios.create();

  function reloadConfiguration() {
    // settings for HTTP basic auth credentials
    if (
      clientConfig.auth &&
      clientConfig.auth.username &&
      clientConfig.auth.password
    ) {
      // apiService.defaults.withCredentials = true;
      apiService.defaults.auth = clientConfig.auth;
    }
    apiService.defaults.baseURL = clientConfig.endpoint;
    apiService.defaults.timeout = clientConfig.timeout;
    apiService.defaults.headers.common["sw-access-key"] =
      clientConfig.accessToken;
    // convert SearchCriteria into query string
    apiService.defaults.paramsSerializer = getQueryString;
    if (clientConfig.contextToken) {
      apiService.defaults.headers.common["sw-context-token"] =
        clientConfig.contextToken;
    } else {
      delete apiService.defaults.headers.common["sw-context-token"];
    }
    if (clientConfig.languageId) {
      apiService.defaults.headers.common["sw-language-id"] =
        clientConfig.languageId;
    } else {
      delete apiService.defaults.headers.common["sw-language-id"];
    }
  }

  function onConfigChange(fn: (context: ConfigChangedArgs) => void): void {
    callbackMethods.push(fn);
  }

  const setup = function (config: ClientSettings = {}): void {
    clientConfig = Object.assign(clientConfig, defaultConfig, config);
    reloadConfiguration();
  };
  setup(initialConfig);

  const update = function (
    config: ClientSettings,
    responseConfig?: AxiosResponse<AxiosRequestConfig>["config"]
  ): void {
    clientConfig = Object.assign(clientConfig, config);
    if (
      process.env.NODE_ENV !== "production" &&
      !callbackMethods.length &&
      responseConfig
    ) {
      console.warn(
        `[shopware-6-api] After calling API method ${responseConfig.url} there is no "onConfigChange" listener. See https://shopware-pwa-docs.vuestorefront.io/landing/fundamentals/security.html#context-awareness`
      );
    }
    callbackMethods.forEach((fn) => fn({ config: clientConfig }));
    reloadConfiguration();
  };

  const invoke = {
    post: apiService.post,
    put: apiService.put,
    get: apiService.get,
    patch: apiService.patch,
    delete: apiService.delete,
  };

  apiService.interceptors.response.use(
    createResponseInterceptor(update),
    errorInterceptor
  );

  return {
    onConfigChange,
    config: clientConfig,
    setup,
    update,
    invoke,
    defaults: apiService.defaults,
  };
}

/**
 *
 * @beta
 */
export function createInstance(
  initialConfig: ClientSettings = {}
): ShopwareApiInstance {
  const {
    onConfigChange,
    config,
    setup,
    update,
    invoke,
    defaults,
  } = _createInstance(initialConfig);

  return {
    onConfigChange,
    config,
    setup,
    update: (config: ClientSettings = {}): void => {
      update(config);
    },
    invoke,
    defaults,
  };
}

export const defaultInstance = createInstance();
