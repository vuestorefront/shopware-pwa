import { ref, Ref } from "vue-demi";
import { useBreadcrumbs } from "../src/logic/useBreadcrumbs";
import * as Composables from "@shopware-pwa/composables";
import { Breadcrumb } from "@shopware-pwa/commons/interfaces";
import { prepareRootContextMock } from "./contextRunner";
jest.mock("@shopware-pwa/composables");
const mockedComposables = Composables as jest.Mocked<typeof Composables>;

import vueComp from "vue-demi";
const mockedCompositionAPI = vueComp as jest.Mocked<typeof vueComp>;

describe("Composables - useBreadcrumbs", () => {
  const rootContextMock: any = prepareRootContextMock();
  const stateSharedRef: Ref<Breadcrumb[] | null> = ref(null);

  let cmsContextName: string = "";

  beforeEach(() => {
    jest.resetAllMocks();
    stateSharedRef.value = null;

    mockedComposables.useSharedState.mockImplementation(() => {
      return {
        sharedRef: (contextName: string) => {
          cmsContextName = contextName;
          return stateSharedRef;
        },
      } as any;
    });
    mockedComposables.useVueContext.mockReturnValue({
      isVueComponent: false,
      isVueScope: true,
    });
    mockedComposables.getApplicationContext.mockReturnValue(rootContextMock);
  });

  it("should use default cmsContext", () => {
    useBreadcrumbs();
    expect(cmsContextName).toEqual("useBreadcrumbs-breadcrumbs");
  });

  it("should use defined cmsContext", () => {
    mockedComposables.useVueContext.mockReturnValue({
      isVueComponent: true,
      isVueScope: true,
    });
    mockedCompositionAPI.inject = jest
      .fn()
      .mockReturnValue("myInjectedContext");
    useBreadcrumbs();
    expect(cmsContextName).toEqual(
      "useBreadcrumbs(cms-myInjectedContext)-breadcrumbs"
    );
  });

  describe("methods", () => {
    describe("clear", () => {
      it("should clear the local list of breadcrumbs after invokation of clear method", () => {
        const { clear, setBreadcrumbs, breadcrumbs } = useBreadcrumbs();
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
        const { breadcrumbs } = useBreadcrumbs();
        expect(breadcrumbs.value).toStrictEqual([]);
      });
    });

    it("should return breadcrumbs object from cms page if any available", () => {
      const { breadcrumbs, setBreadcrumbs } = useBreadcrumbs();
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
      const { breadcrumbs, setBreadcrumbs } = useBreadcrumbs({
        hideHomeLink: true,
      });
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
      const { setBreadcrumbs, breadcrumbs } = useBreadcrumbs();
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
      const { setBreadcrumbs, breadcrumbs } = useBreadcrumbs({
        hideHomeLink: true,
      });
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
    const { setBreadcrumbs, breadcrumbs } = useBreadcrumbs({
      hideHomeLink: true,
    });
    setBreadcrumbs(null as any);

    expect(breadcrumbs.value).toStrictEqual([]);
  });
});
