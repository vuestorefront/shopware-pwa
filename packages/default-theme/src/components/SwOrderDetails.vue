<template>
  <SfLoader :loading="isOrderDetailsLoading" class="sw-order-details-loader">
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
        <SfHeading
          :title="$t('Totals')"
          :level="2"
          class="sf-heading--left sf-heading--no-underline sw-totals__title"
        />
        <SwTotals
          :shipping="shippingCosts"
          :total="total"
          :subtotal="subtotal"
        />
      </div>
      <div class="sw-order-details__sidebar">
        <SwPersonalDetails
          :personal-details="personalDetails"
          class="content"
        />
        <SwAddress
          v-if="billingAddress"
          :address="billingAddress"
          :address-title="$t('Billing address')"
          class="content"
        />

        <SwAddress
          v-if="shippingAddress"
          :address="shippingAddress"
          :address-title="$t('Shipping address')"
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

        <div
          class="sw-order-details__sidebar--actions"
          v-if="!isOrderCancelled"
        >
          <h4 class="sw-order-details__title">{{ $t("Actions") }}</h4>
          <SfLoader
            :loading="isPaymentButtonLoading"
            class="sw-order-details__loader"
          >
            <template #loader>{{ $t("Checking payment status...") }}</template>
            <div v-if="paymentUrl">
              <a :href="paymentUrl">
                <SwButton
                  class="sf-button sf-button--full-width pay-button color-info"
                >
                  {{ $t("Pay for your order") }}
                </SwButton>
              </a>
            </div>
          </SfLoader>
          <!--- CANCEL ORDER -->
          <SwButton
            class="
              sf-button sf-button--underlined sf-button--full-width
              pay-button
              color-danger
            "
            @click="cancelModalVisible = true"
          >
            {{ $t("Cancel the order") }}
          </SwButton>
          <SfBottomModal
            class="sw-order-details-modal sw-cancel-order-modal"
            :title="$t('Your order will be canceled')"
            :is-open="cancelModalVisible"
            @click:close="cancelModalVisible = false"
          >
            <div class="center-content sw-cancel-order-modal__actions">
              <SwButton @click="cancelOrder" class="sf-button color-secondary">
                {{
                  cancelLoader
                    ? $t("In progress...")
                    : $t("Yes, cancel the order")
                }}
              </SwButton>
              <SwButton
                @click="cancelModalVisible = false"
                :disabled="cancelLoader"
                class="sf-button color-light"
              >
                {{ $t("No, thanks") }}
              </SwButton>
            </div>
          </SfBottomModal>
          <!--- CHANGE PAYMENT METHOD -->
          <SwButton
            class="
              sf-button sf-button--underlined sf-button--full-width
              pay-button
              color-danger
            "
            @click="openChangePaymentMethodModal"
          >
            {{ $t("Change payment method") }}
          </SwButton>
          <SfBottomModal
            class="sw-change-payment-method-modal"
            :title="$t('Choose a new payment method')"
            :is-open="changePaymentMethodModalVisible"
            @click:close="changePaymentMethodModalVisible = false"
          >
            <div class="center-content sw-order-details-modal__actions">
              <SfSelect
                class="payment-methods-select"
                v-model="selectedPaymentMethod"
              >
                <SfSelectOption
                  v-for="option in availablePaymentMethods"
                  :key="option.id"
                  :value="option.id"
                >
                  {{ option.name }}
                  <span
                    class="payment-methods-select__current"
                    v-if="paymentMethod.id === option.id"
                    >({{ $t("current") }})</span
                  >
                </SfSelectOption>
              </SfSelect>
              <SwButton
                @click="changePaymentMethod"
                class="sf-button color-secondary"
              >
                {{
                  isChangePaymentMethodLoading
                    ? $t("In progress...")
                    : $t("Apply")
                }}
              </SwButton>
            </div>
          </SfBottomModal>
        </div>
      </div>
    </div>
  </SfLoader>
</template>

