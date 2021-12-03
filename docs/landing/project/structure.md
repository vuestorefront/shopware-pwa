# Structure

Short description of project structure.

## Packages description

They are located in ./packages and can be developing and published separately.

1. **cli** [_@shopware-pwa/cli_](https://www.npmjs.com/package/@shopware-pwa/cli) - A CLI tool for creating an instance of Shopware PWA projects.
2. **commons** [_@shopware-pwa/commons_](https://www.npmjs.com/package/@shopware-pwa/commons) - A collection of all necessary interfaces shared across the project's ecosystem.
3. **composables** [_@shopware-pwa/composables_](https://www.npmjs.com/package/@shopware-pwa/composables) - Vue 3 composables dedicated for Shopware. Composition API based.
4. **default-theme** [_@shopware-pwa/default-theme_](https://www.npmjs.com/package/@shopware-pwa/default-theme) - Default theme for Shopware PWA. Nuxt based.
5. **helpers** [_@shopware-pwa/helpers_](https://www.npmjs.com/package/@shopware-pwa/helpers) - Functions that transform/convert Shopware 6 specific data that comes from the API. Widely used by _composables_ or _default-theme_.
6. **nuxt-module** [_@shopware-pwa/nuxt-module_](https://www.npmjs.com/package/@shopware-pwa/nuxt-module) - It makes the whole project working properly. Connects some part of the project and enables modifications.
7. **shopware-6-client** [_@shopware-pwa/shopware-6-client_](https://www.npmjs.com/package/@shopware-pwa/shopware-6-client) - Shopware 6 API client. Tailored to the sales-channel-api.

---

## Project tree

The files structure shows the tree below

```
.
├── api                     <- API extractor docs
├── coverage*               <- code coverage reports
├── docs
├── packages                <- standalone packages
│   ├── cli                 <- @shopware-pwa/cli
│   │   ├── bin
│   │   ├── src
│   │   └── __tests__
│   ├── commons             <- @shopware-pwa/commons
│   │   └── interfaces
│   ├── composables         <- @shopware-pwa/composables
│   │   ├── src
│   │   └── __tests__
│   ├── default-theme       <- @shopware-pwa/default-theme
│   │   ├── assets
│   │   ├── components
│   │   ├── coverage
│   │   ├── helpers
│   │   ├── layouts
│   │   ├── middleware
│   │   ├── pages
│   │   ├── plugins
│   │   ├── static
│   │   └── store
│   ├── helpers             <- @shopware-pwa/helpers
│   │   ├── src
│   │   └── __tests__
│   ├── nuxt-module         <- @shopware-pwa/nuxt-module
│   │   ├── plugins
│   │   ├── src
│   │   └── __tests__
│   └── shopware-6-client   <- @shopware-pwa/shopware-6-client
│       ├── __e2e__
│       ├── src
│       └── __tests__
├── rfc                     <- place for Requests for comments
├── scripts                 <- scripts helping set up the project
├── test-project*           <- developer's instance of default-theme package

* - available locally in development mode
```
