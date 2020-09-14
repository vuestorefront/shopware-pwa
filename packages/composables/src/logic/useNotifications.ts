import Vue from "vue";
import { computed, reactive, ComputedRef } from "@vue/composition-api";

interface Notification {
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
export const useNotifications = (): {
  notifications: ComputedRef<Notification[]>;
  removeOne: (id: number) => void;
  removeAll: () => void;
  pushInfo: (message: string) => void;
  pushWarning: (message: string) => void;
  pushError: (message: string) => void;
  pushSuccess: (message: string) => void;
} => {
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

  // append an object with id made of current time
  const appendId = (notification: Notification) => ({
    ...notification,
    id: new Date().getTime(),
  });

  const pushNotification = (
    type: "info" | "warning" | "success" | "danger",
    message: string
  ) => {
    sharedNotifications.list.push(
      appendId({
        type,
        message,
      })
    );
  };

  return {
    removeOne,
    removeAll,
    pushInfo: (message: string) => pushNotification("info", message),
    pushSuccess: (message: string) => pushNotification("success", message),
    pushWarning: (message: string) => pushNotification("warning", message),
    pushError: (message: string) => pushNotification("danger", message),
    notifications: computed(() => localNotifications.list),
  };
};
