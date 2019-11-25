export default function getProductOption(product, attribute){
  return product.options && product.options.find(option => option.group.name === attribute)
}