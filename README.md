# Shopware PWA

**This reposoitory is not ready for external contributions**

## Installation

1. Copy VS 2.0 and this repo in the same folder
2. Create symlinks for theme and catalog

```bash
cd theme && yarn link
```
```bash
cd catalog && yarn link
```
3. Inside VS 2.0 repo symlink theme in a root of your project
```bash
yarn link "@shopware/pwa-theme"
```
4. Inside `node_modules/@shopware/pwa-theme` symilnk catalog
```bash
yarn link "@shopware/pwa-catalog"
```
5. Run `yarn dev`