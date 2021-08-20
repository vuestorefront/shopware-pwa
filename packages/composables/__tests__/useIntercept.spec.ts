import vueComp from "vue-demi";
const mockedCompositionAPI = vueComp as jest.Mocked<typeof vueComp>;

import { useIntercept } from "../src/logic/useIntercept";

describe("Composables - useIntercept", () => {
  let registeredInterceptors: any = {};
  const rootContextMock: any = {
    $shopwareApiInstance: jest.fn(),
    $interceptors: registeredInterceptors,
  };

  mockedCompositionAPI.getCurrentInstance = jest.fn();
  mockedCompositionAPI.onUnmounted = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    registeredInterceptors = {};
    rootContextMock.$interceptors = registeredInterceptors;

    mockedCompositionAPI.getCurrentInstance.mockReturnValue(rootContextMock);
  });

  it("should register new interceptor", () => {
    const { intercept } = useIntercept(rootContextMock);
    intercept("my-event", () => {});
    expect(registeredInterceptors?.["my-event"]?.length).toEqual(1);
  });

  it("should intercept broadcasted event", () => {
    const { intercept, broadcast } = useIntercept(rootContextMock);
    const interceptedMethod = jest.fn();
    intercept("my-event", interceptedMethod);
    broadcast("my-event", { someParam: 123 });
    expect(interceptedMethod).toHaveBeenCalledWith(
      { someParam: 123 },
      rootContextMock
    );
  });

  it("should not intercept disconnected event interceptor", () => {
    const { intercept, broadcast, disconnect } = useIntercept(rootContextMock);
    const interceptedMethod = jest.fn();
    intercept("my-event", interceptedMethod);
    disconnect("my-event", interceptedMethod);
    broadcast("my-event", { someParam: 123 });
    expect(interceptedMethod).not.toHaveBeenCalled();
  });

  it("should register more interceptors", () => {
    const { intercept } = useIntercept(rootContextMock);
    intercept("my-event", () => {});
    intercept("my-event", () => {});
    expect(registeredInterceptors?.["my-event"]?.length).toEqual(2);
  });

  it("should intercept broadcasted event in all registered interceptors", () => {
    const { intercept, broadcast } = useIntercept(rootContextMock);
    const interceptedMethod = jest.fn();
    const secondInterceptedMethod = jest.fn();
    intercept("my-event", interceptedMethod);
    intercept("my-event", secondInterceptedMethod);
    broadcast("my-event", { someParam: 123 });
    expect(interceptedMethod).toHaveBeenCalledWith(
      { someParam: 123 },
      rootContextMock
    );
    expect(secondInterceptedMethod).toHaveBeenCalledWith(
      { someParam: 123 },
      rootContextMock
    );
  });

  it("should not invoke any interceptor if there are no registered methods", () => {
    const { broadcast } = useIntercept(rootContextMock);
    broadcast("my-event", { someParam: 123 });
    expect(registeredInterceptors).toEqual({});
  });

  it("should not invoke any interceptor if there are no registered methods on empty array", () => {
    const { broadcast } = useIntercept(rootContextMock);
    broadcast("my-event", { someParam: 123 });
    expect(registeredInterceptors).toEqual({});
  });

  it("should not fail on disconnect invocation when no interceptor is registered on event", () => {
    const { disconnect } = useIntercept(rootContextMock);
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
    const { intercept, broadcast } = useIntercept(rootContextMock);
    const interceptedMethod = jest.fn();
    intercept("my-event", interceptedMethod);
    expect(mockedCompositionAPI.onUnmounted).toHaveBeenCalled();
    expect(unmountedFunctions.length).toEqual(1);
    unmountedFunctions[0](); // invoke unmounted hook
    broadcast("my-event", { someParam: 123 });
    expect(interceptedMethod).not.toHaveBeenCalled();
  });
});
