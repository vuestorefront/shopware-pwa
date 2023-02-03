<template>
  <div class="sw-address">
    <p class="message">
      {{ $t("Keep your addresses and contact details updated.") }}
    </p>
    <SwErrorsList :list="formErrors" />
    <div class="sw-form" v-if="addressModel.id">
      <div class="inputs-group">
        <SwInput
          v-model="addressModel.firstName"
          name="firstName"
          :label="$t('First name')"
          :error-message="$t('First name is required')"
          :valid="!$v.address.firstName.$error"
          required
          class="sw-form__input"
          @blur="$v.address.firstName.$touch()"
        />
        <SwInput
          v-model="addressModel.lastName"
          name="lastName"
          :label="$t('Last name')"
          :error-message="$t('Last name is required')"
          :valid="!$v.address.lastName.$error"
          required
          class="sw-form__input"
          @blur="$v.address.lastName.$touch()"
        />
      </div>
      <div class="inputs-group">
        <SfComponentSelect
          v-model="addressModel.salutationId"
          :label="$t('Salutation')"
          :error-message="$t('Salutation must be selected')"
          required
          :valid="!$v.address.salutation.$error"
          class="sw-select sf-select--underlined sw-form__input sf-input--has-text sf-component-select--underlined"
          @blur="$v.address.salutation.$touch()"
        >
          <SfComponentSelectOption
            v-for="salutationOption in getSalutations"
            :key="salutationOption.id"
            :value="salutationOption.id"
          >
            {{ getTranslatedProperty(salutationOption, "displayName") }}
          </SfComponentSelectOption>
        </SfComponentSelect>
        <SwInput
          v-model="addressModel.street"
          name="street"
          :label="$t('Street and house number')"
          :error-message="$t('Street is required')"
          :valid="!$v.address.street.$error"
          required
          class="sw-form__input"
          @blur="$v.address.street.$touch()"
        />
      </div>

      <div class="inputs-group">
        <SwInput
          v-model="addressModel.city"
          name="city"
          :label="$t('City')"
          :error-message="$t('City is required')"
          :valid="!$v.address.city.$error"
          required
          class="sw-form__input"
          @blur="$v.address.city.$touch()"
        />
        <SwInput
          v-if="displayState"
          v-model="addressModel.state"
          name="state"
          :label="$t('State/Province')"
          :error-message="$t('State is required')"
          :valid="!$v.address.state.$error"
          class="sw-form__input"
          :required="forceState"
          @blur="$v.address.state.$touch()"
        />
      </div>
      <div class="inputs-group">
        <SwInput
          v-model="addressModel.zipcode"
          name="zipcode"
          :label="$t('Zip code')"
          :error-message="$t('Zip code is required')"
          :valid="!$v.address.zipcode.$error"
          required
          class="sw-form__input"
          @blur="$v.address.zipcode.$touch()"
        />

        <SfComponentSelect
          v-model="addressModel.countryId"
          :label="$t('Country')"
          :error-message="$t('Country must be selected')"
          :valid="!$v.address.countryId.$error"
          required
          class="sf-select--underlined sw-form__input sf-component-select--underlined sw-select"
          @blur="$v.address.countryId.$touch()"
        >
          <SfComponentSelectOption
            v-for="countryOption in getCountries"
            :key="countryOption.id"
            :value="countryOption.id"
          >
            {{ getTranslatedProperty(countryOption, "name") }}
          </SfComponentSelectOption>
        </SfComponentSelect>
      </div>
      <SwInput
        v-model="addressModel.phoneNumber"
        name="phoneNumber"
        :label="$t('Phone number')"
        :error-message="$t('Wrong phone number')"
        :valid="!$v.address.phoneNumber.$error"
        required
        class="sw-form__input"
        @blur="$v.address.phoneNumber.$touch()"
      />

      <SwButton class="sw-form__button" @click="updateAddress">
        {{ existingAddress ? $t("Update the address") : $t("Add the address") }}
      </SwButton>
      <SwButton
        class="sf-button--outline sw-form__button sw-form__button--back"
        @click="$emit('cancel')"
      >
        {{ $t("Back") }}
      </SwButton>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core"
import { required } from "@vuelidate/validators"
import { computed, reactive } from "@vue/composition-api"
import { SfAlert, SfComponentSelect } from "@storefront-ui/vue"
import {
  useCountries,
  useCountry,
  useSalutations,
  useNotifications,
  useCustomerAddresses,
} from "@shopware-pwa/composables"
import { getTranslatedProperty } from "@shopware-pwa/helpers"
import SwButton from "@/components/atoms/SwButton.vue"
import SwInput from "@/components/atoms/SwInput.vue"
import SwErrorsList from "@/components/SwErrorsList.vue"

export default {
  name: "SwAddressForm",
  components: {
    SfAlert,
    SwInput,
    SwButton,
    SfComponentSelect,
    SwErrorsList,
  },
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
        city: "",
        phoneNumber: "",
      }),
    },
  },
  setup(props) {
    const { pushError, pushSuccess } = useNotifications()
    const { getSalutations } = useSalutations()
    const { addAddress, updateAddress, errors } = useCustomerAddresses()
    const { getCountries, error: countriesError } = useCountries()
    const addressModel = reactive(props.address)
    const existingAddress = computed(() => !!props.address?.id)
    // compute selected id
    const selectedCountryId = computed(() => addressModel.countryId)
    const selectedSalutationId = computed(() => addressModel.salutationId)
    // check whether state is required
    const { displayState, forceState } = useCountry({
      countryId: selectedCountryId,
    })

    // address model ready to be sent to API
    const getAddressModel = computed(() => ({
      id: addressModel.id,
      firstName: addressModel.firstName,
      lastName: addressModel.lastName,
      zipcode: addressModel.zipcode,
      street: addressModel.street,
      city: addressModel.city,
      phoneNumber: addressModel.phoneNumber,
      countryId: selectedCountryId.value,
      salutationId: selectedSalutationId.value,
    }))

    // try to save an address
    const saveAddress = () =>
      existingAddress.value
        ? updateAddress(getAddressModel.value)
        : addAddress(getAddressModel.value)

    return {
      addressModel,
      addAddress,
      countriesError,
      getSalutations,
      displayState,
      forceState,
      saveAddress,
      pushError,
      pushSuccess,
      formErrors: errors.updateAddress,
      existingAddress,
      getCountries,
      getTranslatedProperty,
      $v: useVuelidate({ $scope: "addressForm", $stopPropagation: true }),
    }
  },
  methods: {
    async updateAddress() {
      this.$v.$reset()
      const isFormCorrect = await this.$v.$validate()
      if (!isFormCorrect) {
        return
      }
      const addressId = await this.saveAddress()
      if (this.formErrors?.length) {
        return this.pushError(
          this.$t("Your address couldn't be updated due to some errors")
        )
      }

      this.pushSuccess(this.$t("Your address has been updated"))
      this.$emit("success", addressId)
    },
  },
  validations: {
    address: {
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
      city: {
        required,
      },
      // state: {
      //   required: requiredIf(function () {
      //     return this.forceState
      //   }),
      // },
      zipcode: {
        required,
      },
      countryId: {
        required,
      },
      phoneNumber: {
        required,
      },
    },
  },
}
</script>

<style lang="scss">
@import "@/assets/scss/forms";
</style>
