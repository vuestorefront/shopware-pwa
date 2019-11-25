export default function getProductOptions(product, attribute){
  if (!product || !product.children || !attribute) {
    return []
  }

  const typeOptions = new Map();
  product.children.forEach(variant => {
    for(let option of variant.options) {
      if (option.group.name === attribute) {
        if (!typeOptions.has(option.id)) {
          typeOptions.set(option.id, {
            label: option.name,
            value: variant.id,
            color: option.name
          })
        }
      }
    }
  })
  return Array.from(typeOptions.values())
}