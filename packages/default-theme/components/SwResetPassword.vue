<template>
  <div class="sw-reset-password">
    <div class="form sw-reset-password__form">
      <h2 class="sw-reset-password__header">Reset password</h2>
      <SfAlert
        v-if="error"
        class="sw-reset-password__alert"
        type="danger"
        :message="error"
      />
      <SfInput
        v-model="email"
        name="email"
        label="Your email"
        class="form__input"
        :valid="!$v.email.$error"
        error-message="Valid email is required"
        @blur="$v.email.$touch()"
      />
      <SfButton
        class="sf-button--full-width form__button"
        @click="invokeResetPassword"
      >
        Resend password
      </SfButton>
    </div>
  </div>
</template>

<script>
import { SfInput, SfButton, SfAlert } from '@storefront-ui/vue'
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'SwResetPassword',
  components: { SfButton, SfInput, SfAlert },
  mixins: [validationMixin],
  data() {
    return {
      email: '',
      error: ''
    }
  },
  validations: {
    email: {
      required,
      email
    }
  },
  methods: {
    invokeResetPassword() {
      this.$v.$touch()
      this.error = 'Reset password is not implemented yet'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';

.sw-reset-password {
  &__alert {
    margin-bottom: var(--spacer-small);
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
