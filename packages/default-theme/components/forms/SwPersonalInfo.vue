<template>
  <div class="sw-personal-info">
    <slot :user="user">
      <slot name="message">
        <p class="message">
          Feel free to edit any of your details below so your account is always
          up to date
        </p>
      </slot>

      <SfAlert
        v-if="userError"
        class="sw-personal-info__alert"
        type="danger"
        :message="getErrorMessage"
      />

      <div class="sw-personal-info__form form">
        <slot name="form">
          <SfInput
            v-model="firstName"
            :valid="!$v.firstName.$error"
            error-message="First name is required"
            name="firstName"
            label="First Name"
            class="form__element form__element--half form__element--half-even"
            @blur="$v.firstName.$touch()"
          />
          <SfInput
            v-model="lastName"
            :valid="!$v.lastName.$error"
            error-message="Last name is required"
            name="lastName"
            label="Last Name"
            class="form__element form__element--half"
            @blur="$v.lastName.$touch()"
          />
          <SfInput
            v-model="email"
            :valid="!$v.email.$error"
            error-message="Proper email is required"
            name="email"
            label="Your email"
            class="form__element"
            @blur="$v.email.$touch()"
          />
          <SfInput
            v-if="isEmailChanging"
            v-model="emailConfirmation"
            :valid="!$v.emailConfirmation.$error"
            error-message="Must match first one"
            type="email"
            name="emailConfirmation"
            label="Confirm e-mail"
            class="form__element"
            required
            @blur="$v.emailConfirmation.$touch()"
          />
          <SfInput
            v-if="isEmailChanging"
            v-model="password"
            :valid="!$v.password.$error"
            error-message="Password cannot be empty"
            type="password"
            name="password"
            label="Your password"
            class="form__element"
            required
            @blur="$v.password.$touch()"
          />
          <SwButton
            class="form__button"
            :disabled="$v.$invalid && !isEmailChanging && !isNameChanging"
            @click="invokeUpdate"
          >
            Save Changes
          </SwButton>
        </slot>
      </div>
    </slot>
  </div>
</template>

<script>
import { computed, watch } from '@vue/composition-api'
import { validationMixin } from 'vuelidate'
import { required, email, requiredIf, minLength, sameAs } from 'vuelidate/lib/validators'
import {
  SfInput,
  SfSelect,
  SfProductOption,
  SfAlert
} from '@storefront-ui/vue'
import { useUser, useContext } from '@shopware-pwa/composables'
import { mapSalutations, getMessagesFromErrorsArray } from '@shopware-pwa/helpers'
import SwButton from '@shopware-pwa/default-theme/components/atoms/SwButton'

export default {
  name: 'SwPersonalInfo',
  components: {
    SfInput,
    SwButton,
    SfSelect,
    SfProductOption,
    SfAlert
  },
  mixins: [validationMixin],
  setup() {
    const {
      user,
      error: userError,
      updatePersonalInfo,
      refreshUser,
      updateEmail
    } = useUser()

    return {
      refreshUser,
      updatePersonalInfo,
      user,
      updateEmail,
      userError
    }
  },
  data() {
    return {
      salutation:
        this.user && this.user.salutation
          ? {
              name: this.user.salutation.displayName,
              id: this.user.salutation.id
            }
          : {},
      firstName: this.user && this.user.firstName,
      lastName: this.user && this.user.lastName,
      email: this.user && this.user.email,
      emailConfirmation: '',
      password: ''
    }
  },
  computed: {
    getErrorMessage() {
      return getMessagesFromErrorsArray(this.userError && this.userError.message)
    },
    isEmailChanging() {
      return this.email !== (this.user && this.user.email)
    },
    isNameChanging() {
      return this.firstName !== (this.user && this.user.firstName) || this.lastName !== (this.user && this.user.lastName)
    },
  },
  validations: {
    firstName: {
      required
    },
    lastName: {
      required
    },
    email: {
      email,
      required
    },
    emailConfirmation: {
      required: requiredIf(function (password) {
        return this.isEmailChanging
      }),
      sameAsEmail: sameAs('email'),
      email
    },
    password: {
      required: requiredIf(function (password) {
        return this.isEmailChanging
      }),
      minLength: minLength(8),
    },
  },
  watch: {
    email() {
      if(!this.isEmailChanging) {
        this.emailConfirmation = this.email
      } else {
        this.emailConfirmation = ''
      }
    }
  },
  methods: {
    async invokeUpdate() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      if(this.isNameChanging) {
        const profileChanged = await this.updatePersonalInfo({
          firstName: this.firstName,
          lastName: this.lastName,
          salutationId: this.salutation.id
        })
      }
      if(this.isEmailChanging) {
        const emailChanged = await this.updateEmail({
        email: this.email,
        emailConfirmation: this.emailConfirmation,
        password: this.password
      })
      }
      await this.refreshUser()
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.form {
  @include for-desktop {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  &__element {
    margin: 0 0 var(--spacer-lg) 0;
    &:first-child {
      margin: 0 0 var(--spacer-base) 0;
    }
    @include for-desktop {
      flex: 0 0 100%;
    }
    &--half {
      @include for-desktop {
        flex: 1 1 50%;
      }
      &-even {
        @include for-desktop {
          padding: 0 var(--spacer-lg) 0 0;
        }
      }
    }
  }
  &__button {
    --button-width: 100%;
    @include for-desktop {
      --button-width: auto;
    }
  }
}

.message {
  margin: 0 0 var(--spacer-xl) 0;
  color: var(--c-dark-variant);
}
</style>
