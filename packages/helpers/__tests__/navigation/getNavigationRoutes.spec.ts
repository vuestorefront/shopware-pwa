import { getNavigationRoutes } from "@shopware-pwa/helpers";
describe("Shopware helpers - navigation", () => {
  describe("getNavigationRoutes", () => {
    it("should return technical url without prefixing by slash if it exists already", () => {
      const SWNavigationResponse = [
        {
          name: "Cloting",
          route: {
            path: "/navigation/7d4c679c61d5aa387c80a6a45d75c117",
          },
          translated: {
            name: "Cloting",
          },
          children: null,
        },
      ];

      const result = getNavigationRoutes(SWNavigationResponse as any);

      expect(result).toStrictEqual([
        {
          routeLabel: "Cloting",
          routePath: "/navigation/7d4c679c61d5aa387c80a6a45d75c117",
          children: null,
        },
      ]);
    });
    it("should return an array with one object with no children included", () => {
      const SWNavigationResponse = [
        {
          name: "Cloting",
          route: {
            path: "clothing/",
          },
          translated: {
            name: "Cloting",
          },
          children: null,
        },
      ];

      const result = getNavigationRoutes(SWNavigationResponse as any);

      expect(result).toStrictEqual([
        { routeLabel: "Cloting", routePath: "/clothing/", children: null },
      ]);
    });

    it("should return an array with one object with children included", () => {
      const SWNavigationResponse = [
        {
          name: "Cloting",
          route: {
            path: "clothing/",
          },
          translated: {
            name: "Cloting",
          },
          children: [
            {
              name: "Outdoor",
              translated: {
                name: "Outdoor",
              },
              route: {
                path: "clothing/outdoor/",
              },
            },
            {
              name: "Indoor",
              route: {
                path: "clothing/indoor/",
              },
            },
          ],
        },
      ];

      const result = getNavigationRoutes(SWNavigationResponse as any);

      expect(result).toStrictEqual([
        {
          routeLabel: "Cloting",
          routePath: "/clothing/",
          children: [
            {
              children: undefined,
              routeLabel: "Outdoor",
              routePath: "/clothing/outdoor/",
            },
            {
              children: undefined,
              routeLabel: "Indoor",
              routePath: "/clothing/indoor/",
            },
          ],
        },
      ]);
    });
  });
});
