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
  useCart
} from "@shopware-pwa/composables";

import { getProductMainImageUrl } from "@shopware-pwa/helpers"
import { PropertyGroupOption } from "@shopware-pwa/commons";


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
  itemOptions: ComputedRef<PropertyGroupOption[]>;
  itemType: ComputedRef<LineItemType | undefined>
  isProduct: ComputedRef<boolean>;
  isPromotion: ComputedRef<boolean>;
  itemStock: ComputedRef<number | undefined>;

  itemQuantity: ComputedRef<number | undefined>;
  error: ComputedRef<string>;
  loading: ComputedRef<boolean>;
  changeItemQuantity: (quantity: number) => Promise<void>;
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
  const COMPOSABLE_NAME = "useCartitem";
  const contextName = COMPOSABLE_NAME;

  const { apiInstance } = getApplicationContext({ contextName });
  const { refreshCart, broadcastUpcomingErrors } = useCart();
  const { getDefaults } = useDefaults({
    defaultsKey: COMPOSABLE_NAME,
  });
  const loading: Ref<boolean> = ref(false);
  const error: Ref<any> = ref(null);


  const itemQuantity = computed(() => cartItem?.quantity)
  const itemImageThumbnailUrl = computed(() =>
    getProductMainImageUrl(cartItem as any)
  );

  // it's not 1:1 to Product entity interface
  const itemRegularPrice = computed(
    () =>
      (cartItem?.price?.listPrice &&
        cartItem?.price?.listPrice.price) ||
      cartItem?.price?.unitPrice
  )
  const itemSpecialPrice = computed(
    () => cartItem?.price?.listPrice && cartItem?.price?.unitPrice
  )

  const itemOptions = computed(
    () => (cartItem?.type === "product" && (cartItem?.payload as Product)?.options) || []
  )

  const itemStock = computed(() => cartItem?.deliveryInformation?.stock)

  const itemType = computed(() => cartItem?.type)

  const isProduct = computed(() => cartItem?.type === "product")

  const isPromotion = computed(() => cartItem?.type === "promotion")

  async function removeItem() {
    const result = await removeCartItem(cartItem?.id, apiInstance);
    broadcastUpcomingErrors(result);
    refreshCart();
  }

  async function changeItemQuantity(quantity: number): Promise<void> {
    const result = await changeCartItemQuantity(cartItem.id, quantity, apiInstance);
    broadcastUpcomingErrors(result);
    refreshCart();
  }

  async function getProductItemSeoUrlData(): Promise<Partial<Product>> {
    if (!cartItem?.referencedId) {
      return {};
    }

    try {
      const result = await getProduct(cartItem?.referencedId,
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
    lineItem: computed(() =>cartItem),
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
