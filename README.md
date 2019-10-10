# Shopware PWA
[![Build Status](https://travis-ci.org/DivanteLtd/shopware-pwa.svg?branch=master)](https://travis-ci.org/DivanteLtd/shopware-pwa)
[![Coverage Status](https://coveralls.io/repos/github/DivanteLtd/shopware-pwa/badge.svg)](https://coveralls.io/github/DivanteLtd/shopware-pwa)

[Documentation](https://shopware-pwa-docs.netlify.com/)

**This repository is not ready for external contributions**

## Quick setup

Just run `yarn`, and you're ready to develop.
Please remember to always during development have opened terminal with `yarn test --watch` command fired.

## Installation for using the package in some other project

1. Run `yarn`
2. Build package with types definition `yarn build --types`
3. Create symlink for client:

```bash
cd ./packages/shopware-6-client && yarn link && cd ../../
```

4. In another project (can be generated from vue-cli) link client package

```bash
yarn link @shopware-pwa/shopware-6-client
```
5. In project main file setup shopware config

```js
import {setup} from "@shopware-pwa/shopware-6-client"

setup({
  endpoint: 'https://address-to-my-shopware-instance.com'
})
```
6. Use ShopwareClient services around your project. Example:

```js
import {CategoryService} from "@shopware-pwa/shopware-6-client"

// later in component

async mounted() {
  this.categories = await CategoryService.getCategories();
}
```

## Installation problems

**Q:** Please report problems.  
**A:** We'll add info how to handle them here. 