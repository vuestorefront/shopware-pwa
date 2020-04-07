import {
  computed,
  reactive,
  watch,
  ref,
  toRefs,
  Ref,
} from "@vue/composition-api";
import cookieUniversal from "cookie-universal";

const cookies = cookieUniversal();

export interface CheckoutStepFields {
  [property: string]: unknown;
}

export interface VuelidateValidation {
  $invalid: boolean;
  $touch: () => void;
}
export function createCheckoutStep({
  stepNumber,
  stepFields,
  stepDataUpdated,
}: {
  stepNumber: number;
  stepFields: CheckoutStepFields;
  stepDataUpdated: (updatedData: CheckoutStepFields) => void;
}) {
  const stepData = reactive({
    ...stepFields,
    isValid: null,
  });

  const sharedCache: { $v: VuelidateValidation | null } = reactive({
    $v: null,
  });

  return () => {
    const stepDataCache: Ref<{ isValid: boolean } | null> = ref(null);

    const validations = computed(() => sharedCache.$v);
    const isValid = computed(() => {
      return validations.value
        ? !validations.value.$invalid
        : stepDataCache.value?.isValid;
    });

    const setValidations = ($v: VuelidateValidation) => {
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
        if (stepDataUpdated) stepDataUpdated(value);
      } else {
        if (!stepDataCache.value) {
          stepDataCache.value = cookies.get("sw-checkout-" + stepNumber) || {};
          Object.assign(stepData, stepDataCache.value);
          if (stepDataUpdated) stepDataUpdated(value);
        }
      }
    });

    const validate = () => {
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
