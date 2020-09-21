<template>
  <div class="sw-reset-password" @keyup.enter="invokeResetPassword">
    <div v-if="!emailSent" class="form sw-reset-password__form">
      <!-- <h2 class="sw-reset-password__header">Reset password</h2> -->
      <SfAlert
        v-if="userError"
        class="sw-reset-password__alert"
        type="danger"
        :message="userError.message"
        data-cy="reset-alert"
      />
      <SwInput
        v-model="email"
        name="email"
        label="Your email"
        class="sw-form__input"
        :valid="!$v.email.$error"
        error-message="Valid email is required"
        data-cy="email-input"
        @blur="$v.email.$touch()"
      />
      <SwButton
        class="sf-button--full-width sw-form__button"
        data-cy="submit-reset-button"
        @click="invokeResetPassword"
      >
        Resend password
      </SwButton>
    </div>
    <SfHeading
      v-if="emailSent"
      title="You should receive a link in a few moments. Please open that link to reset your password."
      :level="5"
      class="bottom__heading"
    />
  </div>
</template>

<script>
import { SfAlert, SfHeading } from "@storefront-ui/vue"
import { validationMixin } from "vuelidate"
import { required, email } from "vuelidate/lib/validators"
import { useUser } from "@shopware-pwa/composables"
import SwButton from "@shopware-pwa/default-theme/components/atoms/SwButton"
import SwInput from "@shopware-pwa/default-theme/components/atoms/SwInput"

export default {
  name: "SwResetPassword",
  components: { SwButton, SwInput, SfAlert, SfHeading },
  mixins: [validationMixin],
  data() {
    return {
      email: "",
      error: "",
      emailSent: false,
    }
  },
  setup(props, { root }) {
    const { resetPassword, error: userError } = useUser(root)
    return {
      resetPassword,
      userError,
    }
  },
  validations: {
    email: {
      required,
      email,
    },
  },
  methods: {
    async invokeResetPassword() {
      this.$v.$touch()

      if (this.$v.$invalid) {
        return
      }

      this.emailSent = await this.resetPassword({
        email: this.email,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/forms";

.sw-reset-password {
  &__alert {
    margin-bottom: var(--spacer-2xs);
  }
  &__header {
    margin-bottom: var(--spacer-base);
  }
}
</style>
