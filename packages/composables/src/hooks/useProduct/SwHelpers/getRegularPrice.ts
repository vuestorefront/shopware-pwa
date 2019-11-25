export default function getRegularPrice(product){
  return product.price ? product.price[0].gross : 0
}