<template>
  <div class="sw-register">
    <SwRegistrationForm
      v-model="registrationFormData"
      @invokeRegister="invokeRegister"
    />
    <SwButton
      class="sw-form__button sf-button--full-width"
      @click="invokeRegister"
      data-cy="register-button"
    >
      {{ $t("Create an account") }}
    </SwButton>
  </div>
</template>

<script>
import SwRegistrationForm from "@/components/forms/SwRegistrationForm.vue"
import { useUser } from "@shopware-pwa/composables"
import useVuelidate from "@vuelidate/core"
import { ref } from "@vue/composition-api"
import SwButton from "@/components/atoms/SwButton.vue"

export default {
  name: "SwRegister",
  components: {
    SwRegistrationForm,
    SwButton,
  },
  setup(props, { root, emit }) {
    const $v = useVuelidate()
    const { register } = useUser(root)

    const registrationFormData = ref()
    async function invokeRegister() {
      $v.value.$reset()
      const isFormCorrect = await $v.value.$validate()
      if (!isFormCorrect) {
        return
      }
      const isSuccess = await register(registrationFormData.value)
      isSuccess && emit("success")
    }
    return {
      invokeRegister,
      registrationFormData,
    }
  },
}
</script>

<style lang="scss" scoped></style>
