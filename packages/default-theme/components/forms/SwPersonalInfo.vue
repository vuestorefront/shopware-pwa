<template>
<div class="sw-personal-info">
  <slot :user="user">

    <slot name="message">
      <p class="message">
        Feel free to edit any of your details below so your account is always up
        to date
      </p>
    </slot>

    <div class="sw-personal-info__form form">
      <slot name="form">
        <SfInput
          v-model="salutations[0].salutation"
          name="salutation"
          label="Salutation"
          :valid="!$v.password.$error"
          required
          class="form__element form__element--half"
        />
        <SfInput
          v-model="title"
          name="title"
          label="Title"
          required
          class="form__element form__element--half form__element--half-even"
        />
        <SfInput
          v-model="firstName"
          name="firstName"
          label="First Name"
          required
          class="form__element form__element--half"
        />
        <SfInput
          v-model="lastName"
          name="lastName"
          label="Last Name"
          required
          class="form__element form__element--half form__element--half-even"
        />
        <SfButton class="form__button" @click="updatePersonal">
          Update personal data
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
      salutations: [
        { salutation: 'Mr.', salutationId: '' },
        { salutation: 'Mrs.', salutationId: '' }
      ],
      firstName: this.user && this.user.firstName,
      lastName: this.user && this.user.lastName,
      title: this.user && this.user.title
    }
  },
  validations: {
    salutation: {
      required
    },
    firstName: {
      required
    },
    lastName: {
      required
    },
    title: {

    }
  },
  methods: {
    updatePersonal() {
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
}

</style>