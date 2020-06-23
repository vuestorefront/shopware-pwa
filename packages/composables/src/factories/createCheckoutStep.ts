import {
  computed,
  reactive,
  watch,
  ref,
  toRefs,
  Ref,
} from "@vue/composition-api";
import { useCheckout, getApplicationContext } from "@shopware-pwa/composables";
import { GuestOrderParams } from "@shopware-pwa/commons/interfaces/request/GuestOrderParams";
import { ApplicationVueContext } from "../appContext";

/**
 * @alpha
 */
export interface CheckoutStepFields {
  [property: string]: unknown;
}

/**
 * @alpha
 */
export interface VuelidateValidation {
  $invalid: boolean;
  $touch: () => void;
}

/**
 * @alpha
 */
export interface CreateCheckoutStep {
  isValid: Readonly<Ref<boolean>>;
  validations: Readonly<Ref<Readonly<VuelidateValidation> | null>>;
  setValidations: ($v: VuelidateValidation) => void;
  validate: () => void;
  [property: string]: any;
}

/**
 * @alpha
 */
export function createCheckoutStep({
  stepNumber,
  stepFields,
  stepDataUpdated,
}: {
  stepNumber: number;
  stepFields: CheckoutStepFields;
  stepDataUpdated: (
    updatedData: CheckoutStepFields,
    guestOrderParams: Ref<Readonly<Partial<GuestOrderParams>>>
  ) => Partial<GuestOrderParams>;
}) {
  const stepData = reactive({
    ...stepFields,
    isValid: null,
  });

  const sharedCache: { $v: VuelidateValidation | null } = reactive({
    $v: null,
  });

  return (rootContext: ApplicationVueContext): CreateCheckoutStep => {
    getApplicationContext(rootContext, "checkoutStep");
    const stepDataCache: Ref<{ isValid: boolean } | null> = ref(null);
    const { guestOrderParams, updateGuestOrderParams } = useCheckout(
      rootContext
    );

    const validations = computed(() => sharedCache.$v);
    const isValid = computed(() => {
      return validations.value
        ? !validations.value.$invalid
        : !!stepDataCache.value?.isValid;
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
        rootContext.$cookies.set("sw-checkout-" + stepNumber, value, {
          maxAge: 60 * 15, // 15 min to complete checkout,
        });
        if (stepDataUpdated)
          updateGuestOrderParams(stepDataUpdated(value, guestOrderParams));
      } else {
        if (!stepDataCache.value) {
          stepDataCache.value =
            rootContext.$cookies.get("sw-checkout-" + stepNumber) || {};
          Object.assign(stepData, stepDataCache.value);
        }
        if (stepDataUpdated)
          updateGuestOrderParams(stepDataUpdated(value, guestOrderParams));
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
