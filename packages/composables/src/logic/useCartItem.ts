import { ref, Ref, computed, ComputedRef } from "vue-demi";
import {
  removeCartItem,
  changeCartItemQuantity,
  getProduct,
} from "@shopware-pwa/shopware-6-client";
import {
  Product,
  LineItem,
  LineItemType
} from "@shopware-pwa/commons/interfaces";
import {
  getApplicationContext,
  useDefaults,
  useSharedState,
  useCart
} from "@shopware-pwa/composables";

import { getProductMainImageUrl } from "@shopware-pwa/helpers"


/**
 * interface for {@link useCartItem} composable
 *
 * @beta
 */
export interface IUseCartItem {
  lineItem: ComputedRef<LineItem | undefined | null>;
  itemRegularPrice: ComputedRef<number | undefined>;
  itemSpecialPrice: ComputedRef<number | undefined>;
  itemImageThumbnailUrl: ComputedRef<string>;
  itemOptions: ComputedRef<string[]>;
  itemType: ComputedRef<LineItemType | undefined>
  isProduct: ComputedRef<boolean>;
  isPromotion: ComputedRef<boolean>;
  itemStock: ComputedRef<number | undefined>;

  itemQuantity: ComputedRef<number | undefined>;
  error: ComputedRef<string>;
  loading: ComputedRef<boolean>;
  changeItemQuantity: (quantity: number) => void;
  removeItem: ({ id }: LineItem) => Promise<void>;
  getProductItemSeoUrlData(): Promise<Partial<Product>>;
}


/**
 * Composable for cart item management. Options - {@link IUseCartItem}
 *
 * @beta
 */
export function useCartItem({
  cartItem
}: {cartItem: LineItem }): IUseCartItem {

  if (!cartItem) {
    throw new Error("[useCartItem] mandatory cartItem argument is missing.")
  }
  const { sharedRef } = useSharedState();
  const COMPOSABLE_NAME = "useCartitem";
  const contextName = COMPOSABLE_NAME;

  const _storeCartItem = sharedRef<LineItem>(`${contextName}-cartItem`);
  _storeCartItem.value = cartItem;

  const { apiInstance } = getApplicationContext({ contextName });
  const { refreshCart, broadcastUpcomingErrors } = useCart();
  const { getDefaults } = useDefaults({
    defaultsKey: COMPOSABLE_NAME,
  });
  const loading: Ref<boolean> = ref(false);
  const error: Ref<any> = ref(null);


  const itemQuantity = computed(() => _storeCartItem.value?.quantity)
  const itemImageThumbnailUrl = computed(() =>
    getProductMainImageUrl(_storeCartItem.value)
  );

  // it's not 1:1 to Product entity interface
  const itemRegularPrice = computed(
    () =>
      (_storeCartItem.value?.price?.listPrice &&
        _storeCartItem.value?.price?.listPrice.price) ||
      _storeCartItem.value?.price?.unitPrice
  )
  const itemSpecialPrice = computed(
    () => _storeCartItem.value?.price?.listPrice && _storeCartItem.value?.price?.unitPrice
  )

  const itemOptions = computed(
    () => (_storeCartItem.value?.payload && _storeCartItem.value?.payload?.options) || []
  )

  const itemStock = computed(() => _storeCartItem.value?.deliveryInformation?.stock)

  const itemType = computed(() => _storeCartItem.value?.type)

  const isProduct = computed(() => _storeCartItem.value?.type === "product")

  const isPromotion = computed(() => _storeCartItem.value?.type === "promotion")

  async function removeItem() {
    const result = await removeCartItem(_storeCartItem.value?.id, apiInstance);
    broadcastUpcomingErrors(result);
    refreshCart();
  }

  async function changeItemQuantity(quantity: number) {
    const result = await changeCartItemQuantity(_storeCartItem.value.id, quantity, apiInstance);
    broadcastUpcomingErrors(result);
  }

  async function getProductItemSeoUrlData(): Promise<Partial<Product>> {
    if (!_storeCartItem.value?.referencedId) {
      return {};
    }

    try {
      const result = await getProduct(_storeCartItem.value?.referencedId,
        {
          includes: (getDefaults() as any).getProductItemsSeoUrlsData.includes,
          associations: (getDefaults() as any).getProductItemsSeoUrlsData
            .associations,
        },
        apiInstance
      );
      return result.product;
    } catch (error) {
      console.error("[useCart][getProductItemsSeoUrlsData]", error.messages);
    }

    return {};
  }

  return {
    changeItemQuantity,
    removeItem,
    getProductItemSeoUrlData,
    error: computed(() => error.value),
    loading: computed(() => loading.value),
    lineItem: computed(() =>_storeCartItem.value),
    itemRegularPrice,
    itemSpecialPrice,
    itemOptions,
    itemStock,
    itemQuantity,
    itemType,
    itemImageThumbnailUrl,
    isProduct,
    isPromotion,
  
  };
}
