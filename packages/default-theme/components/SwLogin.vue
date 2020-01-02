<template>
  <div>
    <h1>Log in</h1>
    <SfAlert v-if="error" type="danger" :message="error" />
    <div class="form">
      {{$v.login}}
      <SfInput
        v-model="login"
        name="login"
        label="Your login"
        class="form__input"
        error-message="Password is required."
        :valid="!$v.login.$error"
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
        @input="setPassword($event)"
        @on-enter="invokeLogin"
        class="form__input"
        label="Password"
        :valid="!$v.password.$error"
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
      <SfButton
        class="sf-button--full-width form__button"
        :disabled="isLoading"
        @click="invokeLogin"
      >
        Login
      </SfButton>
    </div>

  </div>
</template>

<script>
import {
  SfIcon,
  SfModal,
  SfInput,
  SfButton,
  SfLoader,
  SfAlert,
  SfSelect
} from '@storefront-ui/vue'
import { validationMixin } from 'vuelidate'
import { required, email, between } from 'vuelidate/lib/validators'
// eslint-disable-next-line import/named
import { useUser } from '@shopware-pwa/composables'

export default {
  components: {
    SfIcon,
    SfModal,
    SfInput,
    SfButton,
    SfLoader,
    SfAlert,
    SfSelect
  },
  mixins: [validationMixin],
  setup() {
    const { login, isLoading, error } = useUser()
    return {
      clientLogin: login,
      isLoading,
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
      required,
      between: between(4, 30)
    },
    password: {
      required,
      between: between(4, 30)
    },
  },
  watch: {
    modalState() {
      this.login = ''
      this.password = ''
    },
    isOpen() {
      this.login = ''
      this.password = ''
    }
  },
  methods: {
    async invokeLogin() {
      console.log("hello")
      const loggedIn = await this.clientLogin({
        username: this.login,
        password: this.password
      })
      if (loggedIn) this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../node_modules/@storefront-ui/vue/styles';
@import '../node_modules/@storefront-ui/shared/styles/helpers/visibility';

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
