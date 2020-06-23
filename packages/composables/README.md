# Shopware PWA composables

Vue 3 composables dedicated for Shopware.  
Package implements Vue Storefront Next architecture and provides agnostic composables for eCommerce logic.

## Installing

Using yarn:

```bash
$ yarn add @shopware-pwa/composables
```

## Usage examples

this example uses `@shopware-pwa/shopware-6-client` package for loading product data

```js
import { useProduct } from "@shopware-pwa/composables"

// in component
setup (props, { root }) {
  const productId = "hiufh3847fhb4y3uvf"
  const { product, search } = useProduct(root)
  search(productId)

  return { product }
},
```
