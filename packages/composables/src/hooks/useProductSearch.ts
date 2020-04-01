import Vue from "vue";
import { ref, Ref, computed, reactive } from "@vue/composition-api";
import { getProducts } from "@shopware-pwa/shopware-6-client";
import { SearchCriteria } from "@shopware-pwa/commons/interfaces/search/SearchCriteria";

/**
 * @alpha
 */
export interface UseProductSearch {
  loading: Ref<boolean>;
  error: Ref<any>;
  [x: string]: any;
}

const sharedListing = Vue.observable({
  products: [],
} as any);

/**
 * @alpha
 */
export const useProductSearch = (): UseProductSearch => {
  const loading: Ref<boolean> = ref(false);
  const error: Ref<any> = ref(null);
  const localListing = reactive(sharedListing);
  sharedListing.products = [];

  const search = async (term: string): Promise<void> => {
    loading.value = true;
    if (!term) {
      loading.value = false;
      error.value = "Term string expected to be passed";
      return;
    }

    console.log(
      `[shopware-pwa][debug]: %cSearch for products with term: "${term}" started...`,
      "color:#006994;font-family:system-ui;"
    );
    const searchCriteria: SearchCriteria = {
      term,
      configuration: {
        associations: [
          {
            name: "options",
          },
          {
            name: "productReviews",
          },
        ],
      },
    };
    try {
      const result = await getProducts(searchCriteria);
      sharedListing.products =
        (result && result.data && [...result.data]) || [];
      console.log(
        `[shopware-pwa][debug]: %cproducts found:`,
        "color:#006994;font-family:system-ui;"
      );
      console.log(`[shopware-pwa][debug]:`, sharedListing.products);
      console.log(
        `[shopware-pwa][debug]: %c----------------------------------------------------------`,
        "color:#006994;font-family:system-ui;"
      );
    } catch (e) {
      error.value = e;
    }

    loading.value = false;
  };

  const products = computed(() => localListing.products);

  return {
    search,
    products,
    loading,
    error,
  };
};
