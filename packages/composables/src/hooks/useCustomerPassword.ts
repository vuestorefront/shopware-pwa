import { UnwrapRef, reactive } from "vue-demi";
import {
  updatePassword as apiUpdatePassword,
  resetPassword as apiResetPassword,
  CustomerUpdatePasswordParam,
  CustomerResetPasswordParam,
} from "@shopware-pwa/shopware-6-client";
import {
  ClientApiError,
  ShopwareError,
} from "@shopware-pwa/commons/interfaces";
import { getApplicationContext } from "@shopware-pwa/composables";

/**
 * interface for {@link useCustomerPassword} composable
 *
 * @beta
 */
export interface IUseCustomerPassword {
  errors: UnwrapRef<{
    resetPassword: ShopwareError[];
    updatePassword: ShopwareError[];
  }>;
  updatePassword: (
    updatePasswordData: CustomerUpdatePasswordParam
  ) => Promise<boolean>;
  resetPassword: (
    resetPasswordData: CustomerResetPasswordParam
  ) => Promise<boolean>;
}

/**
 * Composable for customer password management. Options - {@link IUseCustomerPassword}
 *
 * @beta
 */
export function useCustomerPassword(): IUseCustomerPassword {
  const COMPOSABLE_NAME = "useCustomerPassword";
  const contextName = COMPOSABLE_NAME;

  const { apiInstance } = getApplicationContext({ contextName });

  const errors: UnwrapRef<{
    resetPassword: ShopwareError[];
    updatePassword: ShopwareError[];
  }> = reactive({
    resetPassword: [],
    updatePassword: [],
  });

  /**
   * Change customer's current password
   */
  const updatePassword = async (
    updatePasswordData: CustomerUpdatePasswordParam
  ): Promise<boolean> => {
    try {
      errors.updatePassword = [];
      await apiUpdatePassword(updatePasswordData, apiInstance);
    } catch (e) {
      errors.updatePassword = (e as ClientApiError).messages;
      return false;
    }
    return true;
  };

  /**
   * Reset customer's password
   */
  const resetPassword = async (
    resetPasswordData: CustomerResetPasswordParam
  ): Promise<boolean> => {
    try {
      await apiResetPassword(resetPasswordData, apiInstance);
    } catch (e) {
      errors.resetPassword = (e as ClientApiError).messages;
      return false;
    }
    return true;
  };

  return {
    updatePassword,
    resetPassword,
    errors,
  };
}
