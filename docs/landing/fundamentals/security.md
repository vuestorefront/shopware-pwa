# Security

At a fundamental level, Shopware PWA serves as a facade for users (customers) to interact with one or multiple backends (merchant services) of which Shopware will be at least one. We can achieve this type of architecture using APIs and following a so-called _headless_ approach. This yields great freedom as to which services and tools can be integrated without affecting others.

However, due to the applications [universal](/landing/project/#why-a-new-storefront) (isomorphic) nature **and contrary to fully server-side-rendered applications** this implies that some type of identification of the client application has to be achieved.

::: warning IMPORTANT
It is **absolutely crucial** for developers to keep in mind, that (universal) frontend applications have the architectural implication of exposing these identifications.
:::

For communication with the Shopware Store API we do this using tokens that identifiy the client application and the user. A different method is used to communicate to the Shopware Admin API. A deeper discussion of that can be found below.

It is the duty of every core maintainer, extension developer, contributor, etc. to be aware of which keys, tokens or access credentials are provided with the application and to make sure that no credentials ever allow for malicious exploitation of sensitive data.

## Authentication and Identification

Shopware provides two API endpoints which are used by the PWA. The Store API and the Admin API. The following explanation shows how each of these APIs are guarded, how Shopware PWA uses them and why we need them.

### Store API

The Store API serves as an abstraction for every storefront in Shopware and can be thought of as the user's API. It allows applications to obtain user views on data like products, categories, carts or conduct user operations like a registration, payment, or login. Fundamentally it requires two tokens to identify a user:

| Type        | Key                | Scope  | Function                                                           |
| ----------- | ------------------ | ------ | ------------------------------------------------------------------ |
| HTTP Header | `sw-access-key`    | Global | Identifies the application as a certain sales channel              |
| HTTP Header | `sw-context-token` | User   | Identifies the user context (login state, cart, selected language) |

As you can see, the purpose of both keys is to _identify_ the given user. Note that there are two "users" here - the _customer_ (identified by `sw-context-token`) as well as the client application (identified by `sw-access-key`). Both keys are visible to the user (agent) and that's totally fine.

#### Access Key

Structurally, this could even be omitted, when we check for the request URL on the backend and associate that with a specific sales channel. However with regard to other applications that don't have such a thing as a "user agent" like native phone apps, we have included this primitive identification. In combination with a URL this also helps preventing cross-site-attacks.

The access key is provided along with your Shopware instance URL within the `shopware-pwa.config.js`

```js
module.exports = {
  shopwareEndpoint: "http://shopware-pwa-api.test",
  shopwareAccessToken: "SWSCDE6YASXCB189CNM4PL4CUG",
};
```

#### Context Token

This token protects highly sensitive data and should never be persisted in other places that the user agent. It is either automatically given to any "new" customer or can be obtained by logging in as a customer. It is similar to a _Session ID_ and subject to the same vulnerabilities, such as session hijacking, if exposed in a non-sensitive way.

### Admin API

The Admin API is used to synchronise your PWA project with your Shopware 6 backend. This connection is only required during build time when running one of the following commands. The `shopware-pwa` CLI uses it to request resources from Shopware plugins and install them.

```sh
$ npx @shopware-pwa/cli init 		# Initialize a new project
$ yarn shopware-pwa plugins 		        # Refresh plugins from SW instance
```

The data is transmitted as a `.json` file containing plugin configurations and a `.zip` file containing plugin resources like `.js` or `.vue` files or other assets.

::: warning IMPORTANT
A runtime connection to the Admin API is not required and Admin API credentials **should never** find their way out of your build environment or be accessible from the outside.
:::

The Admin API is guarded with the OAuth 2.0 flow. Although it supports multiple grant types, the `shopware-pwa` CLI _User Password Credentials_ grant where one has to provide username and password of an admin user. These credentials will then be used to obtain a token that can be used for authentication.

| Type      | Key      | Scope      | Function                |
| --------- | -------- | ---------- | ----------------------- |
| HTTP Body | username | Admin User | Identify admin user     |
| HTTP Body | password | Admin User | Authenticate admin user |

Please check our [guide on authentication](https://docs.shopware.com/en/shopware-platform-dev-en/admin-api-guide/authentication) for the Admin API.

After the build process, there is no connection required anymore, so it is advised to only these credentials when executing the `init` or `plugins` command:

```sh
$ npx shopware-pwa/cli init --ci --username [user] --password [pass]
$ npx shopware-pwa/cli plugins --ci --username [user] --password [pass]
```

## Context-Awareness <Badge text="new (0.2.0)" type="info"/>

As described above, `universal` applications may share the data between different server requests. It's very important to keep this in mind. To ensure, that data is always assiociated with the correct invocation we introduced `context awareness` forclient logic.

### API Client

Similar to `composables`, the API client instance should be created for every request on the server. To ensure that all requests are secured and we still have the power of tree-shaking (having only code in your bundle which is used), we changed the way we invoke API methods, to pass them the API client context as well. Most of the API client logic is invoked under the hood inside composables, but if you need to invoke an API client method by yourself, you should add the context. To ensure there's a common way for composables and API client, we introduced `getApplicationContext` method.

**Usage example**

```js
import {
  getShippingMethodDetails,
  getPaymentMethodDetails,
  handlePayment,
} from "@shopware-pwa/shopware-6-client"
import { getApplicationContext } from "@shopware-pwa/composables"

// later in component
setup(params, {root}) {
  // we can pass component name, to easily track where the context is not passed
  const { apiInstance } = getApplicationContext(root, "myComponent")
  const someShippingMethodId = "123"
  const shippingMethod = await getShippingMethodDetails(
      someShippingMethodId,
      apiInstance
    )
}
```

You should check all your imports for `@shopware-pwa/shopware-6-client` and add `apiInstance` as the last parameter.

### Composables

::: warning Deprecated section
From `1.0.0-RC.1` Context awareness in composables is handled automatically. You don't need to add the `root` property to your composable.
:::

To ensure, that the whole logic is connected, we now require that every composable usage needs to have th `Vue` context as its first parameter. It's effortless and straightforward but ensures that all data is secured.

```js
import { useUser } from "@shopware-pwa/composables"

// later in component
setup(props, { root }) {
  const { isLoggedIn } = useUser(root) // you're passing root to any composable as a first argument
}
```

`root` is an equivalent of the component context `this`, so we're passing our Vue instance. In asyncData and Nuxt plugins, we use `app` instead.

```js
import { useUser } from "@shopware-pwa/composables"

// later in component
asyncData: async ({ params, app, }) => {
  const { isLoggedIn } = useUser(app)
})
```

If you don't pass the Vue instance context to the composable, you'll see the following security warning.

![composables context security warning](../../assets/composables-context-security-warning.png)

It means that somewhere you're invoking `useAddToCart` without passing the root. Find that in your code and add the context to fix it.

**Additional resources**

If you'd like to learn more about context awareness and shared contexts between requests, refer to the Vue Server-Side-Renderer documentation.

- [Vue Server-Side-Renderer](https://ssr.vuejs.org/)
