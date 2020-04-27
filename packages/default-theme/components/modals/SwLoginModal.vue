<template>
  <div id="sw-login-modal">
    <SfModal title="Log in" :visible="isModalOpen" @close="toggleModal">
      <transition name="fade" mode="out-in">
        <div class="sw-login-modal__wrapper">
          <component :is="component" :key="key" @success="toggleModal" />
          <div v-if="component !== 'SwResetPassword'" class="action">
            <SfButton
              class="sf-button--text button--muted"
              @click="component = 'SwResetPassword'"
            >
              Forgotten password?
            </SfButton>
          </div>

          <div class="bottom">
            <template v-if="component !== 'SwRegister'">
              <SfHeading
                title="Don't have an account yet?"
                :level="4"
                class="bottom__heading"
              />
              <SfButton
                class="sf-button--text bottom__element"
                @click="component = 'SwRegister'"
              >
                Register today?
              </SfButton>
            </template>
          </div>
          <div v-if="component !== 'SwLogin'" class="action">
            <SfButton
              class="sf-button--text button--muted"
              @click="component = 'SwLogin'"
            >
              or try to log in again.
            </SfButton>
          </div>
        </div>
      </transition>
    </SfModal>
  </div>
</template>

<script>
import { SfButton, SfHeading, SfModal, SfAlert } from '@storefront-ui/vue'
import { useUser, useUserLoginModal } from '@shopware-pwa/composables'
import SwLogin from '@shopware-pwa/default-theme/components/SwLogin'
const SwRegister = () =>
  import('@shopware-pwa/default-theme/components/SwRegister')
const SwResetPassword = () =>
  import('@shopware-pwa/default-theme/components/SwResetPassword')

export default {
  name: 'SwLoginModal',
  components: {
    SfAlert,
    SfButton,
    SfHeading,
    SfModal,
    SwLogin,
    SwRegister,
    SwResetPassword,
  },
  props: {
    onClose: {
      type: Function,
      default: undefined,
    },
    onSuccess: {
      type: Function,
      default: undefined,
    },
  },
  setup() {
    const { login, loading, error } = useUser()
    const { isModalOpen, toggleModal } = useUserLoginModal()

    return {
      clientLogin: login,
      isLoading: loading,
      toggleModal,
      isModalOpen,
      error,
    }
  },
  data() {
    return {
      key: 'modal-opened',
      component: 'SwLogin',
    }
  },
  watch: {
    isModalOpen: {
      handler(oldVal, newVal) {
        if (oldVal === true) {
          // enforce rerender dynamic component
          this.key = 'modal-closed'
          this.component = 'SwLogin'
          return
        }
        this.key = 'modal-opened'
      },
    },
  },
  methods: {
    closeHandler() {
      ;(typeof this.onClose !== 'undefined' && this.onClose()) ||
        this.isModalOpen()
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles.scss';

#sw-login-modal {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 80vw;
    margin: auto;
  }
}

.input-group {
  display: flex;
  width: 30vw;
  justify-content: space-between;
}

.form {
  &__input {
    margin-bottom: var(--spacer-sm);
    &--email {
      margin-bottom: var(--spacer-sm);
    }
  }
  &__checkbox {
    margin-bottom: var(--spacer-base);
  }
  &__button {
    margin-top: var(--spacer-base);
  }
}

.action {
  margin-top: var(--spacer-base);
  text-align: center;
}

.bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: var(--spacer-xl);
  &__heading {
    --heading-title-color: var(--c-primary);
    margin-bottom: var(--spacer-sm);
  }
  &:last-child {
   padding-bottom: var(--spacer-lg);
  }
}

.sf-button--muted {
  color: var(--c-text-muted);
}

.salutation {
  width: 8vw;
}
</style>
