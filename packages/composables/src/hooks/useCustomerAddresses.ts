import { ComputedRef, UnwrapRef, computed, reactive } from "vue-demi";
import {
  getCustomerAddresses,
  setDefaultCustomerBillingAddress,
  setDefaultCustomerShippingAddress,
  deleteCustomerAddress,
  createCustomerAddress,
  updateCustomerAddress,
} from "@shopware-pwa/shopware-6-client";
import {
  CustomerAddress,
  AddressType,
} from "@shopware-pwa/commons/interfaces/models/checkout/customer/CustomerAddress";
import {
  ClientApiError,
  ShopwareError,
} from "@shopware-pwa/commons/interfaces/errors/ApiError";
import {
  useSharedState,
  useUser,
  useDefaults,
  getApplicationContext,
} from "@shopware-pwa/composables";
import { ShopwareSearchParams } from "@shopware-pwa/commons/interfaces/search/SearchCriteria";

/**
 * interface for {@link useCustomerAddresses} composable
 *
 * @beta
 */
export interface IUseCustomerAddresses {
  errors: UnwrapRef<{
    markAddressAsDefault: ShopwareError[];
    loadAddresses: ShopwareError[];
    addAddress: ShopwareError[];
    updateAddress: ShopwareError[];
    deleteAddress: ShopwareError[];
  }>;
  addresses: ComputedRef<CustomerAddress[]>;
  loadAddresses: () => Promise<void>;
  addAddress: (params: Partial<CustomerAddress>) => Promise<string | undefined>;
  updateAddress: (
    params: Partial<CustomerAddress>
  ) => Promise<string | undefined>;
  deleteAddress: (addressId: string) => Promise<boolean>;
  markAddressAsDefault: ({
    addressId,
    type,
  }: {
    addressId?: string;
    type?: AddressType;
  }) => Promise<string | boolean>;
}

/**
 * Composable for user's addresses management. Options - {@link IUseCustomerAddresses}
 *
 * @beta
 */
export function useCustomerAddresses(): IUseCustomerAddresses {
  const COMPOSABLE_NAME = "useCustomerAddresses";
  const contextName = COMPOSABLE_NAME;

  const { apiInstance } = getApplicationContext({ contextName });
  const { getDefaults } = useDefaults({ defaultsKey: contextName });

  const { refreshUser } = useUser();

  const { sharedRef } = useSharedState();
  const storeAddresses = sharedRef<CustomerAddress[]>(
    `${contextName}-addresses`,
    []
  );

  const errors: UnwrapRef<{
    markAddressAsDefault: ShopwareError[];
    updateAddress: ShopwareError[];
    addAddress: ShopwareError[];
    deleteAddress: ShopwareError[];
    loadAddresses: ShopwareError[];
  }> = reactive({
    markAddressAsDefault: [],
    updateAddress: [],
    addAddress: [],
    deleteAddress: [],
    loadAddresses: [],
  });
  const addresses = computed(() => storeAddresses.value || []);

  /**
   * Set address as default
   */
  const markAddressAsDefault = async ({
    addressId,
    type,
  }: {
    addressId?: string;
    type?: AddressType;
  }): Promise<boolean> => {
    if (!addressId || !type) {
      return false;
    }

    try {
      switch (type) {
        case "billing":
          await setDefaultCustomerBillingAddress(addressId, apiInstance);
          break;
        case "shipping":
          await setDefaultCustomerShippingAddress(addressId, apiInstance);
          break;
        default:
          return false;
      }
      await refreshUser();
    } catch (e) {
      const err: ClientApiError = e;
      errors.markAddressAsDefault = err.messages;
      return false;
    }

    return true;
  };

  /**
   * Edit address
   */
  const updateAddress = async (
    params: Partial<CustomerAddress>
  ): Promise<string | undefined> => {
    try {
      const { id } = await updateCustomerAddress(params, apiInstance);
      return id;
    } catch (e) {
      const err: ClientApiError = e;
      errors.updateAddress = err.messages;
    }
  };

  /**
   * Add new address
   */
  const addAddress = async (
    params: Partial<CustomerAddress>
  ): Promise<string | undefined> => {
    try {
      const { id } = await createCustomerAddress(params, apiInstance);
      return id;
    } catch (e) {
      const err: ClientApiError = e;
      errors.addAddress = err.messages;
    }
  };

  /**
   * Delete an address
   */
  const deleteAddress = async (addressId: string): Promise<boolean> => {
    try {
      await deleteCustomerAddress(addressId, apiInstance);
      return true;
    } catch (e) {
      const err: ClientApiError = e;
      errors.deleteAddress = err.messages;
    }

    return false;
  };

  /**
   * Fetch addresses
   */
  const loadAddresses = async (
    params: ShopwareSearchParams = {}
  ): Promise<void> => {
    try {
      const response = await getCustomerAddresses(
        Object.assign({}, getDefaults(), params),
        apiInstance
      );
      storeAddresses.value = response.elements;
    } catch (e) {
      const err: ClientApiError = e;
      errors.loadAddresses = err.messages;
    }
  };

  return {
    addresses,
    errors,
    loadAddresses,
    markAddressAsDefault,
    addAddress,
    updateAddress,
    deleteAddress,
  };
}
