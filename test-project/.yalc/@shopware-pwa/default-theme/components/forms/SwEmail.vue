<template>
  <div class="sw-email">
    <slot :user="user">
      <slot name="message">
        <p class="message">
          Remember to keep your email up to date in case of loosing password.
        </p>
      </slot>
      <SfAlert
        v-for="(message, index) in useUserErrorMessages"
        :key="index"
        class="sw-email__alert"
        type="danger"
        :message="message"
      />

      <div class="sw-email__form form">
        <slot name="form">
          <SfInput
            v-model="email"
            :valid="!$v.email.$error"
            error-message="Email cannnot be empty"
            type="email"
            name="email"
            label="Your new e-mail"
            class="form__element "
            required
            @blur="$v.email.$touch()"
          />
          <SfInput
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
          <SfButton
            class="form__button"
            @click="invokeUpdate"
            :disabled="$v.$invalid"
          >
            Update email
          </SfButton>
        </slot>
      </div>
    </slot>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email, sameAs } from 'vuelidate/lib/validators'
import { computed } from '@vue/composition-api';
import { SfInput, SfButton, SfAlert } from '@storefront-ui/vue'
import { useUser } from '@shopware-pwa/composables'
import { getMessagesFromErrorsArray } from '@shopware-pwa/helpers'

export default {
  name: 'EmailChange',
  components: { SfInput, SfButton, SfAlert },
  mixins: [validationMixin],
  props: {},
  setup() {
    const { user, error: userError, updateEmail, refreshUser } = useUser()
    const userErrorMessages = computed(() => getMessagesFromErrorsArray(userError.value.message))

    return {
      refreshUser,
      updateEmail,
      user,
      userErrorMessages
    }
  },
  data() {
    return {
      email: '',
      emailConfirmation: '',
      password: ''
    }
  },
  methods: {
    async invokeUpdate() {
      const emailChanged = await this.updateEmail({
        email: this.email,
        emailConfirmation: this.confirmEmail,
        password: this.password
      })
      await this.refreshUser()
    }
  },
  validations: {
    email: {
      required,
      email
    },
    emailConfirmation: {
      required,
      sameAsEmail: sameAs('email'),
      email
    },
    password: {
      required
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles.scss';

.sw-email {
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
