import { defaultInstance, ConfigChangedArgs } from "./apiService";
import { ClientSettings } from "./settings";
export { ClientSettings } from "./settings";
export {
  createInstance,
  ConfigChangedArgs,
  ShopwareApiInstance,
} from "./apiService";

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
export * from "./services/formsService";
export * from "./services/wishlistService";
export * from "./endpoints";

/**
 * @public
 */
export const config: ClientSettings = defaultInstance.config;
/**
 * Setup configuration. Merge default values with provided in param.
 * This method will override existing config. For config update invoke **update** method.
 * @public
 */
export const setup: (config?: ClientSettings) => void = defaultInstance.setup;

/**
 * Update current configuration. This will change only provided values.
 * @public
 */
export const update: (config?: ClientSettings) => void = defaultInstance.update;

/**
 * @public
 */
export const onConfigChange: (
  fn: (context: ConfigChangedArgs) => void
) => void = defaultInstance.onConfigChange;
