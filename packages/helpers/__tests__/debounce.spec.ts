/**
 * @jest-environment jsdom
 */
import { debounce } from "@shopware-pwa/helpers";

describe("Shopware helpers - debounce", () => {
  jest.useFakeTimers();
  it("should invoke passed function in default timeout", () => {
    const func = jest.fn();
    const debouncedFunc = debounce(func);
    debouncedFunc();
    expect(func).not.toBeCalled();
    jest.runAllTimers();
    expect(func).toHaveBeenCalledTimes(1);
  });
  it("should invoke debounce two times and clear the previous invokation", () => {
    const func = jest.fn();
    const debouncedFunc = debounce(func, 500);
    debouncedFunc();
    expect(func).not.toBeCalled();
    debouncedFunc();
    jest.runOnlyPendingTimers();
    expect(func).toHaveBeenCalledTimes(1);
  });
});
