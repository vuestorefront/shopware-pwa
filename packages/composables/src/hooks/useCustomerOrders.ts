import { ref, Ref, UnwrapRef, reactive, ComputedRef, computed } from "vue-demi";
import {
  getCustomerOrders,
  getOrderDetails as apiGetOrderDetails,
} from "@shopware-pwa/shopware-6-client";
import {
  Order,
  ShopwareError,
  ShopwareSearchParams,
} from "@shopware-pwa/commons/interfaces";
import { useDefaults, getApplicationContext } from "@shopware-pwa/composables";
import { EntityResult } from "@shopware-pwa/commons";

/**
 * interface for {@link useCustomerOrders} composable
 *
 * @beta
 */
export interface IUseCustomerOrders {
  orders: Ref<Order[] | null>;
  getTotal: ComputedRef<number>;
  getCurrentPage: ComputedRef<number>;
  getTotalPagesCount: ComputedRef<number>;
  getLimit: ComputedRef<number>;
  changeCurrentPage: (pageNumber?: number | string) => Promise<void>;
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
  const ordersResult: Ref<EntityResult<"order", Order[]> | null> = ref(null);

  const loadOrders = async (
    parameters: ShopwareSearchParams = {}
  ): Promise<void> => {
    const fetchedOrders = await getCustomerOrders(
      Object.assign({}, getDefaults(), parameters),
      apiInstance
    );
    ordersResult.value = fetchedOrders;
  };

  const getTotal = computed(() => {
    /** We will update the new way to get total after BE add it into response api */
    const aggregations: any = ordersResult.value?.aggregations;
    return aggregations?.['count-id']?.count || 0;
  });

  const getLimit = computed(() => {
    return ordersResult.value?.limit || 10;
  });

  const getTotalPagesCount = computed(() =>
    Math.ceil(getTotal.value / getLimit.value)
  );

  const orders = computed(() =>
    ordersResult.value?.elements || []
  );

  const getCurrentPage = computed(() => ordersResult.value?.page || 1);
  const changeCurrentPage = async (pageNumber: number | string) => {
    await loadOrders({ page: +pageNumber });
  };

  const getOrderDetails = async (
    orderId: string,
    params?: ShopwareSearchParams
  ): Promise<Order | undefined> =>
    apiGetOrderDetails(orderId, params, apiInstance);

  return {
    orders,
    getCurrentPage,
    changeCurrentPage,
    getTotalPagesCount,
    getTotal,
    getLimit,
    loadOrders,
    getOrderDetails,
    errors,
  };
}
