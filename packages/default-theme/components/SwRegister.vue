<template>
  <div class="sw-register">
    <div class="form sw-register">
      <h2 class="sw-register__header">Log in</h2>
      <SfAlert class="sw-register__alert" v-if="error" type="danger" :message="error"/>
      <SfSelect
        v-model="salutation"
        label="Salutation"
        :valid="!$v.salutation.$error"
        error-message="Salutation must be selected"
        class="sf-select--underlined form__input"
      >
        <SfSelectOption
          v-for="option in salutations"
          :key="option.id"
          :value="option"
        >
          {{ option.label }}
        </SfSelectOption>
      </SfSelect>
      <div class="input-group">
        <SfInput
          v-model="$v.firstName.$model"
          name="first-name"
          label="First Name"
          class="form__input"
          :valid="!$v.firstName.$error"
          error-message="First name is required"
        />
        <SfInput
          v-model="$v.lastName.$model"
          name="last-name"
          label="Last Name"
          class="form__input"
          :valid="!$v.lastName.$error"
          error-message="Last name is required"
        />
        <SfInput
          v-model="$v.email.$model"
          name="email"
          label="Your email"
          class="form__input"
          :valid="!$v.email.$error"
          error-message="Proper email is required"
        />
      </div>
      <SfInput
        v-model="$v.password.$model"
        name="password"
        label="Password"
        type="password"
        class="form__input"
        :valid="!$v.password.$error"
        error-message="Minimum password length is 4 characters"
      />
      <div class="input-group">
        <SfInput
          v-model="$v.street.$model"
          name="street"
          label="Street"
          class="form__input"
          :valid="!$v.street.$error"
          error-message="Street is required"
        />
        <SfInput
          v-model="$v.city.$model"
          name="city"
          label="City"
          class="form__input"
          :valid="!$v.city.$error"
          error-message="City is required"
        />
        <SfInput
          v-model="$v.zipcode.$model"
          name="zipcode"
          label="Zip Code"
          class="form__input"
          :valid="!$v.zipcode.$error"
          error-message="Zipcode is required."
        />
      </div>
      <SfSelect
        v-model="$v.country.$model"
        label="Country"
        class="sf-select--underlined form__input"
        :valid="!$v.country.$error"
        error-message="Country must be selected"
      >
        <SfSelectOption
          v-for="option in countries"
          :key="option.id"
          :value="option"
        >
          {{ option.label }}
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
  import {SfAlert, SfInput, SfButton, SfSelect} from '@storefront-ui/vue'
  import {validationMixin} from 'vuelidate'
  import {required, email, minLength} from 'vuelidate/lib/validators'
  import {useUser} from '@shopware-pwa/composables'

  export default {
    name: 'SwResetPassword',
    components: { SfButton, SfInput, SfAlert, SfSelect},
    mixins: [validationMixin],
    data() {
      return {
        email: '',
        password: '',
        salutation: null,
        salutations: [{label: 'Mr.', id: 'c370eb5cd1df4d4dbcc78f055b693e79'}],
        countries: [{label: 'Poland', id: '38245a84c3d5425b8bac97fc845b5ddd'}],
        country: null,
        street: '',
        city: '',
        zipcode: ''
      }
    },
    setup() {
      const { login, register, loading, error} = useUser()
      return {
        clientLogin: login,
        clientRegister: register,
        isLoading: loading,
        error
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
        minLength: minLength(4)
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
        if (this.$v.$anyError) {
          this.error = 'Form is not valid'
          return
        }
        const registeredIn = await this.clientRegister({
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          salutationId: this.salutation.id,
          street: this.street,
          zipcode: this.zipcode,
          city: this.city,
          countryId: this.country.id
        })
        if (registeredIn) {
          await this.clientLogin({username: this.email, password: this.password})
          this.$emit('success')
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@storefront-ui/vue/styles";

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
