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
          <SwInput
            v-model="firstName"
            :valid="!$v.firstName.$error"
            error-message="First name is required"
            name="firstName"
            label="First Name"
            class="form__element form__element--half form__element--half-even"
            @blur="$v.firstName.$touch()"
          />
          <SwInput
            v-model="lastName"
            :valid="!$v.lastName.$error"
            error-message="Last name is required"
            name="lastName"
            label="Last Name"
            class="form__element form__element--half"
            @blur="$v.lastName.$touch()"
          />
          <SwInput
            v-model="email"
            :valid="!$v.email.$error"
            error-message="Proper email is required"
            name="email"
            label="Your email"
            class="form__element"
            @blur="$v.email.$touch()"
          />
          <SwInput
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
          <SwInput
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
          <SfIcon v-if="isUpdating" :color="updated ? 'green-primary' : 'gray-primary'" size="14px" icon="check" style="margin-left: 10px;" />
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
  SfSelect,
  SfProductOption,
  SfAlert,
  SfIcon,
} from '@storefront-ui/vue'
import { useUser, useContext } from '@shopware-pwa/composables'
import { mapSalutations, getMessagesFromErrorsArray } from '@shopware-pwa/helpers'
import SwButton from '@shopware-pwa/default-theme/components/atoms/SwButton'
import SwInput from '@shopware-pwa/default-theme/components/atoms/SwInput'

export default {
  name: 'SwPersonalInfo',
  components: {
    SwInput,
    SwButton,
    SfSelect,
    SfProductOption,
    SfAlert,
    SfIcon,
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
      updated: false,
      isUpdating: false,
      salutation: this.user && this.user.salutation
        ? {
            name: this.user.salutation.displayName,
            id: this.user.salutation.id
          }
        : {},
      firstName: this.user && this.user.firstName,
      lastName: this.user && this.user.lastName,
      email: this.user && this.user.email,
      emailConfirmation: null,
      password: null
    }
  },
  computed: {
    getErrorMessage() {
      return getMessagesFromErrorsArray(this.userError && this.userError.message).join("<br/>")
    },
    isEmailChanging() {
      return this.email !== (this.user && this.user.email)
    },
    isNameChanging() {
      return this.firstName !== (this.user && this.user.firstName) || this.lastName !== (this.user && this.user.lastName)
    },
    emailConfirmationValidation() {
      return this.isEmailChanging ? ({
        required,
        email,
        sameAsEmail: sameAs('email')
      }) : {}
    }
  },
  validations() {
    return {
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
      emailConfirmation: this.emailConfirmationValidation, // take a dynamic one
      password: {
        required: requiredIf(function (password) {
          return this.isEmailChanging
        }),
        minLength: minLength(8),
      },
    }
  },
  methods: {
    async invokeUpdate() {
      this.updated = false;
      this.isUpdating = false;
      this.$v.$touch()
      if (this.$v.$invalid || (!this.isNameChanging && !this.isEmailChanging)) {
        return
      }
      if(this.isNameChanging) {
        this.isUpdating = true;
        
        const profileChanged = await this.updatePersonalInfo({
          firstName: this.firstName,
          lastName: this.lastName,
          salutationId: this.salutation.id
        })
        this.updated = profileChanged;
      }
      if(this.isEmailChanging) {
        this.isUpdating = true;
        const emailChanged = await this.updateEmail({
        email: this.email,
        emailConfirmation: this.emailConfirmation,
        password: this.password
      })
      this.updated = emailChanged;
      
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
