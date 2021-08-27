import { ref, Ref, UnwrapRef, reactive } from "vue-demi";
import { getCustomerOrders } from "@shopware-pwa/shopware-6-client";
import { Order } from "@shopware-pwa/commons/interfaces/models/checkout/order/Order";
import { ShopwareError } from "@shopware-pwa/commons/interfaces/errors/ApiError";
import { useDefaults, getApplicationContext } from "@shopware-pwa/composables";
import { ShopwareSearchParams } from "@shopware-pwa/commons/interfaces/search/SearchCriteria";

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

  return {
    orders,
    loadOrders,
    errors,
  };
}
