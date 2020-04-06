import { computed, reactive, watch, ref, toRefs } from "@vue/composition-api";
import cookieUniversal from "cookie-universal";

const cookies = cookieUniversal();

export function createCheckoutStep({ stepNumber, stepFields, data }) {
  const stepData = reactive({
    ...stepFields,
    isValid: null,
  });

  const sharedCache = reactive({
    $v: null,
  });

  return () => {
    const stepDataCache = ref(null);

    const validations = computed(() => sharedCache.$v);
    const isValid = computed(() => {
      return validations.value
        ? !validations.value.$invalid
        : stepDataCache.value?.isValid;
    });

    const setValidations = ($v) => {
      sharedCache.$v = $v;
    };

    const objectToSave = computed(() => {
      return {
        ...stepData,
        isValid: isValid.value,
      };
    });
    watch(objectToSave, (value) => {
      if (validations.value) {
        // const cookies = cookieUniversal()
        cookies.set("sw-checkout-" + stepNumber, value, {
          maxAge: 60 * 15, // 15 min to complete checkout,
        });
        if (data) data.value = value;
      } else {
        if (!stepDataCache.value) {
          stepDataCache.value = cookies.get("sw-checkout-" + stepNumber) || {};
          Object.assign(stepData, stepDataCache.value);
          if (data) data.value = objectToSave.value;
        }
      }
    });

    const validate = ($v) => {
      validations.value && validations.value.$touch();
    };

    return {
      validations,
      setValidations,
      validate,
      ...toRefs(stepData),
      isValid,
    };
  };
}
