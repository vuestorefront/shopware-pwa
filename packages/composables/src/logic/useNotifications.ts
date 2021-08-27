import { computed, ComputedRef, Ref } from "vue-demi";
import {
  useSharedState,
  getApplicationContext,
} from "@shopware-pwa/composables";

/**
 * @beta
 */
export interface Notification {
  type: "info" | "warning" | "success" | "danger";
  message: string;
  id?: number;
}

/**
 * @beta
 */
export function useNotifications(): {
  notifications: ComputedRef<Notification[]>;
  removeOne: (id: number) => void;
  removeAll: () => void;
  pushInfo: (message: string, options?: any) => void;
  pushWarning: (message: string, options?: any) => void;
  pushError: (message: string, options?: any) => void;
  pushSuccess: (message: string, options?: any) => void;
} {
  const COMPOSABLE_NAME = "useNotifications";
  const contextName = COMPOSABLE_NAME;

  getApplicationContext({ contextName });
  const { sharedRef } = useSharedState();
  const _notifications: Ref<Notification[] | null> = sharedRef(
    `sw-${contextName}-notifications`,
    []
  );

  /**
   * Remove a specific notification by ID
   */
  const removeOne = (notificationId: number) => {
    _notifications.value =
      _notifications.value?.filter(({ id }) => id !== notificationId) || [];
  };

  /**
   * Reset the notification list
   */
  const removeAll = () => (_notifications.value = []);

  const geterateId = () => new Date().getTime();

  const pushNotification = async (
    message: string,
    options: {
      type: "info" | "warning" | "success" | "danger";
      timeout: number;
      persistent: boolean;
    }
  ) => {
    const timeout = options.timeout || 2500;
    const persistent = !!options.persistent;
    _notifications.value = _notifications.value || [];

    const messageId = geterateId();
    _notifications.value.push({
      id: messageId,
      type: options.type,
      message,
    });
    if (!persistent) {
      setTimeout(() => {
        removeOne(messageId);
      }, timeout);
    }
  };

  return {
    removeOne,
    removeAll,
    pushInfo: (message: string, options = {}) =>
      pushNotification(message, { ...options, type: "info" }),
    pushSuccess: (message: string, options = {}) =>
      pushNotification(message, { ...options, type: "success" }),
    pushWarning: (message: string, options = {}) =>
      pushNotification(message, { ...options, type: "warning" }),
    pushError: (message: string, options = {}) =>
      pushNotification(message, { ...options, type: "danger" }),
    notifications: computed(() => _notifications.value || []),
  };
}
