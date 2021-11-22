# Prepare Shopware 6 instance (API)

::: tip
This whole guide is also available as a [video tutorial](https://www.youtube.com/watch?v=--jUufVubyE) on Youtube.

Some paths and namings might not be 100% up to date in the video, so be aware of that.
:::

In order to make Shopware work with shopware-pwa you have to follow a few simple steps.

## Compatibility Table

We want Shopware PWA to be in sync with the latest endpoints of Shopware, to be able to ship new features to you as soon as they are released within Shopware.

Here you may find a compatibility table for the Shopware API.
| Shopware PWA version                                                                                                                          | Shopware 6 version                                                                                                                                                                                                                                                     |
| :-------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [![shopware-ver](https://img.shields.io/badge/shopware–pwa-1.0.x-green)](https://github.com/vuestorefront/shopware-pwa/releases/tag/v1.0.1) | [![shopware-ver](https://img.shields.io/badge/Shopware-6.4.x-green)](https://github.com/shopware/platform/releases/tag/v6.4) & [![shopware-ver](https://img.shields.io/badge/PWA%20plugin-0.3.x-green)](https://github.com/elkmod/SwagShopwarePwa/releases/tag/v0.3.0) |
| [![shopware-ver](https://img.shields.io/badge/shopware–pwa-0.8.2-green)](https://github.com/vuestorefront/shopware-pwa/releases/tag/v0.8.2)   | [![shopware-ver](https://img.shields.io/badge/Shopware-6.3.x-green)](https://github.com/shopware/platform/releases/tag/v6.4) & [![shopware-ver](https://img.shields.io/badge/PWA%20plugin-0.2.1-green)](https://github.com/elkmod/SwagShopwarePwa/releases/tag/v0.2.1) |

&nbsp;

Find more information on updating and versioning within our [Upgrade](/landing/operations/migrations) section

## Installation

Make sure you've installed a compatible version of Shopware according to the compatibility table above.

Within your Shopware root directory run:

```bash
composer require shopware-pwa/shopware-pwa
```

This will download a shopware plugin named `SwagShopwarePwa`, adding some readonly endpoints required to allow for performant rendering of the PWA.

After that run

```
bin/console plugin:refresh && bin/console plugin:install --activate SwagShopwarePwa
```

This will install and activate your plugin.

Alternatively, you can download a plugin as a zip package and upload it directly via admin panel (since v6.4.x: Extensions > My extensions > Upload plugin). Then the plugin can be installed & activated at the extensions view.

Now your instance is ready to go.

## Credentials

When running the CLI init function `shopware-pwa init` or editing the `shopware-pwa.config.js` directly, you might be wondering where to get the access token from.

An access token is usually associated with a "Sales Channel". These are defined in you Shopware instance. Log in to your Shopware instance - by default it uses the `admin` and `shopware` credentials.

![Admin login](./../assets/admin_panel.png)

Once you are logged in, you can find the configured Sales Channels on the left side of your navigation bar.

Select the `Storefront` sales channel or any sales channel that you've configured manually and the scroll down to the `API access` section. Copy the API access key and you're good to continue with your PWA setup.

![API access](../../assets/api-access.png)

[Continue with the PWA setup](/landing/getting-started#usage)
