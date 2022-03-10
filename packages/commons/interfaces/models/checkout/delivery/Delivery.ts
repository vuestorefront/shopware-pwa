import { ShippingMethod } from "../shipping/ShippingMethod";
import { StateMachineState } from "../../system/state-machine/StateMachineState";
import { ShippingAddress } from "@shopware-pwa/commons";

/**
 * @public
 */
export interface Delivery {
  apiAlias: string;
  createdAt: string;
  customFields: unknown | null;
  extensions: unknown;
  id: string;
  orderId: string;
  orderVersionId: string;
  positions: unknown | null;
  shippingCosts: {
    unitPrice: number;
    quantity: number;
    listPrice: number | null;
    apiAlias: string;
  };
  shippingDateEarliest: string;
  shippingDateLatest: string;
  shippingMethod: ShippingMethod;
  shippingMethodId: string;
  shippingOrderAddress: ShippingAddress;
  shippingOrderAddressId: string;
  shippingOrderAddressVersionId: string;
  stateId: string;
  stateMachineState: StateMachineState;
  trackingCodes: unknown[];
  translated: unknown[];
  updatedAt: string | null;
  versionId: string;
  _uniqueIdentifier: string;
}
