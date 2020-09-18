import Vue from "vue";
import { computed, reactive, ComputedRef } from "@vue/composition-api";
import { ApplicationVueContext, getApplicationContext } from "../appContext";

/**
 * @beta
 */
export interface Notification {
  type: "info" | "warning" | "success" | "danger";
  message: string;
  id?: number;
}

const sharedNotifications = Vue.observable({
  list: [],
} as {
  list: Notification[];
});

/**
 * @beta
 */
export const useNotifications = (
  rootContext: ApplicationVueContext
): {
  notifications: ComputedRef<Notification[]>;
  removeOne: (id: number) => void;
  removeAll: () => void;
  pushInfo: (message: string, options?: any) => void;
  pushWarning: (message: string, options?: any) => void;
  pushError: (message: string, options?: any) => void;
  pushSuccess: (message: string, options?: any) => void;
} => {
  getApplicationContext(rootContext, "useNotifications");
  const localNotifications = reactive(sharedNotifications);

  /**
   * Remove a specific notification by ID
   */
  const removeOne = (notificationId: number) => {
    const filteredNotifications = sharedNotifications.list.filter(
      ({ id }) => id !== notificationId
    );

    sharedNotifications.list = filteredNotifications;
  };

  /**
   * Reset the notification list
   */
  const removeAll = () => (sharedNotifications.list = []);

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

    const messageId = geterateId();
    sharedNotifications.list.push({
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
    notifications: computed(() => localNotifications.list),
  };
};
