export default function getReviews(product){
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