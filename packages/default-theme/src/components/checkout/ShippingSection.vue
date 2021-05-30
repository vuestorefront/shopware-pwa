<template>
  <div class="shipping-section">
    <SfHeading
      :title="$t('Shipping methods')"
      :description="$t('Choose your shipping method')"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <div class="sw-form">
      <div class="sw-form__radio-group">
        <SfLoader :loading="isLoading">
          <div class="shipping-methods__container">
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
                      v-if="
                        shippingMethod &&
                        activeShippingMethod === shippingMethod.id
                      "
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
        </SfLoader>
      </div>
    </div>
  </div>
</template>
<script>
import { SfHeading, SfRadio, SfLoader } from "@storefront-ui/vue"
import { computed, onMounted, ref } from "@vue/composition-api"
import {
  useCheckout,
  useSessionContext,
  useCart,
  useUser,
} from "@shopware-pwa/composables"
import SwButton from "@/components/atoms/SwButton.vue"
import { simplifyString } from "@/helpers"
import SwPluginSlot from "sw-plugins/SwPluginSlot.vue"

export default {
  name: "ShippingSection",
  components: {
    SfHeading,
    SwButton,
    SfRadio,
    SwPluginSlot,
    SfLoader,
  },
  setup(props, { root }) {
    const { getShippingMethods, shippingMethods } = useCheckout(root)
    const { shippingMethod, setShippingMethod } = useSessionContext(root)
    const { isGuestSession } = useUser(root)
    const { refreshCart } = useCart(root)
    const isLoading = ref(false)
    const activeShippingMethod = computed({
      get: () => shippingMethod.value && shippingMethod.value.id,
      set: async (id) => {
        await setShippingMethod({ id })
        await refreshCart()
      },
    })

    onMounted(async () => {
      isLoading.value = true
      await getShippingMethods()
      isLoading.value = false
    })

    return {
      shippingMethods,
      activeShippingMethod,
      simplifyString,
      isGuestSession,
      isLoading,
    }
  },
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/forms";
.shipping-section {
  margin-bottom: var(--spacer-lg);
}
.sw-form {
  &__action {
    display: table;
    margin-top: var(--spacer-sm);
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

.shipping {
  --radio-container-padding: var(--spacer-sm);
  &__label {
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    &-price {
      font-size: var(--font-size--lg);
      @include for-mobile {
        order: -1;
        margin: 0 var(--spacer-xs) 0 0;
      }
    }
  }
  &__delivery {
    color: var(--c-text-muted);
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
