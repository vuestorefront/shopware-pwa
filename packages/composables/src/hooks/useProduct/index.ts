import { ref, Ref } from "@vue/composition-api";
import { getProduct } from "@shopware-pwa/shopware-6-client";
import { EntityType } from "@shopware-pwa/commons/interfaces/internal/EntityType";
import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";
import { ClientApiError } from "@shopware-pwa/commons/interfaces/errors/ApiError";
import { getApplicationContext, useDefaults } from "@shopware-pwa/composables";
import { ApplicationVueContext } from "../../appContext";
import { convertIncludesToGetParams } from "../../internalHelpers/includesConverter";
import { convertAssociationsToGetParams } from "../../internalHelpers/associationsConverter";
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
  rootContext: ApplicationVueContext,
  loadedProduct?: any
): UseProduct<Product, Search> => {
  const { apiInstance } = getApplicationContext(rootContext, "useProduct");
  const { getAssociationsConfig, getIncludesConfig } = useDefaults(
    EntityType.PRODUCT
  );

  const loading: Ref<boolean> = ref(false);
  const product: Ref<Product> = ref(loadedProduct);
  const error: Ref<any> = ref(null);

  const loadAssociations = async () => {
    if (!product || !product.value || !product.value.id) {
      throw NO_PRODUCT_REFERENCE_ERROR;
    }
    // TODO: https://github.com/DivanteLtd/shopware-pwa/issues/911
    const includesParams = convertIncludesToGetParams(getIncludesConfig());
    const associationsParams = convertAssociationsToGetParams(
      getAssociationsConfig()
    );

    const {
      media,
      cover,
      properties,
      productReviews,
      manufacturer,
      children,
    } = await getProduct(
      product.value.parentId || product.value.id,
      // TODO: https://github.com/DivanteLtd/shopware-pwa/issues/911
      Object.assign({}, associationsParams, includesParams),
      apiInstance
    );
    product.value = Object.assign({}, product.value, {
      media,
      cover,
      properties,
      productReviews,
      children,
      manufacturer,
    });
  };

  const search = async (productId: string) => {
    loading.value = true;
    try {
      const result = await getProduct(productId, null, apiInstance);
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
    loadAssociations,
  };
};
