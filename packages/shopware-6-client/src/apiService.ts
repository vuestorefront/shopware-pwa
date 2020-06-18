import axios, { AxiosInstance, AxiosResponse } from "axios";
import { createResponseInterceptor, errorInterceptor } from "./interceptors";
import { ClientSettings, defaultConfig } from "./settings";

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
 *
 * @beta
 */
export function createInstance(
  initialConfig: ClientSettings = {}
): ShopwareApiInstance {
  const callbackMethods: ((context: ConfigChangedArgs) => void)[] = [];
  let clientConfig: ClientSettings = {};
  const apiService: AxiosInstance = axios.create();

  function reloadConfiguration() {
    apiService.defaults.baseURL = clientConfig.endpoint;
    apiService.defaults.timeout = clientConfig.timeout;
    apiService.defaults.headers.common["sw-access-key"] =
      clientConfig.accessToken;
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
    config: ClientSettings = {},
    responseConfig?: AxiosResponse<any>["config"]
  ): void {
    clientConfig = Object.assign(clientConfig, config);
    if (
      process.env.NODE_ENV !== "production" &&
      !callbackMethods.length &&
      responseConfig
    ) {
      console.warn(
        `[shopware-6-api] After calling API method ${responseConfig?.url} there is no "onConfigChange" listener.` // TODO: see docs link...
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
    update: (config: ClientSettings = {}): void => {
      update(config);
    },
    invoke,
    defaults: apiService.defaults,
  };
}

export const defaultInstance = createInstance();
