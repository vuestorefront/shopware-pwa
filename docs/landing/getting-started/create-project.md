# Create a project

### Table of contents
1. [Installation](#installation)
2. Post install [configuration](#configuration)
3. [Continuous integration mode](#continuous-integration-mode-ci) (--ci)


## Installation

Run `init` command of CLI:
```bash
npx @shopware-pwa/cli@canary init
```

You will be asked for:

| | Description |
| --- | --- |
| Shopware instance address | URL of Shopware 6 instance you want be connected to |
|  Shopware instance access token | API access key (got from [this step](./prepare-shopware.html#api-credentials)) |
| Shopware admin username | Admin panel user - _to fetch required data from Shopware 6 instance via admin API_ |
| Shopware admin username | Password for given username |
| Do you want to allow dev mode for slots? (Don't use for production!)| To determine if _see slots_ mode for [plugins](../concepts/plugins) is enabled |

**If there is no error and command ended with success message, the Shopware PWA is installed and can be started, but some [additional steps](#configuration) are required to fully synchornize PWA with Shopware 6 API.**



## Configuration

Last thing is synchronization between Shopware PWA and Shopware 6 API in terms of plugins and domains.

### Domain synchronisation


## Run

::: tip Nuxt based
Under the hood, the Shopware PWA is a regular Nuxt project, extended with a nuxt module. So now, you can run or build it in the same way.
Nevertheless, we **recommend** you to use [shopware-pwa CLI](https://www.npmjs.com/package/@shopware-pwa/cli) commands to avoid mistakes with configuration.
:::


### Dev mode

```bash
yarn dev    # under the hood, some additional commands are executed before the nuxt is running
```

### Build a project

```bash
yarn build  # under the hood, some additional commands are executed before the nuxt is running
```

### Run a prebuilt project

```bash
yarn start  # executes a "nuxt start" command
```

## Continuous integration mode
