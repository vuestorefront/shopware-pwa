<template>
  <div class="sw-personal-info">
    <slot :user="user">
      <slot name="message">
        <p class="message">
          {{
            $t(
              "Feel free to edit any of your details below so your account is always " +
                "up to date"
            )
          }}
        </p>
      </slot>

      <SwErrorsList
        v-if="getErrorMessage && !isUpdating"
        :list="getErrorMessage"
      />

      <div class="sw-personal-info__form form">
        <slot name="sw-form">
          <div class="inputs-group">
            <SwInput
              v-model="firstName"
              :valid="!$v.firstName.$error"
              :error-message="$t('First name is required')"
              name="firstName"
              :label="$t('First name')"
              class="sw-form__input"
              @blur="$v.firstName.$touch()"
            />
            <SwInput
              v-model="lastName"
              :valid="!$v.lastName.$error"
              :error-message="$t('Last name is required')"
              name="lastName"
              :label="$t('Last name')"
              class="sw-form__input"
              @blur="$v.lastName.$touch()"
            />
          </div>
          <SwInput
            v-model="email"
            :valid="!$v.email.$error"
            :error-message="$t('Proper email is required')"
            name="email"
            :label="$t('Your email')"
            class="sw-form__input"
            @blur="$v.email.$touch()"
          />
          <SwInput
            v-if="isEmailChanging"
            v-model="emailConfirmation"
            :valid="!$v.emailConfirmation.$error"
            :error-message="$t('Must match first one')"
            type="email"
            name="emailConfirmation"
            :label="$t('Confirm e-mail')"
            class="sw-form__input"
            required
            @blur="$v.emailConfirmation.$touch()"
          />
          <SwInput
            v-if="isEmailChanging"
            v-model="password"
            :valid="!$v.password.$error"
            :error-message="$t('Password cannot be empty')"
            type="password"
            name="password"
            :label="$t('Your password')"
            class="sw-form__input"
            required
            @blur="$v.password.$touch()"
          />
          <SwButton
            class="sw-form__button"
            :disabled="$v.$invalid && !isEmailChanging && !isNameChanging"
            @click="invokeUpdate"
          >
            {{ $t("Save Changes") }}
          </SwButton>
          <SfIcon
            v-if="isUpdating"
            :color="updated ? 'green-primary' : 'gray-primary'"
            size="14px"
            icon="check"
            style="margin-left: 10px"
          />
        </slot>
      </div>
    </slot>
  </div>
</template>

<script>
import { ref, computed, toRefs, reactive } from "@vue/composition-api"
import useVuelidate from "@vuelidate/core"
import {
  required,
  email,
  requiredIf,
  minLength,
  sameAs,
} from "@vuelidate/validators"
import { SfIcon } from "@storefront-ui/vue"
import { useNotifications, useUser } from "@shopware-pwa/composables"
import SwButton from "@/components/atoms/SwButton.vue"
import SwInput from "@/components/atoms/SwInput.vue"
import SwErrorsList from "@/components/SwErrorsList.vue"

export default {
  name: "SwPersonalInfo",
  components: {
    SwInput,
    SwButton,
    SwErrorsList,
    SfIcon,
  },
  setup(props, { root }) {
    const {
      user,
      errors: userError,
      updatePersonalInfo,
      refreshUser,
      updateEmail,
    } = useUser()

    const { pushSuccess } = useNotifications()

    const updated = ref(false)
    const isUpdating = ref(false)
    const salutation = computed(() =>
      user.value?.salutation
        ? {
            name: user.value.salutation?.displayName,
            id: user.value.salutation?.id,
          }
        : {}
    )

    const state = reactive({
      firstName: user.value?.firstName,
      lastName: user.value?.lastName,
      email: user.value?.email,
      emailConfirmation: "",
      password: "",
      salutation,
    })

    const refs = toRefs(state)

    const isEmailChanging = computed(() => state.email !== user.value?.email)
    const isNameChanging = computed(
      () =>
        state.firstName !== user.value?.firstName ||
        state.lastName !== user.value?.lastName
    )
    const getErrorMessage = computed(() => userError.updateEmail || [])

    const emailConfirmationValidationRule = computed(() =>
      isEmailChanging.value
        ? {
            required,
            email,
            sameAsEmail: sameAs(refs.email),
          }
        : {}
    )

    const validationRules = {
      firstName: {
        required,
      },
      lastName: {
        required,
      },
      email: {
        email,
        required,
      },
      emailConfirmation: emailConfirmationValidationRule.value, // take a dynamic one
      password: {
        required: requiredIf(function (password) {
          return isEmailChanging.value
        }),
        minLength: minLength(8),
      },
    }

    const $v = useVuelidate(validationRules, state)

    const invokeUpdate = async () => {
      updated.value = false
      $v.value.$touch()
      if (
        $v.value.$invalid ||
        (!isNameChanging.value && !isEmailChanging.value)
      ) {
        return
      }
      isUpdating.value = true

      if (isNameChanging.value) {
        const profileChanged = await updatePersonalInfo({
          firstName: state.firstName,
          lastName: state.lastName,
          salutationId: state.salutation.id,
        })
        updated.value = profileChanged
      }
      if (isEmailChanging.value) {
        const emailChanged = await updateEmail({
          email: state.email,
          emailConfirmation: state.emailConfirmation,
          password: state.password,
        })
        updated.value = emailChanged
      }

      isUpdating.value = false
      if (!getErrorMessage.value?.length) {
        pushSuccess(root.$t("You profile has been updated."))
      }

      refreshUser()
    }

    return {
      invokeUpdate,
      user,
      $v,
      isUpdating,
      updated,
      isEmailChanging,
      isNameChanging,
      getErrorMessage,
      ...refs,
    }
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/forms";

.message {
  margin: 0 0 var(--spacer-xl) 0;
  color: var(--c-dark-variant);
}
</style>
