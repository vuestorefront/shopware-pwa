<template>
  <div class="sw-register">
    <div class="form sw-register">
      <h2 class="sw-register__header">Register</h2>
      <SfAlert
        v-if="userError || salutationsError || countriesError"
        class="sw-register__alert"
        type="danger"
        :message="getErrorMessage"
      />
      <SfSelect
        v-if="getMappedSalutations && getMappedSalutations.length > 0"
        v-model="salutation"
        label="Salutation"
        :valid="!$v.salutation.$error"
        error-message="Salutation must be selected"
        class="sf-select--underlined form__input"
      >
        <SfSelectOption
          v-for="salutationOption in getMappedSalutations"
          :key="salutationOption.id"
          :value="salutationOption"
        >
          {{ salutationOption.name }}
        </SfSelectOption>
      </SfSelect>
      <div class="input-group">
        <SfInput
          v-model="firstName"
          name="first-name"
          label="First Name"
          class="form__input"
          :valid="!$v.firstName.$error"
          error-message="First name is required"
          @blur="$v.firstName.$touch()"
        />
        <SfInput
          v-model="lastName"
          name="last-name"
          label="Last Name"
          class="form__input"
          :valid="!$v.lastName.$error"
          error-message="Last name is required"
          @blur="$v.lastName.$touch()"
        />
        <SfInput
          v-model="email"
          name="email"
          label="Your email"
          class="form__input"
          :valid="!$v.email.$error"
          error-message="Proper email is required"
          @blur="$v.email.$touch()"
        />
      </div>
      <SfInput
        v-model="password"
        name="password"
        label="Password"
        type="password"
        class="form__input"
        :valid="!$v.password.$error"
        error-message="Minimum password length is 8 characters"
        @blur="$v.password.$touch()"
      />
      <div class="input-group">
        <SfInput
          v-model="street"
          name="street"
          label="Street"
          class="form__input"
          :valid="!$v.street.$error"
          error-message="Street is required"
          @blur="$v.street.$touch()"
        />
        <SfInput
          v-model="city"
          name="city"
          label="City"
          class="form__input"
          :valid="!$v.city.$error"
          error-message="City is required"
          @blur="$v.city.$touch()"
        />
        <SfInput
          v-model="zipcode"
          name="zipcode"
          label="Zip Code"
          class="form__input"
          :valid="!$v.zipcode.$error"
          error-message="Zipcode is required."
          @blur="$v.zipcode.$touch()"
        />
      </div>
      <SfSelect
        v-model="country"
        v-if="getMappedCountries && getMappedCountries.length > 0"
        label="Country"
        class="sf-select--underlined form__input"
        :valid="!$v.country.$error"
        error-message="Country must be selected"
        @blur="$v.country.$touch()"
      >
        <SfSelectOption
          v-for="countryOption in getMappedCountries"
          :key="countryOption.id"
          :value="countryOption"
        >
          {{ countryOption.name }}
        </SfSelectOption>
      </SfSelect>
      <SfButton
        class="sf-button--full-width form__button"
        :disabled="isLoading"
        @click="invokeRegister"
      >
        Create an account
      </SfButton>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/composition-api'
import { SfAlert, SfInput, SfButton, SfSelect } from '@storefront-ui/vue'
import { validationMixin } from 'vuelidate'
import { required, email, minLength } from 'vuelidate/lib/validators'
import {
  useUser,
  useCountries,
  useSalutations
} from '@shopware-pwa/composables'
import { mapCountries, mapSalutations } from '@shopware-pwa/helpers'

export default {
  name: 'SwResetPassword',
  components: { SfButton, SfInput, SfAlert, SfSelect },
  mixins: [validationMixin],
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      salutation: null,
      country: null,
      street: '',
      city: '',
      zipcode: ''
    }
  },
  setup() {
    const { login, register, loading, error: userError } = useUser()
    const {
      getCountries,
      error: countriesError
    } = useCountries()
    const {
      getSalutations,
      error: salutationsError
    } = useSalutations()

    const getMappedCountries = computed(() => mapCountries(getCountries.value))
    const getMappedSalutations = computed(() => mapSalutations(getSalutations.value))

    return {
      clientLogin: login,
      clientRegister: register,
      isLoading: loading,
      userError,
      countriesError,
      getMappedCountries,
      salutationsError,
      getMappedSalutations
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
        billingAddress: {
          firstName: this.firstName,
          salutationId: this.salutation.id,
          lastName: this.lastName,
          city: this.city,
          street: this.street,
          zipcode: this.zipcode,
          countryId: this.country.id
        }
      }
    },
    getErrorMessage() {
      if (this.userError)
        return 'Cannot create a new account, the user may already exist'
      if (this.salutationsError)
        return "Couldn't fetch available salutations, please contact the administration."
      if (this.countriesError)
        return "Couldn't fetch available countries, please contact the administration."
    }
  },
  validations: {
    email: {
      required,
      email
    },
    salutation: {
      required
    },
    password: {
      required,
      minLength: minLength(8)
    },
    firstName: {
      required
    },
    lastName: {
      required
    },
    country: {
      required
    },
    street: {
      required
    },
    zipcode: {
      required
    },
    city: {
      required
    }
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
          password: this.password
        })
        this.$emit('success')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';

@mixin for-desktop {
  @media screen and (min-width: 900px) {
    @content;
  }
}

.input-group {
  @include for-desktop {
    display: flex;
    width: 40vw;
    justify-content: space-between;
  }
}

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

.form {
  &__input {
    margin-bottom: var(--spacer-base);
  }

  &__checkbox {
    margin-bottom: var(--spacer-base);
  }

  &__button {
    margin-top: var(--spacer-base);
  }
}

.sf-button--muted {
  color: var(--c-text-muted);
}
</style>

<style lang="scss">
.sf-modal__container {
  width: 100% !important;
  height: 100% !important;
  @media screen and (min-width: 900px) {
    width: auto !important;
    height: auto !important;
  }
}
</style>
