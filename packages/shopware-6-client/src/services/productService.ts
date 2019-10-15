import axios from "axios";
import { config } from "../settings";
import { getProductEndpoint } from "../endpoints";
import { SearchResult } from "../interfaces/response/SearchResult";
import { Product } from "../interfaces/models/content/product/Product";
import { ParamsConverter } from "../helpers/paramsConverter";

/**
 * Usage example:
 * ```ts
 * import { ProductService } from '@shopware-pwa/shopware-6-client'
 * ```
 */
export interface ProductService {
  getProductsIds: () => Promise<SearchResult<string[]>>;
  getProducts: (
    pagination?: any,
    sort?: any,
    filter?: any
  ) => Promise<SearchResult<Product[]>>;
  getProduct: (productId: string) => Promise<Product>;
}

/**
 * @description Get default amount of products' ids
 */
const getProductsIds = async function(): Promise<SearchResult<string[]>> {
  const resp = await axios.post(
    `${config.endpoint}/search-ids${getProductEndpoint()}`
  );
  return resp.data;
};

/**
 * @description Get default amount of products
 */

const getProducts = async function(
  pagination?: any,
  sort?: any,
  filters?: any
): Promise<SearchResult<Product[]>> {
  const resp = await axios.get(`${config.endpoint}${getProductEndpoint()}`, {
    params: ParamsConverter.getParams(pagination, sort, filters)
  });
  return resp.data;
};

/**
 * @description Get the product with passed productId
 */
const getProduct = async function(productId: string): Promise<Product> {
  const resp = await axios.get(
    `${config.endpoint}${getProductEndpoint()}/${productId}`
  );
  return resp.data.data;
};

/**
 * @description Expose public methods of the service
 */
export const ProductService: ProductService = {
  getProductsIds,
  getProducts,
  getProduct
};
