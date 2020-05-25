import { getOrderPaymentMethodId } from "@shopware-pwa/helpers";

describe("Shopware helpers - getOrderShippingMethodId", () => {
  it("should return undefined if order parameter is uncomplete", () => {
    const order: any = {
      transactions: [
        {
          paymentMethodId: "closed-1234",
        },
      ],
    };

    const paymentMethodId = getOrderPaymentMethodId(order);
    expect(paymentMethodId).toBeUndefined();
  });
  it("should return undefined if order is an empty object", () => {
    const order: any = {};
    const paymentMethodId = getOrderPaymentMethodId(order);
    expect(paymentMethodId).toBeUndefined();
  });
  it("should return undefined if there is no argument provided", () => {
    const paymentMethodId = getOrderPaymentMethodId(undefined as any);
    expect(paymentMethodId).toBeUndefined();
  });
  it("should return payment method id for first open transaction", () => {
    const order: any = {
      transactions: [
        {
          paymentMethodId: "closed-1234",
          stateMachineState: {
            technicalName: "closed",
          },
        },
        {
          paymentMethodId: "open-12345",
          stateMachineState: {
            technicalName: "open",
          },
        },
      ],
    };
    const paymentMethodId = getOrderPaymentMethodId(order);
    expect(paymentMethodId).toBe("open-12345");
  });
});
