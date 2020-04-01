import { computed, reactive, ref } from '@vue/composition-api'
import cookieUniversal from 'cookie-universal'
import { required } from 'vuelidate/lib/validators'

const sharedState = reactive({
  validations: null,
  salutationId: null,
  firstName: null,
  lastName: null,
  email: null,
})

export const usePersonalDetails = ({
  salutationId: initialSalutationId,
  firstName: initialFirstName,
  lastName: initialLastName,
  email: initialEmail,
} = {}) => {
  const localState = reactive(sharedState)

  const validations = computed(() => localState.validations)
  const isValid = computed(
    () => validations.value && !validations.value.$invalid
  )

  const salutationId = computed({
    get: () => localState.salutationId,
    set: (val) => {
      sharedState.salutationId = val
    },
  })
  if (initialSalutationId) salutationId.value = initialSalutationId

  const firstName = computed({
    get: () => localState.firstName,
    set: (val) => {
      sharedState.firstName = val
    },
  })
  if (initialFirstName) firstName.value = initialFirstName

  const lastName = computed({
    get: () => localState.lastName,
    set: (val) => {
      sharedState.lastName = val
    },
  })
  if (initialLastName) lastName.value = initialLastName

  const email = computed({
    get: () => localState.email,
    set: (val) => {
      sharedState.email = val
    },
  })
  if (initialEmail) email.value = initialEmail

  const setValidations = ($v) => {
    sharedState.validations = $v
  }

  const validate = ($v) => {
    validations.value && validations.value.$touch()
    const objectToSave = {
      salutationId: salutationId.value,
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
    }
    console.error('VALIDATE salid', objectToSave)
    console.error('IS VALID', isValid.value)
    if (isValid.value) {
      const cookies = cookieUniversal()
      cookies.set('sw-checkout-0', JSON.stringify(objectToSave), {
        maxAge: 60 * 15, // 15 min to complete checkout,
        sameSite: true,
      })
      console.error('SOOKIES SET!!!')
    }
  }

  return {
    validations,
    setValidations,
    isValid,
    validate,
    salutationId,
    firstName,
    lastName,
    email,
  }
}

export const usePersonalDetailsValidationRules = {
  salutationId: {
    required,
  },
  firstName: {
    required,
  },
  lastName: {
    required,
  },
}
