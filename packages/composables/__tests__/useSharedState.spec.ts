import Vue from "vue";
import VueCompositionApi, * as vueComp from "@vue/composition-api";
import { useSharedState } from "@shopware-pwa/composables";
const mockedCompositionAPI = vueComp as jest.Mocked<typeof vueComp>;

Vue.use(VueCompositionApi);

describe("Composables - useSharedState", () => {
  const rootContextMock: any = {
    $shopwareApiInstance: jest.fn(),
  };

  let serverPrefetchMethods: any[] = [];
  beforeEach(() => {
    jest.resetAllMocks();
    rootContextMock.$sharedStore = vueComp.reactive({});
    rootContextMock.$isServer = false;
    serverPrefetchMethods = [];
    mockedCompositionAPI.onServerPrefetch = jest
      .fn()
      .mockImplementation((callback) => serverPrefetchMethods.push(callback));
  });

  it("should return sharedRef and preloadRef methods", () => {
    const result = useSharedState(rootContextMock);
    expect(Object.keys(result)).toEqual(["sharedRef", "preloadRef"]);
  });

  describe("SSR context", () => {
    beforeEach(() => {
      rootContextMock.$isServer = true;
    });

    describe("sharedRef", () => {
      it("should return value from rootContext", () => {
        rootContextMock.$sharedStore["unique-key"] = "test value";
        const { sharedRef } = useSharedState(rootContextMock);
        const result = sharedRef("unique-key");
        expect(result.value).toEqual("test value");
      });

      it("should modify value from rootContext", () => {
        const { sharedRef } = useSharedState(rootContextMock);
        const result = sharedRef("unique-key");
        expect(result.value).toBeNull();
        result.value = "my local change";
        expect(rootContextMock.$sharedStore["unique-key"]).toEqual(
          "my local change"
        );
      });

      it("should preserve the state in root instance", () => {
        const { sharedRef } = useSharedState(rootContextMock);
        const result = sharedRef("test-ssr-preserve-key");
        const result2 = sharedRef("test-ssr-preserve-key");
        expect(result.value).toBeNull();

        result.value = "changed value";
        expect(result2.value).toEqual("changed value");
        expect(rootContextMock.$sharedStore["test-ssr-preserve-key"]).toEqual(
          "changed value"
        );
      });
    });

    describe("preloadRef", () => {
      it("should invoke onServerPrefetch method when ref value is not set", async () => {
        mockedCompositionAPI.getCurrentInstance = jest
          .fn()
          .mockImplementationOnce(() => true as any);
        const someValue = vueComp.ref();
        const { preloadRef } = useSharedState(rootContextMock);
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
        const someValue = vueComp.ref();
        const { preloadRef } = useSharedState(rootContextMock);
        await preloadRef(someValue, async () => {
          someValue.value = "new value";
        });
        expect(mockedCompositionAPI.onServerPrefetch).not.toBeCalled();
        expect(serverPrefetchMethods.length).toEqual(0);

        expect(someValue.value).toEqual("new value");
      });

      it("should not invoke onServerPrefetch method when ref value is set", async () => {
        const someValue = vueComp.ref("initial value");
        const { preloadRef } = useSharedState(rootContextMock);
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
      rootContextMock.$isServer = false;
    });

    describe("sharedRef", () => {
      it("should return value from rootContext", () => {
        rootContextMock.$sharedStore["unique-key"] = "test value";
        const { sharedRef } = useSharedState(rootContextMock);
        const result = sharedRef("unique-key");
        expect(result.value).toEqual("test value");
      });

      it("should not modify value from rootContext in CSR", () => {
        const { sharedRef } = useSharedState(rootContextMock);
        const result = sharedRef("test-modify-key");
        expect(result.value).toBeNull();
        result.value = "my local change";
        expect(result.value).toEqual("my local change");
        expect(rootContextMock.$sharedStore["test-modify-key"]).toBeUndefined();
      });

      it("should preserve the state locally", () => {
        const { sharedRef } = useSharedState(rootContextMock);
        const result = sharedRef("test-preserve-key");
        const result2 = sharedRef("test-preserve-key");
        result.value = "changed value";
        expect(result2.value).toEqual("changed value");
        expect(
          rootContextMock.$sharedStore["test-preserve-key"]
        ).toBeUndefined();
      });
    });

    describe("preloadRef", () => {
      it("should invoke callback method when ref value is not set", async () => {
        const someValue = vueComp.ref();
        const { preloadRef } = useSharedState(rootContextMock);
        preloadRef(someValue, async () => {
          someValue.value = "new value";
        });
        expect(mockedCompositionAPI.onServerPrefetch).not.toBeCalled();

        expect(someValue.value).toEqual("new value");
      });

      it("should not invoke onServerPrefetch method when ref value is set", async () => {
        const someValue = vueComp.ref("initial value");
        const { preloadRef } = useSharedState(rootContextMock);
        preloadRef(someValue, async () => {
          someValue.value = "new value";
        });
        expect(mockedCompositionAPI.onServerPrefetch).not.toBeCalled();

        expect(someValue.value).toEqual("initial value");
      });
    });
  });
});
