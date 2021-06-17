<template>
  <div class="sw-login" @keyup.enter="invokeLogin">
    <SwPluginSlot name="login-form-before" />
    <div class="form sw-login__form">
      <SfAlert
        v-if="userError"
        class="sw-login__alert"
        type="danger"
        :message="userError"
        data-cy="login-alert"
      />
      <SwInput
        v-model="email"
        name="loginEmail"
        :label="$t('Your email')"
        class="sw-form__input"
        type="email"
        :valid="!$v.email.$error"
        :disabled="isLoading"
        :error-message="$t('Email is required')"
        data-cy="email-input"
        @blur="$v.email.$touch()"
      />
      <SwInput
        v-model="password"
        name="loginPassword"
        :label="$t('Password')"
        type="password"
        class="sw-form__input"
        :valid="!$v.password.$error"
        :disabled="isLoading"
        :error-message="$t('Password is required')"
        data-cy="password-input"
        @blur="$v.password.$touch()"
      />
      <SwPluginSlot name="login-form-button">
        <SwButton
          class="sf-button--full-width sw-form__button"
          :disabled="isLoading"
          data-cy="submit-login-button"
          @click="invokeLogin"
        >
          {{ $t("Log in") }}
        </SwButton>
      </SwPluginSlot>
    </div>
  </div>
</template>

<script>
import { SfAlert } from "@storefront-ui/vue"
import useVuelidate from "@vuelidate/core"
import { required, email } from "@vuelidate/validators"
import { useUser, useSessionContext } from "@shopware-pwa/composables"
import SwPluginSlot from "sw-plugins/SwPluginSlot.vue"
import SwButton from "@/components/atoms/SwButton.vue"
import SwInput from "@/components/atoms/SwInput.vue"
import { reactive, toRefs } from "@vue/composition-api"

export default {
  name: "SwLogin",
  components: { SwButton, SwInput, SfAlert, SwPluginSlot },
  setup(props, { root }) {
    const { login, loading, error: userError } = useUser(root)
    const { refreshSessionContext } = useSessionContext(root)

    const state = reactive({
      email: "",
      password: "",
    })

    const rules = {
      email: {
        required,
        email,
      },
      password: {
        required,
      },
    }

    const $v = useVuelidate(rules, state)

    return {
      clientLogin: login,
      isLoading: loading,
      userError,
      refreshSessionContext,
      $v,
      ...toRefs(state),
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
        password: this.password,
      })
      if (loggedIn) {
        this.$emit("success")
        this.refreshSessionContext()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/forms";

.sw-login {
  &__alert {
    margin-bottom: var(--spacer-base);
  }
}
</style>
