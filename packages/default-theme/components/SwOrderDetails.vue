<template>
  <div class="sw-order-details" v-if="order">
    <div class="sw-order-details__totals">
      <SfTable class="sf-table--bordered table">
        <SfTableHeading class="table__row">
          <SfTableHeader
            v-for="tableHeader in tableHeaders"
            :key="tableHeader"
            class="table__header"
            :class="{ table__description: tableHeader === 'Item' }"
          >
            {{ tableHeader }}
          </SfTableHeader>
        </SfTableHeading>
        <SwOrderDetailsItem
          v-for="item in order.lineItems"
          :product="item"
          :key="item.id"
        />
      </SfTable>
      <SwTotals :shipping="shippingCosts" :total="total" :subtotal="subtotal" />
    </div>
    <div class="sw-order-details__addresses">
      <SwPersonalDetails :personal-details="personalDetails" class="content" />
      <SwAddress
        :address="billingAddress"
        address-title="Billing address"
        v-if="billingAddress"
        class="content"
      />
      <SwGenericMethod
        :method="paymentMethod"
        label="Payment method"
        v-if="paymentMethod"
        class="content"
      />
      <SwGenericMethod
        :method="shippingMethod"
        label="Shipping method"
        v-if="shippingMethod"
        class="content"
      />
      <SfProperty name="Order status" :value="status" />
    </div>
  </div>
</template>

<script>
import {
  SfTable,
  SfProperty,
} from '@storefront-ui/vue'
import { useUser, useCheckout } from '@shopware-pwa/composables'
import { ref, onMounted, computed, watchEffect } from '@vue/composition-api'
import SwPluginSlot from 'sw-plugins/SwPluginSlot'
import SwOrderDetailsItem from './SwOrderDetailsItem'
import SwPersonalDetails from './SwPersonalDetails'
import SwAddress from './SwAddress'
import SwGenericMethod from './SwGenericMethod'
import SwTotals from './SwTotals'
import {
  getOrderPaymentMethodId,
  getOrderShippingMethodId,
} from '@shopware-pwa/helpers'

export default {
  name: 'SwOrderDetails',
  components: {
    SfProperty,
    SfTable,
    SwPluginSlot,
    SwOrderDetailsItem,
    SwPersonalDetails,
    SwAddress,
    SwGenericMethod,
    SwTotals,
  },
  props: {
    orderId: {
      type: String,
    },
  },
  data() {
    return {
      tableHeaders: ['Item', 'Price', 'Quantity', 'Amount'],
    }
  },
  setup({ orderId }) {
    const { getPaymentMethod, getShippingMethod } = useCheckout()
    const { getOrderDetails, loading, error: userError } = useUser()
    const order = ref(null)
    const paymentMethod = ref(null)
    const shippingMethod = ref(null)

    const personalDetails = computed(
      () =>
        order.value && {
          email: order.value.orderCustomer.email,
          firstName: order.value.orderCustomer.firstName,
          lastName: order.value.orderCustomer.lastName,
        }
    )
    const billingAddress = computed(
      () =>
        order.value &&
        order.value.addresses &&
        order.value.addresses.find(
          ({ id }) => id == order.value.billingAddressId
        )
    )
    const shippingAddress = computed(
      () =>
        order.value &&
        order.value.addresses &&
        order.value.addresses.find(
          ({ id }) => id == order.value.shippingAddressId
        )
    )
    const paymentMethodId = computed(
      () => order.value && getOrderPaymentMethodId(order.value)
    )
    const shippingMethodId = computed(
      () => order.value && getOrderShippingMethodId(order.value)
    )
    const shippingCosts = computed(
      () => order.value && order.value.shippingCosts.totalPrice
    )
    const subtotal = computed(
      () => order.value && order.value.price.positionPrice
    )
    const total = computed(() => order.value && order.value.price.totalPrice)
    const status = computed(
      () => order.value && order.value.stateMachineState.name
    )

    onMounted(async () => {
      order.value = await getOrderDetails(orderId)
      paymentMethod.value = await getPaymentMethod(paymentMethodId.value)
      shippingMethod.value = await getShippingMethod(shippingMethodId.value)
    })

    return {
      isLoading: loading,
      userError,
      order,
      personalDetails,
      billingAddress,
      paymentMethod,
      shippingMethod,
      shippingCosts,
      subtotal,
      total,
      status,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';

.sw-order-details {
  padding: 1rem;
  width: 60%;
  display: flex;
  flex-wrap: wrap;
  @include for-mobile {
    flex-direction: column;
    width: 80%;
    padding: var(--spacer-base);
  }

  &__totals {
    flex: 4;

    @include for-desktop {
      flex: 2;
      margin-right: var(--spacer-base);
    }

    .sw-totals {
      margin-top: var(--spacer-base);
      @include for-desktop {
        margin-left: auto;
        width: 50%;
        padding: 0;
      }
    }
  }

  &__addresses {
    flex: 1;
    box-sizing: border-box;
    width: 100%;
    background-color: #f1f2f3;
    padding: var(--spacer-xl);
    margin-bottom: var(--spacer-base);
    &:last-child {
      margin-bottom: 0;
    }

    & > .content {
      margin-bottom: var(--spacer-base);
    }
  }

  .sf-divider {
    border: --c-primary;
    width: 50%;
    max-width: 50%;
    display: block;
  }
}

.table {
  &__data {
    text-align: center;
    &:last-of-type {
      text-align: right;
    }
  }
  &__description {
    flex: 3;
  }
  &__quantity {
    text-align: center;
  }
}
</style>
