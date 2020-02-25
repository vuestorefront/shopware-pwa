<template>
  <div id="sw-login-modal">
    <SfModal :visible="isModalOpen" @close="toggleModal">
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
              Don't have and account yet?
              <SfButton
                class="sf-button--text"
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
import { SfButton, SfModal, SfAlert } from '@storefront-ui/vue'
import { useUser, useUserLoginModal } from '@shopware-pwa/composables'
import SwLogin from '~/components/SwLogin'
const SwRegister = () => import('../SwRegister')
const SwResetPassword = () => import('../SwResetPassword')

export default {
  name: 'SwLoginModal',
  components: {
    SfAlert,
    SfButton,
    SfModal,
    SwLogin,
    SwRegister,
    SwResetPassword
  },
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
      key: 'modal-opened',
      component: 'SwLogin'
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
      }
    }
  },
  methods: {
    closeHandler() {
      ;(typeof this.onClose !== 'undefined' && this.onClose()) ||
        this.isModalOpen()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles.scss';
@import '~@storefront-ui/shared/styles/helpers/visibility';

@mixin for-desktop {
  @media screen and (min-width: $desktop-min) {
    @content;
  }
}

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
    margin-bottom: $spacer-medium;
    &--email {
      margin-bottom: $spacer-medium;
    }
  }
  &__checkbox {
    margin-bottom: $spacer-big;
  }
  &__button {
    margin-top: $spacer-big;
  }
}

.action {
  margin-top: $spacer-big;
  text-align: center;
}

.bottom {
  padding-top: $spacer-extra-big;
  margin-top: $spacer-extra-big;
  border-top: 1px solid $c-light;
  line-height: 1.6;
  text-align: center;
}

.sf-button--muted {
  color: $c-text-muted;
}

.salutation {
  width: 8vw;
}

::v-deep .sf-modal__container {
  z-index: 3;
}
</style>