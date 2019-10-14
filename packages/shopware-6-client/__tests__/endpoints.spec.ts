import {
  PRODUCT_ENDPOINT,
  PRODUCT_DETAILS_ENDPOINT,
  CATEGORY_ENDPOINT,
  CATEGORY_DETAILS_ENDPOINT,
  CUSTOMER_ADDRESS_ENDPOINT,
  CUSTOMER_ADDRESS_DETAILS_ENDPOINT,
  CUSTOMER_ADDRESS_SET_DEFAULT_SHIPPING_ENDPOINT,
  CUSTOMER_ADDRESS_SET_DEFAULT_BILLING_ENDPOINT,
  CUSTOMER_ENDPOINT,
  CUSTOMER_DETAILS_ENDPOINT,
  CUSTOMER_LOGIN_ENDPOINT,
  CUSTOMER_LOGOUT_ENDPOINT,
  CUSTOMER_ORDER_ENDPOINT,
  CHECKOUT_CART_ENDPOINT,
  CHECKOUT_CART_PRODUCT_ENDPOINT,
  CHECKOUT_CART_LINE_ITEM_ENDPOINT,
  CHECKOUT_ORDER_ENDPOINT,
  CHECKOUT_GUEST_ORDER_ENDPOINT,
  CHECKOUT_GUEST_ORDER_DETAILS_ENDPOINT,
  CHECKOUT_ORDER_PAY_ENDPOINT,
  CONTEXT_CURRENCY_ENDPOINT,
  CONTEXT_LANGUAGE_ENDPOINT,
  CONTEXT_COUNTRY_ENDPOINT,
  CONTEXT_PAYMENT_METHOD_ENDPOINT,
  CONTEXT_SHIPPING_METHOD_ENDPOINT,
  CONTEXT_SALUTATION_ENDPOINT,
  NEWSLETTER_SUBSCRIBE_ENDPOINT,
  NEWSLETTER_UNSUBSCRIBE_ENDPOINT
} from "../src/endpoints";

const sampleProductId = "eea0f69ec02d44f7a4224272b3d99478";
const sampleCategoryId = "03dfd5badd3d43bd8a345ef660761e09";
const sampleAddressId = "324af469318f46b68e0fe69d77ef15fb";
const sampleCustomerId = "8b67c1fbb718487db750651430023298";
const sampleLineItemId = "042df8812942487bb52c9fc1e5b26e20";
const sampleOrderId = "27356105cf9b4484b96143881c37bbcb";

