<template>
  <div class="sw-login">
    <div class="form sw-login__form">
      <h2 class="sw-login__header">Log in</h2>
      <SfAlert
        v-if="error"
        class="sw-login__alert"
        type="danger"
        message="Cannot login with provided credentials"
      />
      <SfInput
        v-model="email"
        name="email"
        label="Your email"
        class="form__input"
        :valid="!$v.email.$error"
        :disabled="isLoading"
        error-message="Email is required"
        @blur="$v.email.$touch()"
      />
      <SfInput
        v-model="password"
        name="password"
        label="Password"
        type="password"
        class="form__input"
        :valid="!$v.password.$error"
        :disabled="isLoading"
        error-message="Password is required"
        @blur="$v.password.$touch()"
      />
      <SfButton
        class="sf-button--full-width form__button"
        :disabled="isLoading"
        @click="invokeLogin"
      >
        Login
      </SfButton>
    </div>
  </div>
</template>

<script>
import { SfInput, SfButton, SfAlert } from '@storefront-ui/vue'
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
import { useUser } from '@shopware-pwa/composables'

export default {
  name: 'SwResetPassword',
  components: { SfButton, SfInput, SfAlert },
  mixins: [validationMixin],
  data() {
    return {
      email: '',
      password: ''
    }
  },
  setup() {
    const { login, loading, error } = useUser()
    return {
      clientLogin: login,
      isLoading: loading,
      error
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  },
  methods: {
    async invokeLogin() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      const loggedIn = await this.clientLogin({
        username: this.login,
        password: this.password
      })
      if (loggedIn) this.$emit('success')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';

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
    margin-bottom: $spacer-extra-big;
  }
  &__checkbox {
    margin-bottom: $spacer-big;
  }
  &__button {
    margin-top: $spacer-big;
  }
}
</style>
