import Vue from "vue";

import VueCompositionApi from "@vue/composition-api";
Vue.use(VueCompositionApi);

import { useBreadcrumbs } from "../src/logic/useBreadcrumbs";

describe("Composables - useBreadcrumbs", () => {
  const rootContextMock: any = {
    $shopwareApiInstance: jest.fn(),
    shopwareDefaults: jest.fn(),
    i18n: {
      t: (text: string) => text,
    },
    $routing: jest.fn(),
  };
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("methods", () => {
    describe("clear", () => {
      it("should clear the local list of breadcrumbs after invokation of clear method", () => {
        const { clear, setBreadcrumbs, breadcrumbs } =
          useBreadcrumbs(rootContextMock);
        setBreadcrumbs([
          {
            name: "My account",
            path: "/account",
          } as any,
        ]);
        clear();
        expect(breadcrumbs.value).toStrictEqual([]);
      });
    });
  });
  describe("computed", () => {
    describe("breadcrumbs", () => {
      it("should return an empty array if there is no breadcrumb available", () => {
        const { breadcrumbs } = useBreadcrumbs(rootContextMock);
        expect(breadcrumbs.value).toStrictEqual([]);
      });
      it("should return breadcrumbs object from cms page if any available", () => {
        const { breadcrumbs, setBreadcrumbs } = useBreadcrumbs(rootContextMock);
        setBreadcrumbs([
          {
            name: "Clothes",
            path: "Clothes/",
          },
        ]);
        expect(breadcrumbs.value).toStrictEqual([
          {
            name: "Home",
            path: "/",
          },
          {
            path: "Clothes/",
            name: "Clothes",
          },
        ]);
      });

      it("should return breadcrumbs object without Home link from cms page if any available", () => {
        const { breadcrumbs, setBreadcrumbs } = useBreadcrumbs(
          rootContextMock,
          {
            hideHomeLink: true,
          }
        );
        setBreadcrumbs([
          {
            name: "Clothes",
            path: "Clothes/",
          },
        ]);
        expect(breadcrumbs.value).toStrictEqual([
          {
            path: "Clothes/",
            name: "Clothes",
          },
        ]);
      });
      it("should return local breadcrumbs with default one pointing Home link if there are any assigned", () => {
        const { setBreadcrumbs, breadcrumbs } = useBreadcrumbs(rootContextMock);
        setBreadcrumbs([
          {
            name: "My account",
            path: "/account",
          },
        ]);

        expect(breadcrumbs.value).toStrictEqual([
          {
            path: "/",
            name: "Home",
          },
          {
            path: "/account",
            name: "My account",
          },
        ]);
      });

      it("should return local breadcrumbs without Home link if there are any assigned", () => {
        const { setBreadcrumbs, breadcrumbs } = useBreadcrumbs(
          rootContextMock,
          { hideHomeLink: true }
        );
        setBreadcrumbs([
          {
            name: "My account",
            path: "/account",
          },
        ]);

        expect(breadcrumbs.value).toStrictEqual([
          {
            path: "/account",
            name: "My account",
          },
        ]);
      });
    });

    it("should set an empty array if no value set", () => {
      const { setBreadcrumbs, breadcrumbs } = useBreadcrumbs(rootContextMock, {
        hideHomeLink: true,
      });
      setBreadcrumbs(null as any);

      expect(breadcrumbs.value).toStrictEqual([]);
    });
  });
});
