import { computed, reactive, watch, ref, toRefs } from '@vue/composition-api'
import cookieUniversal from 'cookie-universal'

const cookies = cookieUniversal()

export function createCheckoutStep({ stepNumber, stepFields }) {
  const stepData = reactive({
    ...stepFields,
    isValid: null,
  })

  const sharedCache = reactive({
    $v: null,
  })

  return () => {
    const stepDataCache = ref(null)

    const validations = computed(() => sharedCache.$v)
    const isValid = computed(() => {
      console.error('RECOMPUTED perisvalid', stepDataCache.value)
      return validations.value
        ? !validations.value.$invalid
        : stepDataCache.value?.isValid
    })

    const setValidations = ($v) => {
      console.error('SET VALIDATION')
      sharedCache.$v = $v
    }

    const objectToSave = computed(() => {
      return {
        ...stepData,
        isValid: isValid.value,
      }
    })
    watch(objectToSave, (value) => {
      console.error('CHANGED OBJECT in step: ' + stepNumber, value)
      if (validations.value) {
        // const cookies = cookieUniversal()
        cookies.set('sw-checkout-' + stepNumber, value, {
          maxAge: 60 * 15, // 15 min to complete checkout,
        })
        console.error('COOKIES SET!!!')
      } else {
        if (!stepDataCache.value) {
          stepDataCache.value = cookies.get('sw-checkout-' + stepNumber) || {}
          console.error('COOKIE IS LOADED', stepDataCache.value)
          Object.assign(stepData, stepDataCache.value)
        }
      }
    })

    const validate = ($v) => {
      validations.value && validations.value.$touch()
    }

    return {
      validations,
      setValidations,
      validate,
      ...toRefs(stepData),
      isValid,
    }
  }
}
