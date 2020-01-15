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

export * from "@shopware-pwa/shopware-6-client/src/interfaces/models/content/product/Product";
export * from "@shopware-pwa/shopware-6-client/src/interfaces/models/content/category/Category";
export * from "@shopware-pwa/shopware-6-client/src/interfaces/models/content/cms/CmsPage";
export * from "@shopware-pwa/shopware-6-client/src/interfaces/search/SearchCriteria";
export * from "@shopware-pwa/shopware-6-client/src/interfaces/search/SearchFilter";
export * from "@shopware-pwa/shopware-6-client/src/interfaces/response/SearchResult";
export * from "@shopware-pwa/shopware-6-client/src/interfaces/models/checkout/customer/CustomerAddress";
export * from "@shopware-pwa/shopware-6-client/src/interfaces/models/checkout/order/Order";

/**
 * Setup configuration. Merge default values with provided in param.
 * This method will override existing config. For config update invoke **update** method.
 */
export function setup(config: ClientSettings = {}): void {
  setupConfig(config);
  reloadConfiguration();
}

/**
 * Update current configuration. This will change only provided values.
 */
export function update(config: ClientSettings = {}): void {
  updateConfig(config);
  reloadConfiguration();
  configChanged();
}

export interface ConfigChangedArgs {
  config: ClientSettings;
}
const callbackMethods: ((context: ConfigChangedArgs) => void)[] = [];

export function onConfigChange(fn: (context: ConfigChangedArgs) => void) {
  callbackMethods.push(fn);
}
function configChanged(): void {
  callbackMethods.forEach(fn => fn({ config }));
}
