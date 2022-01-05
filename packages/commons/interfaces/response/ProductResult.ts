import { PropertyGroup } from "../models/content/property/PropertyGroup";
import { Product } from "../models/content/product/Product";

/**
 * @beta
 */
export interface ProductResponse {
  product: Product;
  configurator: PropertyGroup[];
}
