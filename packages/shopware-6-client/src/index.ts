import { ClientSettings, setupConfig } from "./settings";
import { reloadConfiguration } from "./apiService";

export { config } from "./settings";
export { getCategories } from "./categoryService";

export function setup(config: ClientSettings = {}): void {
  setupConfig(config);
  reloadConfiguration();
}
