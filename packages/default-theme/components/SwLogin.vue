<template>
  <div class="sw-login" @keyup.enter="invokeLogin">
    <SwPluginSlot name="login-form-before" />
    <div class="form sw-login__form">
      <SfAlert
        v-if="userError"
        class="sw-login__alert"
        type="danger"
        :message="userError"
      />
      <SwInput
        v-model="email"
        name="email"
        label="Your email"
        class="form__input"
        :valid="!$v.email.$error"
        :disabled="isLoading"
        error-message="Email is required"
        @blur="$v.email.$touch()"
      />
      <SwInput
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
      <SwPluginSlot name="login-form-button">
        <SwButton
          class="sf-button--full-width form__button"
          :disabled="isLoading"
          @click="invokeLogin"
        >
          Log in
        </SwButton>
      </SwPluginSlot>
    </div>
  </div>
</template>

<script>
import { SfAlert } from "@storefront-ui/vue"
import { validationMixin } from "vuelidate"
import { required, email } from "vuelidate/lib/validators"
import { useUser } from "@shopware-pwa/composables"
import SwPluginSlot from "sw-plugins/SwPluginSlot"
import SwButton from "@shopware-pwa/default-theme/components/atoms/SwButton"
import SwInput from "@shopware-pwa/default-theme/components/atoms/SwInput"

export default {
  name: "SwLogin",
  components: { SwButton, SwInput, SfAlert, SwPluginSlot },
  mixins: [validationMixin],
  data() {
    return {
      email: "",
      password: "",
    }
  },
  setup() {
    const { login, loading, error: userError } = useUser()
    return {
      clientLogin: login,
      isLoading: loading,
      userError,
    }
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
    },
  },
  methods: {
    async invokeLogin() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      const loggedIn = await this.clientLogin({
        username: this.email,
        password: this.password,
      })
      if (loggedIn) this.$emit("success")
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

.sw-login {
  &__alert {
    margin-bottom: var(--spacer-base);
  }
}

.form {
  &__input {
    margin: var(--spacer-base) 0;
  }
  &__checkbox {
    margin-bottom: var(--spacer-base);
  }
  &__button {
    margin-top: var(--spacer-base);
  }
}
</style>
