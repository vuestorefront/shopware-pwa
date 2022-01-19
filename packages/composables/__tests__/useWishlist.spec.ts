/**
 * @jest-environment jsdom
 */
// Mock Vue Composition API onMounted method
import vueComp, { ref } from "vue-demi";
(vueComp.onMounted as any) = jest.fn();
import * as Composables from "@shopware-pwa/composables";
jest.mock("@shopware-pwa/composables");
const mockedComposables = Composables as jest.Mocked<typeof Composables>;
import { useWishlist } from "../src/logic/useWishlist";
import { Product } from "@shopware-pwa/commons/interfaces";

describe("Composables - useWishlist", () => {
  const broadcastMock = jest.fn();
  const interceptMock = jest.fn();
  const stateSharedRef = ref();

  mockedComposables.useIntercept.mockImplementation(() => {
    return {
      broadcast: broadcastMock,
      intercept: interceptMock,
    } as any;
  });

  mockedComposables.useSharedState.mockImplementation(() => {
    return {
      sharedRef: () => stateSharedRef,
    } as any;
  });

  beforeEach(() => {
    jest.clearAllMocks();

    stateSharedRef.value = null;
  });

  describe("computed", () => {
    it("should return an empty array on frist useWishlist usage", () => {
      const { items, count } = useWishlist();
      expect(items.value).toHaveLength(0);
      expect(count.value).toBe(0);
    });
    it("should return false if the provided product does not exist or isn't in wishlist yet", () => {
      const { isInWishlist } = useWishlist();
      expect(isInWishlist.value).toBe(false);
    });

    it("should return false if the provided product isn't in wishlist", () => {
      const { isInWishlist } = useWishlist({
        product: {
          id: "qwerty",
        } as Product,
      });
      expect(isInWishlist.value).toBe(false);
    });
  });
  describe("methods", () => {
    const product: any = {
      id: "some-id",
    };

    describe("addToWishlist", () => {
      it("should add to wishlist current product if id exists", () => {
        const { addToWishlist, items, isInWishlist } = useWishlist({ product });
        addToWishlist();

        expect(items.value[0]).toBe("some-id");
        expect(isInWishlist.value).toBe(true);
      });
      it("should not add to wishlist current product if id does not exist or product is falsy", () => {
        const { addToWishlist, isInWishlist } = useWishlist({});
        addToWishlist();

        expect(isInWishlist.value).toBe(false);
      });

      it("should add to wishlist current product only once", () => {
        const { addToWishlist, items, isInWishlist } = useWishlist({ product });
        addToWishlist();
        addToWishlist();

        expect(items.value[0]).toBe("some-id");
        expect(isInWishlist.value).toBe(true);
        expect(stateSharedRef.value).toEqual(["some-id"]);
      });
    });
    describe("removeFromWishlist", () => {
      it("should remove an item if it's included", () => {
        const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist(
          { product }
        );
        addToWishlist();

        expect(isInWishlist.value).toBe(true);
        removeFromWishlist(product.id);
        expect(isInWishlist.value).toBe(false);
      });
      it("should remove an item without providing its id directly", () => {
        const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist(
          { product }
        );
        addToWishlist();

        expect(isInWishlist.value).toBe(true);
        removeFromWishlist(undefined as any);
        expect(isInWishlist.value).toBe(false);
      });
      it("should not do anything when there is no product id", () => {
        const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist(
          { product: {} as any }
        );
        addToWishlist();

        removeFromWishlist(undefined as any);
        expect(isInWishlist.value).toBe(false);
      });

      it("should do nothing when product is not inside wishlist", () => {
        const { isInWishlist, removeFromWishlist } = useWishlist({ product });

        removeFromWishlist(product.id);
        expect(isInWishlist.value).toBe(false);
      });
      it("should remove an item without providing its id directly", () => {
        const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist(
          { product }
        );
        addToWishlist();

        expect(isInWishlist.value).toBe(true);
        removeFromWishlist(undefined as any);
        expect(isInWishlist.value).toBe(false);
      });
    });
    describe("clearWishlist", () => {
      it("should remove all items from wishlist", () => {
        const { addToWishlist, items, clearWishlist } = useWishlist({
          product,
        });
        addToWishlist();

        expect(items.value).toHaveLength(1);
        clearWishlist();
        expect(items.value).toHaveLength(0);
      });
    });
    describe("onMounted", () => {
      it("should invoke onMounted callback on composable init", () => {
        useWishlist();
        expect(vueComp.onMounted).toBeCalled();
      });
    });
    describe("onAddToWishlist", () => {
      it("should add interceptor method", () => {
        const { onAddToWishlist } = useWishlist({ product: null as any });
        onAddToWishlist(() => {});
        expect(interceptMock).toHaveBeenCalledWith(
          "addToWishlist",
          expect.any(Function)
        );
      });
    });
  });
});
