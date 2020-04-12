<template>
  <div class="sw-checkout__personal_info">
    <SfAlert
      v-for="(message, index) in useUserErrorMessages"
      :key="index"
      class="sw-checkout__personal_info__alert"
      type="danger"
      :message="message"
    />
    <div class="form">
      <!-- <SfSelect
        v-if="getMappedSalutations && getMappedSalutations.length > 0"
        v-model="salutationId"
        label="Salutation"
        :valid="!validations.salutationId.$error"
        @change="validations.salutationId.$touch()"
        error-message="Salutation must be selected"
        class="sf-select--underlined form__element form__element--salutation form__select"
      >
        <SfSelectOption
          v-for="salutationOption in getMappedSalutations"
          :key="salutationOption.id"
          :value="salutationOption.id || ''"
        >
          {{ salutationOption.name }}
        </SfSelectOption>
      </SfSelect> -->
      <SfInput
        v-model="firstName"
        label="First name"
        :valid="!validations.firstName.$error"
        error-message="First name is required"
        name="firstName"
        class="form__element form__element--names"
        required
      />
      <SfInput
        v-model="lastName"
        label="Last name"
        :valid="!validations.lastName.$error"
        error-message="last name is required"
        name="lastName"
        class="form__element form__element--names form__element--names-even"
      />
      <SfInput
        v-model="email"
        label="Your email"
        :valid="!validations.email.$error"
        error-message="Proper email is required"
        name="email"
        class="form__element"
      />
      <div class="form__element form__group">
        <SfCheckbox
          v-model="createAccount"
          name="createAccount"
          label="I want to create an account"
          class="form__checkbox"
        />
        <SfButton class="sf-button--text info" @click="accountBenefits = true"
          >+info</SfButton
        >
      </div>
      <transition name="fade">
        <SfInput
          v-if="createAccount"
          v-model="password"
          type="password"
          label="Create Password"
          :valid="!validations.password.$error"
          :error-message="
            //handle two different situations - aligned with validation rules
            (!validations.password.required && 'Password is required') ||
            (!validations.password.minLength &&
              'Password should have at least 8 characters') ||
            ''
          "
          class="form__element"
        />
      </transition>
      <div class="form__action">
        <SfButton
          class="sf-button--full-width form__action-button"
          @click="toShipping"
          >Continue to shipping</SfButton
        >
        <SfButton
          @click="toggleLoginModal()"
          class="sf-button--full-width sf-button--text form__action-button form__action-button--secondary"
          >or log in to your account</SfButton
        >
      </div>
    </div>
    <SfModal
      :visible="accountBenefits"
      class="modal"
      @close="accountBenefits = false"
    >
      <SfHeading
        title="Account Benefits"
        subtitle="Enjoy these perks with your free account!"
        class="sf-heading--left sf-heading--no-underline modal__heading"
      />
      <SfCharacteristic
        v-for="(characteristic, key) in characteristics"
        :key="key"
        :description="characteristic.description"
        :icon="characteristic.icon"
        class="characteristic"
      />
      <SfButton
        class="sf-button--full-width color-secondary modal__button"
        @click="accountBenefits = false"
        >Ok</SfButton
      >
    </SfModal>
    <SwLoginModal
      :is-open="isLoginModalOpen"
      @close="isLoginModalOpen = false"
    />
  </div>
</template>
<script>
import {
  SfInput,
  SfCheckbox,
  SfButton,
  SfHeading,
  SfModal,
  SfCharacteristic,
  SfSelect,
  SfProductOption,
  SfAlert,
} from '@storefront-ui/vue'

import { validationMixin } from 'vuelidate'
import {
  required,
  requiredIf,
  email,
  minLength,
} from 'vuelidate/lib/validators'
import { computed } from '@vue/composition-api'
import {
  mapSalutations,
  getMessagesFromErrorsArray,
} from '@shopware-pwa/helpers'
import {
  useUser,
  useSalutations,
  useCountries,
  useUserLoginModal,
} from '@shopware-pwa/composables'
import {
  usePersonalDetailsStep,
  usePersonalDetailsStepValidationRules,
} from '@shopware-pwa/default-theme/logic/checkout/usePersonalDetailsStep'

import SwLoginModal from '@shopware-pwa/default-theme/components/modals/SwLoginModal'

