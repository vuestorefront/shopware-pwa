<template>
  <div id="sw-login-modal">
    <SfModal :visible="isOpen" @close="$emit('close')">
      <transition name="fade" mode="out-in">
        <div>
          <component :is="component" />
          <div class="action">
            <SfButton
              class="sf-button--text button--muted"
              @click="component = 'SwResetPasswordModal'"
            >
              Forgotten password?
            </SfButton>
          </div>
          <div class="bottom">
            Don't have and account yet?
            <SfButton class="sf-button--text" @click="component = 'SwRegisterModal'">
              Register today?
            </SfButton>
          </div>
          <div class="action">
            <SfButton
              class="sf-button--text button--muted"
              @click="component = 'login'"
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
import { SfModal } from "@storefront-ui/vue";
import SwLogin from "../SwLogin";
import SwRegister from "../SwRegister";
import SwResetPassword from "../SwResetPassword";

export default {
  components: { SfModal, SwResetPassword, SwLogin },
  name: 'SwLoginModal',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      component: 'SwResetPassword'
    }
  },
  watch: {
    isOpen() {
      this.component = 'SwLogin'
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

<style>
.sf-modal__container {
  width: auto !important;
}
</style>
