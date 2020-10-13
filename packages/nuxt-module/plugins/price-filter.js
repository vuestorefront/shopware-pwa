import Vue from "vue";
import { provide } from "@vue/composition-api";
import { useCurrency } from "@shopware-pwa/composables";
import { formatPrice } from "@/helpers/formatPrice";

export default ({ app }) => {
  app.setup = () => {
    const { currencySymbol } = useCurrency(app);

    provide(
      Vue.filter("price", (price) =>
        formatPrice(price, { symbol: currencySymbol.value })
      )
    );
  };
};
