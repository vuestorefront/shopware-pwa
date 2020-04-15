<template>
  <div class="sw-login">
    <div class="form sw-login__form">
      <h2 class="sw-login__header">Log in</h2>
      <SfAlert
        v-if="userError"
        class="sw-login__alert"
        type="danger"
        :message="userError"
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
  name: 'SwLogin',
  components: { SfButton, SfInput, SfAlert },
  mixins: [validationMixin],
  data() {
    return {
      email: '',
      password: ''
    }
  },
  setup() {
    const { login, loading, error: userError } = useUser()
    return {
      clientLogin: login,
      isLoading: loading,
      userError
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
        username: this.email,
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
    margin-bottom: var(--spacer-big);
  }
  &__header {
    margin-bottom: var(--spacer-big);
  }
}

.form {
  &__input {
    margin-bottom: var(--spacer-extra-big);
  }
  &__checkbox {
    margin-bottom: var(--spacer-big);
  }
  &__button {
    margin-top: var(--spacer-big);
  }
}
</style>
