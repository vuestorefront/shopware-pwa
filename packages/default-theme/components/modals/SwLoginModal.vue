<template>
  <div id="sw-login-modal">
    <SfModal
      :visible="isOpen"
      @close="closeHandler()">
      <transition name="fade" mode="out-in">
        <div v-if="isLogin" key="log-in">
          <SfAlert
            v-if="error"
            type="danger"
            :message="error"
          />
          <div class="form">
            <SfInput
              v-model="login"
              name="login"
              label="Your login"
              class="form__input"
              :valid="!$v.login.$invalid"
              error-message="Login is required."
              :disabled="isLoading"
            >
              <template #errorMessage="{ errorMessage }">
                <SfIcon icon="info_shield" size="10px" color="#E22326" style="margin-right: 4px; display: inline-block"/> {{errorMessage}}
              </template>
            </SfInput>
            <SfInput
              class="form__input"
              v-model="password"
              label="Password"
              :valid="!$v.password.$invalid"
              error-message="Password is required."
              :disabled="isLoading"
              type="password">
              <template #errorMessage="{ errorMessage }">
                <SfIcon icon="info_shield" size="10px" color="#E22326" style="margin-right: 4px; display: inline-block"/> {{errorMessage}}
              </template>
            </SfInput>
            <SfCheckbox
              v-model="rememberMe"
              name="remember-me"
              label="Remember me"
              class="form__checkbox"
            />
            <SfButton class="sf-button--full-width form__button" :disabled="isLoading || $v.$invalid" @click="invokeLogin">
              Login
            </SfButton>
          </div>
          <div class="action">
            <SfButton class="sf-button--text button--muted"
            >Forgotten password?</SfButton
            >
          </div>
          <div class="bottom">
            Don't have and account yet?
            <SfButton class="sf-button--text">Register today?</SfButton>
          </div>
        </div>
      </transition>
      <SfLoader :loading="isLoading" />
    </SfModal>
  </div>
</template>
<script>

import { SfIcon, SfModal, SfInput, SfButton, SfLoader, SfAlert } from '@storefront-ui/vue'
import { VuelidateMixin } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { useUser } from '@shopware-pwa/composables'

export default {
  mixins: [VuelidateMixin],
  components: { SfIcon, SfModal, SfInput, SfButton, SfLoader, SfAlert },
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
      login: '',
      password: '',
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
      typeof this.onClose !== "undefined" && this.onClose() || this.$emit('close');
    },
    async invokeLogin() {
      const loggedIn = await this.clientLogin({username: this.login, password: this.password})
      if (loggedIn) { 
       typeof this.onSuccess !== "undefined" && this.onSuccess() || this.$emit('close')
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
    max-width: 1240px;
    margin: auto;
  }
}
.form {
  &__input {
    margin-bottom: $spacer-extra-big;
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
</style>
