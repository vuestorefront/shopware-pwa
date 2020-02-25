<template>
  <div class="sw-email">
    <slot :user="user">
      <slot name="message">
        <p class="message">
          Remember to keep your email up to date in case of loosing password.
        </p>
      </slot>

      <SfAlert
        v-if="error"
        class="sw-personal-info__alert"
        type="danger"
        message="Errors in the form"
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
            v-model="confirmEmail"
            :valid="!$v.confirmEmail.$error"
            error-message="Must match first one"
            type="email"
            name="confirmEmail"
            label="Confirm e-mail"
            class="form__element"
            required
            @blur="$v.confirmEmail.$touch()"
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
import { SfInput, SfButton, SfAlert } from '@storefront-ui/vue'
import { useUser } from '@shopware-pwa/composables'

export default {
  name: 'MyProfile',
  components: { SfInput, SfButton, SfAlert },
  mixins: [validationMixin],
  props: {},
  setup() {
    const { user, error, updateEmail, refreshUser } = useUser()
    return {
      refreshUser,
      updateEmail,
      user,
      error
    }
  },
  data() {
    return {
      email: '',
      confirmEmail: '',
      password: ''
    }
  },
  methods: {
    async invokeUpdate() {
      const emailChanged = await this.updateEmail({
        email: this.email,
        confirmEmail: this.confirmEmail,
        password: this.password
      })
      await refreshUser()
    }
  },
  validations: {
    email: {
      required,
      email
    },
    confirmEmail: {
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