<script>
import {
  SfTable,
  SfProperty,
  SfHeading,
  SfLoader,
  SfCharacteristic,
  SfBottomModal,
  SfDivider,
  SfSelect,
} from "@storefront-ui/vue"
import {
  useCheckout,
  useNotifications,
  useOrderDetails,
  getApplicationContext,
} from "@shopware-pwa/composables"
import { ref, onMounted, computed, watch } from "@vue/composition-api"
import SwPluginSlot from "sw-plugins/SwPluginSlot.vue"
import {
  getOrderPaymentMethodId,
  getOrderShippingMethodId,
} from "@shopware-pwa/helpers"
import {
  getShippingMethodDetails,
  getPaymentMethodDetails,
  handlePayment,
} from "@shopware-pwa/shopware-6-client"
import SwButton from "@/components/atoms/SwButton.vue"
import SwOrderDetailsItem from "@/components/SwOrderDetailsItem.vue"
import SwPersonalDetails from "@/components/SwPersonalDetails.vue"
import SwAddress from "@/components/SwAddress.vue"
import SwCheckoutMethod from "@/components/SwCheckoutMethod.vue"
import SwTotals from "@/components/SwTotals.vue"
import { PAGE_ORDER_SUCCESS, PAGE_ORDER_PAYMENT_FAILURE } from "@/helpers/pages"

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
    SfBottomModal,
    SfDivider,
    SfSelect,
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
  setup({ orderId }, { root }) {
    const { getPaymentMethods } = useCheckout(root)
    const { pushWarning } = useNotifications(root)
    const { apiInstance, routing } = getApplicationContext(root)
    const currentContextToken = computed(
      () => apiInstance?.config?.contextToken
    )
    const {
      order,
      status,
      total,
      subtotal,
      shippingCosts,
      shippingAddress,
      billingAddress,
      personalDetails,
      isPaymentButtonLoading,
      paymentUrl,
      shippingMethod,
      paymentMethod,
      loaders,
      loadOrderDetails,
      handlePayment,
      cancel,
      changePaymentMethod: doChangePaymentMethod,
    } = useOrderDetails(root, { id: orderId })

    const cancelModalVisible = ref(false)
    const changePaymentMethodModalVisible = ref(false)
    const selectedPaymentMethod = ref(paymentMethod.value?.id)
    const availablePaymentMethods = ref([])

    const cancelOrder = async () => {
      await cancel()
      cancelModalVisible.value = false
    }

    const openChangePaymentMethodModal = async () => {
      availablePaymentMethods.value = (await getPaymentMethods())?.value
      changePaymentMethodModalVisible.value = true
    }

    const changePaymentMethod = async () => {
      await doChangePaymentMethod(selectedPaymentMethod.value)
      await handlePayment(
        routing.getAbsoluteUrl(
          `${PAGE_ORDER_SUCCESS}?contextToken=${currentContextToken.value}&orderId=${orderId}`
        ),
        routing.getAbsoluteUrl(
          `${PAGE_ORDER_PAYMENT_FAILURE}?contextToken=${currentContextToken.value}&orderId=${orderId}`
        )
      )
      changePaymentMethodModalVisible.value = false
    }

    const isOrderCancelled = computed(
      () => order.value?.stateMachineState?.technicalName === "cancelled"
    )
    const cancelLoader = computed(() => loaders.cancel)
    const changePaymentMethodLoader = computed(
      () => loaders.changePaymentMethod
    )

    onMounted(() => {
      loadOrderDetails()
      handlePayment(
        routing.getAbsoluteUrl(
          `${PAGE_ORDER_SUCCESS}?contextToken=${currentContextToken.value}&orderId=${orderId}`
        ),
        routing.getAbsoluteUrl(
          `${PAGE_ORDER_PAYMENT_FAILURE}?contextToken=${currentContextToken.value}&orderId=${orderId}`
        )
      )
    })

    return {
      order,
      personalDetails,
      billingAddress,
      shippingAddress,
      paymentMethod,
      shippingMethod,
      shippingCosts,
      subtotal,
      total,
      status,
      paymentUrl,
      isPaymentButtonLoading: computed(() => loaders.handlePayment),
      isOrderDetailsLoading: computed(() => loaders.loadOrderDetails),
      isChangePaymentMethodLoading: computed(() => loaders.changePaymentMethod),
      cancelLoader,
      cancelModalVisible,
      cancelOrder,
      isOrderCancelled,
      changePaymentMethod,
      openChangePaymentMethodModal,
      changePaymentMethodModalVisible,
      selectedPaymentMethod,
      availablePaymentMethods,
    }
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";
.sw-order-details-loader {
  max-width: 70vw;
}
.sw-order-details {
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;

  @include for-mobile {
    flex-direction: column;
    width: 90%;
    padding: var(--spacer-xs);
  }

  &__loader {
    height: auto;
    margin-top: var(--spacer-base);
  }

  &__header {
    text-align: left;
    width: 100%;
    margin: 0 0 var(--spacer-base) 0;
  }

  &__title {
    text-align: center;
    margin-top: var(--spacer-base);
    color: var(--c-text);
    font-size: var(--font-size--sm);
    margin-bottom: var(--spacer-sm);
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

  &__sidebar {
    flex: 1;
    //box-sizing: border-box;
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
  @include for-mobile {
    max-width: 95%;
  }
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

.center-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.sw-cancel-order-modal {
  &__actions {
    :first-child {
      margin-right: var(--spacer-xs);
    }
  }
}

.sw-change-payment-method-modal {
  .sw-order-details-modal__actions {
    flex-direction: column;
  }

  .payment-methods-select {
    &__current {
      font-size: 0.8rem;
    }
    .sf-select__label {
      font-size: 2rem;
    }
  }
}
</style>
