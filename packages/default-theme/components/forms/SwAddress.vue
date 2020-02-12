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
        class="form__element"
      />
      <SfInput
        v-model="apartment"
        name="apartment"
        label="House/Apartment number"
        required
        class="form__element"
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
        name="country"
        label="Country"
        required
        class="sf-select--underlined form__select form__element form__element--half form__element--half-even"
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
        name="phone"
        label="Phone number"
        required
        class="form__element"
      />
      <SfButton class="form__button" @click="updateAddress">
        Update the address
      </SfButton>
    </div>
  </div>
</template>

<script>
import { SfTabs, SfInput, SfButton, SfSelect, SfIcon } from '@storefront-ui/vue'

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
      countries: [
        'Austria',
        'Azerbaijan',
        'Belarus',
        'Belgium',
        'Bosnia and Herzegovina',
        'Bulgaria',
        'Croatia',
        'Cyprus',
        'Czech Republic',
        'Denmark',
        'Estonia',
        'Finland',
        'France',
        'Georgia',
        'Germany',
        'Greece',
        'Hungary',
        'Iceland',
        'Ireland',
        'Italy',
        'Kosovo',
        'Latvia',
        'Liechtenstein',
        'Lithuania',
        'Luxembourg',
        'Macedonia',
        'Malta',
        'Moldova',
        'Monaco',
        'Montenegro',
        'The Netherlands',
        'Norway',
        'Poland',
        'Portugal',
        'Romania',
        'Russia',
        'San Marino',
        'Serbia',
        'Slovakia',
        'Slovenia',
        'Spain',
        'Sweden',
        'Switzerland',
        'Turkey',
        'Ukraine',
        'United Kingdom',
        'Vatican City'
      ]
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
  }
}
</style>