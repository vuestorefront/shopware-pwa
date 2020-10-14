<template>
  <div class="sw-address">
    <p class="message">
      {{ $t("Keep your addresses and contact details updated.") }}
    </p>
    <SfAlert
      v-if="countriesError || userError"
      class="sw-personal-info__alert"
      type="danger"
      :message="countriesError || JSON.stringify(userError)"
    />
    <div class="sw-form">
      <div class="inputs-group">
        <SwInput
          v-model="form.firstName"
          name="firstName"
          :label="$t('First name')"
          :error-message="$t('First name is required')"
          :valid="!$v.form.firstName.$error"
          required
          class="sw-form__input"
          @blur="$v.form.firstName.$touch()"
        />
        <SwInput
          v-model="form.lastName"
          name="lastName"
          :label="$t('Last name')"
          :error-message="$t('Last name is required')"
          :valid="!$v.form.lastName.$error"
          required
          class="sw-form__input"
          @blur="$v.form.lastName.$touch()"
        />
      </div>
      <div class="inputs-group">
        <SfSelect
          v-model="form.salutation"
          :label="$t('Salutation')"
          :error-message="$t('Salutation must be selected')"
          required
          :valid="!$v.form.salutation.$error"
          class="sf-select--underlined sw-form__select"
          @blur="$v.form.salutation.$touch()"
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
          :label="$t('Street')"
          :error-message="$t('Street is required')"
          :valid="!$v.form.street.$error"
          required
          class="sw-form__input"
          @blur="$v.form.street.$touch()"
        />
      </div>
      <SwInput
        v-model="form.apartment"
        name="apartment"
        :label="$t('House/Apartment number')"
        :error-message="$t('Apartment is required')"
        :valid="!$v.form.apartment.$error"
        required
        class="form__element"
        @blur="$v.form.apartment.$touch()"
      />
      <div class="inputs-group">
        <SwInput
          v-model="form.city"
          name="city"
          :label="$t('City')"
          :error-message="$t('City is required')"
          :valid="!$v.form.city.$error"
          required
          class="sw-form__input"
          @blur="$v.form.city.$touch()"
        />
        <SwInput
          v-model="form.state"
          name="state"
          :label="$t('State/Province')"
          :error-message="$t('State is required')"
          :valid="!$v.form.state.$error"
          required
          class="sw-form__input"
          @blur="$v.form.state.$touch()"
        />
      </div>
      <div class="inputs-group">
        <SwInput
          v-model="form.zipcode"
          name="zipcode"
          :label="$t('Zip code')"
          :error-message="$t('Zip code is required')"
          :valid="!$v.form.zipcode.$error"
          required
          class="sw-form__input"
          @blur="$v.form.zipcode.$touch()"
        />

        <SfSelect
          v-model="form.country"
          :label="$t('Country')"
          :error-message="$t('Country must be selected')"
          :valid="!$v.form.country.$error"
          required
          class="sf-select--underlined sw-form__select"
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
      </div>
      <SwInput
        v-model="form.phoneNumber"
        name="phoneNumber"
        :label="$t('Phone number')"
        :error-message="$t('Wrong phone number')"
        :valid="!$v.form.phoneNumber.$error"
        required
        class="sw-form__input"
        @blur="$v.form.phoneNumber.$touch()"
      />

      <SwButton class="sw-form__button" @click="updateAddress">
        {{ $t("Update the address") }}
      </SwButton>
      <SwButton
        class="sf-button--outline sw-form__button sw-form__button--back"
        @click="returnToAddresses"
      >
        {{ $t("Back") }}
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
import SwButton from "@/components/atoms/SwButton"
import SwInput from "@/components/atoms/SwInput"

export default {
  name: "SwAddressForm",
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
@import "@/assets/scss/forms";
</style>
