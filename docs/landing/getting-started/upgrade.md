# Upgrade

## API Versioning

Shopware adheres to a versioning principle where a new API version is released with every new major version. The current Major Version of Shopware 6 is 3.

:::tip Shopware Version
The full version name of Shopware (e.g. as of release shopware-pwa 0.3.0) is 6.3.0.1, where 6 is just the "product family, but not relevant for versioning
:::

The supported API versions of Shopware 6 are v3 and v2. Generally speaking, each major version x supports API versions x and x-1. So we have to accomodate for that mechanism.

We want Shopware PWA to be in sync with the latest endpoints of Shopware, to be able to ship new features to you as soon as they are released within Shopware.

## Migrate version 0.4.x to 0.5.x - not released yet!

**MIGRATION STEP**: we simplified project upgrade process. Now you can remove `@shopware-pwa/*` dependencies repm your `package.json` file and leave only `@shopware-pwa/nuxt-module`. Thanks to this you change version only in a single place.

**FEATURE**: new composable `useListing` has been created. It uses `createListingComposable` factory, which you can use as well is `useListing` won't be enough for your needs. It allows you to have listing for all types of listings from shopware, like products, orders etc. It supports SSR and returns composable with a common listing interface.

**DEPRECATION**: composable `useCategoryFilters` is now deprecated - use `useListing` instead

**DEPRECATION**: composable `useProductListing` is now deprecated - use `useListing` instead

**DEPRECATION**: composable `useProductSearch` is now deprecated - use `useProductQuickSearch` instead

**DEPRECATION**: API client method `getSuggestedResults` is now deprecated - use `searchSuggestedProducts` instead

## Migrate version 0.3.x to 0.4.x

All changes are documented in our [Changelog](https://github.com/DivanteLtd/shopware-pwa/blob/master/CHANGELOG.md)

**BREAKING CHANGE**: moved nuxt folders inside `src` directory. `npx @shopware-pwa/cli init` should do this automatically or will notify you that it can't be done by it and you should do this manually. Folders to move: `"assets", "components", "layouts", "middleware", "pages", "plugins", "static", "store"`

**BREAKING CHANGE**: we've made overriding store more simple. If you don't need a store just leave `store` directory empty or remove it. If you need to use it though, then create `src/store/indexjs` file and attach theme store.

**FEATURE**: you can now safely use `@/components/COMPONENT_NAME.vue`instead of `@shopware-pwa/default-themee/components/COMPONENT_NAME.vue` inside your project. It's not a break - old aliases will stay the same.
So for example instead of:
`import SwButton from "@shopware-pwa/default-theme/components/atoms/SwButton"`
you can type
`import SwButton from "@/components/atoms/SwButton"`
and it will import SwButton from theme or overwritten by you (created in `src/components/atoms/SwButton.vue`)

**FEATURE**: you can explicitly call theme by using `@theme` alias.
So for example even if you overwritten SwButton as above you can still call theme SwButton like this:
`import SwButton from "@theme/components/atoms/SwButton"`

**MIGRATION STEP**: change import in `src/assets/main.scss` from `@import '~@shopware-pwa/default-theme/assets/scss/main';` to `@import '@theme/assets/scss/main';`

**MIGRATION STEP**: change import in `src/assets/variables.scss` from `@import '~@shopware-pwa/default-theme/assets/scss/variables';` to `@import '@theme/assets/scss/variables';`

**REFACTOR(default-theme)**: `SwAddress` in `components/forms/SwAddress` has been renamed to `SwAddressForm` to avoid duplications with `SwAddress` in `components/SwAddress.vue`

**FEATURE**: introduced `useDefaults` composable, which is used inside other composables to provide specific fields from API. You can extend it in `shopware-pwa.config.js` file. Read how in [useDefaults docs](/landing/resources/api/composables.usedefaults.html)

**FEATURE**: we introduced Interceptors functionality to listen on events across application. More [here](/landing/concepts/interceptor.html)

**FEATURE**: you can use new `useNotifications` composable to manage notifications in your app; best combination is to use it with Interceptors functionality.

## Migrate version 0.2.x to 0.3.x

All changes are documented in our [Changelog](https://github.com/DivanteLtd/shopware-pwa/blob/master/CHANGELOG.md)

The 0.3.0 release introduces a couple of changes to

- API Client Endpoints
- API Client Interfaces

:::warning Important
Upgrading from shopware-pwa 0.2.x to 0.3.0 also requires upgrading your Shopware version from Shopware 6.2 to 6.3. Please note, that it is a coincidence, that Shopware 6.**3** is required to operate shopware-pwa 0.**3**. The might be future minor releases (0.4, 0.5 etc.) that still work on 6.3.
:::

You will always find an overview of version compatibilities within our [Compatibility Table](/landing/getting-started/prepare-shopware.html#compatibility-table).

### API Endpoints

We've incremented all API endpoint versions to v3, so we can make use of the newest additions - even the ones which aren't there yet, but might be added in v3.

Please make sure to update all your endpoints to that version as well. For future Shopware major releases, we will bump up the used version.

### API Client Interfaces

As not only the API version changes, but also the the endpoints that are provided, we had to mark some endpoints as deprecated. Please make sure to remove their usages from your project and use the suggested replacements. Find more information within our Changelog linked above.
