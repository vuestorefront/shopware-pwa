import Vue from "vue";
import VueCompositionApi, * as vueComp from "@vue/composition-api";
import {
  addPromotionCodeNotification,
  addToCartNotification,
  useNotifications,
} from "@shopware-pwa/composables";

const mockedCompositionAPI = vueComp as jest.Mocked<typeof vueComp>;

Vue.use(VueCompositionApi);

describe("Composables - notifications", () => {
  const rootContextMock: any = {
    $store: jest.fn(),
    $shopwareApiInstance: jest.fn(),
    i18n: { t: jest.fn() },
  };

  mockedCompositionAPI.getCurrentInstance = jest.fn();
  mockedCompositionAPI.onUnmounted = jest.fn();
  beforeEach(() => {
    const { removeAll } = useNotifications(rootContextMock);
    removeAll();
    jest.resetAllMocks();
  });

  it("addToCartNotification", () => {
    const { notifications } = useNotifications(rootContextMock);
    addToCartNotification(
      {
        name: "product name",
      },
      rootContextMock
    );
    expect(notifications.value).toHaveLength(1);
    expect(notifications.value[0].type).toBe("success");
  });

  it("addPromotionCodeNotification success", () => {
    const { notifications } = useNotifications(rootContextMock);
    addPromotionCodeNotification(
      {
        errors: [
          {
            messageKey: "promotion-discount-added",
          },
        ],
      },
      rootContextMock
    );
    expect(notifications.value).toHaveLength(1);
    expect(notifications.value[0].type).toBe("success");
  });

  it("addPromotionCodeNotification error", () => {
    const { notifications } = useNotifications(rootContextMock);
    addPromotionCodeNotification(
      {
        errors: [
          {
            messageKey: "promotion-not-found",
          },
        ],
      },
      rootContextMock
    );
    expect(notifications.value).toHaveLength(1);
    expect(notifications.value[0].type).toBe("danger");
  });

  it("addPromotionCodeNotification not found", () => {
    const { notifications } = useNotifications(rootContextMock);
    addPromotionCodeNotification(
      {
        errors: [
          {
            messageKey: "some-message-key",
            message: "some-message",
          },
        ],
      },
      rootContextMock
    );
    expect(notifications.value).toHaveLength(1);
    expect(notifications.value[0].type).toBe("danger");
  });

  it("addPromotionCodeNotification no error", () => {
    const { notifications } = useNotifications(rootContextMock);
    addPromotionCodeNotification({ errors: [] }, rootContextMock);
    expect(notifications.value).toHaveLength(0);
  });
});
