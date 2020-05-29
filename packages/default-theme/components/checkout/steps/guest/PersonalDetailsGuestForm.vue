<template>
  <div class="sw-checkout__personal_info">
    <div class="log-in">
      <div class="log-in__buttons-container">
        <SwButton
          @click="switchLoginModalState(true)"
          class="log-in__button color-secondary"
          >Log in to your account</SwButton
        >
        <SwPluginSlot name="checkout-login-after" />
      </div>
      <p class="log-in__info">or fill the details below:</p>
    </div>
    <SfHeading
      title="1. Personal details"
      class="sf-heading--left sf-heading--no-underline title"
    />
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
      <SwInput
        v-model="firstName"
        label="First name"
        :valid="!validations.firstName.$error"
        error-message="First name is required"
        name="firstName"
        class="form__element form__element--half"
        required
      />
      <SwInput
        v-model="lastName"
        label="Last name"
        :valid="!validations.lastName.$error"
        error-message="last name is required"
        name="lastName"
        class="form__element form__element--half form__element--half-even"
      />
      <SwInput
        v-model="email"
        label="Your email"
        :valid="!validations.email.$error"
        error-message="Proper email is required"
        name="email"
        class="form__element"
      />
      <div class="info">
        <p class="info__heading">
          Enjoy these perks with your free account!
        </p>
        <SfCharacteristic
          v-for="(characteristic, key) in characteristics"
          :key="key"
          :description="characteristic.description"
          :icon="characteristic.icon"
          size-icon="0.75rem"
          class="info__characteristic"
        />
      </div>
      <SfCheckbox
        v-model="createAccount"
        name="createAccount"
        label="I want to create an account"
        class="form__checkbox"
      />
      <transition name="fade">
        <SwInput
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
        <SwButton
          class="sf-button--full-width form__action-button form__action-button--secondary color-secondary desktop-only"
          >Go Back to shop</SwButton
        >
        <SwButton
          class="sf-button--full-width form__action-button"
          @click="toShipping"
          >Continue to shipping</SwButton
        >
        <SwButton
          class="sf-button--full-width sf-button--text form__action-button form__action-button--secondary mobile-only"
          >Go back to shop</SwButton
        >
      </div>
    </div>
  </div>
</template>
<script>
import {
  SfCheckbox,
  SfHeading,
  SfModal,
  SfCharacteristic,
  SfSelect,
  SfProductOption,
  SfAlert,
} from "@storefront-ui/vue"
import SwPluginSlot from "sw-plugins/SwPluginSlot"
import SwButton from "@shopware-pwa/default-theme/components/atoms/SwButton"
import SwInput from "@shopware-pwa/default-theme/components/atoms/SwInput"

import { validationMixin } from "vuelidate"
import {
  required,
  requiredIf,
  email,
  minLength,
} from "vuelidate/lib/validators"
import { computed } from "@vue/composition-api"
import {
  mapSalutations,
  getMessagesFromErrorsArray,
} from "@shopware-pwa/helpers"
import {
  useUser,
  useSalutations,
  useCountries,
  useUIState,
} from "@shopware-pwa/composables"
import {
  usePersonalDetailsStep,
  usePersonalDetailsStepValidationRules,
} from "@shopware-pwa/default-theme/logic/checkout/usePersonalDetailsStep"

export default {
  name: "PersonalDetailsGuestForm",
  mixins: [validationMixin],
  components: {
    SwInput,
    SfCheckbox,
    SwButton,
    SfHeading,
    SfModal,
    SfCharacteristic,
    SfSelect,
    SfProductOption,
    SfAlert,
    SwPluginSlot,
  },
  props: {
    order: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      password: "",
      billingAddress: {
        salutationId: null,
        street: "-",
        zipcode: "-",
        city: "-",
        countryId: null,
      },
      createAccount: false,
      accountBenefits: false,
      isLoginModalOpen: false,
      characteristics: [
        { description: "Faster checkout", icon: "clock" },
        { description: "Full rewards program benefits", icon: "rewards" },
        { description: "Earn credits with every purchase", icon: "credits" },
        { description: "Manage your wishlist", icon: "heart" },
      ],
    }
  },
  setup() {
    const { switchState: switchLoginModalState } = useUIState(
      "LOGIN_MODAL_STATE"
    )

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
      switchLoginModalState,
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
      if (!value) this.password = ""
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
        this.$router.push(this.$i18n.path('/checkout?step="SHIPPING"'))
      } else {
        return this.$emit("proceed")
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
      ({ name }) => name === "Poland"
    )
    this.billingAddress.countryId = pickedCountry && pickedCountry.id

    await this.fetchSalutations()
    const defaultSalutation = this.getMappedSalutations[
      this.getMappedSalutations.length - 1
    ]
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
@import "@/assets/scss/variables";

.sw-checkout {
  &__personal_info {
    &__alert {
      margin-bottom: 20px;
    }
  }
}
.log-in {
  &__info {
    margin: var(--spacer-lg) 0;
    color: var(--c-dark-variant);
    font: var(--font-light) var(--font-base) / 1.6 var(--font-family-primary);
    @include for-desktop {
      font-weight: var(--font-normal);
      font-size: var(--font-sm);
    }
  }
  &__button {
    --button-font-weight: var(--font-normal);
    width: 100%;

    @include for-desktop {
      width: auto;
    }
  }

  &__buttons-container {
    margin: var(--spacer-2xl) 0 var(--spacer-xl) 0;

    @include for-desktop {
      display: flex;
      align-items: center;
    }
  }
}
.title {
  --heading-padding: var(--spacer-base) 0;
  @include for-desktop {
    --heading-title-font-size: var(--h3-font-size);
    --heading-padding: 0 0 var(--spacer-xl) 0;
  }
}
.form {
  &__checkbox {
    margin: var(--spacer-base) 0 var(--spacer-xl) 0;
  }
  &__action {
    flex: 0 0 100%;
    margin: var(--spacer-base) 0 0 0;
  }
  &__action-button {
    --button-height: 3.25rem;
  }
  @include for-mobile {
    &__checkbox {
      --checkbox-font-family: var(--font-family-primary);
      --checkbox-font-weight: var(--font-light);
      --checkbox-font-size: var(--font-sm);
    }
  }
  @include for-desktop {
    margin: 0 var(--spacer-2xl) 0 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    &__action {
      display: flex;
    }
    &__action-button {
      &:first-child {
        margin: 0 var(--spacer-lg) 0 0;
      }
    }
    &__element {
      margin: 0 0 var(--spacer-base) 0;
      flex: 0 0 100%;
      &--salutation {
        flex: 1 1 25%;
        padding-right: var(--spacer-xl);
      }
      &--half {
        flex: 1 1 50%;
        &-even {
          padding: 0 0 0 var(--spacer-lg);
        }
      }
    }
  }
}
.info {
  margin: 0 0 var(--spacer-sm) 0;
  &__heading {
    font-family: var(--font-family-primary);
    font-weight: var(--font-light);
  }
  &__characteristic {
    --characteristic-description-font-size: var(--font-xs);
    margin: 0 0 var(--spacer-sm) var(--spacer-2xs);
  }
  @include for-desktop {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    &__heading {
      margin: 0 0 var(--spacer-sm) 0;
      font-size: var(--font-xs);
      flex: 0 0 100%;
    }
    &__characteristic {
      margin: var(--spacer-sm) 0 0 0;
      flex: 0 0 50%;
    }
  }
}
</style>
