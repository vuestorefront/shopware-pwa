import Vue from "vue";
import { ref, Ref, reactive, computed } from "@vue/composition-api";
import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";

/**
 * interface for {@link useWishlist} composable
 * @beta
 */

export interface IUseWishlist {
  removeFromWishlist: (id: string) => boolean;
  clearWishlist: () => void;
  addToWishlist: () => boolean;
  isInWishlist: Ref<boolean>;
  items: Ref<string[]>;
}

const sharedWishlist = Vue.observable({
  items: [],
} as any);

/**
 *
 * @beta
 */
export const useWishlist = (product?: Product): IUseWishlist => {
  const localWishlist = reactive(sharedWishlist.items);
  const productId: Ref<string | undefined> = ref(product?.id);
  let currentWishlist = [];

  if (typeof window != "undefined" && localStorage) {
    try {
      currentWishlist = JSON.parse(localStorage.getItem("savedWishlist") ?? "");
      console.log(currentWishlist);
      sharedWishlist.items = currentWishlist;
    } catch (error) {
      console.log(error);
    }
  }

  // removes item from the list
  const removeFromWishlist = (itemId: string): boolean => {
    const id = productId.value || itemId;
    if (!id) {
      return false;
    }

    sharedWishlist.items = sharedWishlist.items.filter(
      (itemId: any) => itemId != id
    );

    updateStorage();
    return true;
  };

  // add product id to wishlist array and trigger to update localstorage
  const addToWishlist = (): boolean => {
    console.log(sharedWishlist.items);
    if (!productId.value) {
      return false;
    }

    if (!sharedWishlist.items.includes(productId.value)) {
      sharedWishlist.items.push(productId.value);
      updateStorage();
      return true;
    } else {
      return false;
    }
  };

  // return true or false if product id is in wishlist array
  const isInWishlist = computed(() =>
    localWishlist.value.includes(productId.value)
  );

  // remove all items from wishlist
  const clearWishlist = () => {
    sharedWishlist.items = [];
  };

  const items = computed(() => localWishlist.value);

  // update wishlist in localstorage
  const updateStorage = (): boolean => {
    localStorage.setItem("savedWishlist", JSON.stringify(sharedWishlist.items));

    return true;
  };

  return {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    items,
  };
};
