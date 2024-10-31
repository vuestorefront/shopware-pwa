# Shopware PWA composables

> [!WARNING]
> Deprecated. This package is deprecated. Look out for the new project [Showpare Composable Frontends](https://frontends.shopware.com/).
>
> Direct replacement of this package is [@shopware/composables](https://npmjs.com/package/@shopware/composables) package

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
setup (props) {
  const productId = "hiufh3847fhb4y3uvf"
  const { product, search } = useProduct()
  search(productId)

  return { product }
},
```
