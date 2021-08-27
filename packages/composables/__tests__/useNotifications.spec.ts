import { ref } from "vue-demi";
import * as Composables from "@shopware-pwa/composables";
jest.mock("@shopware-pwa/composables");
const mockedComposables = Composables as jest.Mocked<typeof Composables>;

import { useNotifications } from "../src/logic/useNotifications";

describe("Composables - useNotifications", () => {
  const stateSharedRef = ref();

  beforeEach(() => {
    jest.resetAllMocks();
    stateSharedRef.value = null;

    mockedComposables.useSharedState.mockImplementation(() => {
      return {
        sharedRef: () => stateSharedRef,
      } as any;
    });
  });
  describe("pushNotifications", () => {
    it("should not remove a notification with persistant option after timout", () => {
      jest.useFakeTimers();
      const { pushError, notifications } = useNotifications();
      pushError("An error occured", {
        persistent: true,
      });
      expect(notifications.value).toHaveLength(1);
      jest.runOnlyPendingTimers();
      expect(notifications.value).toHaveLength(1);
    });
    it("should add a notification with all required fields", () => {
      const { pushError, notifications } = useNotifications();
      pushError("An error occured");
      expect(notifications.value[0]).toHaveProperty("id");
      expect(notifications.value[0]).toHaveProperty("message");
      expect(notifications.value[0]).toHaveProperty("type");
    });
    it("should have an danger type notification", () => {
      const { pushError, notifications } = useNotifications();
      pushError("An error occured");
      const notification = notifications.value.pop();
      expect(notification?.message).toEqual("An error occured");
      expect(notification?.type).toEqual("danger");
    });
    it("should have an info type notification", () => {
      const { pushInfo, notifications } = useNotifications();
      pushInfo("Some info");
      const notification = notifications.value.pop();
      expect(notification?.message).toEqual("Some info");
      expect(notification?.type).toEqual("info");
    });
    it("should have a warning type notification", () => {
      const { pushWarning, notifications } = useNotifications();
      pushWarning("Some warning");
      const notification = notifications.value.pop();
      expect(notification?.message).toEqual("Some warning");
      expect(notification?.type).toEqual("warning");
    });
    it("should have a success type notification", () => {
      const { pushSuccess, notifications } = useNotifications();
      pushSuccess("Some success");
      const notification = notifications.value.pop();
      expect(notification?.message).toEqual("Some success");
      expect(notification?.type).toEqual("success");
    });
  });

  describe("removeAll", () => {
    it("should reset the notifications list", () => {
      const { pushError, notifications, removeAll } = useNotifications();
      pushError("An error occured");
      expect(notifications.value).toHaveLength(1);
      removeAll();
      expect(notifications.value).toHaveLength(0);
    });
  });
  describe("removeOne", () => {
    it("should remove a notification by its ID", () => {
      jest.spyOn(Date.prototype, "getTime").mockReturnValue(1600081318135);
      const { pushError, notifications, removeOne } = useNotifications();
      pushError("An error occured");
      expect(notifications.value).toHaveLength(1);
      removeOne(1600081318135);
      expect(notifications.value).toHaveLength(0);
    });
    it("should remove an item after the given timeout", () => {
      jest.useFakeTimers();
      jest.spyOn(Date.prototype, "getTime").mockReturnValue(1600081318135);
      const { pushError, notifications } = useNotifications();
      pushError("An error occured", { persistent: false });
      expect(notifications.value).toHaveLength(1);
      jest.runOnlyPendingTimers();
      expect(notifications.value).toHaveLength(0);
    });

    it("should do nothing on not existing notification removal", () => {
      const { removeOne, notifications } = useNotifications();
      expect(notifications.value).toHaveLength(0);
      removeOne(1600081318135);
      expect(notifications.value).toHaveLength(0);
    });
  });
});
