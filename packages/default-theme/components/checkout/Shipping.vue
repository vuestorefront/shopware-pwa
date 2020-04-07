<template>
  <div>
    <SfHeading
      title="2. Shipping"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <div class="form">
      <SfInput
        v-model="firstName"
        label="First name"
        :valid="!validations.firstName.$error"
        error-message="This field is required"
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
import {
  SfHeading,
  SfInput,
  SfButton,
  SfSelect,
  SfRadio,
} from '@storefront-ui/vue'
import { validationMixin } from 'vuelidate'
import { useShippingStep, useShippingStepValidationRules } from '@shopware-pwa/default-theme/composables/checkout/useShippingStep'
import { useCountries, useCheckout } from '@shopware-pwa/composables'
import { computed } from '@vue/composition-api'

export default {
  name: 'Shipping',
  mixins: [validationMixin],
  components: {
    SfHeading,
    SfInput,
    SfButton,
    SfSelect,
    SfRadio,
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
    } = useShippingStep()
    const { getCountries } = useCountries()
    const { getShippingMethods } = useCheckout()

    getShippingMethods()

    const shippingMethod = computed({
      get: () => null, // currentShippingMethod.value, // TODO get from useCheckout
      set: (val) => {
        // setShippingMethod(val)
        console.error('SETTING SHIPPPING', val)
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
      shippingMethods: [],
      shippingMethod
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
  }
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
    // todo: remove after SfSelect refactoring
    ::v-deep .sf-select__selected {
      padding: 5px 0;
    }
  }
  &__radio {
    margin-bottom: 0;
    &-group {
      flex: 0 0 100%;
      margin: 0 0 var(--spacer-extra-big) 0;
    }
  }
}
.shipping {
  margin: 0 calc(var(--spacer-big) * -1);
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
    margin-left: var(--spacer);
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
    margin-top: var(--spacer);
  }
}
</style>
