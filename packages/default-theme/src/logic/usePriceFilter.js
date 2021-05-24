import { unref } from "@vue/composition-api"
import { useCurrency } from "@shopware-pwa/composables"
import { formatPrice } from "@/helpers/formatPrice"

export const usePriceFilter = () => {
  const { currencySymbol } = useCurrency()

  return (price) => formatPrice(unref(price), { symbol: currencySymbol.value })
}
