import { ref, computed, ComputedRef } from "vue-demi";
import {
  Product,
  CrossSelling,
} from "@shopware-pwa/commons/interfaces/models/content/product/Product";

import {
  invokeGet,
  invokePost,
  getProductDetailsEndpoint,
} from "@shopware-pwa/shopware-6-client";
import {
  ApplicationVueContext,
  getApplicationContext,
} from "@shopware-pwa/composables";

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
 * const { loading, loadAssociations, productAssociations } = useProductAssociation(root, product, "cross-selling")
 * if (!productAssociations.value) {
 *    await loadAssociations()
 * }
 * ```
 * @beta
 */
export function useProductAssociations(
  rootContext: ApplicationVueContext,
  product: Product,
  association: "cross-selling" | "reviews"
): IUseProductAssociations {
  const { apiInstance } = getApplicationContext(
    rootContext,
    "useProductAssociations"
  );
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
