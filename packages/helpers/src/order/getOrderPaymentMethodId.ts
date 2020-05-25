import { Order } from "@shopware-pwa/commons/interfaces/models/checkout/order/Order";

/**
 * get payment method's id from open transaction
 *
 * @alpha
 */
export function getOrderPaymentMethodId(order: Order): string | undefined {
  const openTransaction = order?.transactions?.find(
    ({ stateMachineState }) =>
      stateMachineState?.technicalName === "open"
  );
  return openTransaction?.paymentMethodId;
}
