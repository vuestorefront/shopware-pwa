export interface ClientSettings {
  endpoint?: string;
  accessToken?: string;
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

const config: ClientSettings = clientConfig;

export { config, setupConfig };
