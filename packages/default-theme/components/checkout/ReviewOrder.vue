<template>
  <div>
    <SfHeading
      title="4. Order review"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <SfAccordion first-open class="accordion mobile-only">
      <SfAccordionItem header="Personal Details">
        <PersonalDetails :order="order" @click:edit="$emit('click:edit', 0)"/>
      </SfAccordionItem>
      <SfAccordionItem header="Shipping address">
        <ShippingAddress :shipping="shipping" :shippingMethodLabel="shippingMethod.label" @click:edit="$emit('click:edit', 1)"/>
      </SfAccordionItem>
      <SfAccordionItem header="Billing address">
          <BillingAddress :payment="payment" @click:edit="$emit('click:edit', 2)"/>
      </SfAccordionItem>
      <SfAccordionItem header="Payment method">
        <PaymentMethod :paymentMethod="paymentMethod" @click:edit="$emit('click:edit', 2)"/>
      </SfAccordionItem>
    </SfAccordion>
    <OrderItemsTable />
    <SfHeading
      title="Order details"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <div class="summary">
      <div class="summary__group">
        <div class="summary__total">
          <SfProperty
            name="Subtotal"
            :value="formatFrontPrice(subtotal)"
            class="sf-property--full-width property">
            <template #name><span class="property__name">Subtotal</span></template>
          </SfProperty>
          <SfProperty name="Shipping"
            :value="shippingMethod.price"
            class="sf-property--full-width property"
          >
            <template #name><span class="property__name">Shipping</span></template>
          </SfProperty>
          <SfProperty
            name="Total"
            :value="formatFrontPrice(total)"
            class="sf-property--full-width property--huge summary__property-total"
          >
            <template #name>TOTAL</template>
          </SfProperty>
        </div>
        <SfCheckbox v-model="terms" name="terms" class="summary__terms">
          <template #label>
            <div class="sf-checkbox__label">
              I agree to <a href="#">Terms and conditions</a>
            </div>
          </template>
        </SfCheckbox>
      </div>
      <div class="notification" v-if="!isUserLoggedIn">
        <SfNotification :visible="true" type="info" title="You can't place the order" message="Dummy checkout is enabled only for logged in users" />
      </div>
      <div class="notification" v-if="!cartItems.length">
        <SfNotification :visible="true" type="info" title="You can't place the order" message="Your cart is empty." />
      </div>
      <div class="summary__group">      
        <SfButton :disabled="!isUserLoggedIn || !cartItems.length" class="sf-button--full-width summary__action-button" @click="placeOrder()"
          >Place my order</SfButton>
        <SfButton
          class="sf-button--full-width sf-button--text summary__action-button summary__action-button--secondary"
          @click="$emit('click:back')">
          Go back to Payment
        </SfButton>
      </div>
    </div>
  </div>
</template>

<script>
import { useCart, useUser } from '@shopware-pwa/composables'
import { getPagePath } from '../../helpers/pages'
import helpers from '../../helpers'
import PersonalDetails from './ReviewOrder/PersonalDetails'
import ShippingAddress from './ReviewOrder/ShippingAddress'
import BillingAddress from './ReviewOrder/BillingAddress'
import PaymentMethod from './ReviewOrder/PaymentMethod'
import OrderItemsTable from './ReviewOrder/OrderItemsTable'


import {
  SfHeading,
  SfTable,
  SfCheckbox,
  SfButton,
  SfImage,
  SfIcon,
  SfPrice,
  SfProperty,
  SfAccordion,
  SfNotification
} from '@storefront-ui/vue'

export default {
  name: 'ReviewOrder',
  components: {
    SfHeading,
    SfTable,
    SfCheckbox,
    SfButton,
    SfImage,
    SfIcon,
    SfPrice,
    SfProperty,
    SfAccordion,
    SfNotification,
    PersonalDetails,
    ShippingAddress,
    BillingAddress,
    PaymentMethod,
    OrderItemsTable
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
    const { cartItems, subtotal, totalPrice, placeOrder: placeApiOrder, refreshCart, removeProduct } = useCart()
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
  methods: {
    formatFrontPrice(price) {
      return helpers.formatPrice(price);
    },
    async placeOrder() {
      try {
        const order = await this.placeApiOrder();
        console.warn(order);
        this.refreshCart();
        this.$router.push(getPagePath('success-page'))
      } catch (e) {
        console.warn(e);
      }
      
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';
@mixin for-desktop {
  @media screen and (min-width: $desktop-min) {
    @content;
  }
}
.title {
  margin-bottom: $spacer-extra-big;
}
.table {
  margin-bottom: $spacer-big;
  &__header {
    font-size: $font-size-regular-desktop;
    font-weight: $body-font-weight-primary;
    @include for-desktop {
      text-align: center;
    }
  }
  &__data {
    font-size: $font-size-small-desktop;
    text-align: center;
  }
  &__image {
    @include for-desktop {
      flex: 0 0 5.125rem;
    }
  }
  &__action {
    @include for-desktop {
      flex: 0 0 2.5rem;
    }
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
.accordion {
  margin: 0 0 $spacer-extra-big 0;
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
.summary {
  background-color: $c-light;
  margin: 0 -#{$spacer-big};
  padding: $spacer-big;
  @include for-desktop {
    background-color: transparent;
  }
  &__group {
    @include for-desktop {
      display: flex;
      margin: 20px 0 $spacer-extra-big 0;
    }
    .notification {
      margin: auto;
    }
  }
  &__terms {
    flex: 1;
    order: -1;
    margin-bottom: $spacer-big;
  }
  &__total {
    margin: 0 0 $spacer-extra-big 0;
    padding: 0 $spacer-big;
    flex: 0 0 16.875rem;
    @include for-desktop {
      padding: 0;
    }
  }
  &__action-button {
    flex: 1;
    &--secondary {
      margin: $spacer-big 0;
      @include for-desktop {
        order: -1;
        margin: 0;
        text-align: left;
      }
    }
  }
  &__property-total {
    margin: $spacer-big 0 0 0;
    text-transform: uppercase;
    font-size: $font-size-regular-desktop;
    line-height: 1.6;
    font-weight: 500;
  }
}
.button {
  cursor: pointer;
}
.property {
  margin: 0 0 $spacer 0;
  font-size: $font-size-small-desktop;
  line-height: 1.6;
  &__name {
    color: $c-text-muted;
  }
}
.content {
  margin: 0 0 $spacer-big 0;
  color: $c-text;
  font-size: $font-size-extra-small-desktop;
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
  color: $c-text-muted;
  font-size: $font-size-extra-small-desktop;
}
.product-price {
  display: flex;
  flex-direction: column;
  font-size: $font-size-small-desktop;
  ::v-deep .sf-price__special {
    order: 1;
    color: $c-text;
  }
}
</style>
