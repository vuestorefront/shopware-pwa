import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
Vue.use(VueCompositionApi);

import {
  createCheckoutStep,
  VuelidateValidation,
} from "@shopware-pwa/composables";

const getCookie = jest.fn();
const setCookie = jest.fn();
jest.mock("cookie-universal", () => ({
  __esModule: true, // mock as ES6 module
  default: () => ({
    get: getCookie,
    set: setCookie,
  }),
}));

describe("Composables - createCheckoutStep", () => {
  beforeEach(() => {
    jest.resetAllMocks();
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
    const { isValid, validations, someField, otherField } = stepComposable();
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
    const { someField } = stepComposable();
    someField.value = "qwerty";
    expect(initialData.someField).toEqual("qwe");
  });

  it("should call stepDataUpdated on field update", () => {
    const initialData = {
      someField: "qwe",
    };
    const stepDataUpdatedMock = jest.fn();
    const stepComposable = createCheckoutStep({
      stepNumber: 2,
      stepFields: initialData,
      stepDataUpdated: stepDataUpdatedMock,
    });
    const { someField } = stepComposable();
    someField.value = "qwerty";
    expect(stepDataUpdatedMock).toHaveBeenCalledWith({
      isValid: false,
      someField: "qwe",
    });
    expect(stepDataUpdatedMock).toHaveBeenCalledTimes(1);
  });

  it("should override field existing value with cached from cookie", async () => {
    const initialData = {
      someField: "qwe",
    };
    getCookie.mockReturnValueOnce({
      someField: "eeeh",
      isValid: true,
    });
    const stepDataUpdatedMock = jest.fn();
    const stepComposable = createCheckoutStep({
      stepNumber: 2,
      stepFields: initialData,
      stepDataUpdated: stepDataUpdatedMock,
    });
    const { someField } = stepComposable();
    // someField.value = "qwerty";
    await Vue.nextTick();
    expect(getCookie).toHaveBeenCalledWith("sw-checkout-2");
    expect(stepDataUpdatedMock).toHaveBeenCalledWith({
      isValid: false,
      someField: "qwe",
    });
    expect(stepDataUpdatedMock).toHaveBeenCalledWith({
      isValid: true,
      someField: "eeeh",
    });
    expect(stepDataUpdatedMock).toHaveBeenCalledTimes(2);
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
    const { validations } = stepComposable();
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
    const { isValid, setValidations } = stepComposable();
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
    const { isValid, setValidations, validate } = stepComposable();
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
    const { setValidations, someField } = stepComposable();
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
    const { setValidations, someField } = stepComposable();
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
