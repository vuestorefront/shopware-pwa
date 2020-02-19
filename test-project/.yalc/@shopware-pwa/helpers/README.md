# Shopware PWA helpers

Helpers dedicated for Shopware.  
The package implements Vue Storefront Next architecture and provides agnostic mappers for data transfer objects.

## Installing

Using yarn:

```bash
$ yarn add @shopware-pwa/helpers
```

## Usage examples

this example uses `@shopware-pwa/shopware-6-client` package for loading product data

```js
import { getProductName } from "@shopware-pwa/helpers";
import { getProduct } from "@shopware-pwa/shopware-6-client";

// you loaded Product from API
const productId = "hwfiu3hf384h92948h298h2";
const product = await getProduct(productId);
const name = getProductName(product);
```

Why bother?  
It's a very simple example, but as it may look like an obvious one, you may find yourself struggling to see which field in object structure is what you're looking for. Which price is regular, which object attribute should you use? And this problem appears with every platform. Thanks to Vue Storefront Next pattern you always know that you'll get exactly what you're looking for in objects.
