import { computed, reactive, watch, ref } from '@vue/composition-api'
import cookieUniversal from 'cookie-universal'
import { required } from 'vuelidate/lib/validators'

const stepData = reactive({})

const sharedCache = reactive({
  $v: null,
})

const cookies = cookieUniversal()

export const usePersonalDetails = () => {
  // const stepData = reactive(stepData)
  const personalDetailsCache = ref(null)
  // const vuelidateValidations = ref(null)

  const validations = computed(() => sharedCache.$v)
  const isValid = computed(() =>
    validations.value
      ? !validations.value.$invalid
      : personalDetailsCache.value?.isValid
  )

  const salutationId = computed({
    get: () => stepData.salutationId,
    set: (val) => {
      stepData.salutationId = val
    },
  })
  // if (initialSalutationId) salutationId.value = initialSalutationId

  const firstName = computed({
    get: () => stepData.firstName,
    set: (val) => {
      stepData.firstName = val
    },
  })
  // if (initialFirstName) firstName.value = initialFirstName

  const lastName = computed({
    get: () => stepData.lastName,
    set: (val) => {
      stepData.lastName = val
    },
  })
  // if (initialLastName) lastName.value = initialLastName

  const email = computed({
    get: () => stepData.email,
    set: (val) => {
      stepData.email = val
    },
  })
  // if (initialEmail) email.value = initialEmail

  const setValidations = ($v) => {
    sharedCache.$v = $v
  }

  const objectToSave = computed(() => {
    return {
      salutationId: salutationId.value,
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      isValid: isValid.value,
    }
  })
  watch(objectToSave, (value) => {
    if (validations.value) {
      // const cookies = cookieUniversal()
      cookies.set('sw-checkout-0', value, {
        maxAge: 60 * 15, // 15 min to complete checkout,
        sameSite: true,
      })
      console.error('SOOKIES SET!!!')
    } else {
      if (!personalDetailsCache.value) {
        personalDetailsCache.value = cookies.get('sw-checkout-0') || {}
        console.error('COOKIE IS LOADED')
        salutationId.value = personalDetailsCache.value.salutationId
        firstName.value = personalDetailsCache.value.firstName
        lastName.value = personalDetailsCache.value.lastName
        email.value = personalDetailsCache.value.email
      }
    }
  })

  const validate = ($v) => {
    validations.value && validations.value.$touch()
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
