<template>
  <div class="sw-checkout__personal_info">
    <div class="log-in">
      <div class="log-in__buttons-container">
        <SwButton
          class="log-in__button color-secondary"
          @click="switchLoginModalState(true)"
        >
          {{ $t("Log in to your account") }}
        </SwButton>
        <SwPluginSlot name="checkout-login-after" />
      </div>
      <p class="log-in__info">
        {{ $t("or fill the details below:") }}
      </p>
    </div>
    <SfHeading
      :title="$t('1. Personal details')"
      class="sf-heading--left sf-heading--no-underline title"
    />

    <SwErrorsList :list="useUserErrorMessages" />

    <div class="form">
      <SwInput
        v-model="firstName"
        :label="$t('First name')"
        :valid="!validations.firstName.$error"
        :error-message="$t('First name is required')"
        name="firstName"
        class="form__element form__element--half"
        data-cy="first-name"
        required
      />
      <SwInput
        v-model="lastName"
        :label="$t('Last name')"
        :valid="!validations.lastName.$error"
        :error-message="$t('Last name is required')"
        name="lastName"
        class="form__element form__element--half form__element--half-even"
        data-cy="last-name"
      />
      <SwInput
        v-model="email"
        :label="$t('Your email')"
        :valid="!validations.email.$error"
        :error-message="$t('Proper email is required')"
        name="email"
        class="sw-form__input"
        data-cy="proper-email"
      />
      <div class="info">
        <p class="info__heading">
          {{ $t("Enjoy these perks with your free account!") }}
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
        :label="$t('I want to create an account')"
        class="sw-form__checkbox"
      />
      <transition name="fade">
        <SwInput
          v-if="createAccount"
          v-model="password"
          type="password"
          :label="$t('Create Password')"
          :valid="!validations.password.$error"
          :error-message="
            //handle two different situations - aligned with validation rules
            (!validations.password.required && $t('Password is required')) ||
            (!validations.password.minLength &&
              $t('Password should have at least 8 characters')) ||
            ''
          "
          class="form__element"
        />
      </transition>
      <div class="form__action">
        <SwButton
          class="sf-button--full-width form__action-button form__action-button--secondary color-secondary desktop-only sw-form__button"
          data-cy="go-back-to-shop-button"
        >
          {{ $t("Go Back to shop") }}
        </SwButton>
        <SwButton
          class="sf-button--full-width form__action-button sw-form__button"
          data-cy="continue-to-shipping-button"
          @click="toShipping"
        >
          {{ $t("Continue to shipping") }}
        </SwButton>
        <SwButton
          class="sf-button--full-width sf-button--text form__action-button form__action-button--secondary mobile-only sw-form__button"
        >
          {{ $t("Go Back to shop") }}
        </SwButton>
      </div>
    </div>
  </div>
</template>
<script>
import { SfCheckbox, SfHeading, SfCharacteristic } from "@storefront-ui/vue"
import SwPluginSlot from "sw-plugins/SwPluginSlot"
import SwButton from "@/components/atoms/SwButton"
import SwInput from "@/components/atoms/SwInput"

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
} from "@/logic/checkout/usePersonalDetailsStep"
import SwErrorsList from "@/components/SwErrorsList"

export default {
  name: "PersonalDetailsGuestForm",
  components: {
    SwInput,
    SfCheckbox,
    SwButton,
    SfHeading,
    SfCharacteristic,
    SwErrorsList,
    SwPluginSlot,
  },
  mixins: [validationMixin],
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
        { description: this.$t("Faster checkout"), icon: "clock" },
        {
          description: this.$t("Full rewards program benefits"),
          icon: "rewards",
        },
        {
          description: this.$t("Earn credits with every purchase"),
          icon: "credits",
        },
        { description: this.$t("Manage your wishlist"), icon: "heart" },
      ],
    }
  },
  setup(props, { root }) {
    const { switchState: switchLoginModalState } = useUIState(
      root,
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
    } = usePersonalDetailsStep(root)

    const {
      register: registerUser,
      login,
      error: userError,
      isLoggedIn,
    } = useUser(root)

    const {
      getSalutations,
      fetchSalutations,
      error: salutationsError,
    } = useSalutations(root)

    const { fetchCountries, getCountries } = useCountries(root)

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
  computed: {
    useUserErrorMessages() {
      // all the 400 errors are in a raw format stright from the API - to be extracted easily depeding on needs.
      return (
        this.userError &&
        this.getMessagesFromErrorsArray(this.userError.message)
      )
    },
    customer() {
      return {
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
        salutationId: this.salutationId,
        storefrontUrl:
          window &&
          window.location &&
          `${window.location.protocol}//${window.location.hostname}`,
        billingAddress: Object.assign({}, this.billingAddress, {
          firstName: this.firstName,
          lastName: this.lastName,
        }),
      }
    },
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
      handler() {
        this.setValidations(this.$v)
      },
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
        this.$router.push(this.$routing.getUrl('/checkout?step="SHIPPING"'))
      } else {
        return this.$emit("proceed")
      }
    },
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
@import "@/assets/scss/forms";

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

.form__action {
  margin: var(--spacer-sm) 0;

  .sf-button + .sf-button {
    margin-top: var(--spacer-sm);
  }
}
</style>
