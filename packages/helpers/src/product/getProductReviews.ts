import { Product } from "@shopware-pwa/shopware-6-client";
import { UiProductReview } from "@shopware-pwa/helpers";

export function getProductReviews({
  product
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
      rating: points
    })
  );
}