export default {
  name: 'PersonalDetailsGuestForm',
  mixins: [validationMixin],
  components: {
    SfInput,
    SfCheckbox,
    SfButton,
    SfHeading,
    SfModal,
    SfCharacteristic,
    SfSelect,
    SfProductOption,
    SfAlert,
    SwLoginModal,
  },
  props: {
    order: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      password: '',
      billingAddress: {
        salutationId: null,
        street: '-',
        zipcode: '-',
        city: '-',
        countryId: null,
      },
      createAccount: false,
      accountBenefits: false,
      isLoginModalOpen: false,
      characteristics: [
        { description: 'Faster checkout', icon: 'clock' },
        { description: 'Full rewards program benefits', icon: 'rewards' },
        { description: 'Earn credits with every purchase', icon: 'credits' },
        { description: 'Manage your wishlist', icon: 'heart' },
      ],
    }
  },
  setup() {
    const { toggleModal: toggleLoginModal } = useUserLoginModal()
    
    const {
      validations,
      setValidations,
      validate,
      salutationId,
      firstName,
      lastName,
      email,
    } = usePersonalDetailsStep()

    const {
      register: registerUser,
      login,
      error: userError,
      isLoggedIn,
    } = useUser()

    const {
      getSalutations,
      fetchSalutations,
      error: salutationsError,
    } = useSalutations()

    const { fetchCountries, getCountries } = useCountries()

    const getMappedSalutations = computed(() =>
      mapSalutations(getSalutations.value)
    )
    return {
      registerUser,
      login,
      isLoggedIn,
      fetchSalutations,
      getMappedSalutations,
      userError,
      getCountries,
      fetchCountries,
      getMessagesFromErrorsArray,
      toggleLoginModal,
      validations,
      setValidations,
      validate,
      salutationId,
      firstName,
      lastName,
      email,
    }
  },
  watch: {
    createAccount(value) {
      if (!value) this.password = ''
    },
    // hack to register user without picking up the salutation in billing address (minimal registration)
    // copy the customer's salutation into billing address
    // 'salutationId': function(value) {
    //   if (value && this.customer && this.billingAddress) {
    //     this.billingAddress.salutationId = value
    //   }
    // },
    $v: {
      immediate: true,
      handler: function () {
        this.setValidations(this.$v)
      },
    },
  },
  methods: {
    async toShipping() {
      // run the validators against the provided data
      // consider using $touch event on $blur event in each input
      this.validate()
      if (this.validations.$invalid) {
        return
      }

      if (this.createAccount) {
        const isRegistered = await this.registerUser(this.customer)
        if (!isRegistered) {
          return
        }
        // extra login step won't be necessary once the register has a autologin option
        await this.login({
          username: this.email,
          password: this.password,
        })
        if (!this.isLoggedIn) {
          return
        }
        this.$router.push('/checkout?step="SHIPPING"')
      } else {
        return this.$emit('proceed')
      }
    },
  },
  computed: {
    useUserErrorMessages() {
      // all the 400 errors are in a raw format stright from the API - to be extracted easily depeding on needs.
      return this.userError && this.getMessagesFromErrorsArray(this.userError)
    },
  },
  async mounted() {
    // hack to register user without picking up the country (minimal registration)
    await this.fetchCountries()
    if (!this.getCountries) {
      return
    }
    const pickedCountry = this.getCountries.find(
      ({ name }) => name === 'Poland'
    )
    this.billingAddress.countryId = pickedCountry && pickedCountry.id

    // select "not specified" salutation (works for EN) as default salutation
    await this.fetchSalutations()
    const defaultSalutation = this.getMappedSalutations.find(
      ({ id, name }) => name == 'Not specified'
    )
    this.salutationId = defaultSalutation && defaultSalutation.id
  },
  // TODO: move all the rules globally
  validations: {
    ...usePersonalDetailsStepValidationRules,
    password: {
      required: requiredIf(function (password) {
        return this.createAccount
      }),
      minLength: minLength(8),
    },
    email: {
      required,
      email,
    },
  },
}
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';

.sw-checkout {
  &__personal_info {
    &__alert {
      margin-bottom: 20px;
    }
  }
}

.title {
  margin-bottom: var(--spacer-extra-big);
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
    &--salutation {
      @include for-desktop {
        flex: 1 1 25%;
        padding-right: var(--spacer-extra-big);
      }
    }
    &--names {
      @include for-desktop {
        flex: 1 1 30%;
      }
      &-even {
        @include for-desktop {
          padding-left: var(--spacer-extra-big);
        }
      }
    }
  }
  &__group {
    display: flex;
    align-items: center;
  }
  &__action {
    @include for-desktop {
      flex: 0 0 100%;
      display: flex;
    }
  }
  &__action-button {
    flex: 1;
    &--secondary {
      margin: var(--spacer-big) 0;
      @include for-desktop {
        margin: 0;
        text-align: right;
      }
    }
  }
}
.info {
  margin-left: var(--spacer-big);
  color: var(--c-text-muted);
  text-decoration: none;
}
.characteristic {
  margin-bottom: var(--spacer-big);
}
.modal {
  .modal {
    &__heading {
      margin-bottom: var(--spacer-extra-big);
    }
  }
  &__button {
    display: block;
    margin-top: var(--spacer-extra-big);
  }
}
</style>
