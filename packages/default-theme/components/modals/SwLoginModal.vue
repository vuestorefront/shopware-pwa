<template>
  <div id="sw-login-modal">
    <SfModal
      :visible="isOpen"
      @close="closeHandler()">
      <transition name="fade" mode="out-in">
        <div v-if="modalState === 'login'" key="log-in">
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
            <SfButton class="sf-button--text button--muted" @click="modalState = 'reset'">Forgotten password?</SfButton>
          </div>
          <div class="bottom">
            Don't have and account yet?
            <SfButton class="sf-button--text" @click="modalState = 'register'">Register today?</SfButton>
          </div>
        </div>
        <div v-else-if="modalState === 'reset'" key="reset">
          <SfAlert
            v-if="error"
            type="danger"
            :message="error"
          />
          <div class="form">
            <SfInput
              v-model="email"
              name="email"
              label="Your email"
              class="form__email"
              :valid="!$v.email.$invalid"
              error-message="Email is required."
              :disabled="isLoading"
            >
              <template #errorMessage="{ errorMessage }">
                <SfIcon icon="info_shield" size="10px" color="#E22326" style="margin-right: 4px; display: inline-block"/> {{errorMessage}}
              </template>
            </SfInput>
            <SfButton class="sf-button--full-width form__button" :disabled="isLoading || $v.$invalid" @click="invokeResetPassword">
              Request new password
            </SfButton>
            <div class="action">
              <SfButton class="sf-button--text button--muted" @click="modalState = 'login'">or try to log in again.</SfButton>
            </div>
          </div>
        </div>
        <div v-else-if="modalState === 'register'" key="register">
          <SfAlert
            v-if="error"
            type="danger"
            :message="error"
          />
          <div class="form">
            <SfSelect
              v-model="salutation"
              label="Salutation"
              class="sf-select--bordered product-details__attribute"
            >
              <SfSelectOption
                v-for="option in salutations"
                :key="option"
                :value="option"
              >
                {{option}}
              </SfSelectOption>
            </SfSelect>
            <SfInput
              v-model="email"
              name="email"
              label="Your email"
              class="form__input"
            />
            <SfInput
              v-model="firstName"
              name="first-name"
              label="First Name"
              class="form__input"
            />
            <SfInput
              v-model="lastName"
              name="last-name"
              label="Last Name"
              class="form__input"
            />
            <SfInput
              v-model="password"
              name="password"
              label="Password"
              type="password"
              class="form__input"
            />
            <SfInput
              v-model="street"
              name="street"
              label="Street"
              class="form__input"
            />
            <SfInput
              v-model="city"
              name="city"
              label="City"
              class="form__input"
            />
            <SfInput
              v-model="zipcode"
              name="zipcode"
              label="Zip Code"
              class="form__input"
            />
            <SfSelect
              v-model="country"
              label="Country"
              class="sf-select--bordered product-details__attribute"
            >
              <SfSelectOption
                v-for="option in countries"
                :key="option"
                :value="option"
              >
                {{option}}
              </SfSelectOption>
            </SfSelect>
            <SfCheckbox
              v-model="createAccount"
              name="create-account"
              label="I want to create an account"
              class="form__checkbox"
            />
            <SfButton class="sf-button--full-width form__button" @click="invokeRegister"
            >Create an account</SfButton
            >
          </div>
          <div class="action">
            or
            <SfButton class="sf-button--text" @click="modalState = 'login'"
            >login in to your account</SfButton
            >
          </div>
        </div>
      </transition>
      <SfLoader :loading="isLoading" />
    </SfModal>
  </div>
</template>
<script>

==== BASE ====
import { SfIcon, SfModal, SfInput, SfButton, SfLoader, SfAlert, SfCheckbox } from '@storefront-ui/vue'
==== BASE ====
import { VuelidateMixin } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { useUser } from '@shopware-pwa/composables'

export default {
  mixins: [VuelidateMixin],
==== BASE ====
  components: { SfIcon, SfModal, SfInput, SfButton, SfLoader, SfAlert, SfCheckbox },
==== BASE ====
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
      modalState: 'login',
      email: '',
      login: '',
      password: '',
      createAccount: false,
      rememberMe: false,
      salutation: null,
      salutations: ['Mr.', 'Mrs.'],
      countries: ['England', 'US', 'Germany', 'Poland'],
      country: null,
      street: '',
      city: '',
      zipcode: '',
    }
  },
  validations: {
    login: {
      required
    },
    password: {
      required
    },
    email: {
      required,
      email
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
  },
  watch: {
    modalState() {
      this.login = '';
      this.password = '';
      this.email = '';
      this.firstName = '';
      this.lastName = '';
      this.rememberMe = false;
      this.createAccount = false;
      this.salutation = null;
      this.country = null
      this.street = '';
      this.city =  '';
      this.zipcode = '';
    }
  },
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
</style>
