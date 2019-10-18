import { ClientSettings, setupConfig } from "./settings";
import { reloadConfiguration } from "./apiService";

export { config } from "./settings";
export * from "./services/categoryService";
export * from "./services/productService";
export * from "./services/customerService";

export function setup(config: ClientSettings = {}): void {
  setupConfig(config);
  reloadConfiguration();
}
