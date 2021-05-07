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
        :label="$t('Salutation')"
        :valid="!$v.salutation.$error"
        :error-message="$t('Salutation must be selected')"
        class="sf-select--underlined sw-form__input form__element select"
        data-cy="salutation-select"
      >
        <SfSelectOption
          v-for="salutationOption in getMappedSalutations"
          :key="salutationOption.id"
          :value="salutationOption.id"
          data-cy="salutation-option"
        >
          {{ salutationOption.name }}
        </SfSelectOption>
      </SfSelect>
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
        <SwInput
          v-model="email"
          name="email"
          :label="$t('Your email')"
          class="sw-form__input form__element form__element--small form__element"
          :valid="!$v.email.$error"
          :error-message="$t('Proper email is required')"
          data-cy="email-input"
          @blur="$v.email.$touch()"
        />
      </div>
      <SwInput
        v-model="password"
        name="password"
        :label="$t('Password')"
        type="password"
        class="sw-form__input form__element"
        :valid="!$v.password.$error"
        :error-message="$t('Minimum password length is 8 characters')"
        data-cy="password-input"
        @blur="$v.password.$touch()"
      />
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
          v-model="city"
          name="city"
          :label="$t('City')"
          class="sw-form__input form__element form__element--small"
          :valid="!$v.city.$error"
          :error-message="$t('City is required')"
          data-cy="city-input"
          @blur="$v.city.$touch()"
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
      </div>
      <SfSelect
        v-if="getMappedCountries && getMappedCountries.length > 0"
        v-model="country"
        :label="$t('Country')"
        class="sf-select--underlined sw-form__input form__element select"
        :valid="!$v.country.$error"
        :error-message="$t('Country must be selected')"
        data-cy="country-select"
        @blur="$v.country.$touch()"
      >
        <SfSelectOption
          v-for="countryOption in getMappedCountries"
          :key="countryOption.id"
          :value="countryOption.id"
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
        {{ $t("Create an account") }}
      </SwButton>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/composition-api"
import { SfAlert, SfSelect } from "@storefront-ui/vue"
import useVuelidate from "@vuelidate/core"
import { required, email, minLength } from "@vuelidate/validators"
import {
  useUser,
  useCountries,
  useSalutations,
  useSessionContext,
} from "@shopware-pwa/composables"
import {
  mapCountries,
  mapSalutations,
  getMessagesFromErrorsArray,
} from "@shopware-pwa/helpers"
import SwPluginSlot from "sw-plugins/SwPluginSlot.vue"
import SwButton from "@/components/atoms/SwButton.vue"
import SwInput from "@/components/atoms/SwInput.vue"

export default {
  name: "SwResetPassword",
  components: { SwButton, SwInput, SfAlert, SfSelect, SwPluginSlot },
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
    const { refreshSessionContext } = useSessionContext(root)
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
      refreshSessionContext,
      $v: useVuelidate(),
    }
  },
  computed: {
    mapCustomerInformations() {
      return {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        salutationId: this.salutation,
        storefrontUrl:
          window &&
          window.location &&
          `${window.location.protocol}//${window.location.hostname}`,
        billingAddress: {
          firstName: this.firstName,
          salutationId: this.salutation,
          lastName: this.lastName,
          city: this.city,
          street: this.street,
          zipcode: this.zipcode,
          countryId: this.country,
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
        this.refreshSessionContext()
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
.select {
  ::v-deep .sf-select__dropdown {
    font-size: var(--font-size--lg);
    font-family: var(--font-family--secondary);
    color: var(--c-text);
  }
}
</style>
