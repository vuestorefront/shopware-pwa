import { ref, Ref, computed } from "@vue/composition-api";
import { Product } from "@shopware-pwa/shopware-6-client/src";
import { useCart } from "@shopware-pwa/composables";

interface UseAddToCart {
  addToCart: () => Promise<void>;
  quantity: Ref<number>;
  loading: Ref<boolean>;
  error: Ref<any>;
  getStock: Ref<number>;
}

export const useAddToCart = (product: Product): UseAddToCart => {
  const { addProduct } = useCart();
  const quantity: Ref<number> = ref(1);
  const loading: Ref<boolean> = ref(false);
  const error: Ref<any> = ref(null);

  const addToCart = async (): Promise<void> => {
    loading.value = true;
    if (!quantity.value) quantity.value = 1;
    try {
      await addProduct({ id: product.id, quantity: quantity.value });
      quantity.value = 1;
    } catch (e) {
      error.value = e;
    } finally {
      loading.value = false;
    }
  };

  const getStock = computed(() => product && product.stock);

  return {
    addToCart,
    quantity,
    error,
    loading,
    getStock
  };
};
