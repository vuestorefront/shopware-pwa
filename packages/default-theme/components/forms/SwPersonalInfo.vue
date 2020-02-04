<template>
<div class="sw-personal-info">
  <slot :user="user">

    <slot name="message">
      <p class="message">
        Feel free to edit any of your details below so your account is always up
        to date
      </p>
    </slot>

    <SfAlert
      v-if="error"
      class="sw-personal-info__alert"
      type="danger"
      message="Errors in the form"
    />

    <div class="sw-personal-info__form form">
      <slot name="form">
        <SfSelect
          v-model="salutation"
          :valid="!$v.salutation.$error"
          :selected="salutation"
          error-message="Salutation must be selected"
          label="Salutation"
          class="form__element form__element--half"
          @blur="$v.salutation.$touch()"
        >
          <SfSelectOption v-for="salutationOption in salutations" :key="salutationOption.id" :value="salutationOption">
            <SfProductOption :label="salutationOption.displayName"></SfProductOption>
          </SfSelectOption>
        </SfSelect>
        <SfInput
          v-model="title"
          name="title"
          :valid="!$v.title.$error"
          :selected="salutation"
          error-message="Title must be selected"
          label="Title"
          class="form__element form__element--half form__element--half-even"
          @blur="$v.title.$touch()"
        />
        <SfInput
          v-model="firstName"
          :valid="!$v.firstName.$error"
          error-message="First name is required"
          name="firstName"
          label="First Name"
          class="form__element form__element--half"
          @blur="$v.firstName.$touch()"
        />
        <SfInput
          v-model="lastName"
          :valid="!$v.lastName.$error"
          error-message="Last name is required"
          name="lastName"
          label="Last Name"
          class="form__element form__element--half form__element--half-even"
          @blur="$v.lastName.$touch()"
        />
        <SfButton 
          class="form__button"
          :disabled="$v.$invalid"
          @click="invokeUpdate">
          Update personal data
        </SfButton>
      </slot>
    </div>  

  </slot>
</div>  
  
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import { SfInput, SfButton, SfSelect, SfProductOption, SfAlert } from '@storefront-ui/vue'
import { useUser } from '@shopware-pwa/composables'

export default {
  name: 'MyProfile',
  components: { SfInput, SfButton, SfSelect, SfProductOption, SfAlert },
  mixins: [validationMixin],
  props: {},
  setup() {
    const { user, error, updatePersonalInfo, refreshUser } = useUser()
    return {
      refreshUser,
      updatePersonalInfo,
      user,
      error
    }
  },
  data() {
    return {
      salutations: [
        { displayName: 'Mr.', id: 'c370eb5cd1df4d4dbcc78f055b693e79' },
      ],
      salutation: this.user && this.user.salutation ?
       { displayName: this.user.salutation.displayName, id: this.user.salutation.id } :{},
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
      required
    }
  },
  methods: {
    async invokeUpdate() {
      const profileChanged = await this.updatePersonalInfo({
        firstName: this.firstName,
        lastName: this.lastName,
        title: this.title,
        salutationId: this.salutation.id
      })
      await this.refreshUser()
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