import axios from "axios";
import { config } from "../settings";
import { getProductEndpoint } from "../endpoints";
import { SearchResult } from "../interfaces/response/SearchResult";
import { Product } from "../interfaces/models/content/product/Product";

/**
 * Usage example:
 * ```ts
 * import { ProductService } from '@shopware-pwa/shopware-6-client'
 * ```
 */
export interface ProductService {
  getProductsIds: () => Promise<SearchResult<string[]>>;
  getProducts: () => Promise<SearchResult<Product[]>>;
  getProduct: (productId: string) => Promise<SearchResult<Partial<Product>>>;
}

/**
 * Get default amount of products
 *
 * @returns Promise<SearchResult<Product[]>>
 */
const getProductsIds = async function(): Promise<SearchResult<string[]>> {
  const resp = await axios.post(
    `${config.endpoint}/search-ids${getProductEndpoint()}`
  );
  return resp.data;
};

/**
 * Get default amount of products' ids
 *
 * @returns Promise<SearchResult<string[]>>
 */
const getProducts = async function(): Promise<SearchResult<Product[]>> {
  const resp = await axios.get(`${config.endpoint}${getProductEndpoint()}`);
  return resp.data;
};

/**
 * Get the product with passed productId
 *
 * @param productId
 * @returns Promise<SearchResult<Partial<Product>>>
 */
const getProduct = async function(
  productId: string
): Promise<SearchResult<Partial<Product>>> {
  const resp = await axios.get(
    `${config.endpoint}${getProductEndpoint()}/${productId}`
  );
  return resp.data;
};

/**
 * Expose public methods of the service
 */
export const ProductService: ProductService = {
  getProductsIds,
  getProducts,
  getProduct
};
