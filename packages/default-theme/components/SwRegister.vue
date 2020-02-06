<template>
  <div class="sw-register">
    <div class="form sw-register">
      <h2 class="sw-register__header">Register</h2>
      <SfAlert
        v-if="error"
        class="sw-register__alert"
        type="danger"
        message="Cannot create a new account, the user may already exist"
      />
      <SfSelect
        v-if="mappedSalutations && mappedSalutations.length > 0"
        v-model="salutation"
        label="Salutation"
        :valid="!$v.salutation.$error"
        error-message="Salutation must be selected"
        class="sf-select--underlined form__input"
      >
        <SfSelectOption
          v-for="salutationOption in mappedSalutations"
          :key="salutationOption.id"
          :value="salutationOption"
        >
          {{ salutationOption.displayName }}
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
        v-if="mappedCountries && mappedCountries.length > 0"
        label="Country"
        class="sf-select--underlined form__input"
        :valid="!$v.country.$error"
        error-message="Country must be selected"
        @blur="$v.country.$touch()"
      >
        <SfSelectOption
          v-for="countryOption in mappedCountries"
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
import { SfAlert, SfInput, SfButton, SfSelect } from '@storefront-ui/vue'
import { validationMixin } from 'vuelidate'
import { required, email, minLength } from 'vuelidate/lib/validators'
import { useUser, useContext } from '@shopware-pwa/composables'

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
    const { login, register, loading, error } = useUser()
    const {
      fetchSalutations,
      fetchCountries,
      mappedSalutations,
      mappedCountries
    } = useContext()
    return {
      clientLogin: login,
      clientRegister: register,
      isLoading: loading,
      error,
      fetchSalutations,
      fetchCountries,
      mappedSalutations,
      mappedCountries
    }
  },
  computed: {
    mapCustomerInforations() {
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
        this.mapCustomerInforations
      )
      if (registeredIn) {
        await this.clientLogin({
          username: this.email,
          password: this.password
        })
        this.$emit('success')
      }
    }
  },
  async mounted() {
    await this.fetchSalutations()
    await this.fetchCountries()
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
    margin-bottom: $spacer-small;
  }

  &__header {
    margin-bottom: $spacer-big;
  }
}

.form {
  &__input {
    margin-bottom: $spacer-big;
  }

  &__checkbox {
    margin-bottom: $spacer-big;
  }

  &__button {
    margin-top: $spacer-big;
  }
}

.sf-button--muted {
  color: $c-text-muted;
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
