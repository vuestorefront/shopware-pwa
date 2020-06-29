<template>
  <div class="form">
    <SwInput
      v-model="firstName"
      label="First name"
      :valid="!validations.firstName.$error"
      error-message="This field is required"
      name="firstName"
      class="form__element form__element--half"
      required
    />
    <SwInput
      v-model="lastName"
      :valid="!validations.lastName.$error"
      error-message="This field is required"
      label="Last name"
      name="lastName"
      class="form__element form__element--half form__element--half-even"
      required
    />
    <SwInput
      v-model="street"
      :valid="!validations.street.$error"
      error-message="This field is required"
      label="Street name"
      name="street"
      class="form__element"
      required
    />
    <SwInput
      v-model="apartment"
      :valid="!validations.apartment.$error"
      error-message="This field is required"
      label="House/Apartment number"
      name="apartment"
      class="form__element"
      required
    />
    <SwInput
      v-model="city"
      :valid="!validations.city.$error"
      error-message="This field is required"
      label="City"
      name="city"
      class="form__element form__element--half"
      required
    />
    <SwInput
      v-model="state"
      :valid="!validations.state.$error"
      error-message="This field is required"
      label="State/Province"
      name="state"
      class="form__element form__element--half form__element--half-even"
      required
    />
    <SwInput
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
    <SwInput
      v-model="phoneNumber"
      :valid="!validations.phoneNumber.$error"
      error-message="This field is required"
      label="Phone number"
      name="phone"
      class="form__element"
      required
    />
  </div>
</template>
<script>
import { SfHeading, SfSelect, SfRadio } from "@storefront-ui/vue"
import { validationMixin } from "vuelidate"
import {
  useShippingStep,
  useShippingStepValidationRules,
} from "@shopware-pwa/default-theme/logic/checkout/useShippingStep"
import { useCountries, useCheckout } from "@shopware-pwa/composables"
import { computed } from "@vue/composition-api"
import SwInput from "@shopware-pwa/default-theme/components/atoms/SwInput"

export default {
  name: "ShippingAddressGuestForm",
  mixins: [validationMixin],
  components: {
    SfHeading,
    SwInput,
    SfSelect,
    SfRadio,
  },
  setup(props, { root }) {
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
    } = useShippingStep(root)
    const { getCountries } = useCountries(root)
    const { getShippingMethods, setShippingMethod } = useCheckout(root)

    const shippingMethods = computed(() => []) // await getShippingMethods()

    const shippingMethod = computed({
      get: () => null, // currentShippingMethod.value, // TODO get from useCheckout
      set: (val) => {
        setShippingMethod(val)
      },
    })

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
      getCountries,
      shippingMethods,
      shippingMethod,
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
    ...useShippingStepValidationRules,
  },
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables";
.form {
  &__group {
    display: flex;
    align-items: center;
  }
  &__action-button {
    &:first-child {
      --button-height: 4.0625rem;
      margin: var(--spacer-sm) 0 0 0;
    }
    &--secondary {
      margin: var(--spacer-base) 0;
    }
  }
  &__button {
    --button-width: 100%;
  }
  &__radio-group {
    flex: 0 0 100%;
  }
  @include for-desktop {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 0 var(--spacer-2xl) 0 0;
    &:last-of-type {
      margin: 0 calc(var(--spacer-2xl) - var(--spacer-sm)) 0 0;
    }
    &__element {
      margin: 0 0 var(--spacer-sm) 0;
      flex: 0 0 100%;
      &--half {
        flex: 1 1 50%;
        &-even {
          padding: 0 0 0 var(--spacer-xl);
        }
      }
    }
    &__action {
      flex: 0 0 100%;
      display: flex;
    }
    &__button {
      --button-width: auto;
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
      content: "+";
    }
    &--is-active {
      color: var(--c-primary);
      &::before {
        content: "-";
      }
    }
  }
  &__info {
    margin-top: var(--spacer-xs);
  }
}
</style>
