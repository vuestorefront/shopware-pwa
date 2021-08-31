# Shopware PWA CLI

A CLI for [Shopware PWA](https://github.com/DivanteLtd/shopware-pwa).

## CLI commands

Use always latest CLI package. To do so, use `npx` instead of `npm` or `yarn` installed package, like:

```bash
npx @shopware-pwa/cli <command>
```

::: tip Canary version  
Currently, we're releasing a `canary` version per every push to `master` branch, so in order to have newest changes and fixes just install it like this:

```bash
npx @shopware-pwa/cli@canary <command>
```

:::

## Usage

Create a directory for your project and enter it

```bash
mkdir my-shopware-pwa
cd ./my-shopware-pwa
```

initialize project inside directory

```bash
npx @shopware-pwa/cli init
```

after this you're connected to our test shopware instance and ready to run project locally

```bash
yarn dev
```

Your application will be available on [http://localhost:3000](http://localhost:3000).  
Now you have complete ShopwarePWA project running locally.

## License

MIT - see LICENSE
