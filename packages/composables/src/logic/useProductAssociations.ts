import { ref, computed, ComputedRef, Ref, unref } from "vue-demi";
import { Product, CrossSelling } from "@shopware-pwa/commons/interfaces";

import {
  invokeGet,
  invokePost,
  getProductDetailsEndpoint,
} from "@shopware-pwa/shopware-6-client";
import { getApplicationContext } from "@shopware-pwa/composables";

/**
 * interface for {@link IUseProductAssociations} composable
 * @beta
 */
export interface IUseProductAssociations {
  /**
   * Start loading resources
   */
  loadAssociations: (params: {
    params: unknown;
    method: "post" | "get";
  }) => Promise<void>;
  /**
   * If it's loading - indicator
   */
  isLoading: ComputedRef<boolean>;

  productAssociations: ComputedRef<CrossSelling[]>;
}

/**
 * Get product association entity. Options - {@link IUseProductAssociations}
 *
 * @example
 * Example of possibilities:
 *
 * ```ts
 * const { loading, loadAssociations, productAssociations } = useProductAssociation({product, associationContext: "cross-selling"})
 * if (!productAssociations.value) {
 *    await loadAssociations()
 * }
 * ```
 * @beta
 */
export function useProductAssociations(params: {
  product: Ref<Product> | Product;
  associationContext: "cross-selling" | "reviews";
}): IUseProductAssociations {
  const COMPOSABLE_NAME = "useProductAssociations";
  const contextName = COMPOSABLE_NAME;

  const product = unref(params.product);
  const association = params.associationContext;

  const { apiInstance } = getApplicationContext({ contextName });
  const isLoading = ref(false);
  const associations = ref([]);
  interface loadAssociationsParams {
    params?: unknown;
    method?: "post" | "get";
  }
  const loadAssociations = async ({
    method,
    params,
  }: loadAssociationsParams = {}) => {
    isLoading.value = true;
    try {
      if (method && method === "get") {
        const response = await invokeGet(
          {
            address: `${getProductDetailsEndpoint(product.id)}/${association}${
              params ? params : ""
            }`,
          },
          apiInstance
        );

        associations.value = response?.data;
        return;
      }

      const response = await invokePost(
        {
          address: `${getProductDetailsEndpoint(product.id)}/${association}`,
          payload: params,
        },
        apiInstance
      );

      associations.value = response?.data;
    } catch (error) {
      console.error(
        "[useProductAssociations][loadAssociations][error]:",
        error
      );
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading: computed(() => isLoading.value),
    productAssociations: computed(() => associations.value || []),
    loadAssociations,
  };
}
