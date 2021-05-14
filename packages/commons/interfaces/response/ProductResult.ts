import { PropertyGroup } from "@shopware-pwa/commons/interfaces/models/content/property/PropertyGroup";
import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";

/**
 * @beta
 */
export interface ProductResponse {
  product: Product;
  configurator: PropertyGroup[];
}
