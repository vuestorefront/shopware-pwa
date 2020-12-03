<template>
  <div>
    <SfHeading
      :title="$t('2. Shipping')"
      :level="2"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <ShippingAddressGuestForm v-if="isGuestOrder" />
    <ShippingAddressUserForm v-else />
    <SfHeading
      :title="$t('Shipping methods')"
      :level="3"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <div class="sw-form">
      <div class="sw-form__radio-group">
        <SfRadio
          v-for="shippingMethod in shippingMethods"
          :key="shippingMethod.id"
          v-model="activeShippingMethod"
          :label="shippingMethod.translated.name"
          :value="shippingMethod.id"
          name="shippingMethod"
          :description="shippingMethod.deliveryTime.translated.name"
          class="sw-form__radio shipping"
        >
          <template #label="{ label }">
            <div class="sf-radio__label shipping__label">
              <div>{{ label }}</div>
              <div class="shipping__label-price">
                {{ shippingMethod.price }}
              </div>
            </div>
          </template>
          <template #description="{ description }">
            <div class="sf-radio__description shipping__description">
              <div class="shipping__delivery">
                <p>{{ description }}</p>
              </div>
              <transition name="sf-fade">
                <div
                  v-if="activeShippingMethod === shippingMethod.id"
                  class="shipping__info"
                >
                  <SwPluginSlot
                    :name="`checkout-shiping-method-${simplifyString(
                      shippingMethod.name
                    )}`"
                    :slot-context="shippingMethod"
                  />
                </div>
              </transition>
            </div>
          </template>
        </SfRadio>
      </div>
      <div class="form__action">
        <SwButton
          class="form__action-button color-secondary desktop-only"
          @click="$emit('retreat')"
        >
          {{ $t("Go back to Personal details") }}
        </SwButton>
        <SwButton
          class="sf-button--full-width form__action-button sw-form__button"
          data-cy="continue-to-payment"
          @click="$emit('proceed')"
        >
          {{ $t("Continue to payment") }}
        </SwButton>
        <SwButton
          class="sf-button--full-width sf-button--text form__action-button form__action-button--secondary mobile-only sw-form__button"
          @click="$emit('retreat')"
        >
          {{ $t("Go back to Personal details") }}
        </SwButton>
      </div>
    </div>
  </div>
</template>
<script>
import { SfHeading, SfRadio } from "@storefront-ui/vue"
import { computed, onMounted } from "@vue/composition-api"
import ShippingAddressGuestForm from "@/components/checkout/steps/guest/ShippingAddressGuestForm"
import ShippingAddressUserForm from "@/components/checkout/steps/user/ShippingAddressUserForm"
import {
  useCheckout,
  useSessionContext,
  useCart,
} from "@shopware-pwa/composables"
import SwButton from "@/components/atoms/SwButton"
import { simplifyString } from "@/helpers"
import SwPluginSlot from "sw-plugins/SwPluginSlot"

export default {
  name: "ShippingStep",
  components: {
    SfHeading,
    SwButton,
    SfRadio,
    ShippingAddressGuestForm,
    ShippingAddressUserForm,
    SwPluginSlot,
  },
  setup(props, { root }) {
    const { isGuestOrder, getShippingMethods, shippingMethods } = useCheckout(
      root
    )
    const { shippingMethod, setShippingMethod } = useSessionContext(root)
    const { refreshCart } = useCart(root)
    const activeShippingMethod = computed({
      get: () => shippingMethod.value && shippingMethod.value.id,
      set: async (id) => {
        await setShippingMethod({ id })
        await refreshCart()
      },
    })

    onMounted(async () => {
      await getShippingMethods()
    })

    return {
      isGuestOrder,
      shippingMethods,
      activeShippingMethod,
      simplifyString,
    }
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

.shipping {
  --radio-container-padding: var(--spacer-sm);
  &__label {
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    &-price {
      font-size: var(--font-lg);
      @include for-mobile {
        order: -1;
        margin: 0 var(--spacer-xs) 0 0;
      }
    }
  }
  &__delivery {
    color: var(--c-text-muted);
    display: flex;
    margin: 0 0 var(--spacer-xs) 0;
  }
  &__action {
    @include for-mobile {
      margin: 0 0 0 var(--spacer-xs);
    }
    &::before {
      content: "+";
    }
    &--is-active {
      --button-color: var(--c-primary);
      --button-transition: color 150ms linear;
      &::before {
        content: "-";
      }
    }
  }
  @include for-desktop {
    &__label {
      justify-content: space-between;
    }
    &__delivery {
      justify-content: space-between;
      max-width: 15rem;
    }
  }
}
</style>
