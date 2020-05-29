<template>
  <div class="sw-reset-password" @keyup.enter="invokeResetPassword">
    <div class="form sw-reset-password__form" v-if="!emailSent">
      <!-- <h2 class="sw-reset-password__header">Reset password</h2> -->
      <SfAlert
        v-if="userError"
        class="sw-reset-password__alert"
        type="danger"
        :message="userError.message"
      />
      <SwInput
        v-model="email"
        name="email"
        label="Your email"
        class="form__input"
        :valid="!$v.email.$error"
        error-message="Valid email is required"
        @blur="$v.email.$touch()"
      />
      <SwButton
        class="sf-button--full-width form__button"
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
  setup() {
    const { resetPassword, error: userError } = useUser()
    return {
      resetPassword: resetPassword,
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
@import "@/assets/scss/variables";

.sw-reset-password {
  &__alert {
    margin-bottom: var(--spacer-2xs);
  }
  &__header {
    margin-bottom: var(--spacer-base);
  }
}

.form {
  &__input {
    margin-bottom: var(--spacer-xl);
  }
  &__checkbox {
    margin-bottom: var(--spacer-base);
  }
  &__button {
    margin-top: var(--spacer-base);
  }
}
</style>
