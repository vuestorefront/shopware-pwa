<template>
<div class="sw-password">
  <slot>

    <slot name="message" :user="user">
      <p class="message">
        If you want to change the password to access your account, enter the
        following information:
      </p>
    </slot>

    <div class="sw-password__form form">
      <slot name="form">
        <div class="form">
          <SfInput
            v-model="passwords.currentPassword"
            type="password"
            name="currentPassword"
            label="Current Password"
            required
            class="form__element"
          />
          <SfInput
            v-model="passwords.newPassword"
            type="password"
            name="newPassword"
            label="New Password"
            required
            class="form__element form__element--half"
          />
          <SfInput
            v-model="passwords.repeatPassword"
            type="password"
            name="repeatPassword"
            label="Repeat Password"
            required
            class="form__element form__element--half form__element--half-even"
          />
          <SfButton class="form__button" @click="updatePassword">
            Update password
          </SfButton>
        </div>
      </slot>
    </div>  

  </slot>
</div>  
  
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
import { SfInput, SfButton } from '@storefront-ui/vue'
import { useUser } from '@shopware-pwa/composables'

export default {
  name: 'SwPassword',
  components: { SfInput, SfButton },
  mixins: [validationMixin],
  props: {},
  setup() {
    const { user } = useUser()
    return {
      user
    }
  },
  data() {
    return {
      passwords: {
        currentPassword: '',
        newPassword: '',
        repeatPassword: ''
      },
      email: this.user && this.user.email,
    }
  },
  methods: {
    updatePassword() {
      // ...
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
.form {
  @include for-desktop {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  &__element {
    margin-bottom: $spacer-extra-big;
    @include for-desktop {
      flex: 0 0 100%;
    }
    &--half {
      @include for-desktop {
        flex: 1 1 50%;
      }
      &-even {
        @include for-desktop {
          padding-left: $spacer-extra-big;
        }
      }
    }
  }
  &__button {
    width: 100%;
    @include for-desktop {
      width: auto;
    }
  }
}

.message {
  line-height: 1.6;
  font-weight: $body-font-weight-primary;
  font-family: $body-font-family-primary;
  margin: 0 0 $spacer-extra-big 0;
  font-size: $font-size-regular-mobile;
  @include for-desktop {
    font-size: $font-size-regular-desktop;
  }
  &__label {
    font-weight: 400;
  }

  &--second {
    padding: 4rem;
  }
}
</style>