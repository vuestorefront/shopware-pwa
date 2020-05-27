<template>
  <div class="sw-address">
    <p class="message">
      Keep your addresses and contact details updated.
    </p>
    <SfAlert
      v-if="countriesError || userError"
      class="sw-personal-info__alert"
      type="danger"
      :message="countriesError || JSON.stringify(userError)"
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
      <SfSelect
        v-model="form.salutation"
        label="Salutation"
        error-message="Salutation must be selected"
        required
        :valid="!$v.form.salutation.$error"
        @blur="$v.form.salutaiton.$touch()"
        class="sf-select--underlined form__element form__element--half form__element--half form__select"
      >
        <SfSelectOption
          v-for="salutationOption in getMappedSalutations"
          :key="salutationOption.id"
          :value="salutationOption"
        >
          {{ salutationOption.name }}
        </SfSelectOption>
      </SfSelect>
      <SfInput
        v-model="form.street"
        name="street"
        label="Street Name"
        error-message="Street name is required"
        :valid="!$v.form.street.$error"
        @blur="$v.form.street.$touch()"
        required
        class="form__element form__element--half form__element--half-even"
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
        v-model="form.zipcode"
        name="zipcode"
        label="Zip-code"
        error-message="Zip code is required"
        :valid="!$v.form.zipcode.$error"
        @blur="$v.form.zipcode.$touch()"
        required
        class="form__element form__element--half"
      />
      <SfSelect
        v-model="form.country"
        label="Country"
        error-message="Country must be selected"
        :valid="!$v.form.country.$error"
        @blur="$v.form.country.$touch()"
        required
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
        name="phoneNumber"
        label="Phone number"
        error-message="Wrong phone number"
        :valid="!$v.form.phoneNumber.$error"
        @blur="$v.form.phoneNumber.$touch()"
        required
        class="form__element"
      />
      <SwButton class="form__button" @click="updateAddress">
        Update the address
      </SwButton>
      <SwButton
        class="sf-button--outline form__button form__button--back"
        @click="returnToAddresses"
      >
        Back
      </SwButton>
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import { computed, reactive, ref, onBeforeMount } from '@vue/composition-api'
import {
  SfAlert,
  SfTabs,
  SfInput,
  SfSelect,
  SfIcon
} from '@storefront-ui/vue'
import {
  useCountries,
  useUser,
  useSalutations
} from '@shopware-pwa/composables'
import { mapCountries, mapSalutations } from '@shopware-pwa/helpers'
import SwButton from '@shopware-pwa/default-theme/components/atoms/SwButton'

export default {
  name: 'SwAddress',
  components: { SfAlert, SfTabs, SfInput, SwButton, SfSelect, SfIcon },
  mixins: [validationMixin],
  props: {
    address: {
      type: Object,
      default: () => ({
        firstName: '',
        lastName: '',
        salutation: null,
        country: null,
        zipcode: '',
        street: '',
        apartment: '',
        city: '',
        phoneNumber: ''
      })
    }
  },
  setup(props) {
    const { getSalutations, error: salutationsError } = useSalutations()
    const { addAddress, error: userError } = useUser()
    const { getCountries, error: countriesError } = useCountries()
    const editAddress = ref(false)
    const editedAddress = ref(-1)
    const form = reactive(JSON.parse(JSON.stringify(props.address)))

    const getMappedCountries = computed(() => mapCountries(getCountries.value))
    const getMappedSalutations = computed(() =>
      mapSalutations(getSalutations.value)
    )

    form.salutation = {
      name: props.address.salutation && props.address.salutation.displayName,
      id: props.address.salutation && props.address.salutation.id
    }
    form.country = {
      name: props.address.country && props.address.country.name,
      id: props.address.country && props.address.country.id
    }

    return {
      addAddress,
      userError,
      countriesError,
      getMappedCountries,
      getMappedSalutations,
      form
    }
  },
  computed: {
    getAddressParam() {
      const {
        firstName,
        lastName,
        salutation,
        zipcode,
        street,
        apartment,
        city,
        country,
        phoneNumber,
        _uniqueIdentifier
      } = this.form
      return {
        id: _uniqueIdentifier,
        firstName,
        lastName,
        salutationId: salutation.id,
        zipcode,
        street,
        apartment,
        city,
        countryId: country.id,
        phoneNumber
      }
    }
  },
  methods: {
    async updateAddress() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      await this.addAddress(this.getAddressParam)
      this.returnToAddresses()
    },
    returnToAddresses() {
      this.$router.push(this.$i18n.path('/account/addresses'))
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
      salutation: {
        required
      },
      street: {
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
      zipcode: {
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
@import '@/assets/scss/variables';

.form {
  @include for-desktop {
    display: flex;
    flex-wrap: wrap;
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
      margin-left: var(--spacer-base);
    }
  }
}
</style>
