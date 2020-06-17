import { defaultInstance } from "./apiService";

export { ClientSettings } from "./settings";
export { createInstance, ConfigChangedArgs } from "./apiService";

export * from "./services/categoryService";
export * from "./services/productService";
export * from "./services/customerService";
export * from "./services/contextService";
export * from "./services/cartService";
export * from "./services/navigationService";
export * from "./services/pageService";
export * from "./services/checkoutService";
export * from "./services/pluginService";
export * from "./services/searchService";

export { ShopwareParams } from "./helpers/searchConverter";

export const config = defaultInstance.config;
/**
 * Setup configuration. Merge default values with provided in param.
 * This method will override existing config. For config update invoke **update** method.
 * @beta
 */
export const setup = defaultInstance.setup;

/**
 * Update current configuration. This will change only provided values.
 * @beta
 */
export const update = defaultInstance.update;

/**
 * @beta
 */
export const onConfigChange = defaultInstance.onConfigChange;
