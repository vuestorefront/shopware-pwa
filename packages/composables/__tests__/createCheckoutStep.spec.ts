import Vue from "vue";
import VueCompositionApi, { computed, ref } from "@vue/composition-api";
Vue.use(VueCompositionApi);

import { VuelidateValidation } from "@shopware-pwa/composables";

import * as Composables from "@shopware-pwa/composables";
jest.mock("@shopware-pwa/composables");
const mockedComposables = Composables as jest.Mocked<typeof Composables>;

import { createCheckoutStep } from "../src/factories/createCheckoutStep";

const getCookie = jest.fn();
const setCookie = jest.fn();

const rootContextMock: any = {
  $shopwareApiInstance: jest.fn(),
  $cookies: {
    get: getCookie,
    set: setCookie,
  },
};

describe("Composables - createCheckoutStep", () => {
  beforeEach(() => {
    jest.resetAllMocks();

    mockedComposables.useCheckout.mockImplementation(() => {
      return {
        guestOrderParams: ref({}),
        updateGuestOrderParams: jest.fn(),
      } as any;
    });
  });

  it("should create checkout step composable with initial values", () => {
    const stepComposable = createCheckoutStep({
      stepNumber: 2,
      stepFields: {
        someField: "with value",
        otherField: null,
      },
      stepDataUpdated: jest.fn(),
    });
    const { isValid, validations, someField, otherField } = stepComposable(
      rootContextMock
    );
    expect(isValid.value).toEqual(false);
    expect(validations.value).toBeNull();
    expect(someField.value).toEqual("with value");
    expect(otherField.value).toBeNull();
  });

  it("should change not change initialData on update", () => {
    const initialData = {
      someField: "qwe",
    };
    const stepComposable = createCheckoutStep({
      stepNumber: 2,
      stepFields: initialData,
      stepDataUpdated: jest.fn(),
    });
    const { someField } = stepComposable(rootContextMock);
    someField.value = "qwerty";
    expect(initialData.someField).toEqual("qwe");
  });

  it("should call stepDataUpdated on field update", async () => {
    const initialData = {
      someField: "qwe eee",
    };
    const guestOrderParamsValue = computed(() => ({}));
    const stepDataUpdatedMock = jest.fn();
    const stepComposable = createCheckoutStep({
      stepNumber: 2,
      stepFields: initialData,
      stepDataUpdated: stepDataUpdatedMock,
    });
    const { someField } = stepComposable(rootContextMock);
    someField.value = "qwerty";

    await Vue.nextTick();

    expect(stepDataUpdatedMock).toHaveBeenCalledWith(
      {
        isValid: false,
        someField: "qwerty",
      },
      guestOrderParamsValue
    );
    expect(stepDataUpdatedMock).toHaveBeenCalledTimes(2);
  });

  it("should override field existing value with cached from cookie", async () => {
    const initialData = {
      someField: "qwe",
    };
    getCookie.mockReturnValueOnce({
      someField: "eeeh",
      isValid: true,
    });
    const guestOrderParamsValue = computed(() => ({}));
    const stepDataUpdatedMock = jest.fn();
    const stepComposable = createCheckoutStep({
      stepNumber: 2,
      stepFields: initialData,
      stepDataUpdated: stepDataUpdatedMock,
    });
    const { someField } = stepComposable(rootContextMock);
    someField.value = "qwerty";
    await Vue.nextTick();
    expect(getCookie).toHaveBeenCalledWith("sw-checkout-2");
    expect(stepDataUpdatedMock).toHaveBeenCalledWith(
      {
        isValid: false,
        someField: "qwerty",
      },
      guestOrderParamsValue
    );
    expect(stepDataUpdatedMock).toHaveBeenCalledWith(
      {
        isValid: true,
        someField: "eeeh",
      },
      guestOrderParamsValue
    );
    expect(stepDataUpdatedMock).toHaveBeenCalledTimes(2);
    expect(someField.value).toEqual("eeeh");
  });

  it("should override field existing value with cached from cookie without stepDataUpdate", async () => {
    const initialData = {
      someField: "qwe",
    };
    getCookie.mockReturnValueOnce({
      someField: "eeeh",
      isValid: true,
    });
    const stepComposable = createCheckoutStep({
      stepNumber: 2,
      stepFields: initialData,
      stepDataUpdated: null as any,
    });
    const { someField } = stepComposable(rootContextMock);
    someField.value = "qwerty";
    await Vue.nextTick();
    expect(getCookie).toHaveBeenCalledWith("sw-checkout-2");
    expect(someField.value).toEqual("eeeh");
  });

  it("should provide default validation as null", () => {
    const initialData = {
      someField: "qwe",
    };
    const stepComposable = createCheckoutStep({
      stepNumber: 2,
      stepFields: initialData,
      stepDataUpdated: jest.fn(),
    });
    const { validations } = stepComposable(rootContextMock);
    expect(validations.value).toBeNull();
  });

  it("should set vuelidate object for validation", async () => {
    const validationObject: VuelidateValidation = {
      $invalid: true,
      $touch: jest.fn(),
    };
    const initialData = {
      someField: "qwe",
    };
    const stepComposable = createCheckoutStep({
      stepNumber: 2,
      stepFields: initialData,
      stepDataUpdated: jest.fn(),
    });
    const { isValid, setValidations } = stepComposable(rootContextMock);
    setValidations(validationObject);
    await Vue.nextTick();
    expect(isValid.value).toBe(false);
  });

  it("should invoke validation", () => {
    const validationObject: VuelidateValidation = {
      $invalid: true,
      $touch: jest.fn(),
    };
    const initialData = {
      someField: "qwe",
    };
    const stepComposable = createCheckoutStep({
      stepNumber: 2,
      stepFields: initialData,
      stepDataUpdated: jest.fn(),
    });
    const { isValid, setValidations, validate } = stepComposable(
      rootContextMock
    );
    setValidations(validationObject);
    validate();
    expect(isValid.value).toBe(false);
    expect(validationObject.$touch).toBeCalled();
  });

  it("should save cookie on change if validation is set", async () => {
    const validationObject: VuelidateValidation = {
      $invalid: true,
      $touch: jest.fn(),
    };
    const initialData = {
      someField: "qwe",
    };
    const stepDataUpdatedMock = jest.fn();
    const stepComposable = createCheckoutStep({
      stepNumber: 2,
      stepFields: initialData,
      stepDataUpdated: stepDataUpdatedMock,
    });
    const { setValidations, someField } = stepComposable(rootContextMock);
    setValidations(validationObject);
    someField.value = "newValue";
    await Vue.nextTick();
    expect(setCookie).toBeCalledWith(
      "sw-checkout-2",
      { isValid: false, someField: "newValue" },
      { maxAge: 900 }
    );
  });

  it("should not fail if stepDataUpdated method is corrupted", async () => {
    const validationObject: VuelidateValidation = {
      $invalid: true,
      $touch: jest.fn(),
    };
    const initialData = {
      someField: "qwe",
    };
    const stepComposable = createCheckoutStep({
      stepNumber: 2,
      stepFields: initialData,
      stepDataUpdated: null as any,
    });
    const { setValidations, someField } = stepComposable(rootContextMock);
    setValidations(validationObject);
    someField.value = "changedValue";
    await Vue.nextTick();
    expect(setCookie).toBeCalledWith(
      "sw-checkout-2",
      { isValid: false, someField: "changedValue" },
      { maxAge: 900 }
    );
  });
});
