# Upgrade

## API Versioning

Shopware adheres to a versioning principle where a new API version is released with every new major version. The current Major Version of Shopware 6 is 3.

:::tip Shopware Version
The full version name of Shopware (e.g. as of release shopware-pwa 0.3.0) is 6.3.0.1, where 6 is just the "product family, but not relevant for versioning
:::

The supported API versions of Shopware 6 are v3 and v2. Generally speaking, each major version x supports API versions x and x-1. So we have to accomodate for that mechanism.

We want Shopware PWA to be in sync with the latest endpoints of Shopware, to be able to ship new features to you as soon as they are released within Shopware.

## Version 0.2.x to 0.3.x

All changes are documented in our [Changelog](https://github.com/DivanteLtd/shopware-pwa/blob/master/CHANGELOG.md)

The 0.3.0 release introduces a couple of changes to

 * API Client Endpoints
 * API Client Interfaces

:::warning Important
Upgrading from shopware-pwa 0.2.x to 0.3.0 also requires upgrading your Shopware version from Shopware 6.2 to 6.3. Please note, that it is a coincidence, that Shopware 6.**3** is required to operate shopware-pwa 0.**3**. The might be future minor releases (0.4, 0.5 etc.) that still work on 6.3. 
:::

You will always find an overview of version compatibilities within our [Compatibility Table](/landing/getting-started/prepare-shopware.html#compatibility-table).

### API Endpoints

We've incremented all API endpoint versions to v3, so we can make use of the newest additions - even the ones which aren't there yet, but might be added in v3.

Please make sure to update all your endpoints to that version as well. For future Shopware major releases, we will bump up the used version.

### API Client Interfaces

As not only the API version changes, but also the the endpoints that are provided, we had to mark some endpoints as deprecated. Please make sure to remove their usages from your project and use the suggested replacements. Find more information within our Changelog linked above.