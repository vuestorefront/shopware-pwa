import { Order } from './Order';
import { ShippingMethodPrice } from "../shipping/ShippingMethodPrice";
import { StateMachineStateEntity } from "../../system/state-machine/StateMachineStateEntity";
import { CalculatedPrice } from "../cart/price/CalculatedPrice";
import { OrderAddress } from './OrderAddress';
import { OrderDeliveryPositionCollection } from './OrderDeliveryPositionCollection';
export interface OrderDelivery {
    orderId: string;
    shippingOrderAddressId: string;
    shippingMethodId: string;
    trackingCode: string | null;
    shippingDateEarliest: Date;
    shippingDateLatest: Date;
    shippingCosts: CalculatedPrice;
    shippingOrderAddress: OrderAddress | null;
    stateId: string;
    stateMachineState: StateMachineStateEntity | null;
    shippingMethod: ShippingMethodPrice | null;
    order: Order | null;
    positions: OrderDeliveryPositionCollection | null;
}

