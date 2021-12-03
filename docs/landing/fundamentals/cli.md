# CLI

A command line interface for [Shopware PWA](https://github.com/DivanteLtd/shopware-pwa).

## CLI commands

Use always latest CLI package. To do so, use `npx` instead of `npm` or `yarn` installed package, like:

```bash
npx @shopware-pwa/cli <command>
```

### Available commands:

| command      | Purpose                                  |
| ------------ | ---------------------------------------- |
| build-theme  | Build a custom theme                     |
| build        | Build a project in production mode       |
| cms          | Regenerate map for cms components        |
| create-theme | Bootstrap a custom theme structure       |
| dev-theme    | Dev build of custom theme                |
| dev          | Dev build for a project                  |
| domains      | Synchronize domains settings for routing |
| init         | Init a project                           |
| languages    | Merge project locales                    |
| override     | Override a specific theme component      |
| plugins      | Load and mount Shopware PWA plugins      |
| snippets     | Synchronize the language snippets        |

Every command has its own parameters available.

::: tip Canary version  
Currently, we're releasing a `canary` version per every push to `master` branch, so in order to have newest changes and fixes just install it like this:

```bash
npx @shopware-pwa/cli@canary <command>
```

Nevertheless, it's recommended to use other commands than **init** without npx, and rely on the project's package located in local _node_modules_. To do so, run: `yarn shopware-pwa <command>`. Thanks to this, you will get rid of many dependency/misconfiguration problems later on.

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
