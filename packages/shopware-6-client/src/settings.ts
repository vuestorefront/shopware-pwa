/**
 * @beta
 */
export interface ClientSettings {
  endpoint?: string;
  accessToken?: string;
  contextToken?: string;
  defaultPaginationLimit?: number;
  timeout?: number;
}

const defaultConfig: ClientSettings = {
  endpoint: "https://shopware-2.vuestorefront.io/sales-channel-api/v1",
  accessToken: "SWSCTXJOZMQWCXA4OUTNZ0REYG",
  contextToken: "",
  defaultPaginationLimit: 10,
  timeout: 10000, // ms
};

let clientConfig: ClientSettings = {};

const setupConfig = function (config: ClientSettings = {}): void {
  clientConfig = Object.assign(clientConfig, defaultConfig, config);
};
setupConfig();

const updateConfig = function (config: ClientSettings): void {
  clientConfig = Object.assign(clientConfig, config);
};

/**
 * @beta
 */
const config: ClientSettings = clientConfig;

export { config, setupConfig, updateConfig };
