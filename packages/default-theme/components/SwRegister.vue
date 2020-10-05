<template>
  <div class="sw-register" @keyup.enter="invokeRegister">
    <SwPluginSlot name="registration-form-before" />
    <div class="sw-form sw-register">
      <SfAlert
        v-for="(message, index) in userErrorMessages"
        :key="index"
        class="sw-register__alert"
        type="danger"
        :message="message"
        data-cy="register-alert"
      />

      <SfSelect
        v-if="getMappedSalutations && getMappedSalutations.length > 0"
        v-model="salutation"
        label="Salutation"
        :valid="!$v.salutation.$error"
        error-message="Salutation must be selected"
        class="sf-select--underlined sw-form__input sw-form__select form__element"
        data-cy="salutation-select"
      >
        <SfSelectOption
          v-for="salutationOption in getMappedSalutations"
          :key="salutationOption.id"
          :value="salutationOption"
          data-cy="salutation-option"
        >
          {{ salutationOption.name }}
        </SfSelectOption>
      </SfSelect>
      <div class="inputs-group">
        <SwInput
          v-model="firstName"
          name="first-name"
          label="First Name"
          class="sw-form__input form__element form__element--small"
          :valid="!$v.firstName.$error"
          error-message="First name is required"
          data-cy="first-name-input"
          @blur="$v.firstName.$touch()"
        />
        <SwInput
          v-model="lastName"
          name="last-name"
          label="Last Name"
          class="sw-form__input form__element form__element--small"
          :valid="!$v.lastName.$error"
          error-message="Last name is required"
          data-cy="last-name-input"
          @blur="$v.lastName.$touch()"
        />
        <SwInput
          v-model="email"
          name="email"
          label="Your email"
          class="sw-form__input form__element form__element--small form__element"
          :valid="!$v.email.$error"
          error-message="Proper email is required"
          data-cy="email-input"
          @blur="$v.email.$touch()"
        />
      </div>
      <SwInput
        v-model="password"
        name="password"
        label="Password"
        type="password"
        class="sw-form__input form__element"
        :valid="!$v.password.$error"
        error-message="Minimum password length is 8 characters"
        data-cy="password-input"
        @blur="$v.password.$touch()"
      />
      <div class="inputs-group">
        <SwInput
          v-model="street"
          name="street"
          label="Street"
          class="sw-form__input form__element form__element--small"
          :valid="!$v.street.$error"
          error-message="Street is required"
          data-cy="street-input"
          @blur="$v.street.$touch()"
        />
        <SwInput
          v-model="city"
          name="city"
          label="City"
          class="sw-form__input form__element form__element--small"
          :valid="!$v.city.$error"
          error-message="City is required"
          data-cy="city-input"
          @blur="$v.city.$touch()"
        />
        <SwInput
          v-model="zipcode"
          name="zipcode"
          label="Zip Code"
          class="sw-form__input form__element form__element--small"
          :valid="!$v.zipcode.$error"
          error-message="Zipcode is required."
          data-cy="zip-code-input"
          @blur="$v.zipcode.$touch()"
        />
      </div>
      <SfSelect
        v-if="getMappedCountries && getMappedCountries.length > 0"
        v-model="country"
        label="Country"
        class="sf-select--underlined sw-form__input form__element"
        :valid="!$v.country.$error"
        error-message="Country must be selected"
        data-cy="country-select"
        @blur="$v.country.$touch()"
      >
        <SfSelectOption
          v-for="countryOption in getMappedCountries"
          :key="countryOption.id"
          :value="countryOption"
          data-cy="country-option"
        >
          {{ countryOption.name }}
        </SfSelectOption>
      </SfSelect>
      <SwButton
        class="sf-button--full-width sw-form__button"
        :disabled="isLoading"
        data-cy="submit-register-button"
        @click="invokeRegister"
      >
        Create an account
      </SwButton>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/composition-api"
import { SfAlert, SfSelect } from "@storefront-ui/vue"
import { validationMixin } from "vuelidate"
import { required, email, minLength } from "vuelidate/lib/validators"
import {
  useUser,
  useCountries,
  useSalutations,
} from "@shopware-pwa/composables"
import {
  mapCountries,
  mapSalutations,
  getMessagesFromErrorsArray,
} from "@shopware-pwa/helpers"
import SwPluginSlot from "sw-plugins/SwPluginSlot"
import SwButton from "@/components/atoms/SwButton"
import SwInput from "@/components/atoms/SwInput"

export default {
  name: "SwResetPassword",
  components: { SwButton, SwInput, SfAlert, SfSelect, SwPluginSlot },
  mixins: [validationMixin],
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      salutation: null,
      country: null,
      street: "",
      city: "",
      zipcode: "",
    }
  },
  setup(props, { root }) {
    const { login, register, loading, error: userError } = useUser(root)
    const { getCountries, error: countriesError } = useCountries(root)
    const { getSalutations, error: salutationsError } = useSalutations(root)

    const getMappedCountries = computed(() => mapCountries(getCountries.value))
    const getMappedSalutations = computed(() =>
      mapSalutations(getSalutations.value)
    )
    const userErrorMessages = computed(() =>
      getMessagesFromErrorsArray(userError.value && userError.value.message)
    )

    return {
      clientLogin: login,
      clientRegister: register,
      isLoading: loading,
      countriesError,
      getMappedCountries,
      salutationsError,
      getMappedSalutations,
      userErrorMessages,
    }
  },
  computed: {
    mapCustomerInformations() {
      return {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        salutationId: this.salutation.id,
        storefrontUrl:
          window &&
          window.location &&
          `${window.location.protocol}//${window.location.hostname}`,
        billingAddress: {
          firstName: this.firstName,
          salutationId: this.salutation.id,
          lastName: this.lastName,
          city: this.city,
          street: this.street,
          zipcode: this.zipcode,
          countryId: this.country.id,
        },
      }
    },
  },
  validations: {
    email: {
      required,
      email,
    },
    salutation: {
      required,
    },
    password: {
      required,
      minLength: minLength(8),
    },
    firstName: {
      required,
    },
    lastName: {
      required,
    },
    country: {
      required,
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
  },
  methods: {
    async invokeRegister() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      const registeredIn = await this.clientRegister(
        this.mapCustomerInformations
      )
      if (registeredIn) {
        await this.clientLogin({
          username: this.email,
          password: this.password,
        })
        this.$emit("success")
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/forms";

.sw-login {
  &__alert {
    margin-bottom: var(--spacer-2xs);
  }

  &__header {
    margin-bottom: var(--spacer-base);
  }
}

.sw-register {
  &__alert {
    margin: var(--spacer-sm) 0;
  }
}

.sf-button--muted {
  color: var(--c-text-muted);
}

.message {
  margin: 0 0 var(--spacer-xl) 0;
  color: var(--c-dark-variant);
  &__label {
    font-weight: 400;
  }
  &--second {
    padding: 4rem;
  }
}
</style>
