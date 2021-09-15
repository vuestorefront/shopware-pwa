import { ShopwarePwaConfigFile } from "@shopware-pwa/commons";
import { GluegunToolbox } from "gluegun";
// export types

export interface ShopwarePwaToolbox extends GluegunToolbox {
  isProduction: boolean;
  config: ShopwarePwaConfigFile & { loadConfig?: () => void };
}
