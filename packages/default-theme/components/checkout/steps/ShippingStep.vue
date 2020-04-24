<template>
  <div>
    <SfHeading
      title="2. Shipping"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <ShippingAddressGuestForm v-if="isGuestOrder" />
    <ShippingAddressUserForm v-else />
    <SfHeading
      title="Shipping method"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <div class="form">
      <div class="form__radio-group">
        <SfRadio
          v-for="item in shippingMethods"
          :key="item.id"
          v-model="shippingMethod"
          :label="item.name"
          :value="item.id"
          name="shippingMethod"
          :description="item.translated.description"
          class="form__element form__radio shipping"
        >
          <template #label="{label}">
            <div class="sf-radio__label shipping__label">
              <div>{{ label }}</div>
              <div>{{ item.price }}</div>
            </div>
          </template>
          <template #description="{description}">
            <div class="sf-radio__description shipping__description">
              <div class="shipping__delivery">
                {{ item.delivery }}
                <SfButton
                  class="sf-button--text shipping__action"
                  :class="{ 'shipping__action--is-active': item.isOpen }"
                  @click="item.isOpen = !item.isOpen"
                  >info</SfButton
                >
              </div>
              <transition name="fade">
                <div v-if="item.isOpen" class="shipping__info">
                  {{ description }}
                </div>
              </transition>
            </div>
          </template>
        </SfRadio>
      </div>
      <div class="form__action">
        <SfButton
          class="sf-button--full-width form__action-button"
          @click="$emit('proceed')"
          >Continue to payment</SfButton
        >
        <SfButton
          class="sf-button--full-width sf-button--text form__action-button form__action-button--secondary"
          @click="$emit('retreat')"
          >Go back to Personal details</SfButton
        >
      </div>
    </div>
  </div>
</template>
<script>
import { SfHeading, SfButton, SfRadio, SfAlert } from '@storefront-ui/vue'
import { computed } from '@vue/composition-api'
import ShippingAddressGuestForm from '@shopware-pwa/default-theme/components/checkout/steps/guest/ShippingAddressGuestForm'
import ShippingAddressUserForm from '@shopware-pwa/default-theme/components/checkout/steps/user/ShippingAddressUserForm'
import { useCheckout } from '@shopware-pwa/composables'

export default {
  name: 'ShippingStep',
  components: {
    SfHeading,
    SfButton,
    SfRadio,
    SfAlert,
    ShippingAddressGuestForm,
    ShippingAddressUserForm,
  },
  setup() {
    const { isGuestOrder } = useCheckout()
    const shippingMethods = computed(() => [])
    const shippingMethod = computed(() => null)

    return {
      isGuestOrder,
      shippingMethods,
      shippingMethod,
    }
  },
}
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';

.title {
  margin-bottom: var(--spacer-xl);
}
.form {
  @include for-desktop {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  &__element {
    margin-bottom: var(--spacer-xl);
    @include for-desktop {
      flex: 0 0 100%;
    }
    &--half {
      @include for-desktop {
        flex: 1 1 50%;
      }
      &-even {
        @include for-desktop {
          padding-left: var(--spacer-xl);
        }
      }
    }
  }
  &__action {
    @include for-desktop {
      flex: 0 0 100%;
      display: flex;
    }
  }
  &__action-button {
    flex: 1;
    &--secondary {
      margin: var(--spacer-base) 0;
      @include for-desktop {
        order: -1;
        margin: 0;
        text-align: left;
      }
    }
  }
  &__radio {
    margin-bottom: 0;
    &-group {
      flex: 0 0 100%;
      margin: 0 0 var(--spacer-xl) 0;
    }
  }
}
.shipping {
  margin: 0 calc(var(--spacer-base) * -1);
  &__label {
    display: flex;
    justify-content: space-between;
  }
  &__description {
    width: 100%;
    margin-top: 0;
  }
  &__delivery {
    color: var(--c-text-muted);
  }
  &__action {
    align-items: center;
    margin-left: var(--spacer-xs);
    text-decoration: none;
    &::before {
      content: '+';
    }
    &--is-active {
      color: var(--c-primary);
      &::before {
        content: '-';
      }
    }
  }
  &__info {
    margin-top: var(--spacer-xs);
  }
}
</style>
