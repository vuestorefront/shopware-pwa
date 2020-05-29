<template>
  <div v-if="order" class="sw-order-details">
    <SfHeading
      class="sw-order-details__header full-width"
      :level="3"
      :title="`Order #${order.orderNumber}`"
    />
    <div class="sw-order-details__totals">
      <SfTable class="sf-table--bordered table">
        <SfTableHeading class="table__row">
          <SfTableHeader
            v-for="tableHeader in tableHeaders"
            :key="tableHeader"
            class="table__header"
            :class="{
              table__description: tableHeader === 'Item',
              table__quantity: tableHeader === 'Quantity',
              table__amount: tableHeader === 'Amount',
            }"
          >
            {{ tableHeader }}
          </SfTableHeader>
        </SfTableHeading>
        <SwOrderDetailsItem
          v-for="item in order.lineItems"
          :key="item.id"
          :product="item"
        />
      </SfTable>
      <SwTotals :shipping="shippingCosts" :total="total" :subtotal="subtotal" />
    </div>
    <div class="sw-order-details__addresses">
      <SwPersonalDetails :personal-details="personalDetails" class="content" />
      <SwAddress
        v-if="billingAddress"
        :address="billingAddress"
        address-title="Billing address"
        class="content"
      />
      <SwCheckoutMethod
        v-if="paymentMethod"
        :method="paymentMethod"
        label="Payment method"
        class="content"
      />
      <SwCheckoutMethod
        v-if="shippingMethod"
        :method="shippingMethod"
        label="Shipping method"
        class="content"
      />
      <SfProperty name="Order status" :value="status" />
      <a v-if="paymentUrl" :href="paymentUrl">
        <SwButton
          class="sf-button sf-button--full-width pay-button color-danger"
        >
          Pay for your order
        </SwButton>
      </a>
    </div>
  </div>
</template>

<script>
import { SfTable, SfProperty, SfHeading } from '@storefront-ui/vue'
import { useUser } from '@shopware-pwa/composables'
import { ref, onMounted, computed, watchEffect } from '@vue/composition-api'
import SwPluginSlot from 'sw-plugins/SwPluginSlot'
import {
  getOrderPaymentMethodId,
  getOrderShippingMethodId,
} from '@shopware-pwa/helpers'
import {
  getShippingMethodDetails,
  getPaymentMethodDetails,
  getOrderPaymentUrl,
} from '@shopware-pwa/shopware-6-client'
import SwButton from '@shopware-pwa/default-theme/components/atoms/SwButton'
import { PAGE_ORDER_SUCCESS } from '@shopware-pwa/default-theme/helpers/pages'
import SwOrderDetailsItem from './SwOrderDetailsItem'
import SwPersonalDetails from './SwPersonalDetails'
import SwAddress from './SwAddress'
import SwCheckoutMethod from './SwCheckoutMethod'
import SwTotals from './SwTotals'

export default {
  name: 'SwOrderDetails',
  components: {
    SfProperty,
    SfTable,
    SfHeading,
    SwButton,
    SwOrderDetailsItem,
    SwPersonalDetails,
    SwAddress,
    SwCheckoutMethod,
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
  // TODO: move this logic into separate service;
  // details: https://github.com/DivanteLtd/shopware-pwa/issues/781
  setup({ orderId }) {
    const { getOrderDetails, loading, error: userError } = useUser()
    const order = ref(null)
    const paymentMethod = ref(null)
    const shippingMethod = ref(null)
    const paymentUrl = ref(null)

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
      try {
        order.value = await getOrderDetails(orderId)
        paymentMethod.value = await getPaymentMethodDetails(
          paymentMethodId.value
        )
        shippingMethod.value = await getShippingMethodDetails(
          shippingMethodId.value
        )
        const resp = await getOrderPaymentUrl({
          orderId,
          finishUrl: `${window.location.origin}${PAGE_ORDER_SUCCESS}?orderId=${orderId}`,
        })
        paymentUrl.value = resp.paymentUrl
      } catch (e) {}
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
      paymentUrl,
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

  &__header {
    text-align: left;
    width: 100%;
    margin: 0 0 var(--spacer-base) 0;
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
  &__amount {
    text-align: right;
  }
}

.pay-button {
  display: flex;
  margin-top: var(--spacer-base);
  margin-bottom: 0;
}
</style>
