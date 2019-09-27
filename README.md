# Shopware PWA

**This reposoitory is not ready for external contributions**

## Installation

1. Copy VS 2.0 and this repo in the same folder ( https://github.com/DivanteLtd/vue-storefront/tree/release/v2.0 ).
2. Go to `shopware-pwa` repo.
3. Create `resource/i18n` folder in `shopware-pwa/theme`.
4. Create symlinks for theme and catalog:

```bash
cd theme && yarn link
```
```bash
cd catalog && yarn link
```
5. Run `yarn`command in `shopware-pwa` repo.
6. Go to to `vue-storefront` repo.
7. Checkout to `release/v2.0` branch.
8. Run `yarn && yarn installer` and follow defaults.
9. Inside VS 2.0 repo symlink theme in a root of your project:

```bash
yarn link "vsf-shopware-theme"
```

10. Inside `node_modules/vsf-shopware-theme` symlink catalog:

```bash
yarn link "vsf-shopware-catalog"
```

11. Change `theme` field in `config/local.json` to `vsf-shopware-theme`.
12. Run `yarn dev`on VS repo to start dev server and watch for file changes in both repos.

## Installation problems

**Q:** Error: ENOENT: no such file or directory, scandir /vue-storefront/node_modules/vsf-shopware-theme/resource/i18n.  
**A:** Create empty `resource/i18n` folder manually. 

**Q:** Errors associated with `storefront-ui`.  
**A:** Clone https://github.com/DivanteLtd/storefront-ui repository to the same folder as you have `shopware-pwa` and `vue-storefront` repositories.

**Q:** Running `yarn` in `vue-storefront` directory does not end.  
**A:** It takes about 200-400 seconds to finish. Be patient.

**Q:** Running `yarn dev` fails to compile / build.  
**A:** Make sure you checked out `release/v2.0` branch. Make sure you run `yarn` command in both `shopware-pwa` and `vue-storefront` repositories. 
