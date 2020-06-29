<template>
  <div>
    <SfHeading
      title="2. Shipping"
      :level="2"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <ShippingAddressGuestForm v-if="isGuestOrder" />
    <ShippingAddressUserForm v-else />
    <SfHeading
      title="Shipping methods"
      :level="3"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <div class="form">
      <div class="form__radio-group">
        <SfRadio
          v-for="shippingMethod in shippingMethods"
          :key="shippingMethod.id"
          v-model="activeShippingMethod"
          :label="shippingMethod.translated.name"
          :value="shippingMethod.id"
          name="shippingMethod"
          :description="shippingMethod.deliveryTime.translated.name"
          class="form__radio shipping"
        >
          <template #label="{label}">
            <div class="sf-radio__label shipping__label">
              <div>{{ label }}</div>
              <div class="shipping__label-price">
                {{ shippingMethod.price }}
              </div>
            </div>
          </template>
          <template #description="{description}">
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
                    :name="`checkout-shiping-method-${shippingMethod.name}`"
                    :slotContext="shippingMethod"
                  />
                </div>
              </transition>
            </div>
          </template>
        </SfRadio>
      </div>
      <div class="form__action">
        <SwButton class="form__action-button color-secondary desktop-only"
          >Go Back to Personal details</SwButton
        >
        <SwButton
          class="sf-button--full-width form__action-button"
          @click="$emit('proceed')"
          >Continue to payment</SwButton
        >
        <SwButton
          class="sf-button--full-width sf-button--text form__action-button form__action-button--secondary mobile-only"
          @click="$emit('retreat')"
          >Go back to Personal details</SwButton
        >
      </div>
    </div>
  </div>
</template>
<script>
import { SfHeading, SfRadio, SfAlert } from "@storefront-ui/vue"
import { computed, onMounted } from "@vue/composition-api"
import ShippingAddressGuestForm from "@shopware-pwa/default-theme/components/checkout/steps/guest/ShippingAddressGuestForm"
import ShippingAddressUserForm from "@shopware-pwa/default-theme/components/checkout/steps/user/ShippingAddressUserForm"
import {
  useCheckout,
  useSessionContext,
  useCart,
} from "@shopware-pwa/composables"
import SwButton from "@shopware-pwa/default-theme/components/atoms/SwButton"
import SwPluginSlot from "sw-plugins/SwPluginSlot"

export default {
  name: "ShippingStep",
  components: {
    SfHeading,
    SwButton,
    SfRadio,
    SfAlert,
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

    return { isGuestOrder, shippingMethods, activeShippingMethod }
  },
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables";

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
.form {
  &__action {
    flex: 0 0 100%;
    margin: var(--spacer-base) 0 0 0;
  }
  &__action-button {
    --button-height: 3.25rem;
  }
  &__radio-group {
    position: relative;
    flex: 0 0 calc(100% + var(--spacer-sm));
    margin: 0 calc(var(--spacer-sm) * -1);
  }
  @include for-mobile {
    &__radio-group {
      position: relative;
      left: 50%;
      right: 50%;
      margin-left: -50vw;
      margin-right: -50vw;
      width: 100vw;
    }
  }
  @include for-desktop {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 0 var(--spacer-2xl) 0 0;
    &:last-of-type {
      margin: 0 calc(var(--spacer-2xl) - var(--spacer-sm)) 0 0;
    }
    &__action {
      display: flex;
    }
    &__action-button {
      --button-font-weight: var(--font-normal);
      &:first-child {
        margin: 0 var(--spacer-lg) 0 0;
      }
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
