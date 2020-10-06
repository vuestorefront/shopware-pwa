<template>
  <div class="sw-form" data-cy="form">
    <div class="inputs-group">
      <SwInput
        v-model="firstName"
        data-cy="first-name"
        label="First name"
        :valid="!validations.firstName.$error"
        error-message="This field is required"
        name="firstName"
        class="sw-form__input"
        required
      />
      <SwInput
        v-model="lastName"
        :valid="!validations.lastName.$error"
        error-message="This field is required"
        label="Last name"
        data-cy="last-name"
        name="lastName"
        class="sw-form__input"
        required
      />
      <SwInput
        v-model="street"
        :valid="!validations.street.$error"
        error-message="This field is required"
        label="Street name"
        data-cy="street-name"
        name="street"
        class="sw-form__input"
        required
      />
    </div>
    <div class="inputs-group">
      <SwInput
        v-model="apartment"
        :valid="!validations.apartment.$error"
        error-message="This field is required"
        label="House/Apartment number"
        data-cy="apartment"
        name="apartment"
        class="sw-form__input"
        required
      />
      <SwInput
        v-model="city"
        :valid="!validations.city.$error"
        error-message="This field is required"
        label="City"
        data-cy="city"
        name="city"
        class="sw-form__input"
        required
      />
      <SwInput
        v-model="state"
        :valid="!validations.state.$error"
        error-message="This field is required"
        label="State/Province"
        data-cy="state"
        name="state"
        class="sw-form__input"
        required
      />
    </div>
    <div class="inputs-group">
      <SwInput
        v-model="zipcode"
        :valid="!validations.zipcode.$error"
        error-message="This field is required"
        label="Zip-code"
        data-cy="zipcode"
        name="zipcode"
        class="sw-form__input"
        required
      />
      <SfSelect
        v-if="getCountries.length"
        v-model="countryId"
        :valid="!validations.countryId.$error"
        error-message="This field is required"
        label="Country"
        data-cy="country"
        class="sw-form__select sf-select--underlined"
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
        data-cy="phone"
        name="phone"
        class="sw-form__input"
        required
      />
    </div>
  </div>
</template>
<script>
import { SfSelect } from "@storefront-ui/vue"
import { validationMixin } from "vuelidate"
import {
  useShippingStep,
  useShippingStepValidationRules,
} from "@/logic/checkout/useShippingStep"
import { useCountries, useCheckout } from "@shopware-pwa/composables"
import { computed } from "@vue/composition-api"
import SwInput from "@/components/atoms/SwInput"

export default {
  name: "ShippingAddressGuestForm",
  components: {
    SwInput,
    SfSelect,
  },
  mixins: [validationMixin],
  setup(props, { root }) {
    const {
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
    } = useShippingStep(root)
    const { getCountries } = useCountries(root)
    const { setShippingMethod } = useCheckout(root)

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
      handler() {
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
@import "@/assets/scss/forms";

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
