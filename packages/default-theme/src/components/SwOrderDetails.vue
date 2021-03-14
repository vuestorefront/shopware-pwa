<template>
  <div v-if="order" class="sw-order-details">
    <SfHeading
      class="sw-order-details__header full-width"
      :level="3"
      :title="`${$t('Order no.')} ${order.orderNumber}`"
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
              table__price: tableHeader === 'Price',
            }"
            >{{ tableHeader }}</SfTableHeader
          >
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
        :address-title="$t('Billing address')"
        class="content"
      />

      <SwPluginSlot
        name="order-details-payment-method"
        :slot-context="paymentMethod"
      >
        <SwCheckoutMethod
          v-if="paymentMethod"
          :method="paymentMethod"
          :label="$t('Payment method')"
          class="content"
        />
      </SwPluginSlot>

      <SwPluginSlot
        name="order-details-shipping-method"
        :slot-context="shippingMethod"
      >
        <SwCheckoutMethod
          v-if="shippingMethod"
          :method="shippingMethod"
          :label="$t('Shipping method')"
          class="content"
        />
      </SwPluginSlot>
      <SfProperty :name="$t('Order status')" :value="status" />
      <SfLoader
        :loading="isPaymentButtonLoading"
        class="sw-order-details__loader"
      >
        <template #loader>{{ $t("Checking payment status...") }}</template>
        <div v-if="paymentUrl">
          <SfModal
            v-if="!preventRedirect"
            class="sw-modal"
            :title="$t('Add address')"
            :visible="isModalOpen"
            @close="isModalOpen = false"
          >
            <SfCharacteristic
              sizeIcon="xl"
              icon="credits"
              :title="$t('Payment in 5 seconds...')"
              :description="
                $t(
                  'You will be redirected to the payment gateway in 5 seconds...'
                )
              "
            />
          </SfModal>
          <a v-if="preventRedirect" :href="paymentUrl">
            <SwButton
              class="sf-button sf-button--full-width pay-button color-danger"
            >
              {{ $t("Pay for your order") }}
            </SwButton>
          </a>
        </div>
      </SfLoader>
    </div>
  </div>
</template>

<script>
import {
  SfTable,
  SfProperty,
  SfHeading,
  SfLoader,
  SfCharacteristic,
  SfModal,
} from "@storefront-ui/vue"
import { useUser, getApplicationContext } from "@shopware-pwa/composables"
import { ref, onMounted, computed, watch } from "@vue/composition-api"
import SwPluginSlot from "sw-plugins/SwPluginSlot.vue"
import {
  getOrderPaymentMethodId,
  getOrderShippingMethodId,
} from "@shopware-pwa/helpers"
import {
  getShippingMethodDetails,
  getPaymentMethodDetails,
  getOrderPaymentUrl,
} from "@shopware-pwa/shopware-6-client"
import SwButton from "@/components/atoms/SwButton.vue"
import { PAGE_ORDER_SUCCESS } from "@/helpers/pages"
import SwOrderDetailsItem from "@/components/SwOrderDetailsItem.vue"
import SwPersonalDetails from "@/components/SwPersonalDetails.vue"
import SwAddress from "@/components/SwAddress.vue"
import SwCheckoutMethod from "@/components/SwCheckoutMethod.vue"
import SwTotals from "@/components/SwTotals.vue"

export default {
  name: "SwOrderDetails",
  components: {
    SfProperty,
    SfTable,
    SfHeading,
    SfLoader,
    SwButton,
    SwOrderDetailsItem,
    SwPersonalDetails,
    SwAddress,
    SwCheckoutMethod,
    SwTotals,
    SwPluginSlot,
    SfCharacteristic,
    SfModal,
  },
  props: {
    orderId: {
      type: String,
      default: "",
    },
    // redirect to the payment gateway automatically if order is not paid
    preventRedirect: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      tableHeaders: [
        this.$t("Item"),
        this.$t("Price"),
        this.$t("Quantity"),
        this.$t("Amount"),
      ],
    }
  },
  // TODO: move this logic into separate service;
  // details: https://github.com/DivanteLtd/shopware-pwa/issues/781
  setup({ orderId, preventRedirect }, { root }) {
    const { apiInstance } = getApplicationContext(root, "SwOrderDetails")
    const { getOrderDetails, loading, error: userError } = useUser(root)
    const order = ref(null)
    const paymentMethod = computed(
      () => order.value?.transactions?.[0]?.paymentMethod
    )
    const shippingMethod = computed(
      () => order.value?.deliveries?.[0]?.shippingMethod
    )
    const paymentUrl = ref(null)
    const isPaymentButtonLoading = ref(false)
    const isModalOpen = ref(false)

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
        isPaymentButtonLoading.value = true
        order.value = await getOrderDetails(orderId)
        const resp = await getOrderPaymentUrl(
          {
            orderId,
            finishUrl: `${window.location.origin}${PAGE_ORDER_SUCCESS}?orderId=${orderId}`,
          },
          apiInstance
        )
        paymentUrl.value = resp.paymentUrl
      } catch (e) {}
      isPaymentButtonLoading.value = false
    })

    watch(paymentUrl, (paymentUrl, prevPaymentUrl) => {
      if (paymentUrl && window && !preventRedirect) {
        isModalOpen.value = true
        setTimeout(() => {
          window.location.href = paymentUrl
        }, 5000)
      }
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
      isPaymentButtonLoading,
      isModalOpen,
    }
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

.sw-order-details {
  padding: 1rem;
  width: 60%;
  display: flex;
  flex-wrap: wrap;

  @include for-mobile {
    flex-direction: column;
    width: 90%;
    padding: var(--spacer-xs);
  }

  &__loader {
    margin-top: var(--spacer-base);
    height: 3rem;
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
  &__row {
    flex-wrap: nowrap;

    & > th {
      order: unset;
    }
  }

  &__data {
    flex: 1;
    order: unset;
    text-align: center;
    &:last-of-type {
      text-align: right;
    }
  }

  &__description {
    flex: 2;
  }

  &__quantity {
    text-align: center;
    flex: 1;
  }

  &__price {
    flex: 1;
    order: unset;
  }

  &__amount {
    flex: 1;
    text-align: right;
  }
}

.pay-button {
  display: flex;
  margin-top: var(--spacer-base);
  margin-bottom: 0;
}
</style>
