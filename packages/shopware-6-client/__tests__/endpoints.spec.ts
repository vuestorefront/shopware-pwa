import {
  getProductEndpoint,
  getProductDetailsEndpoint,
  getCategoryEndpoint,
  getCategoryDetailsEndpoint,
  getCustomerAddressEndpoint,
  getCustomerAddressSetDefaultShippingEndpoint,
  getCustomerAddressSetDefaultBillingEndpoint,
  getCustomerEndpoint,
  getCustomerDetailsEndpoint,
  getCustomerLoginEndpoint,
  getCustomerLogoutEndpoint,
  getCustomerOrderEndpoint,
  getCheckoutCartEndpoint,
  getCheckoutCartLineItemEndpoint,
  getCheckoutPromotionCodeEndpoint,
  getCheckoutOrderEndpoint,
  getCheckoutGuestOrderEndpoint,
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
  getProductsIdsEndpoint,
  getNavigationEndpoint,
  getStoreNavigationEndpoint,
  getCustomerOrderDetailsEndpoint,
  getContextSalutationItemEndpoint,
  getStoreOrderPaymentUrlEndpoint,
  getContactFormEndpoint,
} from "../src/endpoints";

const sampleProductId = "eea0f69ec02d44f7a4224272b3d99478";
const sampleAddressId = "324af469318f46b68e0fe69d77ef15fb";
const sampleCustomerId = "8b67c1fbb718487db750651430023298";
const sampleSalutationId = "27356105cf9b4484b96143881c37bbcb";

