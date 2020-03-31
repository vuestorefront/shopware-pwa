# Shopware PWA CLI

A CLI for [Shopware PWA](https://github.com/DivanteLtd/shopware-pwa).

## Installation

```bash
yarn global add @shopware-pwa/cli
```

or

```bash
npm install -g @shopware-pwa/cli
```

## Usage

Create a directory for your project and enter it

```bash
mkdir my-shopware-pwa
cd ./my-shopware-pwa
```

initialize project inside directory

```bash
shopware-pwa init
```

after this you're connected to our test shopware instance and ready to run project locally

```bash
yarn dev
```

Your application will be available on [http://localhost:3000](http://localhost:3000).  
Now you have complete ShopwarePWA project running locally.

### Running Shopware PWA on custom Shopware instance

1. add new file `shopware-pwa.config.js` inside root of the newly created project
2. fill it with your needs, example:

```js
module.exports = {
  shopwareEndpoint: "https://shopware-2.vuestorefront.io",
  shopwareAccessToken: "SWSCMUDKAKHSRXPJEHNOSNHYAG"
};
```

3. run again `shopware-pwa init` and then `yarn dev`

## License

MIT - see LICENSE
