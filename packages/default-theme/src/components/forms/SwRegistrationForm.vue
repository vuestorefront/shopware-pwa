<template>
  <div class="sw-registration-form">
    <SwErrorsList :list="formErrors" />
    <div class="sw-form">
      <div class="inputs-group">
        <SwInput
          v-model="firstName"
          name="first-name"
          :label="$t('First name')"
          class="sw-form__input form__element form__element--small"
          :valid="!$v.firstName.$error"
          :error-message="$t('First name is required')"
          data-cy="first-name-input"
          @blur="$v.firstName.$touch()"
        />
        <SwInput
          v-model="lastName"
          name="last-name"
          :label="$t('Last name')"
          class="sw-form__input form__element form__element--small"
          :valid="!$v.lastName.$error"
          :error-message="$t('Last name is required')"
          data-cy="last-name-input"
          @blur="$v.lastName.$touch()"
        />
      </div>
      <SfCheckbox
        v-model="doNotCreateAccount"
        name="doNotCreateAccount"
        :label="$t('Do not create a customer account.')"
        class="sw-form__input form__element form__element--small"
      />
      <div class="inputs-group">
        <SwInput
          v-model="email"
          :label="$t('Your email')"
          :valid="!$v.email.$error"
          :error-message="$t('Proper email is required')"
          name="registrationEmail"
          data-cy="email-input"
          class="sw-form__input form__element form__element--small"
        />
        <transition name="fade">
          <SwInput
            v-if="!doNotCreateAccount"
            v-model="password"
            type="password"
            :label="$t('Create Password')"
            :valid="!$v.password.$error"
            :error-message="
              //handle two different situations - aligned with validation rules
              (!$v.password.required && $t('Password is required')) ||
              (!$v.password.minLength &&
                $t('Password should have at least 8 characters')) ||
              ''
            "
            data-cy="password-input"
            class="sw-form__input form__element form__element--small"
          />
        </transition>
      </div>
      <div class="inputs-group">
        <SwInput
          v-model="street"
          name="street"
          :label="$t('Street')"
          class="sw-form__input form__element form__element--small"
          :valid="!$v.street.$error"
          :error-message="$t('Street is required')"
          data-cy="street-input"
          @blur="$v.street.$touch()"
        />
        <SwInput
          v-model="zipcode"
          name="zipcode"
          :label="$t('Zip code')"
          class="sw-form__input form__element form__element--small"
          :valid="!$v.zipcode.$error"
          :error-message="$t('Zip code is required')"
          data-cy="zip-code-input"
          @blur="$v.zipcode.$touch()"
        />
        <SwInput
          v-model="city"
          name="city"
          :label="$t('City')"
          class="sw-form__input form__element form__element--small"
          :valid="!$v.city.$error"
          :error-message="$t('City is required')"
          data-cy="city-input"
          @blur="$v.city.$touch()"
        />
      </div>
      <SfCheckbox
        v-model="isDifferentShippingAddress"
        name="isDifferentShippingAddress"
        :label="$t('Shipping and billing address do not match.')"
        class="sw-form__input form__element form__element--small"
      />

      <!-- TODO: create smaller components for this form after vuelidate upgrade: https://github.com/vuestorefront/shopware-pwa/issues/1472 -->
      <div class="sw-form" v-if="isDifferentShippingAddress">
        <div class="inputs-group">
          <SwInput
            v-model="alternativeFirstName"
            name="firstName"
            :label="$t('First name')"
            :error-message="$t('First name is required')"
            :valid="!$v.alternativeFirstName.$error"
            required
            class="sw-form__input"
            @blur="$v.alternativeFirstName.$touch()"
          />
          <SwInput
            v-model="alternativeLastName"
            name="lastName"
            :label="$t('Last name')"
            :error-message="$t('Last name is required')"
            :valid="!$v.alternativeLastName.$error"
            required
            class="sw-form__input"
            @blur="$v.alternativeLastName.$touch()"
          />
        </div>
        <div class="inputs-group">
          <!-- <SfSelect
            v-model="address.salutation"
            :label="$t('Salutation')"
            :error-message="$t('Salutation must be selected')"
            required
            :valid="!$v.address.salutation.$error"
            class="sf-select--underlined sw-form__select sw-form__input sf-input--has-text"
            @blur="$v.address.salutation.$touch()"
          >
            <SfSelectOption
              v-for="salutationOption in getMappedSalutations"
              :key="salutationOption.id"
              :value="salutationOption"
            >
              {{ salutationOption.name }}
            </SfSelectOption>
          </SfSelect> -->
          <SwInput
            v-model="alternativeStreet"
            name="street"
            :label="$t('Street and house number')"
            :error-message="$t('Street is required')"
            :valid="!$v.alternativeStreet.$error"
            required
            class="sw-form__input"
            @blur="$v.alternativeStreet.$touch()"
          />

          <SwInput
            v-model="alternativeZipcode"
            name="zipcode"
            :label="$t('Zip code')"
            :error-message="$t('Zip code is required')"
            :valid="!$v.alternativeZipcode.$error"
            required
            class="sw-form__input"
            @blur="$v.alternativeZipcode.$touch()"
          />

          <SwInput
            v-model="alternativeCity"
            name="city"
            :label="$t('City')"
            :error-message="$t('City is required')"
            :valid="!$v.alternativeCity.$error"
            required
            class="sw-form__input"
            @blur="$v.alternativeCity.$touch()"
          />
          <!-- <SwInput
            v-if="displayState"
            v-model="address.state"
            name="state"
            :label="$t('State/Province')"
            :error-message="$t('State is required')"
            :valid="!$v.address.state.$error"
            class="sw-form__input"
            :required="forceState"
            @blur="$v.address.state.$touch()"
          /> -->
        </div>
        <div class="inputs-group">
          <SfSelect
            v-model="alternativeCountry.value"
            :label="$t('Country')"
            :error-message="$t('Country must be selected')"
            :valid="!$v.alternativeCountry.$error"
            required
            class="sf-select--underlined sw-form__select"
            @blur="$v.alternativeCountry.$touch()"
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
          v-model="alternativePhoneNumber"
          name="phoneNumber"
          :label="$t('Phone number')"
          :error-message="$t('Wrong phone number')"
          :valid="!$v.alternativePhoneNumber.$error"
          required
          class="sw-form__input"
          @blur="$v.alternativePhoneNumber.$touch()"
        />
      </div>

      <SwButton class="sw-form__button" @click="registerUser">
        {{ $t("Continue") }}
      </SwButton>
      <SwButton
        class="sf-button--outline sw-form__button sw-form__button--back"
        @click="cancel"
      >
        {{ $t("Back") }}
      </SwButton>
    </div>
  </div>
