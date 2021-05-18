<template>
  <div class="sw-reset-password">
    <div class="sw-reset-password__form">
      <slot name="sw-form">
        <div class="form">
          <div class="inputs-group">
            <SwInput
              v-model.trim="$v.newPassword.$model"
              :valid="!$v.newPassword.$error"
              :error-message="$t('This field is required')"
              type="password"
              name="newPassword"
              :label="$t('New Password')"
              class="sw-form__input"
              required
              autocomplete="off"
              @blur="$v.newPassword.$touch()"
            />
            <SwInput
              v-model.trim="$v.newPasswordConfirm.$model"
              :valid="!$v.newPasswordConfirm.$error"
              :error-message="$t('This field must be same as new password')"
              type="password"
              name="newPasswordConfirm"
              :label="$t('Repeat Password')"
              required
              class="sw-form__input"
              autocomplete="off"
              @blur="$v.newPasswordConfirm.$touch()"
            />
          </div>

          <SwButton
            class="sw-reset-password__button sw-form__button"
            :disabled="$v.$error"
            @click="invokeReset"
          >
            {{ $t("Set new password") }}
          </SwButton>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core"
import { required, minLength, sameAs } from "@vuelidate/validators"
import { computed, ref } from "@vue/composition-api"
import SwButton from "@/components/atoms/SwButton.vue"
import SwInput from "@/components/atoms/SwInput.vue"

export default {
  name: "SwResetPasswordForm",
  components: { SwInput, SwButton },
  setup(props, { root, emit }) {
    const newPassword = ref("")
    const newPasswordConfirm = ref("")

    const rules = computed(() => ({
      newPassword: {
        required,
        minLength: minLength(8),
      },
      newPasswordConfirm: {
        required,
        newPasswordConfirm: sameAs(newPassword),
      },
    }))

    const $v = useVuelidate(rules, { newPassword, newPasswordConfirm })

    async function invokeReset() {
      $v.value.$reset()
      const isFormCorrect = await $v.value.$validate()
      if (!isFormCorrect) {
        return
      }
      emit("reset", {
        newPassword: newPassword.value,
        newPasswordConfirm: newPasswordConfirm.value,
      })
    }

    return {
      $v,
      newPassword,
      newPasswordConfirm,
      invokeReset,
    }
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/forms";

.sw-reset-password {
  @include for-desktop {
    max-width: 30vw;
  }

  margin: 0 auto;
  &__alert {
    margin-bottom: var(--spacer-base);
  }

  &__button {
    margin: 0 auto;
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
