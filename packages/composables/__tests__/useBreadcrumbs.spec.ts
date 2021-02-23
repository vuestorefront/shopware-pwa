import Vue from "vue";

// Mock Vue Composition API onMounted method
import VueCompositionApi, {
  reactive,
  ref,
  computed,
  Ref,
} from "@vue/composition-api";
Vue.use(VueCompositionApi);
import { useBreadcrumbs } from "../src/logic/useBreadcrumbs";

describe("Composables - useBreadcrumbs", () => {
  const statePage: Ref<Object | null> = ref(null);
  const rootContextMock: any = {
    $store: {
      getters: reactive({ getPage: computed(() => statePage.value) }),
      commit: (name: string, value: any) => {
        statePage.value = value;
      },
    },
    $shopwareApiInstance: jest.fn(),
    shopwareDefaults: jest.fn(),
    $routing: jest.fn(),
  };
  beforeEach(() => {
    jest.resetAllMocks();
    statePage.value = null;
  });

  describe("methods", () => {
    describe("clear", () => {
      it("should clear the local list of breadcrumbs after invokation of clear method", () => {
        const { clear, setBreadcrumbs, breadcrumbs } = useBreadcrumbs(
          rootContextMock
        );
        setBreadcrumbs([
          {
            text: "My account",
            link: "/account",
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
        statePage.value = {
          breadcrumb: {
            "breadcrumb-id": {
              name: "Clothes",
              path: "Clothes/",
            },
          },
        };
        const { breadcrumbs } = useBreadcrumbs(rootContextMock);
        expect(breadcrumbs.value).toStrictEqual([
          {
            link: "Clothes/",
            route: {
              link: "Clothes/",
            },
            text: "Clothes",
          },
        ]);
      });
      it("should return local breadcrumbs with default one pointing Home if there are any assigned", () => {
        const { setBreadcrumbs, breadcrumbs } = useBreadcrumbs(rootContextMock);
        setBreadcrumbs([
          {
            text: "My account",
            link: "/account",
          } as any,
        ]);

        expect(breadcrumbs.value).toStrictEqual([
          {
            link: "/account",
            text: "My account",
          },
        ]);
      });
    });
  });
});
