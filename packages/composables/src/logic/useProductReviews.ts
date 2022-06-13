import { ref, Ref, UnwrapRef, reactive, unref } from "vue-demi";
import {
  getProductReviews,
  addProductReview
} from "@shopware-pwa/shopware-6-client";
import {
  Product,
  ProductReview,
  ShopwareError,
  ShopwareSearchParams,
} from "@shopware-pwa/commons/interfaces";
import { useDefaults, getApplicationContext } from "@shopware-pwa/composables";
import { UiProductReview } from "packages/helpers/src/ui-interfaces";
import { ClientApiError } from "@shopware-pwa/commons";

/**
 * interface for {@link useProductReviews} composable
 *
 * @beta
 */
export interface IUseProductReviews {
  productReviews: Ref<UiProductReview[] | null>;
  errors: UnwrapRef<{
    loadProductReviews: ShopwareError[];
    addReview: ShopwareError[];
  }>;
  wasReviewSent: Ref<boolean>;
  isSendingReview: Ref<boolean>;
  addReview: (data: {
    title: string;
    content: string;
    points: number;
  }) => Promise<void>;
  loadProductReviews: (parameters?: ShopwareSearchParams) => Promise<void>;
}

/**
 * Composable for listing customer orders. Options - {@link IUseProductReviews}
 *
 * @beta
 */
export function useProductReviews(params: {
  product: Ref<Product> | Product;
}): IUseProductReviews {
  const COMPOSABLE_NAME = "useProductReviews";
  const contextName = COMPOSABLE_NAME;
  const product = unref(params.product);

  const { apiInstance } = getApplicationContext({ contextName });
  const { getDefaults } = useDefaults({ defaultsKey: contextName });

  const wasReviewSent = ref(false);
  const isSendingReview = ref(false);

  const errors: UnwrapRef<{
    loadProductReviews: ShopwareError[];
    addReview: ShopwareError[];
  }> = reactive({
    loadProductReviews: [],
    addReview: []
  });
  const productReviews: Ref<UiProductReview[] | null> = ref(null);

  const loadProductReviews = async (
    parameters: ShopwareSearchParams = {}
  ): Promise<void> => {
    try {
      const fetchedReviews = await getProductReviews(
        product.id,
        Object.assign({}, getDefaults(), parameters),
        apiInstance
      );
      productReviews.value = fetchedReviews.elements?.map(
        ({ id, externalUser, customerId, createdAt, content, points }: ProductReview) => ({
          id,
          author: externalUser ? externalUser : customerId,
          date: createdAt,
          message: content,
          rating: points,
        })
      ) ?? [];
    } catch(e) {
      const err: ClientApiError = e;
      errors.loadProductReviews = err.messages;
    }
  };

  const addReview = async (data: {
    title: string;
    content: string;
    points: number;
  }) => {
    isSendingReview.value = true;
    try {
      await addProductReview(
        product.id,
        data,
        apiInstance
      );
      wasReviewSent.value = true;
    } catch (error) {
      console.error("[SwAddProductReview][submitForm]: ", error);
      errors.addReview = error.messages;
    }
    isSendingReview.value = false;
  }

  return {
    productReviews,
    loadProductReviews,
    wasReviewSent,
    addReview,
    isSendingReview,
    errors,
  };
}
