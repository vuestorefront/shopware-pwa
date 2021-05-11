<template>
  <div>
    <SfHeading
      :title="$t('Payment methods')"
      :description="$t('Choose your payment method')"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <BillingAddressUserForm v-if="!isGuestSession" />
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
                    :name="`checkout-payment-method-${simplifyString(
                      paymentMethod.name
                    )}`"
                    :slot-context="paymentMethod"
                  />
                </div>
              </transition>
            </div>
          </template>
        </SfRadio>
      </div>
    </div>
  </div>
</template>
<script>
import { SfHeading, SfRadio } from "@storefront-ui/vue"
import BillingAddressUserForm from "@/components/forms/BillingAddressUserForm.vue"
import {
  useCheckout,
  useSessionContext,
  useUser,
} from "@shopware-pwa/composables"
import { onMounted, computed } from "@vue/composition-api"
import SwButton from "@/components/atoms/SwButton.vue"
import SwPluginSlot from "sw-plugins/SwPluginSlot.vue"
import { simplifyString } from "@/helpers"

export default {
  name: "PaymentSection",
  components: {
    SfHeading,
    SwButton,
    SfRadio,
    BillingAddressUserForm,
    SwPluginSlot,
  },
  setup(props, { root }) {
    const { getPaymentMethods, paymentMethods } = useCheckout(root)
    const { paymentMethod, setPaymentMethod } = useSessionContext(root)
    const { isGuestSession } = useUser(root)

    const activePaymentMethod = computed({
      get: () => paymentMethod.value && paymentMethod.value.id,
      set: async (id) => await setPaymentMethod({ id }),
    })

    onMounted(async () => {
      await getPaymentMethods()
    })

    return {
      paymentMethods,
      activePaymentMethod,
      simplifyString,
      isGuestSession,
    }
  },
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/forms";
.sw-form {
  &__action {
    width: 100%;
    display: table;

    button {
      display: table-cell;
      width: 100%;
      @include for-desktop {
        width: 50%;
      }
    }
  }
}
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
