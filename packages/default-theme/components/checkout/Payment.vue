<template>
  <div>
    <SfHeading
      title="3. Payment"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <div class="form">
      <SfCheckbox
        v-model="differentThanShipping"
        label="Use different address for billing"
        name="copyShippingAddress"
        class="form__element"
      />
    </div>
    <div class="form" v-if="differentThanShipping">
      <SfInput
        v-model="firstName"
        :valid="!validations.firstName.$error"
        error-message="This field is required"
        label="First name"
        name="firstName"
        class="form__element form__element--half"
        required
      />
      <SfInput
        v-model="lastName"
        :valid="!validations.lastName.$error"
        error-message="This field is required"
        label="Last name"
        name="lastName"
        class="form__element form__element--half form__element--half-even"
        required
      />
      <SfInput
        v-model="street"
        :valid="!validations.street.$error"
        error-message="This field is required"
        label="Street name"
        name="street"
        class="form__element"
        required
      />
      <SfInput
        v-model="apartment"
        :valid="!validations.apartment.$error"
        error-message="This field is required"
        label="House/Apartment number"
        name="apartment"
        class="form__element"
        required
      />
      <SfInput
        v-model="city"
        :valid="!validations.city.$error"
        error-message="This field is required"
        label="City"
        name="city"
        class="form__element form__element--half"
        required
      />
      <SfInput
        v-model="state"
        :valid="!validations.state.$error"
        error-message="This field is required"
        label="State/Province"
        name="state"
        class="form__element form__element--half form__element--half-even"
        required
      />
      <SfInput
        v-model="zipcode"
        :valid="!validations.zipcode.$error"
        error-message="This field is required"
        label="Zip-code"
        name="zipcode"
        class="form__element form__element--half"
        required
      />
      <SfSelect
        v-model="countryId"
        :valid="!validations.countryId.$error"
        error-message="This field is required"
        label="Country"
        class="form__element form__element--half form__element--half-even form__select sf-select--underlined"
        required
      >
        <SfSelectOption
          v-for="countryOption in countries"
          :key="countryOption"
          :value="countryOption"
        >
          {{ countryOption }}
        </SfSelectOption>
      </SfSelect>
      <SfInput
        v-model="phoneNumber"
        :valid="!validations.phoneNumber.$error"
        error-message="This field is required"
        label="Phone number"
        name="phone"
        class="form__element"
        required
      />
    </div>
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
          class="sf-button--full-width form__action-button"
          @click="$emit('proceed')"
          >Review order</SfButton
        >
        <SfButton
          class="sf-button--full-width sf-button--text form__action-button form__action-button--secondary"
          @click="$emit('click:back')"
        >
          Go back to Personal details
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
  SfSelect,
  SfRadio,
  SfImage,
  SfCheckbox,
} from '@storefront-ui/vue'
import { validationMixin } from 'vuelidate'
import {
  usePaymentStep,
  usePaymentStepValidationRules,
} from '@shopware-pwa/default-theme/logic/checkout/usePaymentStep'
export default {
  name: 'Payment',
  mixins: [validationMixin],
  components: {
    SfHeading,
    SfInput,
    SfButton,
    SfSelect,
    SfRadio,
    SfImage,
    SfCheckbox,
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
    const {
      validations,
      setValidations,
      validate,
      firstName,
      lastName,
      street,
      apartment,
      city,
      state,
      zipcode,
      countryId,
      phoneNumber,
      differentThanShipping,
    } = usePaymentStep()
    return {
      validations,
      setValidations,
      firstName,
      lastName,
      street,
      apartment,
      city,
      state,
      zipcode,
      countryId,
      phoneNumber,
      differentThanShipping,
    }
  },
  watch: {
    $v: {
      immediate: true,
      handler: function () {
        this.setValidations(this.$v)
      },
    },
  },
  validations: {
    ...usePaymentStepValidationRules,
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
  margin-bottom: var(--spacer-extra-big);
}
.form {
  @include for-desktop {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
  &__element {
    margin-bottom: var(--spacer-extra-big);
    @include for-desktop {
      flex: 0 0 100%;
    }
    &--half {
      @include for-desktop {
        flex: 1 1 50%;
      }
      &-even {
        @include for-desktop {
          padding-left: var(--spacer-extra-big);
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
      margin: var(--spacer-big) 0;
      @include for-desktop {
        order: -1;
        margin: 0;
        text-align: left;
      }
    }
  }
  &__select {
    ::v-deep .sf-select__selected {
      padding: 5px 0;
    }
  }
  &__radio {
    white-space: nowrap;
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
    padding: var(--spacer-big) 0;
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
        margin: 0 0 0 var(--spacer);
      }
    }
  }
}
.credit-card-form {
  margin-bottom: var(--spacer-big);
  @include for-desktop {
    flex: 0 0 66.666%;
    padding: 0 calc((100% - 66.666%) / 2);
  }
  &__group {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 0 var(--spacer-big) 0;
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
      margin-left: var(--spacer-big);
    }
  }
}
</style>
