<template>
  <div>
    <h1>Reset password</h1>
    <SfAlert v-if="error" type="danger" :message="error" />
    <div class="form">
      <SfInput
        v-model="$v.email.$model"
        name="email"
        label="Your email"
        class="form__email"
        :valid="!$v.email.$invalid"
        error-message="Email is required."
        :disabled="isLoading"
      >
        <template #errorMessage="{ errorMessage }">
          <SfIcon
            icon="info_shield"
            size="10px"
            color="#E22326"
            style="margin-right: 4px; display: inline-block"
          />
          {{ errorMessage }}
        </template>
      </SfInput>
      <SfButton
        class="sf-button--full-width form__button"
        @click="invokeResetPassword"
      >
        Request new password
      </SfButton>

    </div>
  </div>
</template>

<script>
import {
  SfInput,
  SfButton,
  SfAlert,
} from '@storefront-ui/vue'
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
import { useUser } from '@shopware-pwa/composables'

export default {
  name: "SwResetPasswordModal",
  components: { SfInput, SfButton, SfAlert },
  mixins: [validationMixin],
  data() {
    return {
      email: ''
    }
  },
  validations: {
    email: {
      required,
      email
    }
  },
  setup() {
    const { isLoading, error } = useUser()
    return {
      error,
      isLoading
    }
  },
  methods: {
    invokeResetPassword() {
      // pass
    }
  }
}
</script>

<style scoped>
</style>
