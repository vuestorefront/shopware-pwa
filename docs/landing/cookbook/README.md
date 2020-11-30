# Cookbook

> This content **is not** intended for contribution purposes.

## Table of contents

1. [How to init a project for my ecommerce _(not a contribution)_](#no1)
2. [Can I build a docker image with shopware-pwa inside?](#no2)
3. [How to change the Shopware6 API credentials](#no3)
4. [How to upgrade an existing project](#no4)
5. [How to customize default shopware-pwa look](#no5)
6. [How to use/write your own theme](#no6)

---

### 1. How to init a project for my ecommerce <a id="no1"></a>

> Prepare your Shopware6 instance, first. To do so, check required steps [here](../../guide/CHEATSHEET.md) _(Shopware setup paragraph)_.

1. Being in empty directory, run `npx @shopware-pwa/cli@canary init`
2. Answer a few basic questions:

   ![Core team](./../../assets/init_questions.png)

3. That's it! Now you have a nuxt project with shopware-pwa installed.
   > You can work with the project in development mode: `yarn dev`, or when it's ready for production: `yarn build` to generate the production build.

### 2. Can I build a docker image with shopware-pwa inside? <a id="no2"></a>

1. Init the project first, [see point #1](#no1)
2. Build the project with command `yarn build` _(it's important, because the Dockerfile does not build a nuxt project at all - copy the files only)_
3. Notice that there is a `Dockerfile` in the project's root directory
4. Now you can build a docker image, for instance: `docker build -t "shopware-pwa:1.0.0" . ` _(name your image freely, point the context to current directory ".")_
5. After the build is done, you can run the image wherever you like: `docker run -p80:3000 shopware-pwa:1.0.0`
6. The container has started the nuxt application, directs the traffic from port 80 to the 3000 inside the container.

### 3. How to change the Shopware6 API credentials <a id="no3"></a>

1. Edit `shopware-pwa.config.js` file, located in generated project's directory.

2. Adjust the `shopwareEndpoint` and `shopwareAccessToken` to your needs

```
module.exports = {
  shopwareEndpoint: 'http://localhost:8000',
  shopwareAccessToken: 'SWSCDM5YUNVUZ3ZRUHHBMGNVTG',
}
```

3. `yarn dev` or `yarn build` command will take the latest credentials of your config file.

### 4. How to upgrade an existing project <a id="no4"></a>

1. shopware-pwa is hidden under only one module named `@shopware-pwa/nuxt-module` with all its dependencies.
2. You can upgrade the `package.json` directly, or just init the project once again with `npx @shopware-pwa/cli@canary init` command.
3. After doing this, visit [Upgrade page](../getting-started/upgrade.md) for more information if there are some additional steps needed.

### 5. How to customize default shopware-pwa look <a id="no5"></a>

TODO

### 6. How to use/write your own theme <a id="no6"></a>

TODO
