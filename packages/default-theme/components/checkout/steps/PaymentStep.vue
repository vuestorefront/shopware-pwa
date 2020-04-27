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
    <div class="form">
      <div class="form__element payment-methods">
        <SfRadio
          v-for="item in paymentMethods"
          :key="item.value"
          v-model="paymentMethod"
          :label="item.label"
          :value="item.value"
          name="paymentMethod"
          :description="item.description"
          class="form__radio payment-method"
        >
          <template #label>
            <div class="sf-radio__label">
              <template
                v-if="
                  item.value !== 'debit' &&
                  item.value !== 'mastercard' &&
                  item.value !== 'electron'
                "
              >
                {{ item.label }}
              </template>
              <template v-else>
                <SfImage
                  :src="`/img/${item.value}.png`"
                  class="payment-image"
                />
              </template>
            </div>
          </template>
        </SfRadio>
      </div>
      <transition name="fade">
        <div v-if="isCreditCard" class="credit-card-form">
          <div class="credit-card-form__group">
            <span
              class="credit-card-form__label credit-card-form__label--required"
              >Number</span
            >
            <div class="credit-card-form__element">
              <SfInput
                v-model="cardNumber"
                name="cardNumber"
                class="credit-card-form__input"
              />
            </div>
          </div>
          <div class="credit-card-form__group">
            <span
              class="credit-card-form__label credit-card-form__label--required"
              >Card holder</span
            >
            <div class="credit-card-form__element">
              <SfInput
                v-model="cardHolder"
                name="cardHolder"
                class="credit-card-form__input"
              />
            </div>
          </div>
          <div class="credit-card-form__group">
            <span
              class="credit-card-form__label credit-card-form__label--required"
              >Expiry date</span
            >
            <div class="credit-card-form__element">
              <SfInput
                v-model="cardMonth"
                label="Month"
                name="month"
                class="credit-card-form__input"
              />
              <SfInput
                v-model="cardYear"
                label="Year"
                name="year"
                class="credit-card-form__input"
              />
            </div>
          </div>
          <div class="credit-card-form__group">
            <span
              class="credit-card-form__label credit-card-form__label--required"
              >Code CVC</span
            >
            <div class="credit-card-form__element">
              <SfInput
                v-model="cardCVC"
                name="cardCVC"
                class="credit-card-form__input credit-card-form__input--small"
              />
            </div>
          </div>
          <SfCheckbox
            v-model="cardKeep"
            name="keepcard"
            label="I want to keed this data for other purchases."
          />
        </div>
      </transition>
      <div class="form__action">
          <SfButton
          class="sf-button--full-width form__action-button form__action-button--secondary color-secondary desktop-only"
          @click="$emit('click:back')"
        >
          Go back to Shipping
        </SfButton>
        <SfButton
          class="sf-button--full-width form__action-button"
          @click="$emit('proceed')"
          >Review order</SfButton
        >
        <SfButton
          class="sf-button--full-width sf-button--text form__action-button form__action-button--secondary mobile-only"
          @click="$emit('click:back')"
        >
          Go back to Shipping
        </SfButton>
      </div>
    </div>
  </div>
</template>
<script>
import {
  SfHeading,
  SfInput,
  SfButton,
  SfRadio,
  SfImage,
  SfCheckbox,
} from '@storefront-ui/vue'
import BillingAddressGuestForm from '@shopware-pwa/default-theme/components/checkout/steps/guest/BillingAddressGuestForm'
import BillingAddressUserForm from '@shopware-pwa/default-theme/components/checkout/steps/user/BillingAddressUserForm'
import { useCheckout } from '@shopware-pwa/composables'

export default {
  name: 'PaymentStep',
  components: {
    SfHeading,
    SfInput,
    SfButton,
    SfRadio,
    SfImage,
    SfCheckbox,
    BillingAddressGuestForm,
    BillingAddressUserForm,
  },
  data() {
    return {
      paymentMethod: '',
      paymentMethods: [], // useCheckout
      cardNumber: '',
      cardHolder: '',
      cardMonth: '',
      cardYear: '',
      cardCVC: '',
      cardKeep: false,
      countries: [], // useCountries
    }
  },
  setup() {
    const { isGuestOrder } = useCheckout()

    return { isGuestOrder }
  },
  computed: {
    isCreditCard() {
      return ['debit', 'mastercard', 'electron'].includes(this.paymentMethod)
    },
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
  &__checkbox {
    margin: var(--spacer-base) 0 var(--spacer-xl) 0;
  }
  &__action {
    flex: 0 0 100%;
    margin: var(--spacer-base) 0 0 0;
  }
  &__action-button {
    --button-height: 3.25rem;
  }
  @include for-mobile {
    &__checkbox {
      --checkbox-font-family: var(--font-family-primary);
      --checkbox-font-weight: var(--font-light);
      --checkbox-font-size: var(--font-sm);
    }
  }
  @include for-desktop {
    margin: 0 var(--spacer-2xl) 0 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    &__action {
      display: flex;
    }
    &__action-button {
      &:first-child {
        margin: 0 var(--spacer-lg) 0 0;
      }
    }
    &__element {
      margin: 0 0 var(--spacer-base) 0;
      flex: 0 0 100%;
      &--salutation {
        flex: 1 1 25%;
        padding-right: var(--spacer-xl);
      }
      &--half {
        flex: 1 1 50%;
        &-even {
          padding: 0 0 0 var(--spacer-lg);
        }
      }
    }
  }
}
.payment-image {
  display: flex;
  align-items: center;
  height: 2.125rem;
  width: auto;
  ::v-deep > * {
    width: auto;
    max-width: unset;
  }
}
.payment-methods {
  @include for-desktop {
    display: flex;
    padding: var(--spacer-base) 0;
    border-top: 1px solid var(--c-light);
    border-bottom: 1px solid var(--c-light);
  }
}
.payment-method {
  border-top: 1px solid var(--c-light);
  @include for-mobile {
    background-color: transparent;
  }
  @include for-desktop {
    border: 0;
    border-radius: 4px;
  }
  &:last-child {
    border-bottom: 1px solid var(--c-light);
    @include for-desktop {
      border-bottom: 0;
    }
  }
  ::v-deep {
    .sf-radio {
      &__container {
        align-items: center;
      }
      &__content {
        margin: 0 0 0 var(--spacer-xs);
      }
    }
  }
}
.credit-card-form {
  margin-bottom: var(--spacer-base);
  @include for-desktop {
    flex: 0 0 66.666%;
    padding: 0 calc((100% - 66.666%) / 2);
  }
  &__group {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 0 var(--spacer-base) 0;
  }
  &__label {
    flex: unset;
  }
  &__element {
    display: flex;
    flex: 0 0 66.666%;
  }
  &__input {
    flex: 1;
    &--small {
      flex: 0 0 46.666%;
    }
    & + & {
      margin-left: var(--spacer-base);
    }
  }
}
</style>
