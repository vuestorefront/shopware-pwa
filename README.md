# Shopware PWA
[![Build Status](https://travis-ci.org/DivanteLtd/shopware-pwa.svg?branch=master)](https://travis-ci.org/DivanteLtd/shopware-pwa)
[![Coverage Status](https://coveralls.io/repos/github/DivanteLtd/shopware-pwa/badge.svg)](https://coveralls.io/github/DivanteLtd/shopware-pwa) [![Greenkeeper badge](https://badges.greenkeeper.io/DivanteLtd/shopware-pwa.svg)](https://greenkeeper.io/)

[Documentation](https://shopware-pwa-docs.netlify.com/)

**This repository is not ready for external contributions**

## Quick setup

Just run `yarn`, and you're ready to develop.
Please remember to always during development have opened terminal with `yarn test --watch` command fired.

## Installation for using the package in some other project

1. Run `yarn`
2. Build package with types definition `yarn build --types`
3. Create symlink for local usage `yarn link-packages`
4. In another project (can be generated from vue-cli) link client package and install axios (nothing will happen if you already have axios there)

```bash
yarn link @shopware-pwa/shopware-6-client
yarn add axios
```
5. In main project file (`main.js`) setup shopware config

```js
import {setup} from "@shopware-pwa/shopware-6-client"

setup({
  endpoint: 'https://address-to-my-shopware-instance.com',
  accessToken: 'myaccesstoken'
})
```
6. Use ShopwareClient services around your project. Example:

```js
import { getCategories } from "@shopware-pwa/shopware-6-client"

// later in component

async mounted() {
  this.categories = await getCategories();
}
```

## Installation problems

**Q:** Problem with `yarn serve` on external project  
**A:** By default webpack resolves symlinks to their real location. 
Add `config.resolve.symlinks(false)` to your `vue.config.js` file ([read more here](https://cli.vuejs.org/guide/troubleshooting.html#symbolic-links-in-node-modules))

```js
module.exports = {
  chainWebpack: (config) => {
    config.resolve.symlinks(false)
  }
}
```