# API client for Shopware 6

Compatibility with Shopware 6:  
[![shopware-ver](https://img.shields.io/badge/version-6.1.1-orange)](https://github.com/shopware/platform/releases/tag/v6.1.1)

## Installing

Using yarn:

```bash
$ yarn add @shopware-pwa/shopware-6-client
```


## Usage example

A simple example of how to use API client to connect with your Shopware instance.

In main project file setup connection informations.
```js
import {setup} from "@shopware-pwa/shopware-6-client"

setup({
  endpoint: 'https://address-to-my-shopware-instance.com',
  accessToken: 'myaccesstoken'
})
```

And then anywhere in your project, you can use API Client methods:

```js
import { getCategories } from "@shopware-pwa/shopware-6-client"

// later in component

async mounted() {
  this.categories = await getCategories();
}
```