import { Product } from "@shopware-pwa/shopware-6-client";
import { UiProductReview } from "packages/global";

interface Parameters {
  product: Product
}

export default function getProductReviews(params: Parameters): UiProductReview[] {
  const { product } = params
  
  if (!product.productReviews) {
    return []
  }

  return product.productReviews.map(({id, externalUser, customerId, createdAt, content, points }) => ({
    id,
    author: externalUser ? externalUser : customerId,
    date: createdAt,
    message: content,
    rating: points
  }))
}