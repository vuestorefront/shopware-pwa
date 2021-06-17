<template>
  <div>
    <SfHeading
      :title="$t('Payment methods')"
      :description="$t('Choose your payment method')"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <div class="sw-form">
      <div class="form__element payment-methods">
        <SfLoader :loading="isLoading">
          <div class="payment-methods__container">
            <SfRadio
              v-for="paymentMethod in paymentMethods"
              :key="paymentMethod.id"
              v-model="activePaymentMethod"
              :label="paymentMethod.name"
              :value="paymentMethod.id"
              name="paymentMethod"
              :description="paymentMethod.description"
              class="sw-form__radio payment-method"
              :data-cy="`checkout-payment-method-${simplifyString(
                paymentMethod.name
              )}`"
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
        </SfLoader>
      </div>
    </div>
  </div>
</template>
<script>
import { SfHeading, SfRadio, SfLoader } from "@storefront-ui/vue"
import {
  useCart,
  useCheckout,
  useSessionContext,
  useUser,
} from "@shopware-pwa/composables"
import { computed, onMounted, ref, watch } from "@vue/composition-api"
import SwButton from "@/components/atoms/SwButton.vue"
import SwPluginSlot from "sw-plugins/SwPluginSlot.vue"
import { simplifyString } from "@/helpers"

export default {
  name: "PaymentSection",
  components: {
    SfHeading,
    SwButton,
    SfRadio,
    SwPluginSlot,
    SfLoader,
  },
  setup(props, { root }) {
    const { getPaymentMethods, paymentMethods } = useCheckout(root)
    const { paymentMethod, setPaymentMethod } = useSessionContext(root)
    const { refreshCart } = useCart(root)
    const isLoading = ref(false)
    const activePaymentMethod = computed({
      get: () => paymentMethod.value && paymentMethod.value.id,
      set: async (id) => await setPaymentMethod({ id }),
    })

    onMounted(async () => {
      isLoading.value = true
      await getPaymentMethods()
      isLoading.value = false
    })

    watch(paymentMethod, () => {
      refreshCart()
    })

    return {
      paymentMethods,
      activePaymentMethod,
      simplifyString,
      isLoading,
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
  --heading-description-margin: 0;
  @include for-desktop {
    --heading-title-font-size: var(--h3-font-size);
    --heading-padding: var(--spacer-lg) 0 var(--spacer-base) 0;
    &:last-of-type {
      --heading-padding: var(--spacer-xs) 0 var(--spacer-base) 0;
    }
  }
}
</style>
