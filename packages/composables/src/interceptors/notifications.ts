import {
  ApplicationVueContext,
  useNotifications,
} from "@shopware-pwa/composables";

export const addToCartNotification = (
  product: any,
  rootContext: ApplicationVueContext
) => {
  const { pushSuccess } = useNotifications(rootContext);
  pushSuccess(
    `${product?.translated?.name || product?.name} has been added to cart.`
  );
};

export const addPromotionCodeNotification = (
  result: any,
  rootContext: ApplicationVueContext
) => {
  const { pushSuccess, pushError } = useNotifications(rootContext);
  // It's strange that success also ends up as an error in the API response
  const err = <any>Object.values(result.errors)[0];
  if (err) {
    switch (err.messageKey) {
      case "promotion-discount-added":
        pushSuccess(rootContext.i18n.t("Promotion code added successfully"));
        break;
      case "promotion-not-found":
        pushError(rootContext.i18n.t("Promotion code does not exist"));
        break;
      default:
        pushError(err.message.toString());
    }
  }
};
