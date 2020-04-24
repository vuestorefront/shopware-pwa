<template>
  <div>
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
import { computed } from '@vue/composition-api'
import { useCountries } from '@shopware-pwa/composables'

export default {
  name: 'BillingAddressGuestForm',
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
@import '~@storefront-ui/vue/styles';
.title {
  margin-bottom: var(--spacer-xl);
}
.form {
  @include for-desktop {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
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
  &__select {
    ::v-deep .sf-select__selected {
      padding: 5px 0;
    }
  }
  &__radio {
    white-space: nowrap;
  }
}
</style>
