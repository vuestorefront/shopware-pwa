export interface ClientSettings {
  endpoint?: string;
  accessToken?: string;
  contextToken?: string;
}

const defaultConfig: ClientSettings = {
  endpoint: "https://shopware-2.vuestorefront.io/sales-channel-api/v1",
  accessToken: "SWSCBVBBZET1RTFIYWY4YVLICA"
};

let clientConfig: ClientSettings = {};

const setupConfig = function(config: ClientSettings = {}): void {
  clientConfig = Object.assign(clientConfig, defaultConfig, config);
};
setupConfig();

const updateConfig = function(config: ClientSettings = {}): void {
  clientConfig = Object.assign(clientConfig, config);
};

const config: ClientSettings = clientConfig;

export { config, setupConfig, updateConfig };
