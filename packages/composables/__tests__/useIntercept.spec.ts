import vueComp from "vue-demi";
const mockedCompositionAPI = vueComp as jest.Mocked<typeof vueComp>;

import * as Composables from "@shopware-pwa/composables";
jest.mock("@shopware-pwa/composables");
const mockedComposables = Composables as jest.Mocked<typeof Composables>;

import { useIntercept } from "../src/logic/useIntercept";
import { prepareRootContextMock } from "./contextRunner";

describe("Composables - useIntercept", () => {
  let registeredInterceptors: any = {};
  const rootContextMock = prepareRootContextMock();

  const myTestInterceptor = {
    broadcastKey: "my-event",
    name: "some-action",
    handler: jest.fn(),
  };

  mockedCompositionAPI.onUnmounted = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    registeredInterceptors = {};
    rootContextMock.devtools = null;
    rootContextMock.interceptors = registeredInterceptors;

    mockedCompositionAPI.getCurrentInstance = jest
      .fn()
      .mockReturnValue({} as any);
    mockedComposables.getApplicationContext.mockReturnValue(rootContextMock);
  });

  it("should register new interceptor", () => {
    const { intercept } = useIntercept();
    intercept("my-event", () => {});
    expect(registeredInterceptors?.["my-event"]?.length).toEqual(1);
  });

  it("should add devtool warning when using intercept method", () => {
    rootContextMock.devtools = {
      warning: jest.fn(),
      log: jest.fn(),
    };
    const { intercept } = useIntercept();
    intercept("my-event", () => {});
    expect(rootContextMock.devtools.warning).toBeCalledWith(
      "[useIntercept][intercept] Anonymous interceptor registration for key: my-event use 'on' method instead"
    );
  });

  it("should register new interceptor", () => {
    const { on } = useIntercept();
    on(myTestInterceptor);
    expect(registeredInterceptors?.["my-event"]?.length).toEqual(1);
  });

  it("should display devtools log on new interceptor registration", () => {
    rootContextMock.devtools = {
      warning: jest.fn(),
      log: jest.fn(),
    };
    const { on } = useIntercept();
    on(myTestInterceptor);
    expect(rootContextMock.devtools.log).toBeCalledWith(
      "[useIntercept][on] Registered interceptor",
      myTestInterceptor
    );
  });

  it("should intercept broadcasted event", () => {
    const { intercept, broadcast } = useIntercept();
    const interceptedMethod = jest.fn();
    intercept("my-event", interceptedMethod);
    broadcast("my-event", { someParam: 123 });
    expect(interceptedMethod).toHaveBeenCalledWith({ someParam: 123 });
  });

  it("should intercept broadcasted event", () => {
    const { on, broadcast } = useIntercept();
    on(myTestInterceptor);
    broadcast("my-event", { someParam: 123 });
    expect(myTestInterceptor.handler).toHaveBeenCalledWith({ someParam: 123 });
  });

  it("should not intercept disconnected event interceptor", () => {
    const { intercept, broadcast, disconnect } = useIntercept();
    const interceptedMethod = jest.fn();
    intercept("my-event", interceptedMethod);
    disconnect("my-event", interceptedMethod);
    broadcast("my-event", { someParam: 123 });
    expect(interceptedMethod).not.toHaveBeenCalled();
  });

  it("should log to devtool when attepting to disconnect interceptor by method", () => {
    rootContextMock.devtools = {
      log: jest.fn(),
    };
    const { disconnect } = useIntercept();
    const interceptedMethod = jest.fn();
    disconnect("my-event", interceptedMethod);
    expect(rootContextMock.devtools.log).toHaveBeenCalledWith(
      "[useIntercept][disconnect] Disconnecting interceptor",
      {
        broadcastKey: "my-event",
        interceptor: interceptedMethod,
      }
    );
  });

  it("should log to devtool when attepting to disconnect interceptor by interceptor name", () => {
    rootContextMock.devtools = {
      log: jest.fn(),
    };
    const { disconnect } = useIntercept();
    const interceptorName = "some-name";
    disconnect("my-event", interceptorName);
    expect(rootContextMock.devtools.log).toHaveBeenCalledWith(
      "[useIntercept][disconnect] Disconnecting interceptor",
      {
        broadcastKey: "my-event",
        interceptor: "some-name",
      }
    );
  });

  it("should not intercept disconnected event interceptor", () => {
    const { on, broadcast, disconnect } = useIntercept();
    on(myTestInterceptor);
    disconnect("my-event", myTestInterceptor.name);
    broadcast("my-event", { someParam: 123 });
    expect(myTestInterceptor.handler).not.toHaveBeenCalled();
  });

  it("should register more interceptors", () => {
    const { intercept } = useIntercept();
    intercept("my-event", () => {});
    intercept("my-event", () => {});
    expect(registeredInterceptors?.["my-event"]?.length).toEqual(2);
  });

  it("should register more interceptors", () => {
    const { on } = useIntercept();
    on(myTestInterceptor);
    on({
      broadcastKey: "my-event",
      name: "second-interceptor",
      handler: jest.fn(),
    });
    expect(registeredInterceptors?.["my-event"]?.length).toEqual(2);
  });

  it("should intercept broadcasted event in all registered interceptors", () => {
    const { intercept, broadcast } = useIntercept();
    const interceptedMethod = jest.fn();
    const secondInterceptedMethod = jest.fn();
    intercept("my-event", interceptedMethod);
    intercept("my-event", secondInterceptedMethod);
    broadcast("my-event", { someParam: 123 });
    expect(interceptedMethod).toHaveBeenCalledWith({ someParam: 123 });
    expect(secondInterceptedMethod).toHaveBeenCalledWith({ someParam: 123 });
  });

  it("should intercept broadcasted event in all registered interceptors", () => {
    const { on, broadcast } = useIntercept();
    const secondInterceptor = {
      broadcastKey: "my-event",
      name: "second-interceptor",
      handler: jest.fn(),
    };
    on(myTestInterceptor);
    on(secondInterceptor);
    broadcast("my-event", { someParam: 123 });
    expect(myTestInterceptor.handler).toHaveBeenCalledWith({ someParam: 123 });
    expect(secondInterceptor.handler).toHaveBeenCalledWith({ someParam: 123 });
  });

  it("should log to devtools broadcast invocation event", () => {
    const eventMockMethod = jest.fn();
    rootContextMock.devtools = {
      log: jest.fn(),
      trackEvent: jest.fn().mockImplementation(() => ({
        log: eventMockMethod,
      })),
    };
    const { on, broadcast } = useIntercept();
    const secondInterceptor = {
      broadcastKey: "my-event",
      name: "second-interceptor",
      handler: jest.fn(),
    };
    on(myTestInterceptor);
    on(secondInterceptor);
    const broadcastPayload = { someParam: 123 };
    broadcast("my-event", broadcastPayload);
    expect(rootContextMock.devtools.trackEvent).toBeCalledWith(
      "[useIntercept][broadcast] my-event",
      broadcastPayload
    );
    expect(eventMockMethod).toBeCalledWith(
      "Run interceptor: some-action",
      broadcastPayload
    );
    expect(eventMockMethod).toBeCalledWith(
      "Run interceptor: second-interceptor",
      broadcastPayload
    );
    expect(eventMockMethod).toBeCalledWith("Broadcast ended", broadcastPayload);
  });

  it("should not invoke any interceptor if there are no registered methods", () => {
    const { broadcast } = useIntercept();
    broadcast("my-event", { someParam: 123 });
    expect(registeredInterceptors).toEqual({});
  });

  it("should not invoke any interceptor if there are no registered methods on empty array", () => {
    const { broadcast } = useIntercept();
    broadcast("my-event", { someParam: 123 });
    expect(registeredInterceptors).toEqual({});
  });

  it("should not fail on disconnect invocation when no interceptor is registered on event", () => {
    const { disconnect } = useIntercept();
    const interceptedMethod = jest.fn();
    disconnect("my-event", interceptedMethod);
    expect(registeredInterceptors?.["my-event"]).toEqual([]);
  });

  it("should disconnect interceptor when it's registered in component which is unmounted", () => {
    const unmountedFunctions: Array<Function> = [];
    mockedCompositionAPI.onUnmounted.mockImplementationOnce((fn) => {
      unmountedFunctions.push(fn);
      return fn;
    });
    const { intercept, broadcast } = useIntercept();
    const interceptedMethod = jest.fn();
    intercept("my-event", interceptedMethod);
    expect(mockedCompositionAPI.onUnmounted).toHaveBeenCalled();
    expect(unmountedFunctions.length).toEqual(1);
    unmountedFunctions[0](); // invoke unmounted hook
    broadcast("my-event", { someParam: 123 });
    expect(interceptedMethod).not.toHaveBeenCalled();
  });
});
