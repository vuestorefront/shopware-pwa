# Fundamentals

Understand some of the foundational concepts within Shopware PWA like and our thoughts on architecture, security and customization.

## Security <Badge text="new" type="info"/>

It is critical to understand which authentication mechanisms are utilized to make sure that your application is safe. Read this to see how Shopware PWA handles this regarding the usage of APIs.

→ [Security Fundamentals](./security)

## Context-awareness <Badge text="new (0.2.0)" type="info"/>

As it's well described in our [security](./security.md) section, `universal` applications may share the data between different server requests. It's very important to keep this in mind. To ensure, that data are always assiociated with correct invocation we introduced `context awareness` for both - client and composables logic.

### Context-awareness in composables

To ensure, that the whole logic is connected we now require, that every composable usage needs to have `Vue` context as its first parameter. It's effortless and straightforward but ensures that all data are secured.

```js
import { useUser } from "@shopware-pwa/composables"

// later in component
setup(props, { root }) {
  const { isLoggedIn } = useUser(root) // you're passing root to any composable as a first argument
}
```

`root` is an equivalent of component context `this`, so we're passing our Vue instance. In asyncData and Nuxt plugins, we have `app` instead.

```js
import { useUser } from "@shopware-pwa/composables"

// later in component
asyncData: async ({ params, app, }) => {
  const { isLoggedIn } = useUser(app)
})
```

if you do not pass Vue instance context to composable, you'll see Security warning like this

![composables context security warning](../../assets/composables-context-security-warning.png)

It means that somewhere you have `useAddToCart` invocation without passing root. Find that in your code and add context.

### Context-awareness in API client

Similar to `composables`, API client instance should be created for every request on the server. To ensure, that all requests are secured, and we still have the power of tree-shake (having in bundle only code, which we're using), we changed the way of API methods invocation, to pass them API client context as well. Most of the API client logic is invoked under the hood inside composables, but if you need to invoke API client method by yourself, you should add the context. To ensure a common way for composables and API client, we introduced `getApplicationContext` method. Usage example:

```js
import {
  getShippingMethodDetails,
  getPaymentMethodDetails,
  getOrderPaymentUrl,
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

## WIP <Badge text="coming soon"/>

Potential fundamentals

- Using Nuxt.js as a framework foundation
- Storefront UI and how to leverage its potential
- Extension system (plugins, themes and CMS)
- Logic desctructuring and reusability (Composition API)
