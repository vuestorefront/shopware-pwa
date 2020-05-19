import Vue from "vue";
import { provide } from "@vue/composition-api";
import { useCurrency } from "@shopware-pwa/composables";
import { formatPrice } from "@shopware-pwa/default-theme/helpers";

export default ({ app }) => {
  app.setup = () => {
    const { currencySymbol } = useCurrency();

    provide(
      Vue.filter("price", (price) =>
        formatPrice(price, { symbol: currencySymbol.value })
      )
    );
  };
};
