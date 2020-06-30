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
      <SwInput
        v-model="form.firstName"
        name="firstName"
        label="First Name"
        error-message="First name is required"
        :valid="!$v.form.firstName.$error"
        required
        class="form__element form__element--half"
        @blur="$v.form.firstName.$touch()"
      />
      <SwInput
        v-model="form.lastName"
        name="lastName"
        label="Last Name"
        error-message="Last name is required"
        :valid="!$v.form.lastName.$error"
        required
        class="form__element form__element--half form__element--half-even"
        @blur="$v.form.lastName.$touch()"
      />
      <SfSelect
        v-model="form.salutation"
        label="Salutation"
        error-message="Salutation must be selected"
        required
        :valid="!$v.form.salutation.$error"
        class="sf-select--underlined form__element form__element--half form__element--half form__select"
        @blur="$v.form.salutaiton.$touch()"
      >
        <SfSelectOption
          v-for="salutationOption in getMappedSalutations"
          :key="salutationOption.id"
          :value="salutationOption"
        >
          {{ salutationOption.name }}
        </SfSelectOption>
      </SfSelect>
      <SwInput
        v-model="form.street"
        name="street"
        label="Street Name"
        error-message="Street name is required"
        :valid="!$v.form.street.$error"
        required
        class="form__element form__element--half form__element--half-even"
        @blur="$v.form.street.$touch()"
      />
      <SwInput
        v-model="form.apartment"
        name="apartment"
        label="House/Apartment number"
        error-message="Apartment is required"
        :valid="!$v.form.apartment.$error"
        required
        class="form__element"
        @blur="$v.form.apartment.$touch()"
      />
      <SwInput
        v-model="form.city"
        name="city"
        label="City"
        error-message="City is required"
        :valid="!$v.form.city.$error"
        required
        class="form__element form__element--half"
        @blur="$v.form.city.$touch()"
      />
      <SwInput
        v-model="form.state"
        name="state"
        label="State/Province"
        error-message="State is required"
        :valid="!$v.form.state.$error"
        required
        class="form__element form__element--half form__element--half-even"
        @blur="$v.form.state.$touch()"
      />
      <SwInput
        v-model="form.zipcode"
        name="zipcode"
        label="Zip-code"
        error-message="Zip code is required"
        :valid="!$v.form.zipcode.$error"
        required
        class="form__element form__element--half"
        @blur="$v.form.zipcode.$touch()"
      />
      <SfSelect
        v-model="form.country"
        label="Country"
        error-message="Country must be selected"
        :valid="!$v.form.country.$error"
        required
        class="sf-select--underlined form__element form__element--half form__element--half-even form__select"
        @blur="$v.form.country.$touch()"
      >
        <SfSelectOption
          v-for="countryOption in getMappedCountries"
          :key="countryOption.id"
          :value="countryOption"
        >
          {{ countryOption.name }}
        </SfSelectOption>
      </SfSelect>
      <SwInput
        v-model="form.phoneNumber"
        name="phoneNumber"
        label="Phone number"
        error-message="Wrong phone number"
        :valid="!$v.form.phoneNumber.$error"
        required
        class="form__element"
        @blur="$v.form.phoneNumber.$touch()"
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
import { validationMixin } from "vuelidate"
import { required } from "vuelidate/lib/validators"
import { computed, reactive } from "@vue/composition-api"
import { SfAlert, SfSelect } from "@storefront-ui/vue"
import {
  useCountries,
  useUser,
  useSalutations,
} from "@shopware-pwa/composables"
import { mapCountries, mapSalutations } from "@shopware-pwa/helpers"
import SwButton from "@shopware-pwa/default-theme/components/atoms/SwButton"
import SwInput from "@shopware-pwa/default-theme/components/atoms/SwInput"

export default {
  name: "SwAddress",
  components: { SfAlert, SwInput, SwButton, SfSelect },
  mixins: [validationMixin],
  props: {
    address: {
      type: Object,
      default: () => ({
        firstName: "",
        lastName: "",
        salutation: null,
        country: null,
        zipcode: "",
        street: "",
        apartment: "",
        city: "",
        phoneNumber: "",
      }),
    },
  },
  setup(props, { root }) {
    const { getSalutations } = useSalutations(root)
    const { addAddress, error: userError } = useUser(root)
    const { getCountries, error: countriesError } = useCountries(root)

    const form = reactive(JSON.parse(JSON.stringify(props.address)))

    const getMappedCountries = computed(() => mapCountries(getCountries.value))
    const getMappedSalutations = computed(() =>
      mapSalutations(getSalutations.value)
    )

    form.salutation = {
      name: props.address.salutation && props.address.salutation.displayName,
      id: props.address.salutation && props.address.salutation.id,
    }
    form.country = {
      name: props.address.country && props.address.country.name,
      id: props.address.country && props.address.country.id,
    }

    return {
      addAddress,
      userError,
      countriesError,
      getMappedCountries,
      getMappedSalutations,
      form,
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
        _uniqueIdentifier,
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
        phoneNumber,
      }
    },
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
      this.$router.push(this.$i18n.path("/account/addresses"))
    },
  },
  validations: {
    form: {
      lastName: {
        required,
      },
      firstName: {
        required,
      },
      salutation: {
        required,
      },
      street: {
        required,
      },
      apartment: {
        required,
      },
      city: {
        required,
      },
      state: {
        required,
      },
      zipcode: {
        required,
      },
      country: {
        required,
      },
      phoneNumber: {
        required,
      },
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

.form {
  @include for-tablet {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  &__element {
    margin-bottom: var(--spacer-xl);
    @include for-tablet {
      flex: 0 0 100%;
    }
    &--half {
      @include for-tablet {
        flex: 1 1 50%;
      }
      &-even {
        @include for-tablet {
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

    &--back {
      margin: var(--spacer-base) 0 0 0;
    }

    @include for-tablet {
      width: auto;

      &--back {
        margin: 0 0 0 var(--spacer-base);
      }
    }
  }
}
</style>
