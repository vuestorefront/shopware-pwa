<template>
  <div>
    <SfCheckbox
      v-model="differentThanShipping"
      label="Use different address for billing"
      name="copyShippingAddress"
      class="form__element"
    />
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
        v-if="getCountries.length"
        v-model="countryId"
        :valid="!validations.countryId.$error"
        error-message="This field is required"
        label="Country"
        class="form__element form__element--half form__element--half-even form__select sf-select--underlined"
        required
      >
        <SfSelectOption
          v-for="countryOption in getCountries"
          :key="countryOption.id"
          :value="countryOption.id"
        >
          {{ countryOption.name }}
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
  </div>
</template>
<script>
import {
  SfHeading,
  SfInput,
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
import { computed } from '@vue/composition-api'
import { useCountries } from '@shopware-pwa/composables'

export default {
  name: 'BillingAddressGuestForm',
  mixins: [validationMixin],
  components: {
    SfHeading,
    SfInput,
    SfSelect,
    SfRadio,
    SfImage,
    SfCheckbox,
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

    const { getCountries } = useCountries()

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
      getCountries,
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
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/variables';

.form {
  margin-top: var(--spacer-base);
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
</style>
