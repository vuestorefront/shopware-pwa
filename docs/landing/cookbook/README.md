# Cookbook

> This content **is not** intended for contribution purposes.

## Table of contents

1. [How to init a project for my ecommerce _(not a contribution)_](#no1)
2. [Can I build a docker image with shopware-pwa inside?](#no2)
3. [How to change the Shopware6 API credentials](#no3)
4. [How to upgrade an existing project](#no4)
5. [How to customize or extend default shopware-pwa look](#no5)
   - [I want to add a new tab in product details page](#no51)
   - [I want to add additional page, like `/instagram` to show some posts](#no52)
   - [I want to write my own plugin to disable the "Add to cart notifications" feature.](#no53)
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

> It's better to know what's hidden over the CMS in Shopware 6: visit [Shopping Experiences](../concepts/cms.md) because category pages, product listings are made of it.

You can customize the default-theme by overriding the specific Vue components, or just changing the styling. In order to understand how id works, let's see what a project's structure looks like

```
src/ directory
.
├── assets
│   ├── README.md
│   └── scss
│       ├── main.scss       - write your own styling
│       └── variables.scss  - control the general appearance by changing the predefined variables
├── components              - here go the components you need, overriden ones as well as the new one
│   ├── README.md
│   └── SwAddress.vue       - here the overriden SwAddress component is located
├── layouts
│   └── README.md
├── middleware
│   └── README.md
├── pages
│   └── README.md         - place a spacific pages here, override current ones
├── plugins               - extend the project with a nuxt plugin
│   └── README.md
├── static
│   ├── favicon.ico
│   ├── icon.png
│   └── README.md
└── store
    └── README.md         - for vuex purposes
```

In general, the generated project is a [Nuxtjs](https://nuxtjs.org/) project. This is why the structure is the same, and the behavior of nuxt is kept. Thanks to this you can customize the generated project as much as you want without losing the fancy features that nuxtjs provides.

**By default, everything you put into this structure can extend, or modify the _@shopware-pwa/default-theme_ [link to the package](https://www.npmjs.com/package/@shopware-pwa/default-theme).**

### The most popular use cases

1. I want to add a new tab in product details page. <a id="no51"></a>

   > See how to customize an existing Vue component using shopware-pwa CLI [here](../../guide/TROUBLESHOOTING.md#question-how-can-i-override-theme-component)

   - use `npx @shopware-pwa/cli@canary override` command
   - pick up the `/SwProductTabs.vue` component
   - the component is being copied from `@shopware-pwa/default-theme` package, and then placed in `src/components` ready to edit.
   - now your shopware-pwa project uses your local `SwProductTabs.vue` instead of the one from default-theme.

2. I want to add additional page, like `/instagram` that connects to the Shopware6 API to get and show some data <a id="no52"></a>

   - create `instagram.vue` file in `src/pages`
   - implement a template
   - implement a <script></script> which can have some logic
   - utilize the `invokeGet, invokePost...` from `@shopware-pwa/shopware-6-client` package or any library (like `axios`) to make some requests you need

   It may look like:

   ```javascript
   <template>
      <div class="sw-instagram">
        <div v-if="posts.length">
          <InstagramPost v-for="post in posts" :post="post" />
        </div>
        <div v-else>
          <span>no posts found</span>
        </div>
      </div>
   </template>

    <script>
    import { getApplicationContext } from "@shopware-pwa/composables"
    import { invokePost } from "@shopware-pwa/shopware-6-client"
    import { onMounted, ref } from "@vue/composition-api"

    export default {
      name: "SwInstagramPage",
      setup({}, { root }) {
        // get the configured api client
        const { apiInstance } = getApplicationContext(root, "SwInstagramPage")
        const posts = ref([]);

        onMounted(async () => {
          // make an API call to get the instagram posts through Shopware6 API
          // let's assume you have an appriopriate module installed and an endpoint exposed
          try {
            const postsResponse = await invokePost({
              limit: 10,
              hashtags: "#great #clothes"
              ...
            }, apiInstance) // if you provide the current apiInstance you will have set a proper credentials (current context token)

            if(postsResponse.data) {
              posts.value = postsResponse.data
            }
          } catch (error) {
            console.error("SwInstagramPage:onMounted", error);
          }
        })

        return {
          posts
        }
      }
    }
    </script>

    <style lang="scss" scoped>
    </style>


   ```

3. I want to write my own plugin to disable the "Add to cart notifications" feature.<a id="no53"></a>

   - create `disable-notification.js` file in `src/plugins` directory
   - the created file is treated like normal nuxt plugin witch an access to current context

   the plugin may look like this:

   ```javascript
   import { useIntercept, INTERCEPTOR_KEYS } from "@shopware-pwa/composables";
   import { addToCartNotification } from "@shopware-pwa/default-theme/logic/notifications";

   export default ({ app }) => {
     // import a disconnect method from useIntercept composable
     const { disconnect } = useIntercept(app);
     // pass the interceptor key you want to change, and pass the function to be removed from event dispatcher
     disconnect(INTERCEPTOR_KEYS.ADD_TO_CART, addToCartNotification);
   };
   ```

   - once the plugin is created, you need to reload the nuxt app to have it working in the project

### 6. How to use/write your own theme <a id="no6"></a>

TODO
