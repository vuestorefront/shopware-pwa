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
        v-if="userError || salutationsError"
        class="sw-personal-info__alert"
        type="danger"
        :message="getErrorMessage"
      />

      <div class="sw-personal-info__form form">
        <slot name="form">
        <SfSelect
          v-if="getMappedSalutations && getMappedSalutations.length > 0"
          v-model="salutation"
          label="Salutation"
          :valid="!$v.salutation.$error"
          error-message="Salutation must be selected"
          class="sf-select--underlined form__element form__element--half form__select"
        >
          <SfSelectOption
            v-for="salutationOption in getMappedSalutations"
            :key="salutationOption.id"
            :value="salutationOption"
          >
            {{ salutationOption.name }}
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
            @click="invokeUpdate"
          >
            Update personal data
          </SfButton>
        </slot>
      </div>
    </slot>
  </div>
</template>

<script>
import { computed } from '@vue/composition-api'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import {
  SfInput,
  SfButton,
  SfSelect,
  SfProductOption,
  SfAlert
} from '@storefront-ui/vue'
import { useUser, useContext, useSalutations } from '@shopware-pwa/composables'
import { mapSalutations } from '@shopware-pwa/helpers'

export default {
  name: 'MyProfile',
  components: {
    SfInput,
    SfButton,
    SfSelect,
    SfProductOption,
    SfAlert
  },
  mixins: [validationMixin],
  props: {},
  setup() {
    const {
      user,
      error: userError,
      updatePersonalInfo,
      refreshUser
    } = useUser()
    const {
      getSalutations,
      fetchSalutations,
      error: salutationsError
    } = useSalutations()

    const getMappedSalutations = computed(() => mapSalutations(getSalutations.value))

    return {
      fetchSalutations,
      getMappedSalutations,
      salutationsError,
      refreshUser,
      updatePersonalInfo,
      user,
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
      title: this.user && this.user.title,
      isLoading: true
    }
  },
  computed: {
    getErrorMessage() {
      return userError && !salutationsError
        ? 'Cannot create a new account, the user may already exist'
        : "Coudn't fetch available salutations or countries, please contact the administration."
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
  },
  async mounted() {
    await this.fetchSalutations()
    this.isLoading = false
  }
}
</script>

<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles.scss';

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
  &__select {
    ::v-deep .sf-select__selected {
      padding: 5px 0;
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
}
</style>
