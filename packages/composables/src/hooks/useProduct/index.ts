import { ref, Ref } from "@vue/composition-api";
import { getProduct, Product } from "@shopware-pwa/shopware-6-client";

const NO_PRODUCT_REFERENCE_ERROR =
  "Associations cannot be loaded for undefined product";

interface UseProduct<PRODUCT, SEARCH> {
  product: Ref<PRODUCT>;
  search: SEARCH;
  loading: Ref<boolean>;
  error: Ref<any>;
  [x: string]: any;
}

type Search = (path: string, associations?: any) => any;

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

    const result = await getProduct(product.value.parentId || product.value.id, associations);
    product.value = result;
  };

  const search = async (path: string) => {
    loading.value = true;
    try {
      const result = await getProduct(path);
      product.value = result;
      return result;
    } catch (e) {
      error.value = e;
      console.error("Problem with fetching data", e.message);
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
