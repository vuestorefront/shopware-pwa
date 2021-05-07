<template>
  <div class="sw-password">
    <slot>
      <slot name="message" :user="user">
        <p class="message">
          {{
            $t(
              "If you want to change the password to access your account, enter the " +
                "following information:"
            )
          }}
        </p>
      </slot>

      <SwErrorsList :list="userErrorMessages" />

      <div class="sw-password__form form">
        <slot name="sw-form">
          <div class="form">
            <SwInput
              v-model="password"
              :valid="!$v.password.$error"
              :error-message="$t('Current password is required')"
              type="password"
              name="currentPassword"
              :label="$t('Current Password')"
              class="sw-form__input"
              required
              @blur="$v.password.$touch()"
            />
            <div class="inputs-group">
              <SwInput
                v-model="newPassword"
                :valid="!$v.newPassword.$error"
                :error-message="$t('This field is required')"
                type="password"
                name="newPassword"
                :label="$t('New Password')"
                class="sw-form__input"
                required
                @blur="$v.newPassword.$touch()"
              />
              <SwInput
                v-model="newPasswordConfirm"
                :valid="!$v.newPasswordConfirm.$error"
                :error-message="$t('This field must be same as new password')"
                type="password"
                name="repeatPassword"
                :label="$t('Repeat Password')"
                required
                class="sw-form__input"
                @blur="$v.newPasswordConfirm.$touch()"
              />
            </div>
            <SwButton
              class="sw-form__button"
              :disabled="$v.$invalid"
              @click="invokeUpdate"
            >
              {{ $t("Update password") }}
            </SwButton>
          </div>
        </slot>
      </div>
    </slot>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core"
import { required, minLength, sameAs } from "@vuelidate/validators"
import { computed } from "@vue/composition-api"
import { useUser } from "@shopware-pwa/composables"
import { getMessagesFromErrorsArray } from "@shopware-pwa/helpers"
import SwButton from "@/components/atoms/SwButton.vue"
import SwInput from "@/components/atoms/SwInput.vue"
import SwErrorsList from "@/components/SwErrorsList.vue"

export default {
  name: "SwPassword",
  components: { SwInput, SwButton, SwErrorsList },
  props: {},
  setup(props, { root }) {
    const { user, error: userError, updatePassword, refreshUser } = useUser(
      root
    )
    const userErrorMessages = computed(() =>
      getMessagesFromErrorsArray(userError.value && userError.value.message)
    )

    return {
      refreshUser,
      updatePassword,
      user,
      userErrorMessages,
      $v: useVuelidate(),
    }
  },
  data() {
    return {
      password: "",
      newPassword: "",
      newPasswordConfirm: "",
      email: this.user && this.user.email,
    }
  },
  methods: {
    async invokeUpdate() {
      const passwordChanged = await this.updatePassword({
        password: this.password,
        newPassword: this.newPassword,
        newPasswordConfirm: this.newPasswordConfirm,
      })
      await this.refreshUser()
    },
  },
  validations: {
    password: {
      required,
      minLenght: minLength(8),
    },
    newPassword: {
      required,
      minLength: minLength(8),
    },
    newPasswordConfirm: {
      required,
      sameAsNewPassword: sameAs("newPassword"),
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/forms";

.sw-password {
  &__alert {
    margin-bottom: var(--spacer-base);
  }
}

.message {
  margin: 0 0 var(--spacer-xl) 0;
  color: var(--c-dark-variant);
  &__label {
    font-weight: 400;
  }
  &--second {
    padding: 4rem;
  }
}
</style>
