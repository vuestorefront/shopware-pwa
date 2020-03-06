<template>
  <div>
    <SfHeading
      title="4. Order review"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <SfAccordion first-open class="accordion mobile-only">
      <SfAccordionItem header="Personal Details">
        <PersonalDetails :order="order" @click:edit="$emit('click:edit', 0)" />
      </SfAccordionItem>
      <SfAccordionItem header="Shipping address">
        <ShippingAddress
          :shipping="shipping"
          :shippingMethodLabel="shippingMethod.label"
          @click:edit="$emit('click:edit', 1)"
        />
      </SfAccordionItem>
      <SfAccordionItem header="Billing address">
        <BillingAddress
          :payment="payment"
          @click:edit="$emit('click:edit', 2)"
        />
      </SfAccordionItem>
      <SfAccordionItem header="Payment method">
        <PaymentMethod
          :paymentMethod="paymentMethod"
          @click:edit="$emit('click:edit', 2)"
        />
      </SfAccordionItem>
    </SfAccordion>
    <!-- Order items list -->
    <OrderItemsTable />
    <!-- /Order items list -->
    <SfHeading
      title="Order details"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <Summary @click:back="$emit('click:back')" />
  </div>
</template>

<script>
import { useCart, useUser } from '@shopware-pwa/composables'
import helpers from '@shopware-pwa/default-theme/helpers'
import PersonalDetails from '@shopware-pwa/default-theme/components/checkout/ReviewOrder/PersonalDetails'
import ShippingAddress from '@shopware-pwa/default-theme/components/checkout/ReviewOrder/ShippingAddress'
import BillingAddress from '@shopware-pwa/default-theme/components/checkout/ReviewOrder/BillingAddress'
import PaymentMethod from '@shopware-pwa/default-theme/components/checkout/ReviewOrder/PaymentMethod'
import OrderItemsTable from '@shopware-pwa/default-theme/components/checkout/ReviewOrder/OrderItemsTable'
import Summary from '@shopware-pwa/default-theme/components/checkout/ReviewOrder/Summary'

import {
  SfHeading,
  SfAccordion,
} from '@storefront-ui/vue'

export default {
  name: 'ReviewOrder',
  components: {
    SfHeading,
    SfAccordion,
    PersonalDetails,
    ShippingAddress,
    BillingAddress,
    PaymentMethod,
    OrderItemsTable,
    Summary
  },
  props: {
    order: {
      type: Object,
      default: () => ({})
    },
    shippingMethods: {
      type: Array,
      default: () => []
    },
    paymentMethods: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      terms: false,
      tableHeaders: ['Description', 'Quantity', 'Amount']
    }
  },
  setup() {
    const {
      cartItems,
      subtotal,
      totalPrice,
      placeOrder: placeApiOrder,
      refreshCart,
      removeProduct
    } = useCart()
    const { isLoggedIn } = useUser()
    return {
      refreshCart,
      cartItems,
      subtotal,
      total: totalPrice,
      placeApiOrder,
      isUserLoggedIn: isLoggedIn,
      removeProduct
    }
  },
  computed: {
    shipping() {
      return this.order.shipping
    },
    shippingMethod() {
      const shippingMethod = this.shipping.shippingMethod
      const method = this.shippingMethods.find(
        method => method.value === shippingMethod
      )
      return method ? method : { price: helpers.formatPrice(0) }
    },
    payment() {
      return this.order.payment
    },
    paymentMethod() {
      const paymentMethod = this.payment.paymentMethod
      const method = this.paymentMethods.find(
        method => method.value === paymentMethod
      )
      return method ? method : { label: '' }
    }
  },
}
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';

.title {
  margin-bottom: var(--spacer-extra-big);
}

.accordion {
  margin: 0 0 var(--spacer-extra-big) 0;
  &__item {
    display: flex;
    align-items: flex-start;
  }
  &__content {
    flex: 1;
  }
  &__edit {
    flex: unset;
  }
}

.button {
  cursor: pointer;
}
.property {
  margin: 0 0 var(--spacer) 0;
  font-size: var(--font-size-small-desktop);
  line-height: 1.6;
  &__name {
    color: var(--c-text-muted);
  }
}
.content {
  margin: 0 0 var(--spacer-big) 0;
  color: var(--c-text);
  font-size: var(--font-size-extra-small-desktop);
  font-weight: 300;
  line-height: 1.6;
  &:last-child {
    margin: 0;
  }
  &__label {
    font-weight: 400;
  }
}
/* TABLE */
.product-title,
.product-sku {
  line-height: 1.6;
}

.product-sku {
  color: var(--c-text-muted);
  font-size: var(--font-size-extra-small-desktop);
}
.product-price {
  display: flex;
  flex-direction: column;
  font-size: var(--font-size-small-desktop);
  ::v-deep .sf-price__special {
    order: 1;
    color: var(--c-text);
  }
}
</style>