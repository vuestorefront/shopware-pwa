import { UnwrapRef, computed, reactive } from "vue-demi";
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
import { useSharedState, useUser } from "@shopware-pwa/composables";
import { ApplicationVueContext, getApplicationContext } from "../appContext";

/**
 * interface for {@link useCustomerAddress} composable
 *
 * @beta
 */
export interface IUseCustomerAddress {
  errors: UnwrapRef<{
    markAddressAsDefault: ShopwareError[];
  }>;
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
 * Composable for user's addresses management. Options - {@link IUseCustomerAddress}
 *
 * @beta
 */
export function useCustomerAddress(
  rootContext: ApplicationVueContext
): IUseCustomerAddress {
  const { contextName, apiInstance } = getApplicationContext(
    rootContext,
    "useCustomerAddress"
  );

  const { refreshUser } = useUser(rootContext);

  const { sharedRef } = useSharedState(rootContext);
  const storeAddresses = sharedRef<CustomerAddress[]>(
    `${contextName}-addresses`
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
  const addresses = computed(() => storeAddresses.value);
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
        case AddressType.billing:
          await setDefaultCustomerBillingAddress(addressId, apiInstance);
          break;
        case AddressType.shipping:
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

  const loadAddresses = async (): Promise<void> => {
    try {
      const response = await getCustomerAddresses(apiInstance);
      storeAddresses.value = response?.elements;
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
