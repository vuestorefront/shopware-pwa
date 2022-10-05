import { computed, ComputedRef } from "vue-demi";
import {
  removeCartItem,
  changeCartItemQuantity,
  getProduct,
} from "@shopware-pwa/shopware-6-client";
import {
  Product,
  LineItem,
  LineItemType,
} from "@shopware-pwa/commons/interfaces";
import {
  getApplicationContext,
  useDefaults,
  useCart,
} from "@shopware-pwa/composables";

import { getProductMainImageUrl } from "@shopware-pwa/helpers";
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
  itemType: ComputedRef<LineItemType | undefined>;
  isProduct: ComputedRef<boolean>;
  isPromotion: ComputedRef<boolean>;
  itemStock: ComputedRef<number | undefined>;

  itemQuantity: ComputedRef<number | undefined>;
  changeItemQuantity: (quantity: number) => Promise<void>;
  removeItem: () => Promise<void>;
  getProductItemSeoUrlData(): Promise<Partial<Product>>;
  getProductQtySteps: ComputedRef<number[] | null>;
}

/**
 * Composable for cart item management. Options - {@link IUseCartItem}
 *
 * @beta
 */
export function useCartItem({
  cartItem,
  qtySteps = 50,
}: {
  cartItem: LineItem;
  qtySteps: number;
}): IUseCartItem {
  if (!cartItem) {
    throw new Error("[useCartItem] mandatory cartItem argument is missing.");
  }
  const COMPOSABLE_NAME = "useCartitem";
  const contextName = COMPOSABLE_NAME;

  const { apiInstance } = getApplicationContext({ contextName });
  const { refreshCart, broadcastUpcomingErrors } = useCart();
  const { getDefaults } = useDefaults({
    defaultsKey: COMPOSABLE_NAME,
  });

  const itemQuantity = computed(() => cartItem.quantity);
  const itemImageThumbnailUrl = computed(() =>
    getProductMainImageUrl(cartItem as any)
  );

  // TODO: use helper instead

  const itemRegularPrice = computed(
    () => cartItem.price?.listPrice?.price || cartItem.price?.unitPrice
  );

  const itemSpecialPrice = computed(
    () => cartItem.price?.listPrice && cartItem.price.unitPrice
  );

  const itemOptions = computed(
    () =>
      (cartItem.type === "product" && (cartItem.payload as Product)?.options) ||
      []
  );

  const itemStock = computed(() => cartItem.deliveryInformation?.stock);

  const itemType = computed(() => cartItem.type);

  const isProduct = computed(() => cartItem.type === "product");

  const isPromotion = computed(() => cartItem.type === "promotion");

  const getProductQtySteps = computed(() => {
    const quantityInformation = cartItem.quantityInformation;
    const purchaseSteps = quantityInformation?.purchaseSteps || 1;
    const availableStock =
      quantityInformation?.maxPurchase &&
      quantityInformation.maxPurchase < qtySteps * purchaseSteps
        ? quantityInformation.maxPurchase
        : qtySteps;

    if (purchaseSteps <= 1) return null;

    let i = purchaseSteps;
    let options: number[] = [];
    while (i < availableStock) {
      options.push(i);
      i += purchaseSteps;
    }
    return options;
  });

  async function removeItem() {
    const result = await removeCartItem(cartItem.id, apiInstance);
    broadcastUpcomingErrors(result);
    refreshCart();
  }

  async function changeItemQuantity(quantity: number): Promise<void> {
    const result = await changeCartItemQuantity(
      cartItem.id,
      quantity,
      apiInstance
    );
    broadcastUpcomingErrors(result);
    refreshCart();
  }

  async function getProductItemSeoUrlData(): Promise<Partial<Product>> {
    if (!cartItem.referencedId) {
      return {};
    }

    try {
      const result = await getProduct(
        cartItem.referencedId,
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
    getProductQtySteps,
    lineItem: computed(() => cartItem),
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
