import { Product } from "@shopware-pwa/shopware-6-client";

// move to proper library
interface UiProductOption {
  label: string,
  value: string,
  [attribute: string]: string
}

interface Parameters {
  product: Product
  attribute: string
}

export default function getProductOptions(params: Parameters): UiProductOption[]{
  const { product, attribute } = params
  if (!product || !product.children || !attribute) {
    return []
  }

  const typeOptions = new Map();
  product.children.forEach(variant => {
    if (!variant || !variant.options || !variant.options.length) {
      return;
    }
    for(let option of variant.options) {
      if (option.group && option.group.name === attribute) {
        if (!typeOptions.has(option.id)) {
          typeOptions.set(option.id, {
            label: option.name,
            value: variant.id,
            [attribute]: option.name
          })
        }
      }
    }
  })
  return Array.from(typeOptions.values())
}