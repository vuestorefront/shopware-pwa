<template>
  <div class="sw-reset-password">
    <div class="form sw-reset-password__form">
      <h2 class="sw-reset-password__header">Reset password</h2>
      <SfAlert class="sw-reset-password__alert" v-if="error" type="danger" :message="error" />
      <SfInput
        v-model="$v.email.$model"
        name="email"
        label="Your email"
        class="form__input"
        :valid="!$v.email.$error"
        errorMessage="Valid email is required"
      />
      <SfButton class="sf-button--full-width form__button"
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
  mixins: [ validationMixin ],
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
@import "~@storefront-ui/vue/styles";

.sw-reset-password {
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
