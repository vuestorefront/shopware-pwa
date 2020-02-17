<template>
  <div class="sw-addresses">
    <p class="message">
      Keep your addresses and contact details updated.
    </p>
    <div class="form">
      <SfInput
        v-model="firstName"
        name="firstName"
        label="First Name"
        required
        class="form__element form__element--half"
      />
      <SfInput
        v-model="lastName"
        name="lastName"
        label="Last Name"
        required
        class="form__element form__element--half form__element--half-even"
      />
      <SfInput
        v-model="streetName"
        name="streetName"
        label="Street Name"
        required
        class="form__element form__element--half"
      />
      <SfInput
        v-model="apartment"
        name="apartment"
        label="House/Apartment number"
        required
        class="form__element form__element--half form__element--half-even"
      />
      <SfInput
        v-model="city"
        name="city"
        label="City"
        required
        class="form__element form__element--half"
      />
      <SfInput
        v-model="state"
        name="state"
        label="State/Province"
        required
        class="form__element form__element--half form__element--half-even"
      />
      <SfInput
        v-model="zipCode"
        name="zipCode"
        label="Zip-code"
        required
        class="form__element form__element--half"
      />
      <SfSelect
        v-model="country"
        v-if="getMappedCountries && getMappedCountries.length > 0"
        label="Country"
        class="sf-select--underlined form__element form__element--half form__element--half-even form__select"
        error-message="Country must be selected"
      >
        <SfSelectOption
          v-for="countryOption in getMappedCountries"
          :key="countryOption.id"
          :value="countryOption"
        >
          {{ countryOption.name }}
        </SfSelectOption>
      </SfSelect>
      <SfInput
        v-model="phoneNumber"
        name="phone"
        label="Phone number"
        required
        class="form__element"
      />
      <SfButton class="form__button" @click="updateAddress">
        Update the address
      </SfButton>
        <SfButton
          class="sf-button--outline form__button form__button--back"
          @click="listAddresses = true"
        >
          Back
        </SfButton>
      </div>
  </div>
</template>

<script>
import { computed } from '@vue/composition-api'
import { SfTabs, SfInput, SfButton, SfSelect, SfIcon } from '@storefront-ui/vue'
import { useCountries } from '@shopware-pwa/composables'
import { mapCountries } from '@shopware-pwa/helpers'

export default {
  name: 'SwAddress',
  components: { SfTabs, SfInput, SfButton, SfSelect, SfIcon },
  data() {
    return {
      editAddress: false,
      editedAddress: -1,
      firstName: '',
      lastName: '',
      streetName: '',
      apartment: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      phoneNumber: '',
    }
  },
  setup() {
    const { getCountries, error: countriesError } = useCountries()
    const getMappedCountries = computed(() => mapCountries(getCountries.value))

    return {
      countriesError,
      getMappedCountries,
    }
  },
  methods: {
    updateAddress() {
      // ...
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';
@mixin for-mobile {
  @media screen and (max-width: $desktop-min) {
    @content;
  }
}
@mixin for-desktop {
  @media screen and (min-width: $desktop-min) {
    @content;
  }
}
.form {
  @include for-desktop {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  &__element {
    margin-bottom: $spacer-extra-big;
    @include for-desktop {
      flex: 0 0 100%;
    }
    &--half {
      @include for-desktop {
        flex: 1 1 50%;
      }
      &-even {
        @include for-desktop {
          padding-left: $spacer-extra-big;
        }
      }
    }
  }
  &__select {
    ::v-deep .sf-select__selected {
      padding: 5px 0;
    }
  }
  &__button {
    width: 100%;
    @include for-desktop {
      width: auto;
    }
    &--back {
      margin-left: $spacer-big;
    }
  }
}
</style>