<template>
  <div class="sw-password">
    <slot>
      <slot name="message" :user="user">
        <p class="message">
          If you want to change the password to access your account, enter the
          following information:
        </p>
      </slot>

      <SfAlert
        v-for="(message, index) in useUserErrorMessages"
        :key="index"
        class="sw-password__alert"
        type="danger"
        :message="message"
      />

      <div class="sw-password__form form">
        <slot name="form">
          <div class="form">
            <SfInput
              v-model="password"
              :valid="!$v.password.$error"
              error-message="Current password is required"
              type="password"
              name="currentPassword"
              label="Current Password"
              class="form__element"
              required
              @blur="$v.password.$touch()"
            />
            <SfInput
              v-model="newPassword"
              :valid="!$v.newPassword.$error"
              error-message="This field is required"
              type="password"
              name="newPassword"
              label="New Password"
              class="form__element form__element--half"
              required
              @blur="$v.newPassword.$touch()"
            />
            <SfInput
              v-model="newPasswordConfirm"
              :valid="!$v.newPasswordConfirm.$error"
              error-message="This filed must be same as new password"
              type="password"
              name="repeatPassword"
              label="Repeat Password"
              required
              class="form__element form__element--half form__element--half-even"
              @blur="$v.newPasswordConfirm.$touch()"
            />
            <SfButton
              class="form__button"
              :disabled="$v.$invalid"
              @click="invokeUpdate"
            >
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
import { required, minLength, sameAs } from 'vuelidate/lib/validators'
import { computed } from '@vue/composition-api';
import { SfInput, SfButton, SfAlert } from '@storefront-ui/vue'
import { useUser } from '@shopware-pwa/composables'
import { getMessagesFromErrorsArray } from '@shopware-pwa/helpers'

export default {
  name: 'SwPassword',
  components: { SfInput, SfButton, SfAlert },
  mixins: [validationMixin],
  props: {},
  setup() {
    const { user, error: userError, updatePassword, refreshUser } = useUser()
    const userErrorMessages = computed(() => getMessagesFromErrorsArray(userError.value.message))

    return {
      refreshUser,
      updatePassword,
      user,
      userErrorMessages
    }
  },
  data() {
    return {
      password: '',
      newPassword: '',
      newPasswordConfirm: '',
      email: this.user && this.user.email
    }
  },
  methods: {
    async invokeUpdate() {
      const passwordChanged = await this.updatePassword({
        password: this.password,
        newPassword: this.newPassword,
        newPasswordConfirm: this.newPasswordConfirm
      })
      await this.refreshUser()
    }
  },
  validations: {
    password: {
      required,
      minLenght: minLength(8)
    },
    newPassword: {
      required,
      minLength: minLength(8)
    },
    newPasswordConfirm: {
      required,
      sameAsNewPassword: sameAs('newPassword')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles.scss';

.sw-password {
  &__alert {
    margin-bottom: var(--spacer-big);
  }
}

.form {
  @include for-desktop {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  &__element {
    margin-bottom: var(--spacer-extra-big);
    @include for-desktop {
      flex: 0 0 100%;
    }
    &--half {
      @include for-desktop {
        flex: 1 1 50%;
      }
      &-even {
        @include for-desktop {
          padding-left: var(--spacer-extra-big);
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
  font-weight: var(--body-font-weight-primary);
  font-family: var(--body-font-family-primary);
  margin: 0 0 var(--spacer-extra-big) 0;
  font-size: var(--font-size-regular-mobile);
  @include for-desktop {
    font-size: var(--font-size-regular-desktop);
  }
  &__label {
    font-weight: 400;
  }

  &--second {
    padding: 4rem;
  }
}
</style>
