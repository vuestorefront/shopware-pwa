import { ref, Ref } from "@vue/composition-api";
import { getProduct } from "@shopware-pwa/shopware-6-client";
import { Product } from "@shopware-pwa/shopware-6-client/src/interfaces/models/content/product/Product";

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
      name,
      description,
      options,
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
      name,
      description,
      options,
      media,
      cover,
      properties,
      productReviews,
      children
    });
  };

  const search = async (path: string) => {
    loading.value = true;
    try {
      const result = await getProduct(path);
      product.value = result;
      return result;
    } catch (e) {
      error.value = e;
      console.error("Problem with fetching PRODUCT data", e.message);
      console.error(e);
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
