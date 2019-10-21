import { ClientSettings, setupConfig, updateConfig } from "./settings";
import { reloadConfiguration } from "./apiService";

export { config } from "./settings";
export * from "./services/categoryService";
export * from "./services/productService";
export * from "./services/customerService";
export * from "./services/contextService";

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
}
