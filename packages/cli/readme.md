# Shopware PWA CLI

A CLI for [Shopware PWA](https://github.com/DivanteLtd/shopware-pwa).

## Installation and usage

Instead of installation we recommend to use `npx` to ensure, that you always use current version of the CLI.

```bash
mkdir my-shopware-pwa
cd ./my-shopware-pwa
npx @shopware-pwa/cli@canary init
```

::: tip Canary version  
Currently, we're releasing a `canary` version per every push to `master` branch, so in order to have newest changes and fixes just install it like this:

```bash
mkdir my-shopware-pwa
cd ./my-shopware-pwa
npx @shopware-pwa/cli@canary init
```

:::

after this you're connected to our test shopware instance and ready to run project locally

```bash
yarn dev
```

Your application will be available on [http://localhost:3000](http://localhost:3000).  
Now you have complete ShopwarePWA project running locally.

## Version update

We encourage developers to use the `npx` rather global npm/yarn packages - to have the latest version of CLI for Shopware PWA installed, so there is no update needed.

```bash
npx @shopware-pwa/cli <command_alias>
```

::: tip Canary version  
If you want to update to `canary` version, just add this to your command.

```bash
npx @shopware-pwa/cli@canary <command_alias>
```

:::

## License

MIT - see LICENSE
