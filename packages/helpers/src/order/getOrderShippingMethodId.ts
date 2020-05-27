import { Order } from "@shopware-pwa/commons/interfaces/models/checkout/order/Order";

/**
 * get shipping method's id from open transaction
 *
 * @alpha
 */
export function getOrderShippingMethodId(order: Order): string | undefined {
  const openDelivery = order?.deliveries?.find(
    ({ stateMachineState }) => stateMachineState?.technicalName === "open"
  );
  return openDelivery?.shippingMethodId;
}
