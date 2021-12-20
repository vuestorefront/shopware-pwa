import { ref, Ref, UnwrapRef, reactive } from "vue-demi";
import {
  getCustomerOrders,
  getOrderDetails as apiGetOrderDetails,
} from "@shopware-pwa/shopware-6-client";
import { Order } from "@shopware-pwa/commons/interfaces";
import { ShopwareError } from "@shopware-pwa/commons/interfaces";
import { useDefaults, getApplicationContext } from "@shopware-pwa/composables";
import { ShopwareSearchParams } from "@shopware-pwa/commons/interfaces";

/**
 * interface for {@link useCustomerOrders} composable
 *
 * @beta
 */
export interface IUseCustomerOrders {
  orders: Ref<Order[] | null>;
  errors: UnwrapRef<{
    loadOrders: ShopwareError[];
  }>;
  loadOrders: () => Promise<void>;
  getOrderDetails: (orderId: string) => Promise<Order | undefined>;
}

/**
 * Composable for listing customer orders. Options - {@link IUseCustomerOrders}
 *
 * @beta
 */
export function useCustomerOrders(): IUseCustomerOrders {
  const COMPOSABLE_NAME = "useCustomerOrders";
  const contextName = COMPOSABLE_NAME;

  const { apiInstance } = getApplicationContext({ contextName });

  const { getDefaults } = useDefaults({ defaultsKey: contextName });

  const errors: UnwrapRef<{
    loadOrders: ShopwareError[];
  }> = reactive({
    loadOrders: [],
  });
  const orders: Ref<Order[] | null> = ref(null);

  const loadOrders = async (
    parameters: ShopwareSearchParams = {}
  ): Promise<void> => {
    const fetchedOrders = await getCustomerOrders(
      Object.assign({}, getDefaults(), parameters),
      apiInstance
    );
    orders.value = fetchedOrders;
  };

  const getOrderDetails = async (
    orderId: string,
    params?: ShopwareSearchParams
  ): Promise<Order | undefined> =>
    apiGetOrderDetails(orderId, params, apiInstance);

  return {
    orders,
    loadOrders,
    getOrderDetails,
    errors,
  };
}
