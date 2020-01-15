<template>
  <div id="sw-login-modal">
    <SfModal :visible="isOpen" @close="closeHandler">
      <transition name="fade" mode="out-in">
        <div class="sw-login-modal__wrapper">
          <component v-bind:is="component" @success="$emit('close')"/>
          <div class="action" v-if="component !== 'SwResetPassword'">
            <SfButton
              class="sf-button--text button--muted"
              @click="component = 'SwResetPassword'"
            >
              Forgotten password?
            </SfButton>
          </div>

          <div class="bottom">
            <template v-if="component !== 'SwRegister'" >
            Don't have and account yet?
            <SfButton class="sf-button--text" @click="component = 'SwRegister'">
              Register today?
            </SfButton>
            </template>
          </div>
          <div class="action" v-if="component !== 'SwLogin'">
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
import { SfButton, SfModal, SfAlert } from "@storefront-ui/vue";
import SwLogin from "~/components/SwLogin";
import SwRegister from "../SwRegister";
import SwResetPassword from "../SwResetPassword";

export default {
  components: { SfAlert, SfButton, SfModal,  SwLogin, SwRegister, SwResetPassword },
  name: 'SwLoginModal',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
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
    const {login, loading, error} = useUser()
    return {
      clientLogin: login,
      isLoading: loading,
      error
    }
  },
  data() {
    return {
      component: 'SwLogin'
    }
  },
  watch: {
    component: {
      immediate: true,
      handler() {
        console.log('hello')
      }
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

</style>
