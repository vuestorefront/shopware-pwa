# Shopware PWA

**This reposoitory is not ready for external contributions**

## Installation

1. Copy VS 2.0 and this repo in the same folder ( https://github.com/DivanteLtd/vue-storefront/tree/release/v2.0 )
2. cd to `shopware-pwa` repo
3. Create `resource/i18n` folder in `shopware/pwa/theme`
4. Create symlinks for theme and catalog

```bash
cd theme && yarn link
```
```bash
cd catalog && yarn link
```
5. Run `yarn`command 
6. cd to `vue-storefront` repo
7. Checkout to `release/v2.0` branch
8. Run `yarn && yarn installer` and follow defaults
9. Inside VS 2.0 repo symlink theme in a root of your project
```bash
yarn link "vsf-shopware-theme"
```
10. Inside `node_modules/vsf-shopware-theme` symilnk catalog
```bash
yarn link "vsf-shopware-catalog"
```
11. Change `theme` field in `config/local.json` to `vsf-shopware-theme`
12. Run `yarn dev`on VS repo to start dev server and watch for file changes in both repos.
