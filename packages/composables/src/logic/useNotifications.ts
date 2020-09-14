import Vue from "vue";
import { computed, reactive } from "@vue/composition-api";

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
export const useNotifications = () => {
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

  /**
   * Exposed methods to push the notifications by its type
   */
  const pushInfo = (message: string) =>
    sharedNotifications.list.push(
      appendId({
        type: "info",
        message,
      })
    );
  const pushSuccess = (message: string) =>
    sharedNotifications.list.push(
      appendId({
        type: "success",
        message,
      })
    );

  const pushWarning = (message: string) =>
    sharedNotifications.list.push(
      appendId({
        type: "warning",
        message,
      })
    );

  const pushError = (message: string) =>
    sharedNotifications.list.push(
      appendId({
        type: "danger",
        message,
      })
    );

  return {
    removeOne,
    removeAll,
    pushInfo,
    pushSuccess,
    pushWarning,
    pushError,
    notifications: computed(() => localNotifications.list),
  };
};
