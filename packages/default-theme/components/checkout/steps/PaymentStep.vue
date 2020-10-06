<template>
  <div>
    <SfHeading
      title="3. Payment"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <BillingAddressGuestForm v-if="isGuestOrder" />
    <BillingAddressUserForm v-else />
    <SfHeading
      title="Payment methods"
      subtitle="Choose your payment method"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <div class="sw-form">
      <div class="form__element payment-methods">
        <SfRadio
          v-for="paymentMethod in paymentMethods"
          :key="paymentMethod.id"
          v-model="activePaymentMethod"
          :label="paymentMethod.name"
          :value="paymentMethod.id"
          name="paymentMethod"
          :description="paymentMethod.description"
          class="sw-form__radio payment-method"
        >
          <template #description="{ description }">
            <div class="sf-radio__description">
              <div class="payment_description">
                <p>{{ description }}</p>
              </div>
              <transition name="sf-fade">
                <div
                  v-if="activePaymentMethod === paymentMethod.id"
                  class="shipping__info"
                >
                  <SwPluginSlot
                    :name="`checkout-payment-method-${paymentMethod.name}`"
                    :slot-context="paymentMethod"
                  />
                </div>
              </transition>
            </div>
          </template>
        </SfRadio>
      </div>
      <div class="form__action">
        <SwButton
          class="sf-button--full-width form__action-button form__action-button--secondary color-secondary desktop-only sw-form__button"
          @click="$emit('click:back')"
        >
          Go back to Shipping
        </SwButton>
        <SwButton
          class="sf-button--full-width form__action-button sw-form__button"
          data-cy="review-order"
          @click="$emit('proceed')"
          >Review order</SwButton
        >
        <SwButton
          class="sf-button--full-width sf-button--text form__action-button form__action-button--secondary mobile-only sw-form__button"
          @click="$emit('click:back')"
        >
          Go back to Shipping
        </SwButton>
      </div>
    </div>
  </div>
</template>
<script>
import { SfHeading, SfRadio } from "@storefront-ui/vue"
import BillingAddressGuestForm from "@/components/checkout/steps/guest/BillingAddressGuestForm"
import BillingAddressUserForm from "@/components/checkout/steps/user/BillingAddressUserForm"
import { useCheckout, useSessionContext } from "@shopware-pwa/composables"
import { onMounted, computed } from "@vue/composition-api"
import SwButton from "@/components/atoms/SwButton"
import SwPluginSlot from "sw-plugins/SwPluginSlot"

export default {
  name: "PaymentStep",
  components: {
    SfHeading,
    SwButton,
    SfRadio,
    BillingAddressGuestForm,
    BillingAddressUserForm,
    SwPluginSlot,
  },
  setup(props, { root }) {
    const { isGuestOrder, getPaymentMethods, paymentMethods } = useCheckout(
      root
    )
    const { paymentMethod, setPaymentMethod } = useSessionContext(root)

    const activePaymentMethod = computed({
      get: () => paymentMethod.value && paymentMethod.value.id,
      set: async (id) => await setPaymentMethod({ id }),
    })

    onMounted(async () => {
      await getPaymentMethods()
    })

    return { isGuestOrder, paymentMethods, activePaymentMethod }
  },
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/forms";

.title {
  --heading-padding: var(--spacer-base) 0;
  @include for-desktop {
    --heading-title-font-size: var(--h3-font-size);
    --heading-padding: var(--spacer-2xl) 0 var(--spacer-base) 0;
    &:last-of-type {
      --heading-padding: var(--spacer-xs) 0 var(--spacer-base) 0;
    }
  }
}
</style>
