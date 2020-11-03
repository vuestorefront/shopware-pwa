import { ref, Ref, computed } from "@vue/composition-api";
import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";

/**
 * interface for {@link useWishlist} composable
 * @beta
 */

export interface IUseWishlist {
  removeFromWishlist: (id: string) => Ref<void>;
  clearWishlist: () => Ref<void>;
  addToWishlist: (id: string) => Ref<void>;
  updateLocalStorage: (arr: string[]) => Ref<void>;
  isInWishlist: (id: string) => Ref<void>;
  initWishlist: () => Ref<void>;
  wishlist: Ref<string[]>;
  id: Ref<string>;
  isWishlist: Ref<string[]>;
}

export const useWishlist = (product: Product): IUseWishlist => {
  let wishlist: Ref<string[]> = ref([]);
  const id: Ref<string> = ref(product.id);
  const error: Ref<any> = ref(null);

  const initWishlist = (): Ref<string[]> => {
    let wishlistExist = localStorage.getItem("savedWishlist");
    wishlist = wishlistExist ? wishlistExist.split(",") : [];
    return wishlist;
  };

  // it returns an array without removed product
  const removeFromWishlist = (id: string): Ref<string[]> => {
    wishlist = wishlist.filter(function (value, index, arr) {
      return !id;
    });
    return wishlist;
  };

  // add product id to wishlist array and trigger to update localstorage
  const addToWishlist = (id: string): Ref<string[]> => {
    if (!product || !product.id) {
      error.value =
        "Product has to be passed as a composable argument and needs to have an id property.";
      return;
    } else {
      wishlist = [...wishlist, id];
      return wishlist;
    }
  };

  // return true or false if product id is in wishlist array
  const isInWishlist = (id: string): Ref<boolean> => {
    const includeItem = wishlist.includes(id);
    return includeItem;
  };

  // remove all items from wishlist
  const clearWishlist = (): Ref<string[]> => {
    wishlist = [];
    return wishlist;
  };

  // update wishlist in localstorage
  const updateLocalStorage = (arr: string[]): Ref<string[]> => {
    localStorage.setItem("savedWishlist", arr.toString());
    return arr;
  };

  return {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    updateLocalStorage,
    clearWishlist,
    initWishlist,
  };
};
