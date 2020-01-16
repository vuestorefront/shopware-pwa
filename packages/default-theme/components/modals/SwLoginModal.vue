<template>
  <SfModal
    :visible="isModalOpen"
    transition-overlay="fade"
    transition-modal="fade"
    @close="closeHandler()"
  >
    <div>Login into your account</div>
    <SfAlert v-if="error" type="danger" :message="error" />
    <SfInput
      v-model="login"
      label="Login"
      :valid="!$v.login.$invalid"
      error-message="Login is required."
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
    <SfInput
      v-model="password"
      label="Password"
      :valid="!$v.password.$invalid"
      error-message="Password is required."
      :disabled="isLoading"
      type="password"
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
    <SfButton :disabled="isLoading || $v.$invalid" @click="invokeLogin">
      Login
    </SfButton>
    <SfLoader :loading="isLoading" />
  </SfModal>
</template>
<script>
import {
  SfIcon,
  SfModal,
  SfInput,
  SfButton,
  SfLoader,
  SfAlert
} from '@storefront-ui/vue'
import { VuelidateMixin } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { useUser, useUserLoginModal } from '@shopware-pwa/composables'

export default {
  components: { SfIcon, SfModal, SfInput, SfButton, SfLoader, SfAlert },
  mixins: [VuelidateMixin],
  props: {
    onClose: {
      type: Function,
      default: undefined
    },
    onSuccess: {
      type: Function,
      default: undefined
    }
  },
  setup() {
    const { login, loading, error } = useUser()
    const { isModalOpen, toggleModal } = useUserLoginModal()

    return {
      clientLogin: login,
      isLoading: loading,
      toggleModal,
      isModalOpen,
      error
    }
  },
  data() {
    return {
      login: '',
      password: ''
    }
  },
  validations: {
    login: {
      required
    },
    password: {
      required
    }
  },
  methods: {
    closeHandler() {
      ;(typeof this.onClose !== 'undefined' && this.onClose()) ||
        this.toggleModal()
    },
    async invokeLogin() {
      const loggedIn = await this.clientLogin({
        username: this.login,
        password: this.password
      })
      if (loggedIn) {
        ;(typeof this.onSuccess !== 'undefined' && this.onSuccess()) ||
          this.toggleModal()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles.scss';
@import '~@storefront-ui/shared/styles/helpers/visibility';
</style>
