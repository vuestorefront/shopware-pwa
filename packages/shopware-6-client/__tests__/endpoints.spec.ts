import {
  getProductEndpoint,
  getProductDetailsEndpoint,
  getCategoryEndpoint,
  getCategoryDetailsEndpoint,
  getCustomerAddressEndpoint,
  getCustomerEndpoint,
  getCustomerLoginEndpoint,
  getCustomerLogoutEndpoint,
  getCustomerOrderEndpoint,
  getCheckoutCartEndpoint,
  getCheckoutCartLineItemEndpoint,
  getCheckoutOrderEndpoint,
  getContextCurrencyEndpoint,
  getContextLanguageEndpoint,
  getContextCountryEndpoint,
  getContextPaymentMethodEndpoint,
  getContextShippingMethodEndpoint,
  getContextSalutationEndpoint,
  getNewsletterSubscribeEndpoint,
  getNewsletterUnsubscribeEndpoint,
  getStoreNewsletterSubscribeEndpoint,
  getStoreNewsletterConfirmEndpoint,
  getStoreNewsletterUnsubscribeEndpoint,
  getStoreNavigationEndpoint,
  handlePaymentEndpoint,
  getContactFormEndpoint,
  getConfirmPasswordResetEndpoint,
  getProductReviewsEndpoint,
  getNewsletterRecipientEnpoint,
} from "../src/endpoints";

const sampleProductId = "eea0f69ec02d44f7a4224272b3d99478";
const sampleCategoryId = "03dfd5badd3d43bd8a345ef660761e09";

