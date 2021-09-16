# Events interceptor <Badge text="since 0.4.0" type="info"/>

Sometimes there is a need to react on some event in the application. You may want to show a notification when product is added to cart, or send that event to your Analytics system.

To easily react to changes and events across the application we created `useIntercept` composable.  
It allows you to safely broadcast and intercept system events, and add your own events.

:::tip Useful info

All system events can be found in `INTERCEPTOR_KEYS` constant, you'll find it by importing it from composables package `import { INTERCEPTOR_KEYS } from "@shopware-pwa/composables"`

The `INTERCEPTOR_KEYS` interface is available [here](../resources/api/composables.interceptor_keys).
:::

## Usage examples

### In any vue component

In most cases, you'll use this mechanism indirectly. Let's take for example `useAddToCart` composable.  
It introduces a new type of methods `onXXX`, in our case it's `onAddToCart`

so when you'd like to react on that event:

```js
  setup(props, { root }) {
    const {
      onAddToCart,
    } = useAddToCart(root, props.product)

    onAddToCart(({props.product, quantity}) => {
      // here you can show notification, or send GTM event
    })

    return {
    }
  },
```

:::warning Important
Remember, that when you listen on the event in component, then you listen to it in every component instance. So if you have two active instances of this component and you want to show notification on adding to cart event, then you'd end up with two notifications. If you want to react on specific method do it in the component triggering the action or in Nuxt plugin (description below).
:::

```js
  setup(props, { root }) {
    const {
      addToCart
    } = useAddToCart(root, props.product)

    const yourAddToCartWrapper = async () => {
      await addToCart()
      // here you could show notification
    }

    return {
      yourAddToCartWrapper
    }
  },
```

### In Nuxt plugin

If you don't want to change any component in order to react on some event, you can create new Nuxt plugin, for example, `src/plugins/my-interceptors.js`, add it to `nuxt.config.js` file:

```
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: ['~/plugins/my-interceptor.js'],
```

and then inside this file, you can use interceptors directly like this (it will be also useful for intercepting your own events)

```js
import {
  useIntercept,
  INTERCEPTOR_KEYS,
  useNotifications,
} from "@shopware-pwa/composables";
import { getTranslatedProperty } from "@shopware-pwa/helpers";

export default async ({ app }) => {
  const { intercept } = useIntercept();
  const { pushSuccess } = useNotifications(app);
  intercept(INTERCEPTOR_KEYS.ADD_TO_CART, ({ product }) => {
    pushSuccess(
      `${getTranslatedProperty(product.name)} has been added to cart.`
    );
  });
};
```

or like this

```js
import {
  useAddToCart
  useNotifications,
} from "@shopware-pwa/composables";
import { getTranslatedProperty } from "@shopware-pwa/helpers";

export default async ({ app }) => {
  const { onAddToCart } = useAddToCart(app);
  const { pushSuccess } = useNotifications(app);
  onAddToCart(({ product }) => {
    pushSuccess(
      `${getTranslatedProperty(product, 'name')} has been added to cart.`
    );
  });
};
```

### Broadcast custom event

You can broadcast your custom events accross application. Your custom event will not be defined in `INTERCEPTOR_KEYS`, so you can broadcast your event like this:

```js
  setup(props) {
    const { broadcast } = useIntercept()

    const yourMethod = async () => {
      // ...some action
      broadcast('my-custom-event', {param1: "xyz"})
    }

    return {
      yourMethod
    }
  },
```

### Stop intercepting events

If the interceptor is used in component, it ends life with the life of this component, so you don't need to worry about potential memory leaks and invoking methods in dead components.  
If you're invoking it in nuxt plugin it will listen for the whole time when the application is displayed.

You might want to stop listening on the event at some point though, for example, another event causes that you don't want to listen to the event anymore.
`disconnect` method from `useIntercept` comes with help. This is how you can do this:

```js
import { useIntercept, INTERCEPTOR_KEYS } from "@shopware-pwa/composables";

export default async ({ app }) => {
  const { intercept, disconnect } = useIntercept();

  const myOnAddToCartMethod = ({ product }) => {
    // do something with event
  };
  intercept(INTERCEPTOR_KEYS.ADD_TO_CART, myOnAddToCartMethod);
  intercept("my-custom-event", () => {
    disconnect(INTERCEPTOR_KEYS.ADD_TO_CART, myOnAddToCartMethod);
  });
};
```
