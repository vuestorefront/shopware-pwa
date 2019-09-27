# Shopware PWA

**This reposoitory is not ready for external contributions**

## Installation

1. Copy VS 2.0 and this repo in the same folder ( https://github.com/filrak/vue-storefront/tree/release/2.0 )
2. Run `yarn installer` and follow defaults
3. Create symlinks for theme and catalog

```bash
cd theme && yarn link
```
```bash
cd catalog && yarn link
```
4. Inside VS 2.0 repo symlink theme in a root of your project
```bash
yarn link "vsf-shopware-theme"
```
5. Inside `node_modules/vsf-shopware-theme` symilnk catalog
```bash
yarn link "vsf-shopware-catalog"
```
6. Change `theme` field in `config/local.json` to `vsf-shopware-theme`
7. Run `yarn dev`on VS repo to start dev server and watch for file changes in both repos.
8. On localhost:3000 (or 3001, 3002 etc if it's occupied) you should see new theme.