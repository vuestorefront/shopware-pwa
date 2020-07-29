import { getStoreNavigationRoutes } from "@shopware-pwa/helpers";
describe("Shopware helpers - navigation", () => {
  describe("getStoreNavigationRoutes", () => {
    it("should return no url if seoUrls array is empty", () => {
      const SWNavigationResponse = [
        {
          name: "Shoes",
          externalLink: null,
          seoUrls: [],
          children: null,
        },
      ];

      const result = getStoreNavigationRoutes(SWNavigationResponse as any);

      expect(result).toStrictEqual([
        {
          routeLabel: "Shoes",
          routePath: undefined,
          isExternal: false,
          children: null,
        },
      ]);
    });
    it("should return no url if seoUrls property does not exist", () => {
      const SWNavigationResponse = [
        {
          name: "Shoes",
          externalLink: null,
          children: null,
        },
      ];

      const result = getStoreNavigationRoutes(SWNavigationResponse as any);

      expect(result).toStrictEqual([
        {
          routeLabel: "Shoes",
          routePath: undefined,
          isExternal: false,
          children: null,
        },
      ]);
    });
    it("should return seo url", () => {
      const SWNavigationResponse = [
        {
          name: "Shoes",
          externalLink: null,
          seoUrls: [
            {
              pathInfo: "/navigation/ff491d98c86c4ad697004dbcb1d5761a",
              seoPathInfo: "WOMEN/Shoes/",
            },
          ],
          children: null,
        },
      ];

      const result = getStoreNavigationRoutes(SWNavigationResponse as any);

      expect(result).toStrictEqual([
        {
          routeLabel: "Shoes",
          routePath: "/WOMEN/Shoes/",
          isExternal: false,
          children: null,
        },
      ]);
    });

    it("should have the nested children", () => {
      const SWNavigationResponse = [
        {
          name: "Shoes",
          externalLink: null,
          seoUrls: [
            {
              pathInfo: "/navigation/ff491d98c86c4ad697004dbcb1d5761a",
              seoPathInfo: "WOMEN/Shoes/",
            },
          ],
          children: [
            {
              name: "Sneakers",
              externalLink: null,
              seoUrls: [
                {
                  pathInfo: "/navigation/ff491d98c86c4ad697004dbcb1d5761b",
                  seoPathInfo: "WOMEN/Shoes/Sneakers",
                },
              ],
            },
          ],
        },
      ];

      const result = getStoreNavigationRoutes(SWNavigationResponse as any);

      expect(result).toStrictEqual([
        {
          routeLabel: "Shoes",
          routePath: "/WOMEN/Shoes/",
          isExternal: false,
          children: [
            {
              routeLabel: "Sneakers",
              routePath: "/WOMEN/Shoes/Sneakers",
              isExternal: false,
              children: undefined,
            },
          ],
        },
      ]);
    });
    it("should return external link if any included", () => {
      const SWNavigationResponse = [
        {
          name: "Divante",
          externalLink: "https://divante.com",
          seoUrls: null,
          children: null,
        },
      ];

      const result = getStoreNavigationRoutes(SWNavigationResponse as any);

      expect(result).toStrictEqual([
        {
          routeLabel: "Divante",
          routePath: "https://divante.com",
          isExternal: true,
          children: null,
        },
      ]);
    });
  });
});