describe("endpoints", () => {
  describe("getProductEndpoint", () => {
    it("should return Shopware product endpoint", async () => {
      const result = getProductEndpoint();
      expect(result).toEqual("/store-api/product");
    });
  });

  describe("getProductReviewsEndpoint", () => {
    it("should return Shopware product review endpoint", async () => {
      const result = getProductReviewsEndpoint(sampleProductId);
      expect(result).toEqual(
        "/store-api/product/" + sampleProductId + "/reviews"
      );
    });
  });

  describe("getProductDetailsEndpoint", () => {
    it("should return Shopware product details endpoint", async () => {
      const result = getProductDetailsEndpoint(sampleProductId);
      expect(result).toEqual("/store-api/product/" + sampleProductId);
    });
  });

  describe("getCategoryEndpoint", () => {
    it("should return Shopware category endpoint", async () => {
      const result = getCategoryEndpoint();
      expect(result).toEqual("/store-api/category");
    });
  });

  describe("getCategoryDetailsEndpoint", () => {
    it("should return Shopware category details endpoint", async () => {
      const result = getCategoryDetailsEndpoint(sampleCategoryId);
      expect(result).toEqual("/store-api/category/" + sampleCategoryId);
    });
  });

  describe("getCustomerAddressEndpoint", () => {
    it("should return Shopware address endpoint", async () => {
      const result = getCustomerAddressEndpoint();
      expect(result).toEqual("/store-api/account/list-address");
    });
  });

  describe("getCustomerEndpoint", () => {
    it("should return Shopware customer endpoint", async () => {
      const result = getCustomerEndpoint();
      expect(result).toEqual("/store-api/account/customer");
    });
  });

  describe("getCustomerLoginEndpoint", () => {
    it("should return Shopware customer login endpoint", async () => {
      const result = getCustomerLoginEndpoint();
      expect(result).toEqual("/store-api/account/login");
    });
  });

  describe("getCustomerLogoutEndpoint", () => {
    it("should return Shopware customer logout endpoint", async () => {
      const result = getCustomerLogoutEndpoint();
      expect(result).toEqual("/store-api/account/logout");
    });
  });

  describe("getCustomerOrderEndpoint", () => {
    it("should return Shopware customer order endpoint", async () => {
      const result = getCustomerOrderEndpoint();
      expect(result).toEqual("/store-api/order");
    });
  });

  describe("getCheckoutCartEndpoint", () => {
    it("should return Shopware checkout-cart endpoint", async () => {
      const result = getCheckoutCartEndpoint();
      expect(result).toEqual("/store-api/checkout/cart");
    });
  });

  describe("getCheckoutCartLineItemEndpoint", () => {
    it("should return Shopware checkout-cart-lineItem endpoint", async () => {
      const result = getCheckoutCartLineItemEndpoint();
      expect(result).toEqual("/store-api/checkout/cart/line-item");
    });
  });

  describe("getCheckoutOrderEndpoint", () => {
    it("should return Shopware checkout-order endpoint", async () => {
      const result = getCheckoutOrderEndpoint();
      expect(result).toEqual("/store-api/checkout/order");
    });
  });

  describe("getContextCurrencyEndpoint", () => {
    it("should return Shopware currency endpoint", async () => {
      const result = getContextCurrencyEndpoint();
      expect(result).toEqual("/store-api/currency");
    });
  });

  describe("getContextLanguageEndpoint", () => {
    it("should return Shopware language endpoint", async () => {
      const result = getContextLanguageEndpoint();
      expect(result).toEqual("/store-api/language");
    });
  });

  describe("getContextCountryEndpoint", () => {
    it("should return Shopware country endpoint", async () => {
      const result = getContextCountryEndpoint();
      expect(result).toEqual("/store-api/country");
    });
  });

  describe("getContextPaymentMethodEndpoint", () => {
    it("should return Shopware payment method endpoint", async () => {
      const result = getContextPaymentMethodEndpoint();
      expect(result).toEqual("/store-api/payment-method");
    });
  });
  describe("getContextShippingMethodEndpoint", () => {
    it("should return Shopware shipping method endpoint", async () => {
      const result = getContextShippingMethodEndpoint();
      expect(result).toEqual("/store-api/shipping-method");
    });
  });

  describe("getContextSalutationEndpoint", () => {
    it("should return Shopware salutation endpoint", async () => {
      const result = getContextSalutationEndpoint();
      expect(result).toEqual("/store-api/salutation");
    });
  });

  describe("getNewsletterSubscribeEndpoint", () => {
    it("should return Shopware newsletter subscribe endpoint", async () => {
      const result = getNewsletterSubscribeEndpoint();
      expect(result).toEqual("/newsletter/subscribe");
    });
  });

  describe("getNewsletterUnsubscribeEndpoint", () => {
    it("should return Shopware newsletter unsubscribe endpoint", async () => {
      const result = getNewsletterUnsubscribeEndpoint();
      expect(result).toEqual("/newsletter/unsubscribe");
    });
  });

  describe("getNewsletterRecipientEnpoint", () => {
    it("should return Shopware newsletter recipient endpoint", async () => {
      const result = getNewsletterRecipientEnpoint();
      expect(result).toEqual("/store-api/account/newsletter-recipient");
    });
  });

  describe("getStoreNavigationEndpoint", () => {
    it("should return store navigation endpoint", async () => {
      const result = getStoreNavigationEndpoint(
        "footer-navigation",
        "footer-navigation"
      );
      expect(result).toEqual(
        "/store-api/navigation/footer-navigation/footer-navigation"
      );
    });
  });

  describe("handlePaymentEndpoint", () => {
    it("should return handle payment method url endpoint", async () => {
      const result = handlePaymentEndpoint();
      expect(result).toEqual(`/store-api/handle-payment`);
    });
  });

  describe("getContactFormEndpoint", () => {
    it("should return contact form url endpoint", async () => {
      const result = getContactFormEndpoint();
      expect(result).toEqual(`/store-api/contact-form`);
    });
  });

  describe("getStoreNewsletterSubscribeEndpoint", () => {
    it("should return Shopware newsletter subscribe URL endpoint", async () => {
      const result = getStoreNewsletterSubscribeEndpoint();
      expect(result).toEqual("/store-api/newsletter/subscribe");
    });
  });

  describe("getStoreNewsletterConfirmEndpoint", () => {
    it("should return Shopware newsletter confirm URL endpoint", async () => {
      const result = getStoreNewsletterConfirmEndpoint();
      expect(result).toEqual("/store-api/newsletter/confirm");
    });
  });

  describe("getStoreNewsletterUnsubscribeEndpoint", () => {
    it("should return Shopware newsletter unsubscribe URL endpoint", async () => {
      const result = getStoreNewsletterUnsubscribeEndpoint();
      expect(result).toEqual("/store-api/newsletter/unsubscribe");
    });
  });
  describe("getConfirmPasswordResetEndpoint", () => {
    it("should return correct endpoint for reset password confirmation action", () => {
      const result = getConfirmPasswordResetEndpoint();
      expect(result).toBe("/store-api/account/recovery-password-confirm");
    });
  });
});
