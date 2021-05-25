<template>
  <div class="sw-register">
    <SwRegistrationForm
      @success="$emit('success')"
      :buttonText="$t('Create an account')"
    />
  </div>
</template>

<script>
import SwRegistrationForm from "@/components/forms/SwRegistrationForm.vue"

export default {
  name: "SwRegister",
  components: {
    SwRegistrationForm,
  },
  setup(props, { root }) {
    return {}
  },
}
</script>

<style lang="scss" scoped></style>
