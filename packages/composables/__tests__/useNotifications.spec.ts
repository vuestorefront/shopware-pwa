import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
Vue.use(VueCompositionApi);
import { useNotifications } from "@shopware-pwa/composables";

describe("Composables - useNotifications", () => {
  const { removeAll } = useNotifications();

  beforeEach(() => {
    jest.resetAllMocks();
    removeAll();
  });
  describe("pushNotifications", () => {
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
  });
});