describe("endpoints", () => {
  describe("PRODUCT_ENDPOINT", () => {
    it("should return Shopware product endpoint", async () => {
      const result = await PRODUCT_ENDPOINT();
      expect(result).toEqual("/product");
    });
  });

  describe("PRODUCT_DETAILS_ENDPOINT", () => {
    it("should return Shopware product details endpoint", async () => {
      const result = await PRODUCT_DETAILS_ENDPOINT(sampleProductId);
      expect(result).toEqual("/product/" + sampleProductId);
    });
  });

  describe("CATEGORY_ENDPOINT", () => {
    it("should return Shopware category endpoint", async () => {
      const result = await CATEGORY_ENDPOINT();
      expect(result).toEqual("/category");
    });
  });

  describe("CATEGORY_DETAILS_ENDPOINT", () => {
    it("should return Shopware category details endpoint", async () => {
      const result = await CATEGORY_DETAILS_ENDPOINT(sampleCategoryId);
      expect(result).toEqual("/category/" + sampleCategoryId);
    });
  });

  describe("CUSTOMER_ADDRESS_ENDPOINT", () => {
    it("should return Shopware address endpoint", async () => {
      const result = await CUSTOMER_ADDRESS_ENDPOINT();
      expect(result).toEqual("/customer/address");
    });
  });

  describe("CUSTOMER_ADDRESS_DETAILS_ENDPOINT", () => {
    it("should return Shopware address details endpoint", async () => {
      const result = await CUSTOMER_ADDRESS_DETAILS_ENDPOINT(sampleAddressId);
      expect(result).toEqual("/customer/address/" + sampleAddressId);
    });
  });

  describe("CUSTOMER_ADDRESS_SET_DEFAULT_SHIPPING_ENDPOINT", () => {
    it("should return Shopware set default shipping address endpoint", async () => {
      const result = await CUSTOMER_ADDRESS_SET_DEFAULT_SHIPPING_ENDPOINT(
        sampleAddressId
      );
      expect(result).toEqual(
        "/customer/address/" + sampleAddressId + "/default-shipping"
      );
    });
  });

  describe("CUSTOMER_ADDRESS_SET_DEFAULT_BILLING_ENDPOINT", () => {
    it("should return Shopware set default billing address endpoint", async () => {
      const result = await CUSTOMER_ADDRESS_SET_DEFAULT_BILLING_ENDPOINT(
        sampleAddressId
      );
      expect(result).toEqual(
        "/customer/address/" + sampleAddressId + "/default-billing"
      );
    });
  });

  describe("CUSTOMER_ENDPOINT", () => {
    it("should return Shopware customer endpoint", async () => {
      const result = await CUSTOMER_ENDPOINT();
      expect(result).toEqual("/customer");
    });
  });

  describe("CUSTOMER_DETAILS_ENDPOINT", () => {
    it("should return Shopware customer details endpoint", async () => {
      const result = await CUSTOMER_DETAILS_ENDPOINT(sampleCustomerId);
      expect(result).toEqual("/customer/" + sampleCustomerId);
    });
  });

  describe("CUSTOMER_LOGIN_ENDPOINT", () => {
    it("should return Shopware customer login endpoint", async () => {
      const result = await CUSTOMER_LOGIN_ENDPOINT();
      expect(result).toEqual("/customer/login");
    });
  });

  describe("CUSTOMER_LOGOUT_ENDPOINT", () => {
    it("should return Shopware customer logout endpoint", async () => {
      const result = await CUSTOMER_LOGOUT_ENDPOINT();
      expect(result).toEqual("/customer/logout");
    });
  });

  describe("CUSTOMER_ORDER_ENDPOINT", () => {
    it("should return Shopware customer order endpoint", async () => {
      const result = await CUSTOMER_ORDER_ENDPOINT();
      expect(result).toEqual("/customer/order");
    });
  });

  describe("CHECKOUT_CART_ENDPOINT", () => {
    it("should return Shopware checkout-cart endpoint", async () => {
      const result = await CHECKOUT_CART_ENDPOINT();
      expect(result).toEqual("/checkout/cart");
    });
  });

  describe("CHECKOUT_CART_PRODUCT_ENDPOINT", () => {
    it("should return Shopware checkout-cart-product endpoint", async () => {
      const result = await CHECKOUT_CART_PRODUCT_ENDPOINT(sampleProductId);
      expect(result).toEqual("/checkout/cart/" + sampleProductId);
    });
  });

  describe("CHECKOUT_CART_LINE_ITEM_ENDPOINT", () => {
    it("should return Shopware checkout-cart-lineItem endpoint", async () => {
      const result = await CHECKOUT_CART_LINE_ITEM_ENDPOINT(sampleLineItemId);
      expect(result).toEqual("/checkout/cart/line-item/" + sampleLineItemId);
    });
  });

  describe("CHECKOUT_ORDER_ENDPOINT", () => {
    it("should return Shopware checkout-order endpoint", async () => {
      const result = await CHECKOUT_ORDER_ENDPOINT();
      expect(result).toEqual("/checkout/order");
    });
  });

  describe("CHECKOUT_GUEST_ORDER_ENDPOINT", () => {
    it("should return Shopware checkout-guestOrder endpoint", async () => {
      const result = await CHECKOUT_GUEST_ORDER_ENDPOINT();
      expect(result).toEqual("/checkout/guest-order");
    });
  });

  describe("CHECKOUT_GUEST_ORDER_DETAILS_ENDPOINT", () => {
    it("should return Shopware checkout-guestOrder-details endpoint", async () => {
      const result = await CHECKOUT_GUEST_ORDER_DETAILS_ENDPOINT(sampleOrderId);
      expect(result).toEqual("/checkout/guest-order/" + sampleOrderId);
    });
  });

  describe("CHECKOUT_ORDER_PAY_ENDPOINT", () => {
    it("should return Shopware checkout-order-pay endpoint", async () => {
      const result = await CHECKOUT_ORDER_PAY_ENDPOINT(sampleOrderId);
      expect(result).toEqual("/checkout/order/" + sampleOrderId + "/pay");
    });
  });

  describe("CONTEXT_CURRENCY_ENDPOINT", () => {
    it("should return Shopware currency endpoint", async () => {
      const result = await CONTEXT_CURRENCY_ENDPOINT();
      expect(result).toEqual("/currency");
    });
  });

  describe("CONTEXT_LANGUAGE_ENDPOINT", () => {
    it("should return Shopware language endpoint", async () => {
      const result = await CONTEXT_LANGUAGE_ENDPOINT();
      expect(result).toEqual("/language");
    });
  });

  describe("CONTEXT_COUNTRY_ENDPOINT", () => {
    it("should return Shopware country endpoint", async () => {
      const result = await CONTEXT_COUNTRY_ENDPOINT();
      expect(result).toEqual("/country");
    });
  });

  describe("CONTEXT_PAYMENT_METHOD_ENDPOINT", () => {
    it("should return Shopware payment method endpoint", async () => {
      const result = await CONTEXT_PAYMENT_METHOD_ENDPOINT();
      expect(result).toEqual("/payment-method");
    });
  });
  describe("CONTEXT_SHIPPING_METHOD_ENDPOINT", () => {
    it("should return Shopware shipping method endpoint", async () => {
      const result = await CONTEXT_SHIPPING_METHOD_ENDPOINT();
      expect(result).toEqual("/shipping-method");
    });
  });

  describe("CONTEXT_SALUTATION_ENDPOINT", () => {
    it("should return Shopware salutation endpoint", async () => {
      const result = await CONTEXT_SALUTATION_ENDPOINT();
      expect(result).toEqual("/salutation");
    });
  });

  describe("NEWSLETTER_SUBSCRIBE_ENDPOINT", () => {
    it("should return Shopware newsletter subscribe endpoint", async () => {
      const result = await NEWSLETTER_SUBSCRIBE_ENDPOINT();
      expect(result).toEqual("/newsletter/subscribe");
    });
  });

  describe("NEWSLETTER_UNSUBSCRIBE_ENDPOINT", () => {
    it("should return Shopware newsletter unsubscribe endpoint", async () => {
      const result = await NEWSLETTER_UNSUBSCRIBE_ENDPOINT();
      expect(result).toEqual("/newsletter/unsubscribe");
    });
  });
});
