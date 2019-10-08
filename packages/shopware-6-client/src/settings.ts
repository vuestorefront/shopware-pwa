export interface ClientSettings {
  endpoint?: string;
}

const defaultConfig: ClientSettings = {
  endpoint: "https://shopware-2.vuestorefront.io/sales-channel-api/v1"
};

let clientConfig: ClientSettings = {};

const setup = function(config: ClientSettings = {}): void {
  clientConfig = Object.assign(clientConfig, defaultConfig, config);
};
setup();

const config: ClientSettings = clientConfig;

export { config, setup };
