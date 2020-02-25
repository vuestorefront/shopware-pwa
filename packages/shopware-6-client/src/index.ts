import { config, ClientSettings, setupConfig, updateConfig } from "./settings";
import { reloadConfiguration } from "./apiService";

export { config } from "./settings";

export * from "./services/categoryService";
export * from "./services/productService";
export * from "./services/customerService";
export * from "./services/contextService";
export * from "./services/cartService";
export * from "./services/navigationService";
export * from "./services/pageService";
export * from "./services/checkoutService";
export { ShopwareParams } from "./helpers/searchConverter";

/**
 * Setup configuration. Merge default values with provided in param.
 * This method will override existing config. For config update invoke **update** method.
 * @alpha
 */
export function setup(config: ClientSettings = {}): void {
  setupConfig(config);
  reloadConfiguration();
}

/**
 * Update current configuration. This will change only provided values.
 * @alpha
 */
export function update(config: ClientSettings = {}): void {
  updateConfig(config);
  reloadConfiguration();
  configChanged();
}

/**
 * @alpha
 */
export interface ConfigChangedArgs {
  config: ClientSettings;
}
const callbackMethods: ((context: ConfigChangedArgs) => void)[] = [];

/**
 * @alpha
 */
export function onConfigChange(fn: (context: ConfigChangedArgs) => void) {
  callbackMethods.push(fn);
}
function configChanged(): void {
  callbackMethods.forEach(fn => fn({ config }));
}
