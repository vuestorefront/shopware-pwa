export interface ClientSettings {
  endpoint?: string;
}

const defaultConfig: ClientSettings = {
  endpoint: "https://jsonplaceholder.typicode.com"
};

let clientConfig: ClientSettings = {};

const setup = function(config: ClientSettings = {}): void {
  clientConfig = Object.assign({}, defaultConfig, config);
};
setup();

const config: ClientSettings = clientConfig;

export { config, setup };