</template>

<script lang="ts">
// TODO: create smaller components for this form after vuelidate upgrade: https://github.com/vuestorefront/shopware-pwa/issues/1472
import { validationMixin } from "vuelidate"
import {
  required,
  requiredIf,
  email,
  minLength,
} from "vuelidate/lib/validators"
import { computed, reactive, Ref, ref, watch } from "@vue/composition-api"
import { SfAlert, SfSelect, SfCheckbox } from "@storefront-ui/vue"
import {
  useCountries,
  useSalutations,
  useSessionContext,
  useUser,
} from "@shopware-pwa/composables"
import {
  mapCountries,
  mapSalutations,
  getMessagesFromErrorsArray,
} from "@shopware-pwa/helpers"
import SwButton from "@/components/atoms/SwButton.vue"
import SwInput from "@/components/atoms/SwInput.vue"
import SwErrorsList from "@/components/SwErrorsList.vue"

export default {
  name: "SwRegistrationForm",
  components: {
    SfAlert,
    SwInput,
    SwButton,
    SfSelect,
    SwErrorsList,
    SfCheckbox,
  },
  mixins: [validationMixin],
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      salutation: null,
      country: null,
      street: "",
      city: "",
      zipcode: "",
    }
  },
  setup({ address }, { root }) {
    const { refreshSessionContext } = useSessionContext(root)
    const { login, register, loading, error: userError, errors } = useUser(root)
    const { getCountries, error: countriesError } = useCountries(root)
    const { getSalutations, error: salutationsError } = useSalutations(root)
    const formErrors = computed(() => errors.register)

    // form data
    const doNotCreateAccount: Ref<boolean> = ref(false)
    const isDifferentShippingAddress: Ref<boolean> = ref(false)
    const password: Ref<string> = ref("")
    // alternative address
    const alternativeFirstName: Ref<string> = ref("")
    const alternativeLastName: Ref<string> = ref("")
    const alternativeEmail: Ref<string> = ref("")
    // const alternativeSalutation: Ref<string> = ref("")
    const alternativeCountry: Ref<string> = ref("")
    const alternativeStreet: Ref<string> = ref("")
    const alternativeCity: Ref<string> = ref("")
    const alternativeZipcode: Ref<string> = ref("")
    const alternativePhoneNumber: Ref<string> = ref("")

    const getMappedCountries = computed(() => mapCountries(getCountries.value))
    const getMappedSalutations = computed(() =>
      mapSalutations(getSalutations.value)
    )
    const userErrorMessages = computed(() =>
      getMessagesFromErrorsArray(userError.value && userError.value.message)
    )

    watch(doNotCreateAccount, () => {
      if (!!doNotCreateAccount.value) password.value = ""
    })

    async function registerUser(val) {
      const resp = await register({
        firstName: "test",
        lastName: "test",
        email: "mkucmus+test@gmail.com",
        password: null,
        guest: true,
        salutationId: "76fd5475cb9f48d8bb77d27e68ea9873",
        storefrontUrl: "http://localhost",
        billingAddress: {
          firstName: "test",
          salutationId: "76fd5475cb9f48d8bb77d27e68ea9873",
          lastName: "test",
          city: "433434",
          street: "433434",
          zipcode: "r434343",
          countryId: "e7b324e8e2d84bdab78727d1935fba23",
        },
      })
      console.error("RESP", resp)
    }

    function cancel() {
      console.error("cancel")
    }

    return {
      clientLogin: login,
      clientRegister: register,
      isLoading: loading,
      countriesError,
      getMappedCountries,
      salutationsError,
      getMappedSalutations,
      userErrorMessages,
      refreshSessionContext,
      formErrors,
      doNotCreateAccount,
      password,
      isDifferentShippingAddress,
      alternativeFirstName,
      alternativeLastName,
      alternativeEmail,
      alternativeStreet,
      alternativeZipcode,
      alternativeCity,
      alternativeCountry,
      alternativePhoneNumber,
      registerUser,
      cancel,
    }
  },
  validations: {
    firstName: {
      required,
    },
    lastName: {
      required,
    },
    email: {
      required,
      email,
    },
    password: {
      required: requiredIf(function (password) {
        return !this.doNotCreateAccount
      }),
      minLength: minLength(8),
    },
    street: {
      required,
    },
    zipcode: {
      required,
    },
    city: {
      required,
    },
    alternativeFirstName: {
      required: requiredIf(function () {
        return !!this.isDifferentShippingAddress
      }),
    },
    alternativeLastName: {
      required: requiredIf(function () {
        return !!this.isDifferentShippingAddress
      }),
    },
    alternativeEmail: {
      required: requiredIf(function () {
        return !!this.isDifferentShippingAddress
      }),
    },
    alternativeStreet: {
      required: requiredIf(function () {
        return !!this.isDifferentShippingAddress
      }),
    },
    alternativeZipcode: {
      required: requiredIf(function () {
        return !!this.isDifferentShippingAddress
      }),
    },
    alternativeCity: {
      required: requiredIf(function () {
        return !!this.isDifferentShippingAddress
      }),
    },
    alternativeCountry: {
      required: requiredIf(function () {
        return !!this.isDifferentShippingAddress
      }),
    },
    alternativePhoneNumber: {
      required: requiredIf(function () {
        return !!this.isDifferentShippingAddress
      }),
    },
  },
  methods: {
    async invokeRegister() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      console.error("INVOKE API REGISTER")
      // const registeredIn = await this.clientRegister(
      //   this.mapCustomerInformations
      // )
      // if (registeredIn) {
      //   await this.clientLogin({
      //     username: this.email,
      //     password: this.password,
      //   })
      //   this.refreshSessionContext()
      //   this.$emit("success")
      // }
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/forms";
</style>
