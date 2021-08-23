import { useSharedState } from "../src/logic/useSharedState";

import vueComp, { ref, reactive } from "vue-demi";
import { prepareRootContextMock } from "./contextRunner";
const mockedCompositionAPI = vueComp as jest.Mocked<typeof vueComp>;

import * as Composables from "@shopware-pwa/composables";
jest.mock("@shopware-pwa/composables");
const mockedComposables = Composables as jest.Mocked<typeof Composables>;

describe("Composables - useSharedState", () => {
  const rootContextMock = prepareRootContextMock();
  mockedCompositionAPI.getCurrentInstance = jest.fn();

  let serverPrefetchMethods: any[] = [];
  beforeEach(() => {
    jest.resetAllMocks();
    rootContextMock.sharedStore = reactive({});
    rootContextMock.isServer = false;
    serverPrefetchMethods = [];

    mockedCompositionAPI.getCurrentInstance.mockImplementation(
      () => rootContextMock
    );

    mockedCompositionAPI.onServerPrefetch = jest
      .fn()
      .mockImplementation((callback) => serverPrefetchMethods.push(callback));
    mockedComposables.getApplicationContext.mockReturnValue(rootContextMock);
  });

  it("should return sharedRef and preloadRef methods", () => {
    const result = useSharedState();
    expect(Object.keys(result)).toEqual(["sharedRef", "preloadRef"]);
  });

  it("should throw an error when sharedStore is not injected into Vue instance", () => {
    mockedComposables.getApplicationContext.mockReturnValue({
      apiInstance: rootContextMock.apiInstance,
    } as any);
    expect(() => useSharedState()).toThrow(
      "[useSharedState] sharedStore is not injected into Vue instance"
    );
  });

  describe("SSR context", () => {
    beforeEach(() => {
      rootContextMock.isServer = true;
    });

    describe("sharedRef", () => {
      it("should return value from rootContext", () => {
        rootContextMock.sharedStore["unique-key"] = "test value";
        const { sharedRef } = useSharedState();
        const result = sharedRef("unique-key");
        expect(result.value).toEqual("test value");
      });

      it("should modify value from rootContext", () => {
        const { sharedRef } = useSharedState();
        const result = sharedRef("unique-key");
        expect(result.value).toBeNull();
        result.value = "my local change";
        expect(rootContextMock.sharedStore["unique-key"]).toEqual(
          "my local change"
        );
      });

      it("should preserve the state in root instance", () => {
        const { sharedRef } = useSharedState();
        const result = sharedRef("test-ssr-preserve-key");
        const result2 = sharedRef("test-ssr-preserve-key");
        expect(result.value).toBeNull();

        result.value = "changed value";
        expect(result2.value).toEqual("changed value");
        expect(rootContextMock.sharedStore["test-ssr-preserve-key"]).toEqual(
          "changed value"
        );
      });

      it("should set default value for ref", () => {
        const { sharedRef } = useSharedState();
        const result = sharedRef("unique-key", "some default value");
        const result2 = sharedRef("unique-key");
        expect(result.value).toEqual("some default value");
        expect(result2.value).toEqual("some default value");
      });

      it("should set default value for first ref", () => {
        const { sharedRef } = useSharedState();
        const result = sharedRef("unique-key");
        const result2 = sharedRef("unique-key", "other default value");
        expect(result.value).toEqual("other default value");
        expect(result2.value).toEqual("other default value");
      });

      it("should not overwrite value with default value", () => {
        rootContextMock.sharedStore["unique-key"] = "test value";
        const { sharedRef } = useSharedState();
        const result = sharedRef("unique-key", "some default value");
        expect(result.value).toEqual("test value");
      });

      it("should not overwrite numeric value", () => {
        rootContextMock.sharedStore["unique-key"] = 0;
        const { sharedRef } = useSharedState();
        const result = sharedRef("unique-key", "some default value");
        expect(result.value).toEqual(0);
      });

      it("should not overwrite boolean value", () => {
        rootContextMock.sharedStore["unique-key"] = false;
        const { sharedRef } = useSharedState();
        const result = sharedRef("unique-key", "some default value");
        expect(result.value).toEqual(false);
      });
    });

    describe("preloadRef", () => {
      it("should invoke onServerPrefetch method when ref value is not set", async () => {
        const someValue = ref();
        const { preloadRef } = useSharedState();
        preloadRef(someValue, async () => {
          someValue.value = "new value";
        });
        expect(mockedCompositionAPI.onServerPrefetch).toBeCalledTimes(1);
        expect(serverPrefetchMethods.length).toEqual(1);

        await serverPrefetchMethods[0]();

        expect(someValue.value).toEqual("new value");
      });

      it("should not invoke onServerPrefetch method when ref value is not set, instead just invoke callback", async () => {
        mockedCompositionAPI.getCurrentInstance = jest
          .fn()
          .mockImplementationOnce(() => false as any);
        const someValue = ref();
        const { preloadRef } = useSharedState();
        await preloadRef(someValue, async () => {
          someValue.value = "new value";
        });
        expect(mockedCompositionAPI.onServerPrefetch).not.toBeCalled();
        expect(serverPrefetchMethods.length).toEqual(0);

        expect(someValue.value).toEqual("new value");
      });

      it("should not invoke onServerPrefetch method when ref value is set", async () => {
        const someValue = ref("initial value");
        const { preloadRef } = useSharedState();
        preloadRef(someValue, async () => {
          someValue.value = "new value";
        });
        expect(mockedCompositionAPI.onServerPrefetch).not.toBeCalled();
        expect(serverPrefetchMethods.length).toEqual(0);

        expect(someValue.value).toEqual("initial value");
      });
    });
  });

  describe("CSR context", () => {
    beforeEach(() => {
      rootContextMock.isServer = false;
    });

    describe("sharedRef", () => {
      it("should return value from rootContext", () => {
        rootContextMock.sharedStore["unique-key"] = "test value";
        const { sharedRef } = useSharedState();
        const result = sharedRef("unique-key");
        expect(result.value).toEqual("test value");
      });

      it("should not modify value from rootContext in CSR", () => {
        const { sharedRef } = useSharedState();
        const result = sharedRef("test-modify-key");
        expect(result.value).toBeNull();
        result.value = "my local change";
        expect(result.value).toEqual("my local change");
        expect(rootContextMock.sharedStore["test-modify-key"]).toBeUndefined();
      });

      it("should preserve the state locally", () => {
        const { sharedRef } = useSharedState();
        const result = sharedRef("test-preserve-key");
        const result2 = sharedRef("test-preserve-key");
        result.value = "changed value";
        expect(result2.value).toEqual("changed value");
        expect(
          rootContextMock.sharedStore["test-preserve-key"]
        ).toBeUndefined();
      });
    });

    describe("preloadRef", () => {
      it("should invoke callback method when ref value is not set", async () => {
        const someValue = ref();
        const { preloadRef } = useSharedState();
        preloadRef(someValue, async () => {
          someValue.value = "new value";
        });
        expect(mockedCompositionAPI.onServerPrefetch).not.toBeCalled();

        expect(someValue.value).toEqual("new value");
      });

      it("should not invoke onServerPrefetch method when ref value is set", async () => {
        const someValue = ref("initial value");
        const { preloadRef } = useSharedState();
        preloadRef(someValue, async () => {
          someValue.value = "new value";
        });
        expect(mockedCompositionAPI.onServerPrefetch).not.toBeCalled();

        expect(someValue.value).toEqual("initial value");
      });
    });
  });
});
