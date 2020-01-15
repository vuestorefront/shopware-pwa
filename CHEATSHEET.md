# Shopware PWA Setup Cheatsheet

This cheatsheet will give you an overview of the Shopware PWA project and how to set it up for development.

## General

`Shopware PWA` is a collaborative project between Vue Storefront and Shopware with the goal of providing an alternative Storefront based on the Vue Storefront Next architecture. It uses the Shopware Sales-Channel API for communication to the Shopware backend.

As both projects are still undergoing development, we decided to mitigate potential delays through an additional Shopware plugin `SwagVueStorefront` which extends the Sales-Channel API. Eventually, once the core will provide those functionalities, the plugin will be dumped and not required anymore.

There will be a more strealined, interactive development setup, but for now we're focussing on progress and stability of the platform.

## Installation

### Prerequisites

 * `shopware/platform` running within either `showpare/development` or `shopware/production`
 * `node@^10` installed
 * `yarn` package manager installed

 
### Installation steps

**Shopware setup**

Note: You can skip this section if you just want to try the PWA. It will be preconfigured to use a public instance.

 1. Make sure you have a running Shopware 6 instance (preferrably stable 6.0 once available)
 2. Clone [SwagVueStorefront](https://github.com/elkmod/SwagVueStorefront) into your `custom/plugins` directory.
 3. Install the plugin by running `bin/console plugin:install --activate SwagVueStorefront`
 4. Refresh the indices using `bin/console dal:index:refresh`
 5. Go to the admin panel and copy the API access key from your sales channel settings

**PWA setup**

 1. Clone the [showpare-pwa](https://github.com/DivanteLtd/shopware-pwa) project into a directory of your choice.
 2. Run `yarn` in the root.
 3. Go to `packages` and run `yarn build --types`
 4. Go to `packages/default-theme` and run `yarn install`
 5. **Only if you are using a custom Shopware instance** 
 		
 	Edit `packages/default-theme/plugins/api-client.js` and add your endpoint and accessToken to the `setup` parameters
 		
 6. Run `yarn dev` in the same directory to start the local node server.
 7. Your application will be available on [http://localhost:3000](http://localhost:3000)

### Common errors
