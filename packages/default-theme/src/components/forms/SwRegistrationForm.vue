<template>
  <div class="sw-registration-form" @keyup.enter="$emit('invokeRegister')">
    <SwPluginSlot name="registration-form-before" />
    <div class="sw-form">
      <div class="inputs-group">
        <SfSelect
          v-model="salutationId"
          :label="$t('Salutation')"
          :error-message="$t('Salutation must be selected')"
          :valid="!$v.salutationId.$error"
          class="
            sf-select--underlined
            sw-form__select sw-form__input
            sf-input--has-text
          "
          @blur="$v.salutationId.$touch()"
        >
          <SfSelectOption
            v-for="salutationOption in getMappedSalutations"
            :key="salutationOption.id"
            :value="salutationOption.id"
          >
            {{ salutationOption.name }}
          </SfSelectOption>
        </SfSelect>
      </div>
      <div class="inputs-group">
        <SwInput
          v-model="firstName"
          name="registration-first-name"
          :label="$t('First name')"
          class="sw-form__input form__element form__element--small"
          :valid="!$v.firstName.$error"
          :error-message="$t('First name is required')"
          data-cy="registration-first-name-input"
          @blur="$v.firstName.$touch()"
        />
        <SwInput
          v-model="lastName"
          name="registration-last-name"
          :label="$t('Last name')"
          class="sw-form__input form__element form__element--small"
          :valid="!$v.lastName.$error"
          :error-message="$t('Last name is required')"
          data-cy="registration-last-name-input"
          @blur="$v.lastName.$touch()"
        />
      </div>
      <SwCheckbox
        v-if="allowGuestRegistration"
        v-model="doNotCreateAccount"
        name="doNotCreateAccount"
        :label="$t('Do not create a customer account')"
        class="sw-form__input form__element form__element--small"
        data-cy="guest-registration-checkbox"
      />
      <div class="inputs-group">
        <SwInput
          v-model="email"
          :label="$t('Your email')"
          :valid="!$v.email.$error"
          :error-message="$t('Proper email is required')"
          name="registrationEmail"
          data-cy="registration-email-input"
          class="sw-form__input form__element form__element--small"
        />
        <transition name="fade">
          <SwInput
            v-if="!doNotCreateAccount"
            v-model="password"
            type="password"
            name="registrationPassword"
            :label="$t('Create Password')"
            :valid="!$v.password.$error"
            :error-message="
              //handle two different situations - aligned with validation rules
              ($v.password.required.$invalid && $t('Password is required')) ||
              ($v.password.minLength.$invalid &&
                $t('Password should have at least 8 characters')) ||
              ''
            "
            data-cy="registration-password-input"
            class="sw-form__input form__element form__element--small"
          />
        </transition>
      </div>
      <div class="inputs-group">
        <SwInput
          v-model="street"
          name="registration-street"
          :label="$t('Street')"
          class="sw-form__input form__element form__element--small"
          :valid="!$v.street.$error"
          :error-message="$t('Street is required')"
          data-cy="registration-street-input"
          @blur="$v.street.$touch()"
        />
        <SwInput
          v-model="zipcode"
          name="registration-zipcode"
          :label="$t('Zip code')"
          class="sw-form__input form__element form__element--small"
          :valid="!$v.zipcode.$error"
          :error-message="$t('Zip code is required')"
          data-cy="registration-zipcode-input"
          @blur="$v.zipcode.$touch()"
        />
        <SwInput
          v-model="city"
          name="registration-city"
          :label="$t('City')"
          class="sw-form__input form__element form__element--small"
          :valid="!$v.city.$error"
          :error-message="$t('City is required')"
          data-cy="registration-city-input"
          @blur="$v.city.$touch()"
        />
      </div>
      <div class="inputs-group">
        <SfSelect
          v-model="countryId"
          :label="$t('Country')"
          :error-message="$t('Country must be selected')"
          :valid="!$v.countryId.$error"
          required
          class="sf-select--underlined sw-form__select sw-form__input"
          @blur="$v.countryId.$touch()"
        >
          <SfSelectOption
            v-for="countryOption in getMappedCountries"
            :key="countryOption.id"
            :value="countryOption.id"
          >
            {{ countryOption.name }}
          </SfSelectOption>
        </SfSelect>
      </div>
      <SwCheckbox
        v-model="isDifferentShippingAddress"
        name="isDifferentShippingAddress"
        :label="$t('Shipping and billing address do not match.')"
        class="sw-form__input form__element form__element--small"
        @blur="$v.$reset()"
      />

      <!-- TODO: create smaller components for this form after vuelidate upgrade: https://github.com/vuestorefront/shopware-pwa/issues/1472 -->
      <div class="sw-form" v-if="isDifferentShippingAddress">
        <div class="inputs-group">
          <SfSelect
            v-model="alternativeSalutationId"
            :label="$t('Salutation')"
            :error-message="$t('Salutation must be selected')"
            required
            :valid="!$v.alternativeSalutationId.$error"
            class="
              sf-select--underlined
              sw-form__select sw-form__input
              sf-input--has-text
            "
            @blur="$v.alternativeSalutationId.$touch()"
          >
            <SfSelectOption
              v-for="salutationOption in getMappedSalutations"
              :key="salutationOption.id"
              :value="salutationOption.id"
            >
              {{ salutationOption.name }}
            </SfSelectOption>
          </SfSelect>
        </div>
        <div class="inputs-group">
          <SwInput
            v-model="alternativeFirstName"
            name="firstName"
            :label="$t('First name')"
            :error-message="$t('First name is required')"
            :valid="!$v.alternativeFirstName.$error"
            required
            class="sw-form__input"
            @blur="$v.alternativeFirstName.$touch()"
          />
          <SwInput
            v-model="alternativeLastName"
            name="lastName"
            :label="$t('Last name')"
            :error-message="$t('Last name is required')"
            :valid="!$v.alternativeLastName.$error"
            required
            class="sw-form__input"
            @blur="$v.alternativeLastName.$touch()"
          />
        </div>
        <div class="inputs-group">
          <SwInput
            v-model="alternativeStreet"
            name="alternativeStreet"
            :label="$t('Street and house number')"
            :error-message="$t('Street is required')"
            :valid="!$v.alternativeStreet.$error"
            required
            class="sw-form__input"
            @blur="$v.alternativeStreet.$touch()"
          />

          <SwInput
            v-model="alternativeZipcode"
            name="alternativeZipcode"
            :label="$t('Zip code')"
            :error-message="$t('Zip code is required')"
            :valid="!$v.alternativeZipcode.$error"
            required
            class="sw-form__input"
            @blur="$v.alternativeZipcode.$touch()"
          />

          <SwInput
            v-model="alternativeCity"
            name="alternativeCity"
            :label="$t('City')"
            :error-message="$t('City is required')"
            :valid="!$v.alternativeCity.$error"
            required
            class="sw-form__input"
            @blur="$v.alternativeCity.$touch()"
          />
        </div>
        <div class="inputs-group">
          <SfSelect
            v-model="alternativeCountryId"
            :label="$t('Country')"
            :error-message="$t('Country must be selected')"
            :valid="!$v.alternativeCountryId.$error"
            required
            class="sf-select--underlined sw-form__select sw-form__input"
            @blur="$v.alternativeCountryId.$touch()"
          >
            <SfSelectOption
              v-for="countryOption in getMappedCountries"
              :key="countryOption.id"
              :value="countryOption.id"
            >
              {{ countryOption.name }}
            </SfSelectOption>
          </SfSelect>
        </div>
        <SwInput
          v-model="alternativePhoneNumber"
          name="alternativePhoneNumber"
          :label="$t('Phone number')"
          :error-message="$t('Wrong phone number')"
          :valid="!$v.alternativePhoneNumber.$error"
          required
          class="sw-form__input"
          @blur="$v.alternativePhoneNumber.$touch()"
        />
      </div>

      <SwPluginSlot name="registration-form-after" />
    </div>
  </div>
