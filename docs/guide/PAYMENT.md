---
sidebar: auto
---

# Payment API

:::warning Disclaimer
shopware-pwa utilises the [`@shopware-6-client`](https://www.npmjs.com/package/@shopware-pwa/shopware-6-client) package for all API calls and we encourage you to that as well, because it will take care of authentication, session and context state for you.

However, at this point, some payment related API calls are not included in the client package yet. Hence we are giving this "bare bones" description of the API usage. A more convenient programmatic API will follow in a later release of the client package.
:::

[[toc]]

## Intro

After a customer has finished browsing, they head to the checkout to do the following things:

- Review their order
- Set desired payment method
- Select shipping method
- Place the order
- Do the payment

In this guide we are going to focus on the last step mentioned - **Payment**.

## Process

The checkout can be described as a process, during which the cart gets converted to an order and one or multiple payment transactions.

There are two ways a payment can be processed in Shopware.

**Synchronous payment**

That is the easy way, where we just place an order and the payment is processed in the same call. Usually this is done for methods that don't require further user interaction. Examples for that could be: Pay by invoice, cash on delivery

**Asynchronous payment**

Asynchronous payments are not much harder, they only involve a redirect for the user. Often that's necessary if your payment provider has a login/confirmation dialog for their users. We then provide a `returnUrl` so the provider can return us to the confirmation page of our order once payment was completed.

:::tip Go deeper
If you want to know more about the backend logic of it, please check the Shopware documentation on [payment processing](https://docs.shopware.com/en/shopware-platform-dev-en/references-internals/core/checkout-process/payment) and [adding custom payment handlers](https://docs.shopware.com/en/shopware-platform-dev-en/how-to/payment-plugin).
:::

In our PWA, we really want to rely only on the API to handle our payments. That's why Shopware provides some endpoints to lead us through the process of ordering and payment, which are described below.

### Place the order

The base for a payment transaction is always the order. There is no transaction without an order. However, an order can be in an `open` payment state. You can place an order using the **_order_** endpoint of the Sales Channel API which will return the order entity once the order is completed.

```
POST sales-channel-api/v3/checkout/order
```

Response:

```json {7,11}
{
    "data": {
        "orderNumber": "10078",
        "orderDateTime": "2020-04-30T08:21:30+00:00",
        "amountTotal": 591,
        "stateMachineState": {
            "technicalName": "open",
            "stateMachineId": "e1c9d974f0644929bf457865f2c23ada",
            "id": "b4e6a0b4d02549e8bc39e4cef96a77e6"
        },
        "id": "4139ce0f86fb47ff872a1ec88378f5d1",
        ...
    }
}
```

or using [**@shopware-pwa/shopware-6-client**](https://www.npmjs.com/package/@shopware-pwa/shopware-6-client)

```
import { createOrder } from "@shopware-pwa/shopware-6-client"

const response: Promise<Order> = createOrder()
```

The order that was created contains the following (and more) fields:

- `orderNumber` - identification used for internal/accounting purposes (no technical relevance)
- `id` - technical identifier
- `amountTotal`, `orderDateTime`, `orderCustomer` - metadata
- `stateMachineState` - the current state of the order

Now we see that the current state of the order is open. So we can initiate the payment.

### Initiate the payment

We can initiate the payment by calling the **payment-method** endpoint for the order

Request:

```json
POST store-api/v3/payment-method

{
	"orderId": "4139ce0f86fb47ff872a1ec88378f5d1",
	"finishUrl": "http://my-shop-host/confirm.php?orderId=4139ce0f86fb47ff",
	"errorUrl": "http://my-shop-host/payment-error.php?orderId=4139ce0f86fb47ff"
}
```

or using [**@shopware-pwa/shopware-6-client**](https://www.npmjs.com/package/@shopware-pwa/shopware-6-client)

```
import { getAvailablePaymentMethods } from "@shopware-pwa/shopware-6-client"

const response: Promise<PaymentMethod[]> = getAvailablePaymentMethods()
```

:::details Want to know what's happening in detail?

This endpoint will internally handle the payment of your order by calling an associated payment handler which is defined through the payment method persisted with the order.

For example for an asynchronous checkout (like with PayPal), Shopware will create a JWT (JSON web token) containing transaction-related information including:

- transaction identifier
- payment method identifier
- finish page URL
- error page URL

All this information will be assembled into a return URL for the external payment provider containing the token as a parameter `_sw_payment_token`. Together with this return URL, Shopware will redirect your call to the external payment endpoint to let it conduct the payment.

After the payment has been conducted (or if it has been cancelled), the payment provider will redirect the user back to the API, calling the return URL given provided before.

The endpoint called in this return URL is `/payment/finalize-transaction`. This method will internally decrypt the JWT (which is still contained in the `_sw_payment_token` parameter) and route the user depending on the outcome of the payment according to your `finishUrl` and `errorUrl`.
:::

After this call, the user will be conducted through the external payment flow until they are redirected back to the URLs given by you depending on whether the payment was successful or not.

So for a successful order, you'd probably want to show a success or finish page to your user.

### Handle exceptions

If for some reason the payment wasn't successful (or cancelled by the user, because they forgot their password), you'd redirect them to a page where they can try an alternative payment method rather than just showing an error. Remember that, at this point, the order has already been created. However, its payment status is `cancelled` right now, since the payment wasn't successful.

Shopware provides a way to modify existing orders (i.e. change the selected payment method) and re-initiate the payment. Doing so involves two steps:

In order to alter the payment method for your order, call the **order payment** endpoint.

Request:

```json
POST /store-api/v3/order/payment

{
	"paymentMethodId": "1901dc5e888f4b1ea4168c2c5f005540",
	"orderId": "4139ce0f86fb47ff872a1ec88378f5d1"
}
```

Calling this endpoint will cause Shopware to cancel all existing payment transactions and create a single new transaction with the `open` state. Think of it like a "reset payment transactions" endpoint. Now that you've resetted the order payment, you can re-initiate the payment using the flow described [above](#initiate-the-payment)
