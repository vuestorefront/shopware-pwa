<template>
  <div>
    <h1>Register</h1>
    <SfAlert v-if="error" type="danger" :message="error" />
    <div class="form">
      <SfSelect
        v-model="salutation"
        label="Salutation"
        :valid="!$v.salutation.$invalid"
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
          v-model="firstName"
          name="first-name"
          label="First Name"
          class="form__input"
          :valid="!$v.firstName.$invalid"
          error-message="First name is required"
        />
        <SfInput
          v-model="lastName"
          name="last-name"
          label="Last Name"
          class="form__input"
          :valid="!$v.lastName.$invalid"
          error-message="Last name is required"
        />
      </div>
      <SfInput
        v-model="email"
        name="email"
        label="Your email"
        class="form__input"
        :valid="!$v.email.$invalid"
        error-message="Proper email is required"
      />
      <SfInput
        v-model="password"
        name="password"
        label="Password"
        type="password"
        class="form__input"
        :valid="!$v.password.$invalid"
        error-message="Password is required"
      />
      <SfInput
        v-model="street"
        name="street"
        label="Street"
        class="form__input"
        :valid="!$v.street.$invalid"
        error-message="Street is required"
      />
      <div class="input-group">
        <SfInput
          v-model="city"
          name="city"
          label="City"
          class="form__input"
          :valid="!$v.city.$invalid"
          error-message="City is required"
        />
        <SfInput
          v-model="zipcode"
          name="zipcode"
          label="Zip Code"
          class="form__input"
          :valid="!$v.zipcode.$invalid"
          error-message="Zipcode is required."
        />
      </div>
      <SfSelect
        v-model="country"
        label="Country"
        class="sf-select--underlined form__input"
        :valid="!$v.country.$invalid"
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
        :disabled="isLoading || $v.$invalid"
        @click="invokeRegister"
      >Create an account</SfButton
      >
    </div>
    <div class="action">
      or
      <SfButton class="sf-button--text" @click="modalState = 'login'">
        login in to your account
      </SfButton>
    </div>
  </div>
</template>

<script>
import {
  SfIcon,
  SfModal,
  SfInput,
  SfButton,
  SfLoader,
  SfAlert,
  SfSelect
} from '@storefront-ui/vue'
import { VuelidateMixin } from 'vuelidate'
import { required, email, between } from 'vuelidate/lib/validators'
// eslint-disable-next-line import/named
import { useUser } from '@shopware-pwa/composables'

export default {
  components: {
    SfIcon,
    SfModal,
    SfInput,
    SfButton,
    SfLoader,
    SfAlert,
    SfSelect
  },
  mixins: [VuelidateMixin],
  setup() {
    const { register, error } = useUser()
    return {
      clientRegister: register,
      error
    }
  },
  data() {
    return {
      password: '',
      salutation: null,
      salutations: [{ label: 'Mr.', id: 'c370eb5cd1df4d4dbcc78f055b693e79' }],
      countries: [{ label: 'Poland', id: '38245a84c3d5425b8bac97fc845b5ddd' }],
      country: null,
      street: '',
      city: '',
      zipcode: ''
    }
  },
  validations: {
    salutation: {
      required
    },
    password: {
      required,
      between: between(4, 30)
    },
    email: {
      required,
      email
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
  watch: {
    modalState() {
      this.password = ''
      this.email = ''
      this.firstName = ''
      this.lastName = ''
      this.salutation = null
      this.country = null
      this.street = ''
      this.city = ''
      this.zipcode = ''
    },
  },
  methods: {
    async invokeRegister() {
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
      if (registeredIn) this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../node_modules/@storefront-ui/vue/styles';
  @import '../node_modules/@storefront-ui/shared/styles/helpers/visibility';

  @mixin for-desktop {
    @media screen and (min-width: $desktop-min) {
      @content;
    }
  }

  #sw-login-modal {
    box-sizing: border-box;
    @include for-desktop {
      max-width: 80vw;
      margin: auto;
    }
  }
  .input-group {
    display: flex;
    width: 30vw;
    justify-content: space-between;
  }

  .form {
    &__input {
      margin-bottom: $spacer-medium;
      &--email {
        margin-bottom: $spacer-medium;
      }
    }
    &__checkbox {
      margin-bottom: $spacer-big;
    }
    &__button {
      margin-top: $spacer-big;
    }
  }
  .action {
    margin-top: $spacer-big;
    text-align: center;
  }
  .bottom {
    padding-top: $spacer-extra-big;
    margin-top: $spacer-extra-big;
    border-top: 1px solid $c-light;
    line-height: 1.6;
    text-align: center;
  }
  .sf-button--muted {
    color: $c-text-muted;
  }
  .salutation {
    width: 8vw;
  }
</style>

<style>
  .sf-modal__container {
    width: auto !important;
  }
</style>
