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
          v-for="item in shippingMethods"
          :key="item.id"
          v-model="shippingMethod"
          :label="item.name"
          :value="item.id"
          name="shippingMethod"
          :description="item.translated.description"
          class="form__radio shipping"
        >
          <template #label="{label}">
            <div class="sf-radio__label shipping__label">
              <div>{{ label }}</div>
              <div class="shipping__label-price">{{ item.price }}</div>
            </div>
          </template>
          <template #description="{description}">
            <div class="sf-radio__description shipping__description">
              <div class="shipping__delivery">
                {{ item.delivery }}
                <SfButton
                  class="sf-button--text color-secondary shipping__action"
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
        <SfButton class="form__action-button color-secondary desktop-only"
          >Go Back to Personal details</SfButton
        >
        <SfButton
          class="sf-button--full-width form__action-button"
          @click="$emit('proceed')"
          >Continue to payment</SfButton
        >
        <SfButton
          class="sf-button--full-width sf-button--text form__action-button form__action-button--secondary mobile-only"
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
  data() {
    return {
      shippingMethod: '',
      shippingMethods: [
        {
          isOpen: false,
          price: 'Free',
          delivery: 'Delivery from 3 to 7 business days',
          name: 'Pickup in the store',
          id: 'store',
          translated: {
            description:
              'Novelty! From now on you have the option of picking up an order in the selected InPack parceled. Just remember that in the case of orders paid on delivery, only the card payment will be accepted.',
          },
        },
        {
          isOpen: false,
          price: '$9.90',
          delivery: 'Delivery from 4 to 6 business days',
          name: 'Delivery to home',
          id: 'home',
          translated: {
            description:
              'Novelty! From now on you have the option of picking up an order in the selected InPack parceled. Just remember that in the case of orders paid on delivery, only the card payment will be accepted.',
          },
        },
        {
          isOpen: false,
          price: '$9.90',
          delivery: 'Delivery from 4 to 6 business days',
          name: 'Paczkomaty InPost',
          id: 'inpost',
          translated: {
            description:
              'Novelty! From now on you have the option of picking up an order in the selected InPack parceled. Just remember that in the case of orders paid on delivery, only the card payment will be accepted.',
          },
        },
        {
          isOpen: false,
          price: '$11.00',
          delivery: 'Delivery within 48 hours',
          name: '48 hours coffee',
          id: 'coffee',
          translated: {
            description:
              'Novelty! From now on you have the option of picking up an order in the selected InPack parceled. Just remember that in the case of orders paid on delivery, only the card payment will be accepted.',
          },
        },
        {
          isOpen: false,
          price: '$14.00',
          delivery: 'Delivery within 24 hours',
          name: 'Urgent 24h',
          id: 'urgent',
          translated: {
            description:
              'Novelty! From now on you have the option of picking up an order in the selected InPack parceled. Just remember that in the case of orders paid on delivery, only the card payment will be accepted.',
          },
        },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';

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
    position:relative;
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
      content: '+';
    }
    &--is-active {
      --button-color: var(--c-primary);
      --button-transition: color 150ms linear;
      &::before {
        content: '-';
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
