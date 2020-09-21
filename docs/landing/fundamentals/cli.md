# CLI

A command line interface for [Shopware PWA](https://github.com/DivanteLtd/shopware-pwa).

::: tip Use always latest CLI package  
To do so, use `npx` instead of `npm` or `yarn` installed package, like:
```bash
npx @shopware-pwa/cli <command>
```
or 
```bash
npx @shopware-pwa/cli@canary <command>
```

## Installation
If there's a need to have the package installed globaly, always remember to keep it updated.

```bash
yarn global add @shopware-pwa/cli
```

or

```bash
npm install -g @shopware-pwa/cli
```

::: tip Canary version  
Currently, we're releasing a `canary` version per every push to `master` branch, so in order to have newest changes and fixes just install it like this:

```bash
npm install -g @shopware-pwa/cli@canary
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

## Version update

::: tip Always updated  
To avoid manualy updates - use `npx @shopware-pwa/cli` command instead.

To be sure that you have the latest version of CLI for Shopware PWA installed.
You just need to reinstall the package using the same commands as for installation:

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
