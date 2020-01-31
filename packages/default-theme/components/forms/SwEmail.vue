<template>
<div class="sw-email">
  <slot :user="user">

    <slot name="message">
      <p class="message">
        Remember to keep your email up to date in case of loosing password.
      </p>
    </slot>

    <div class="sw-email__form form">
      <slot name="form">
        <SfInput
          v-model="email"
          type="email"
          name="email"
          label="Your e-mail"
          required
          class="form__element "
        />
        <SfInput
          v-model="confirmEmail"
          type="email"
          name="confirmEmail"
          label="Confirm e-mail"
          required
          class="form__element"
        />
        <SfInput
          v-model="password"
          type="password"
          name="password"
          label="Your password"
          required
          class="form__element"
        />
        <SfButton class="form__button" @click="updateEmail">
          Update email
        </SfButton>
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
  name: 'MyProfile',
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
      email: this.user && this.user.email,
      confirmEmail: '',
      password: ''
    }
  },
  methods: {
    updateEmail() {
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