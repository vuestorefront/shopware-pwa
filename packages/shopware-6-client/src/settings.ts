import axios from "axios";
export interface ClientSettings {
  endpoint?: string;
  accessToken?: string;
}

const defaultConfig: ClientSettings = {
  endpoint: "https://shopware-2.vuestorefront.io/sales-channel-api/v1",
  accessToken: "SWSCBVBBZET1RTFIYWY4YVLICA"
};

let clientConfig: ClientSettings = {};

const configureApiAccess = function(): void {
  axios.defaults.headers.common["sw-access-key"] = clientConfig.accessToken;
};

const setup = function(config: ClientSettings = {}): void {
  clientConfig = Object.assign(clientConfig, defaultConfig, config);
  configureApiAccess();
};
setup();

const config: ClientSettings = clientConfig;

export { config, setup };
