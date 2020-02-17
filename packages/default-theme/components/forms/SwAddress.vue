<template>
  <div class="sw-addresses">
    <p class="message">
      Keep your addresses and contact details updated.
    </p>
    <SfAlert
      v-if="countriesError"
      class="sw-personal-info__alert"
      type="danger"
      message="Error with fetching countries"
    />
    <div class="form">
      <SfInput
        v-model="form.firstName"
        name="firstName"
        label="First Name"
        error-message="First name is required"
        :valid="!$v.form.firstName.$error"
        @blur="$v.form.firstName.$touch()"
        required
        class="form__element form__element--half"
      />
      <SfInput
        v-model="form.lastName"
        name="lastName"
        label="Last Name"
        error-message="Last name is required"
        :valid="!$v.form.lastName.$error"
        @blur="$v.form.lastName.$touch()"
        required
        class="form__element form__element--half form__element--half-even"
      />
      <SfInput
        v-model="form.streetName"
        name="streetName"
        label="Street Name"
        error-message="Street name is required"
        :valid="!$v.form.streetName.$error"
        @blur="$v.form.streetName.$touch()"
        required
        class="form__element form__element--half"
      />
      <SfInput
        v-model="form.apartment"
        name="apartment"
        label="House/Apartment number"
        error-message="Apartment is required"
        :valid="!$v.form.apartment.$error"
        @blur="$v.form.apartment.$touch()"
        required
        class="form__element"
      />
      <SfInput
        v-model="form.city"
        name="city"
        label="City"
        error-message="City is required"
        :valid="!$v.form.city.$error"
        @blur="$v.form.city.$touch()"
        required
        class="form__element form__element--half"
      />
      <SfInput
        v-model="form.state"
        name="state"
        label="State/Province"
        error-message="State is required"
        :valid="!$v.form.state.$error"
        @blur="$v.form.state.$touch()"
        required
        class="form__element form__element--half form__element--half-even"
      />
      <SfInput
        v-model="form.zipCode"
        name="zipCode"
        label="Zip-code"
        error-message="Zip code is required"
        :valid="!$v.form.zipCode.$error"
        @blur="$v.form.zipCode.$touch()"
        required
        class="form__element form__element--half"
      />
      <SfSelect
        v-model="form.country"
        v-if="getMappedCountries && getMappedCountries.length > 0"
        label="Country"
        error-message="Country must be selected"
        :valid="!$v.form.country.$error"
        @blur="$v.form.country.$touch()"
        class="sf-select--underlined form__element form__element--half form__element--half-even form__select"
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
        v-model="form.phoneNumber"
        name="phone"
        label="Phone number"
        error-message="Phone number is required"
        :valid="!$v.form.phoneNumber.$error"
        @blur="$v.form.phoneNumber.$touch()"
        required
        class="form__element"
      />
      <SfButton class="form__button" @click="updateAddress">
        Update the address
      </SfButton>
        <SfButton
          :disabled="$v.$invalid"
          class="sf-button--outline form__button form__button--back"
          @click="listAddresses = true"
        >
          Back
        </SfButton>
      </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import { computed } from '@vue/composition-api'
import { SfTabs, SfInput, SfButton, SfSelect, SfIcon } from '@storefront-ui/vue'
import { useCountries } from '@shopware-pwa/composables'
import { mapCountries } from '@shopware-pwa/helpers'

export default {
  name: 'SwAddress',
  components: { SfTabs, SfInput, SfButton, SfSelect, SfIcon },
  mixins: [ validationMixin ],
  props: {
    firstName: {
      type: String,
      default: ''      
    },
    lastName: {
      type: String,
      default: '',
    },
    streetName: {
      type: String,
      default: '',
    },
    apartment: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      default: '',
    },
    state: {
      type: String,
      default: '',
    },
    zipCode: {
      type: String,
      default: ''
    },
    country: {
      type: String,
      default: '',
    },
    phoneNumber: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      editAddress: false,
      editedAddress: -1,
      form : {
        firstName: this.firstName,
        lastName: this.lastName,
        streetName: this.streetName,
        apartment: this.apartment,
        city: this.city,
        state: this.state,
        zipCode: this.zipCode,
        country: this.country,
        phoneNumber: this.phoneNumber,
      }
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
  },
  validations: {
    form: {
      lastName: {
        required
      },
      firstName: {
        required
      },
      streetName: {
        required
      },
      apartment: {
        required
      },
      city: {
        required
      },
      state: {
        required
      },
      zipCode: {
        required
      },
      country: {
        required
      },
      phoneNumber: {
        required
      }
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