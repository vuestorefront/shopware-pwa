# Create a project

### Table of contents
1. [Installation](#installation)
2. Post install [configuration](#configuration)
3. [Continuous integration mode](#continuous-integration-mode) (--ci)


## Initialization of a project

Run `init` command of CLI:
```bash
npx @shopware-pwa/cli@canary init
```

You will be asked for:

| | Description |
| --- | --- |
| Shopware instance address | URL of Shopware 6 instance you want be connected to |
| Shopware instance access token | API access key (got from [this step](./prepare-shopware.html#api-credentials)) |
| Shopware admin username* | Admin panel user - _to fetch required data from Shopware 6 instance via admin API_ |
| Shopware admin username* | Password for given username |
| Do you want to allow dev mode for slots? (Don't use for production!)| To determine if _see slots_ mode for [plugins](../concepts/plugins) is enabled |

::: warning admin / password - why?
During initialization of the project, additional command are executed to:
- synchronize domains configuration (**mandatory!** - the multilangue and routing depends on that)
- synchronize plugins (not required)

So far, there is no other way to fetch the required data from public API, that's why `init` CLI command does it under the hood using admin API.
:::


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

The `init` command provides some optional options and parameters to enable working during a CI process (--ci option).
If you use --ci option with `init` command, then you won't be ased to answear for any question; the input parameters will be taken.

Let's have a look at example from our github actions script:
```yaml
# .github/workflows/deploy-storefrontcloud.yml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Setup node
        uses: actions/setup-node@v2
        with:
          node-version: "14"
          registry-url: https://registry.npmjs.org/
      - name: Create project (release)
        run: |
          mkdir test-project
          cd ./test-project
          npx @shopware-pwa/cli@latest init --ci --devMode --shopwareDomainsAllowList=${{ env.RELEASE_URL }} --shopwareDomainsAllowList=${{ env.RELEASE_URL }}/de
          yarn build
```


Now let's have a closer look at this part of the code:
```bash
npx @shopware-pwa/cli@latest init --ci --devMode --shopwareDomainsAllowList=${{ env.RELEASE_URL }} --shopwareDomainsAllowList=${{ env.RELEASE_URL }}/de
```

| Parameter/option | Description | Example |
| --- | --- | --- |
| --ci | Enables the Continuous integration mode. Disables further prompts in CLI. |
| --devMode | Enables the developer mode | |
| --shopwareDomainsAllowList | URL of allowed domain under which PWA will be runnin on. Used multiple times will output an array of URLs.  | `https://my-awesome-pwa.com` or `http://localhost:3000` | 
| --shopwareEndpoint | Shopware 6 API endpoint.   | `https://pwa-demo-api.shopware.com/trunk` |
| --shopwareAccessToken | Access Token for specific Sales Channel.   | `SWSCMDAZUUG5Z05VWKXIDWPSEQ` |
| --stage | target version of Shopware PWA.   | `^1.0.1` |
| --username | Admin user name | `admin` |
| --password | Admin user password  | `shopware` |