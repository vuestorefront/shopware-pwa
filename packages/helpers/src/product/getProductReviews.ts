import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";
import { UiProductReview } from "@shopware-pwa/helpers";

/**
 * @alpha
 */
export function getProductReviews({
  product,
}: { product?: Product } = {}): UiProductReview[] {
  if (!product || !product.productReviews) {
    return [];
  }

  return product.productReviews.map(
    ({ id, externalUser, customerId, createdAt, content, points }) => ({
      id,
      author: externalUser ? externalUser : customerId,
      date: createdAt,
      message: content,
      rating: points,
    })
  );
}
