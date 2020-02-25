import { ref, Ref } from "@vue/composition-api";
import { getProduct } from "@shopware-pwa/shopware-6-client";
import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";
import { ClientApiError } from "@shopware-pwa/commons/interfaces/errors/ApiError";

const NO_PRODUCT_REFERENCE_ERROR =
  "Associations cannot be loaded for undefined product";

/**
 * @alpha
 */
export interface UseProduct<PRODUCT, SEARCH> {
  product: Ref<PRODUCT>;
  search: SEARCH;
  loading: Ref<boolean>;
  error: Ref<any>;
  [x: string]: any;
}

/**
 * @alpha
 */
export type Search = (path: string, associations?: any) => any;

/**
 * @alpha
 */
export const useProduct = (
  loadedProduct?: any
): UseProduct<Product, Search> => {
  const loading: Ref<boolean> = ref(false);
  const product: Ref<Product> = ref(loadedProduct);
  const error: Ref<any> = ref(null);

  const loadAssociations = async (associations: any) => {
    if (!product || !product.value || !product.value.id) {
      throw NO_PRODUCT_REFERENCE_ERROR;
    }

    const {
      media,
      cover,
      properties,
      productReviews,
      children
    } = await getProduct(
      product.value.parentId || product.value.id,
      associations
    );
    product.value = Object.assign({}, product.value, {
      media,
      cover,
      properties,
      productReviews,
      children
    });
  };

  const search = async (productId: string) => {
    loading.value = true;
    try {
      const result = await getProduct(productId);
      product.value = result;
      return result;
    } catch (e) {
      const err: ClientApiError = e;
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  return {
    product,
    loading,
    search,
    error,
    loadAssociations
  };
};
