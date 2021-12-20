import { ref, Ref, unref } from "vue-demi";
import { getProduct, getCmsPage } from "@shopware-pwa/shopware-6-client";
import {
  Product,
  CmsProductPageResponse,
  ClientApiError,
} from "@shopware-pwa/commons/interfaces";
import { getApplicationContext, useDefaults } from "@shopware-pwa/composables";
const NO_PRODUCT_REFERENCE_ERROR =
  "Associations cannot be loaded for undefined product";

/**
 * @beta
 */
export interface IUseProduct<PRODUCT, SEARCH> {
  product: Ref<PRODUCT | null>;
  search: SEARCH;
  loading: Ref<boolean>;
  error: Ref<any>;
  [x: string]: any;
}

/**
 * @beta
 */
export type Search = (path: string, associations?: any) => any;

/**
 * @beta
 */
export function useProduct(params?: {
  product?: Ref<Product> | Product;
}): IUseProduct<Product, Search> {
  const COMPOSABLE_NAME = "useProduct";
  const contextName = COMPOSABLE_NAME;

  const { apiInstance } = getApplicationContext({ contextName });
  const { getAssociationsConfig, getIncludesConfig } = useDefaults({
    defaultsKey: contextName,
  });

  const loading: Ref<boolean> = ref(false);
  const product: Ref<Product | null> = ref(unref(params?.product) || null);
  const error: Ref<any> = ref(null);

  const loadAssociations = async () => {
    if (!product || !product.value || !product.value.id) {
      throw NO_PRODUCT_REFERENCE_ERROR;
    }

    const searchCriteria = {
      includes: getIncludesConfig(),
      associations: getAssociationsConfig(),
    };

    const urlPath = `detail/${product.value.parentId || product.value.id}`;
    const result = await getCmsPage(urlPath, searchCriteria, apiInstance);

    // load only children; other properties are loaded synchronously
    product.value = Object.assign({}, product.value, {
      crossSellings: (result as CmsProductPageResponse).product?.crossSellings,
    });
  };

  const search = async (productId: string) => {
    loading.value = true;
    try {
      const result = await getProduct(productId, null, apiInstance);
      product.value = result?.product;
      return result;
    } catch (e) {
      const err: ClientApiError = e;
      error.value = err.messages;
    } finally {
      loading.value = false;
    }
  };

  return {
    product,
    loading,
    search,
    error,
    loadAssociations,
  };
}