</template>

<script lang="ts">
import { useVuelidate } from "@vuelidate/core"
import { required, requiredIf, email, minLength } from "@vuelidate/validators"
import {
  computed,
  reactive,
  Ref,
  ref,
  toRefs,
  watch,
} from "@vue/composition-api"
import { SfAlert, SfSelect } from "@storefront-ui/vue"
import {
  useCountries,
  useSalutations,
  useSessionContext,
  useUser,
} from "@shopware-pwa/composables"
import { mapCountries, mapSalutations } from "@shopware-pwa/helpers"
import SwInput from "@/components/atoms/SwInput.vue"
import SwPluginSlot from "sw-plugins/SwPluginSlot.vue"
import SwCheckbox from "@/components/atoms/SwCheckbox.vue"

export default {
  name: "SwRegistrationForm",
  components: {
    SfAlert,
    SwInput,
    SfSelect,
    SwCheckbox,
    SwPluginSlot,
  },
  props: {
    allowGuestRegistration: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, { root, emit }) {
    const { refreshSessionContext } = useSessionContext(root)
    const { countryId } = useSessionContext(root)
    const { login, loading } = useUser(root)
    const { getCountries, error: countriesError } = useCountries(root)
    const { getSalutations, error: salutationsError } = useSalutations(root)

    // form data
    const doNotCreateAccount: Ref<boolean> = ref(false)
    const isDifferentShippingAddress: Ref<boolean> = ref(false)

    const state = reactive({
      firstName: "",
      lastName: "",
      email: "",
      salutationId: null,
      countryId: countryId.value,
      street: "",
      city: "",
      zipcode: "",
      password: "",
      alternativeSalutationId: null,
      alternativeFirstName: "",
      alternativeLastName: "",
      alternativeCountryId: countryId.value,
      alternativeStreet: "",
      alternativeCity: "",
      alternativeZipcode: "",
      alternativePhoneNumber: "",
    } as any)
    watch(countryId, () => {
      state.countryId = countryId.value
    })

    const ourResultValue = computed(() => {
      const shippingAddress = {
        firstName: state.alternativeFirstName,
        salutationId:
          state.alternativeSalutationId || getDefaultSalutationId.value,
        lastName: state.alternativeLastName,
        city: state.alternativeCity,
        street: state.alternativeStreet,
        zipcode: state.alternativeZipcode,
        countryId: state.alternativeCountryId || countryId.value,
      }
      return {
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
        password: state.password,
        guest: doNotCreateAccount.value,
        salutationId: state.salutationId || getDefaultSalutationId.value,
        storefrontUrl: root.$routing.pwaHost,
        billingAddress: {
          firstName: state.firstName,
          salutationId: state.salutationId || getDefaultSalutationId.value,
          lastName: state.lastName,
          city: state.city,
          street: state.street,
          zipcode: state.zipcode,
          countryId: state.countryId || countryId.value,
        },
        ...(isDifferentShippingAddress.value && { shippingAddress }),
      }
    })

    const getMappedCountries = computed(() => mapCountries(getCountries.value))
    const getMappedSalutations = computed(() =>
      mapSalutations(getSalutations.value)
    )
    const getDefaultSalutationId = computed(
      () =>
        getSalutations.value?.find(
          (salutation) => salutation.salutationKey === "not_specified"
        )?.id
    )
    watch(
      getDefaultSalutationId,
      () => {
        state.salutationId = getDefaultSalutationId.value
        state.alternativeSalutationId = getDefaultSalutationId.value
      },
      { immediate: true }
    )

    watch(doNotCreateAccount, () => {
      if (!!doNotCreateAccount.value) state.password = ""
    })

    watch(ourResultValue, () => {
      emit("input", ourResultValue.value)
    })

    const rules = {
      salutationId: {},
      firstName: {
        required,
      },
      lastName: {
        required,
      },
      email: {
        required,
        email,
      },
      password: {
        required: requiredIf(function () {
          return !doNotCreateAccount.value
        }),
        minLength: minLength(8),
      },
      street: {
        required,
      },
      zipcode: {
        required,
      },
      city: {
        required,
      },
      countryId: {
        required,
      },
      alternativeSalutationId: {},
      alternativeFirstName: {
        required: requiredIf(function () {
          return !!isDifferentShippingAddress.value
        }),
      },
      alternativeLastName: {
        required: requiredIf(function () {
          return !!isDifferentShippingAddress.value
        }),
      },
      alternativeStreet: {
        required: requiredIf(function () {
          return !!isDifferentShippingAddress.value
        }),
      },
      alternativeZipcode: {
        required: requiredIf(function () {
          return !!isDifferentShippingAddress.value
        }),
      },
      alternativeCity: {
        required: requiredIf(function () {
          return !!isDifferentShippingAddress.value
        }),
      },
      alternativeCountryId: {
        required: requiredIf(function () {
          return !!isDifferentShippingAddress.value
        }),
      },
      alternativePhoneNumber: {
        required: requiredIf(function () {
          return !!isDifferentShippingAddress.value
        }),
      },
    }

    const $v = useVuelidate(rules, state)

    return {
      ...toRefs(state),
      clientLogin: login,
      isLoading: loading,
      countriesError,
      getMappedCountries,
      salutationsError,
      getMappedSalutations,
      refreshSessionContext,
      doNotCreateAccount,
      isDifferentShippingAddress,
      getDefaultSalutationId,
      $v,
      ourResultValue,
    }
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/forms";
</style>