describe("endpoints", () => {
  describe("getProductEndpoint", () => {
    it("should return Shopware product endpoint", async () => {
      const result = getProductEndpoint();
      expect(result).toEqual("/sales-channel-api/v3/product");
    });
  });

  describe("getProductDetailsEndpoint", () => {
    it("should return Shopware product details endpoint", async () => {
      const result = getProductDetailsEndpoint(sampleProductId);
      expect(result).toEqual("/store-api/v4/product/" + sampleProductId);
    });
  });

  describe("getProductsIdsEndpoint", () => {
    it("should return Shopware product details endpoint", async () => {
      const result = getProductsIdsEndpoint();
      expect(result).toEqual("/store-api/v4/product");
    });
  });

  describe("getCategoryEndpoint", () => {
    it("should return Shopware category endpoint", async () => {
      const result = getCategoryEndpoint();
      expect(result).toEqual("/store-api/v4/category");
    });
  });

  describe("getCategoryDetailsEndpoint", () => {
    it("should return Shopware category details endpoint", async () => {
      const result = getCategoryDetailsEndpoint();
      expect(result).toEqual("/store-api/v4/category");
    });
  });

  describe("getCustomerAddressEndpoint", () => {
    it("should return Shopware address endpoint", async () => {
      const result = getCustomerAddressEndpoint();
      expect(result).toEqual("/store-api/v4/account/address");
    });
  });

  describe("getCustomerAddressSetDefaultShippingEndpoint", () => {
    it("should return Shopware set default shipping address endpoint", async () => {
      const result = getCustomerAddressSetDefaultShippingEndpoint(
        sampleAddressId
      );
      expect(result).toEqual(
        `/store-api/v4/account/address/default-shipping/${sampleAddressId}`
      );
    });
  });

  describe("getCustomerAddressSetDefaultBillingEndpoint", () => {
    it("should return Shopware set default billing address endpoint", async () => {
      const result = getCustomerAddressSetDefaultBillingEndpoint(
        sampleAddressId
      );
      expect(result).toEqual(
        `/store-api/v4/account/address/default-billing/${sampleAddressId}`
      );
    });
  });

  describe("getCustomerEndpoint", () => {
    it("should return Shopware customer endpoint", async () => {
      const result = getCustomerEndpoint();
      expect(result).toEqual("/store-api/v4/account/customer");
    });
  });

  describe("getCustomerDetailsEndpoint", () => {
    it("should return Shopware customer details endpoint", async () => {
      const result = getCustomerDetailsEndpoint(sampleCustomerId);
      expect(result).toEqual("/store-api/v4/customer/" + sampleCustomerId);
    });
  });

  describe("getCustomerLoginEndpoint", () => {
    it("should return Shopware customer login endpoint", async () => {
      const result = getCustomerLoginEndpoint();
      expect(result).toEqual("/store-api/v4/account/login");
    });
  });

  describe("getCustomerLogoutEndpoint", () => {
    it("should return Shopware customer logout endpoint", async () => {
      const result = getCustomerLogoutEndpoint();
      expect(result).toEqual("/store-api/v4/account/logout");
    });
  });

  describe("getCustomerOrderEndpoint", () => {
    it("should return Shopware customer order endpoint", async () => {
      const result = getCustomerOrderEndpoint();
      expect(result).toEqual("/store-api/v4/order");
    });
  });

  describe("getCustomerOrderDetailsEndpoint", () => {
    it("should return Shopware customer order details endpoint", async () => {
      const result = getCustomerOrderDetailsEndpoint("12345-ab");
      expect(result).toEqual(
        "/sales-channel-api/v3/checkout/guest-order/12345-ab"
      );
    });
  });

  describe("getCheckoutCartEndpoint", () => {
    it("should return Shopware checkout-cart endpoint", async () => {
      const result = getCheckoutCartEndpoint();
      expect(result).toEqual("/store-api/v4/checkout/cart");
    });
  });

  describe("getCheckoutCartLineItemEndpoint", () => {
    it("should return Shopware checkout-cart-lineItem endpoint", async () => {
      const result = getCheckoutCartLineItemEndpoint();
      expect(result).toEqual("/store-api/v4/checkout/cart/line-item");
    });
  });

  describe("getCheckoutPromotionCodeEndpoint", () => {
    it("should return Shopware checkout-cart-promotion-code endpoint", async () => {
      const result = getCheckoutPromotionCodeEndpoint("xyz");
      expect(result).toEqual("/sales-channel-api/v3/checkout/cart/code/xyz");
    });
  });

  describe("getCheckoutOrderEndpoint", () => {
    it("should return Shopware checkout-order endpoint", async () => {
      const result = getCheckoutOrderEndpoint();
      expect(result).toEqual("/store-api/v4/checkout/order");
    });
  });

  describe("getCheckoutGuestOrderEndpoint", () => {
    it("should return Shopware checkout-guestOrder endpoint", async () => {
      const result = getCheckoutGuestOrderEndpoint();
      expect(result).toEqual("/store-api/v4/checkout/order");
    });
  });

  describe("getStoreOrderPaymentUrlEndpoint", () => {
    it("should return Shopware checkout-order-pay endpoint", async () => {
      const result = getStoreOrderPaymentUrlEndpoint();
      expect(result).toEqual("/store-api/v4/handle-payment");
    });
  });

  describe("getContextCurrencyEndpoint", () => {
    it("should return Shopware currency endpoint", async () => {
      const result = getContextCurrencyEndpoint();
      expect(result).toEqual("/store-api/v4/currency");
    });
  });

  describe("getContextLanguageEndpoint", () => {
    it("should return Shopware language endpoint", async () => {
      const result = getContextLanguageEndpoint();
      expect(result).toEqual("/store-api/v4/language");
    });
  });

  describe("getContextCountryEndpoint", () => {
    it("should return Shopware country endpoint", async () => {
      const result = getContextCountryEndpoint();
      expect(result).toEqual("/store-api/v4/country");
    });
  });

  describe("getContextPaymentMethodEndpoint", () => {
    it("should return Shopware payment method endpoint", async () => {
      const result = getContextPaymentMethodEndpoint();
      expect(result).toEqual("/store-api/v4/payment-method");
    });
  });
  describe("getContextShippingMethodEndpoint", () => {
    it("should return Shopware shipping method endpoint", async () => {
      const result = getContextShippingMethodEndpoint();
      expect(result).toEqual("/store-api/v4/shipping-method");
    });
  });

  describe("getContextSalutationEndpoint", () => {
    it("should return Shopware salutation endpoint", async () => {
      const result = getContextSalutationEndpoint();
      expect(result).toEqual("/store-api/v4/salutation");
    });
  });

  describe("getNewsletterSubscribeEndpoint", () => {
    it("should return Shopware newsletter subscribe endpoint", async () => {
      const result = getNewsletterSubscribeEndpoint();
      expect(result).toEqual("/store-api/v4/newsletter/subscribe");
    });
  });

  describe("getNewsletterUnsubscribeEndpoint", () => {
    it("should return Shopware newsletter unsubscribe endpoint", async () => {
      const result = getNewsletterUnsubscribeEndpoint();
      expect(result).toEqual("/store-api/v4/newsletter/unsubscribe");
    });
  });

  describe("getNavigationEndpoint", () => {
    it("should return navigation endpoint", async () => {
      const result = getNavigationEndpoint();
      expect(result).toEqual("/store-api/v4/pwa/navigation");
    });
  });

  describe("getStoreNavigationEndpoint", () => {
    it("should return store navigation endpoint", async () => {
      const result = getStoreNavigationEndpoint(
        "footer-navigation",
        "footer-navigation"
      );
      expect(result).toEqual(
        "/store-api/v4/navigation/footer-navigation/footer-navigation"
      );
    });
  });

  describe("getContextSalutationItemEndpoint", () => {
    it("should return salutation item endpoint", async () => {
      const result = getContextSalutationItemEndpoint(sampleSalutationId);
      expect(result).toEqual(`/store-api/v4/salutation/${sampleSalutationId}`);
    });
  });

  describe("getOrderPaymentUrlEndpoint", () => {
    it("should return order pyment url endpoint", async () => {
      const result = getStoreOrderPaymentUrlEndpoint();
      expect(result).toEqual(`/store-api/v4/handle-payment`);
    });
  });

  describe("getStoreOrderPaymentUrlEndpoint", () => {
    it("should return handle payment method url endpoint", async () => {
      const result = getStoreOrderPaymentUrlEndpoint();
      expect(result).toEqual(`/store-api/v4/handle-payment`);
    });
  });

  describe("getContactFormEndpoint", () => {
    it("should return contact form url endpoint", async () => {
      const result = getContactFormEndpoint();
      expect(result).toEqual(`/store-api/v4/contact-form`);
    });
  });

  describe("getStoreNewsletterSubscribeEndpoint", () => {
    it("should return Shopware newsletter subscribe URL endpoint", async () => {
      const result = getStoreNewsletterSubscribeEndpoint();
      expect(result).toEqual("/store-api/v4/newsletter/subscribe");
    });
  });

  describe("getStoreNewsletterConfirmEndpoint", () => {
    it("should return Shopware newsletter confirm URL endpoint", async () => {
      const result = getStoreNewsletterConfirmEndpoint();
      expect(result).toEqual("/store-api/v4/newsletter/confirm");
    });
  });

  describe("getStoreNewsletterUnsubscribeEndpoint", () => {
    it("should return Shopware newsletter unsubscribe URL endpoint", async () => {
      const result = getStoreNewsletterUnsubscribeEndpoint();
      expect(result).toEqual("/store-api/v4/newsletter/unsubscribe");
    });
  });
});
