import { ref, Ref, computed, ComputedRef } from "@vue/composition-api";
import {
  Product,
  CrossSelling,
} from "@shopware-pwa/commons/interfaces/models/content/product/Product";

import {
  invokeGet,
  invokePost,
  getProductDetailsEndpoint,
} from "@shopware-pwa/shopware-6-client";
import { ApplicationVueContext, getApplicationContext } from "../appContext";

/**
 * interface for {@link IUseProductAssociation} composable
 * @beta
 */
export interface IUseProductAssociation {
  /**
   * Start fetching resources
   */
  fetchAssociations: (params: {
    params: unknown;
    method: "post" | "get";
  }) => Promise<void>;
  /**
   * If it's fetching - indicator
   */
  isLoading: Ref<boolean>;

  getAssociations: ComputedRef<CrossSelling[] | []>;
}

/**
 * Get product association entity. Options - {@link IUseProductAssociation}
 *
 * @example
 * Example of possibilities:
 *
 * ```ts
 * const { loading, fetchAssociations, getAssociations } = useProductAssociation(root, product, "cross-selling")
 * if (!getAssociations.value) {
 *    await fetchAssociations()
 * }
 * ```
 * @beta
 */
export function useProductAssociation(
  rootContext: ApplicationVueContext,
  product: Product,
  association: "cross-selling" | "reviews"
): IUseProductAssociation {
  const { apiInstance } = getApplicationContext(
    rootContext,
    "useProductAssociation"
  );
  const isLoading = ref(false);
  const associations = ref([]);
  interface FetchAssociationsParams {
    params?: unknown;
    method?: "post" | "get";
  }
  const fetchAssociations = async ({
    method,
    params,
  }: FetchAssociationsParams = {}) => {
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
        "[useProductAssociation][fetchAssociations][error]:",
        error
      );
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    getAssociations: computed(() => associations.value || []),
    fetchAssociations,
  };
}
