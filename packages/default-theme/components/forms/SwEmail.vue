<template>
  <div class="sw-email">
    <slot :user="user">
      <slot name="message">
        <p class="message">
          Remember to keep your email up to date in case of losing password.
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
            error-message="Email cannot be empty"
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
    margin-bottom: var(--spacer-base);
  }
}
.form {
  @include for-desktop {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  &__element {
    margin: 0 0 var(--spacer-lg) 0;
    @include for-desktop {
      flex: 0 0 100%;
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
