/**
 * @jest-environment jsdom
 */
import Vue from "vue";

// Mock Vue Composition API onMounted method
import VueCompositionApi, * as vueComp from "@vue/composition-api";
(vueComp.onMounted as any) = jest.fn();
Vue.use(VueCompositionApi);
import * as Composables from "@shopware-pwa/composables";
jest.mock("@shopware-pwa/composables");
const mockedComposables = Composables as jest.Mocked<typeof Composables>;
import { useWishlist } from "../src/logic/useWishlist";

describe("Composables - useWishlist", () => {
  const rootContextMock: any = {
    $shopwareApiInstance: jest.fn(),
  };
  const broadcastMock = jest.fn();
  const interceptMock = jest.fn();

  mockedComposables.useIntercept.mockImplementation(() => {
    return {
      broadcast: broadcastMock,
      intercept: interceptMock,
    } as any;
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("computed", () => {
    it("should return an empty array on frist useWishlist usage", () => {
      const { items, count } = useWishlist(rootContextMock);
      expect(items.value).toHaveLength(0);
      expect(count.value).toBe(0);
    });
    it("should return false if the provided product does not exist or isn't in wishlist yet", () => {
      const { isInWishlist } = useWishlist(rootContextMock);
      expect(isInWishlist.value).toBe(false);
    });
  });
  describe("methods", () => {
    const product = {
      id: "some-id",
    };

    describe("addToWishlist", () => {
      it("should add to wishlist current product if id exists", () => {
        const { addToWishlist, items, isInWishlist } = useWishlist(
          rootContextMock,
          product as any
        );
        addToWishlist();

        expect(items.value[0]).toBe("some-id");
        expect(isInWishlist.value).toBe(true);
      });
      it("should not add to wishlist current product if id does not exist or product is falsy", () => {
        const { addToWishlist, isInWishlist } = useWishlist(
          rootContextMock,
          undefined as any
        );
        addToWishlist();

        expect(isInWishlist.value).toBe(false);
      });
    });
    describe("removeFromWishlist", () => {
      it("should remove an item if it's included", () => {
        const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist(
          rootContextMock,
          product as any
        );
        addToWishlist();

        expect(isInWishlist.value).toBe(true);
        removeFromWishlist(product.id);
        expect(isInWishlist.value).toBe(false);
      });
      it("should remove an item without providing its id directly", () => {
        const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist(
          rootContextMock,
          product as any
        );
        addToWishlist();

        expect(isInWishlist.value).toBe(true);
        removeFromWishlist(undefined as any);
        expect(isInWishlist.value).toBe(false);
      });
      it("should not do anything when there is no product id", () => {
        const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist(
          rootContextMock,
          {} as any
        );
        addToWishlist();

        removeFromWishlist(undefined as any);
        expect(isInWishlist.value).toBe(false);
      });
      it("should remove an item without providing its id directly", () => {
        const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist(
          rootContextMock,
          product as any
        );
        addToWishlist();

        expect(isInWishlist.value).toBe(true);
        removeFromWishlist(undefined as any);
        expect(isInWishlist.value).toBe(false);
      });
    });
    describe("clearWishlist", () => {
      it("should remove all items from wishlist", () => {
        const { addToWishlist, items, clearWishlist } = useWishlist(
          rootContextMock,
          product as any
        );
        addToWishlist();

        expect(items.value).toHaveLength(1);
        clearWishlist();
        expect(items.value).toHaveLength(0);
      });
    });
    describe("onMounted", () => {
      it("should invoke onMounted callback on composable init", () => {
        useWishlist(rootContextMock);
        expect(vueComp.onMounted).toBeCalled();
      });
    });
    describe("onAddToWishlist", () => {
      it("should add interceptor method", () => {
        const { onAddToWishlist } = useWishlist(rootContextMock, null as any);
        onAddToWishlist(() => {});
        expect(interceptMock).toHaveBeenCalledWith(
          "addToWishlist",
          expect.any(Function)
        );
      });
    });
  });
});
