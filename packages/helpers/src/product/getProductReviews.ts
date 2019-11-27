import { Product } from "@shopware-pwa/shopware-6-client";

// TODO move to UI/next interfaces
interface UiProductReview {
  id: string,
  author: string,
  date: Date
  message: string | null,
  rating: number | null
}

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