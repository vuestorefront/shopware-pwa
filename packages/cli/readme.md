# Shopware PWA CLI

A CLI for [Shopware PWA](https://github.com/DivanteLtd/shopware-pwa).

## Installation and usage

Instead of installation we recommend to use `npx` to ensure, that you always use current version of the CLI.

```bash
mkdir my-shopware-pwa
cd ./my-shopware-pwa
npx @shopware-pwa/cli init
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

If you installed CLI globally, make sure that you have the latest version of CLI for Shopware PWA installed, you just need to reinstall the package using the same commands as for installation:

```bash
yarn global add @shopware-pwa/cli
```

or

```bash
npm install -g @shopware-pwa/cli
```

::: tip Canary version  
If you want to update to `canary` version, just add this to update command. If you're using it please remember to update often as it's changing with master branch.

```bash
npm install -g @shopware-pwa/cli@canary
```

:::

## License

MIT - see LICENSE
