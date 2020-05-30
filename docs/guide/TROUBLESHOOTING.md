---
sidebar: auto
---

# Troubleshooting

## Issues caused by incorrect configuration.

### Issue: [ERROR] Problem with fetching CMS data: `Path `` could no be resolved.`

- Make sure you have followed [CHEATSHEET.md](./CHEATSHEET.md), especially [Shopware setup](./CHEATSHEET.md#shopware-setup).\*
- Ensure you have configured `shopware-pwa` application by setting the right values described in [this step](./CHEATSHEET.md#running-shopware-pwa-on-custom-shopware-instance).
  It's crucial to have the right `shopwareAccessToken` in the _shopware-pwa.config.js_ file. \
  It should be taken from **`storefront`** Sales Channel type - **NOT** a `headless` one.

### Issue: [ERROR] Problem with fetch <ENTITY_NAME> data: `No Matching sales channel found.`

- There is no Sales Channel related to the `shopwareAccessToken` you have set in your _shopware-pwa.config.js_ file.
- Either `shopwareEndpoint` or `shopwareAccessToken` does not match.
- Use the appropriate endpoint and access token (from Shopware admin panel) and follow steps described [here](./CHEATSHEET.md#running-shopware-pwa-on-custom-shopware-instance) ("Running Shopware PWA on custom Shopware instance" chapter).

### Issue: There are no products in the product listing. \*

- In your Shopware platform: Assign the categories and the products to the right Sales Channel, related to the `shopwareAccessToken` you have set in _shopware-pwa.config.js_.

- It might be, that your local PWA version is out of date. Try updating it using `npm -g install @shopware-pwa/cli@canary --force` and re-run `shopware-pwa init` selecting the `canary` version, if you're unsure about the correct version to use. 

---

`*` - if you are using your self-hosted Shopware instance
