import { getOrderShippingMethodId } from "@shopware-pwa/helpers";

describe("Shopware helpers - getOrderShippingMethodId", () => {
  it("should return undefined if order is an empty object", () => {
    const order: any = {};
    const shippingMethodId = getOrderShippingMethodId(order);
    expect(shippingMethodId).toBeUndefined();
  });
  it("should return undefined if order parameter is uncomplete", () => {
    const order: any = {
      deliveries: [
        {
          shippingMethodId: "closed-1234",
        },
      ],
    };
    const shippingMethodId = getOrderShippingMethodId(order);
    expect(shippingMethodId).toBeUndefined();
  });
  it("should return undefined if there is no argument provided", () => {
    const shippingMethodId = getOrderShippingMethodId(undefined as any);
    expect(shippingMethodId).toBeUndefined();
  });
  it("should return shippind method id for first open delivery", () => {
    const order: any = {
      deliveries: [
        {
          shippingMethodId: "closed-1234",
          stateMachineState: {
            technicalName: "closed",
          },
        },
        {
          shippingMethodId: "open-12345",
          stateMachineState: {
            technicalName: "open",
          },
        },
      ],
    };
    const shippingMethodId = getOrderShippingMethodId(order);
    expect(shippingMethodId).toBe("open-12345");
  });
});
