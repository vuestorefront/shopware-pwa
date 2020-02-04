<template>
  <div id="success-page">
    <SfHeading level=2 title="Thank you" subtitle="for shopping with us!" />
  </div>
</template>
<script>
import { SfSteps, SfHeading } from "@storefront-ui/vue";
import OrderReview from "../components/checkout/OrderReview";
import OrderSummary from "../components/checkout/OrderSummary";
import Payment from "../components/checkout/Payment";
import PersonalDetails from "../components/checkout/PersonalDetails";
import ReviewOrder from "../components/checkout/ReviewOrder";
import Shipping from "../components/checkout/Shipping";

export default {
  name: "Checkout",
  middleware: "checkout",
  components: {
    SfHeading,
    SfSteps,
    PersonalDetails,
    Shipping,
    Payment,
    ReviewOrder,
    OrderSummary,
    OrderReview
  },
  data() {
    return {
      currentStep: 0,
      order: {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@test.com",
        password: "",
        createAccount: false,
        shipping: {
          firstName: "John",
          lastName: "Doe",
          streetName: "Vuetify",
          apartment: "4",
          city: "Wroclaw",
          state: "",
          zipCode: "53-300",
          country: "Poland",
          phoneNumber: "+48 443 393 999",
          shippingMethod: "DHL courier"
        },
        payment: {
          sameAsShipping: true,
          firstName: "",
          lastName: "",
          streetName: "",
          apartment: "",
          city: "",
          state: "",
          zipCode: "",
          country: "",
          phoneNumber: "",
          paymentMethod: "Mastercard",
          card: {
            number: "5168441223630339",
            holder: "Joe",
            month: "Doe",
            year: "2020",
            cvc: "0554",
            keep: false
          }
        },
        review: {
          subtotal: "$150.00",
          shipping: "$9.00",
          total: "$159.00"
        },
        products: [
          {
            title: "Cream Beach Bag",
            image: "/img/productB.png",
            price: { regular: "$50.00" },
            configuration: [
              { name: "Size", value: "XS" },
              { name: "Color", value: "White" }
            ],
            qty: 1,
            sku: "MSD23-345-324"
          },
          {
            title: "Vila stripe maxi dress",
            image: "/img/productA.png",
            price: { regular: "$50.00", special: "$20.05" },
            configuration: [
              { name: "Size", value: "XS" },
              { name: "Color", value: "White" }
            ],
            qty: 2,
            sku: "MSD23-345-325"
          }
        ]
      },
      paymentMethods: [
        {
          label: "Visa Debit",
          value: "debit"
        },
        {
          label: "MasterCard",
          value: "mastercard"
        },
        {
          label: "Visa Electron",
          value: "electron"
        },
        {
          label: "Cash on delivery",
          value: "cash"
        },
        {
          label: "Check",
          value: "check"
        }
      ],
      shippingMethods: [
        {
          isOpen: false,
          price: "Free",
          delivery: "Delivery from 3 to 7 business days",
          label: "Pickup in the store",
          value: "store",
          description:
            "Novelty! From now on you have the option of picking up an order in the selected InPack parceled. Just remember that in the case of orders paid on delivery, only the card payment will be accepted."
        },
        {
          isOpen: false,
          price: "$9.90",
          delivery: "Delivery from 4 to 6 business days",
          label: "Delivery to home",
          value: "home",
          description:
            "Novelty! From now on you have the option of picking up an order in the selected InPack parceled. Just remember that in the case of orders paid on delivery, only the card payment will be accepted."
        },
        {
          isOpen: false,
          price: "$9.90",
          delivery: "Delivery from 4 to 6 business days",
          label: "Paczkomaty InPost",
          value: "inpost",
          description:
            "Novelty! From now on you have the option of picking up an order in the selected InPack parceled. Just remember that in the case of orders paid on delivery, only the card payment will be accepted."
        },
        {
          isOpen: false,
          price: "$11.00",
          delivery: "Delivery within 48 hours",
          label: "48 hours coffee",
          value: "coffee",
          description:
            "Novelty! From now on you have the option of picking up an order in the selected InPack parceled. Just remember that in the case of orders paid on delivery, only the card payment will be accepted."
        },
        {
          isOpen: false,
          price: "$14.00",
          delivery: "Delivery within 24 hours",
          label: "Urgent 24h",
          value: "urgent",
          description:
            "Novelty! From now on you have the option of picking up an order in the selected InPack parceled. Just remember that in the case of orders paid on delivery, only the card payment will be accepted."
        }
      ]
    };
  },
  methods: {
    updateStep(next) {
      // prevent to move next by SfStep header
      if (next < this.currentStep) {
        this.currentStep = next;
      }
    },
    updateOrder(order, next = true) {
      this.order = { ...this.order, ...order };
      if (next) {
        this.currentStep++;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";
@mixin for-desktop {
  @media screen and (min-width: $desktop-min) {
    @content;
  }
}
#checkout {
  box-sizing: border-box;
  padding: 0 $spacer-big;
  @include for-desktop {
    max-width: 1240px;
    padding: $spacer-extra-big;
  }
}
.checkout {
  @include for-desktop {
    display: flex;
  }
  &__main {
    @include for-desktop {
      flex: 1;
    }
  }
  &__aside {
    @include for-desktop {
      flex: 0 0 25.5rem;
      margin-left: 4.25rem;
    }
  }
}
</style>
