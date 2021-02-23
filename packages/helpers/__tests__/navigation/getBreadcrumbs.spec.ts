import { getBreadcrumbs } from "@shopware-pwa/helpers";
describe("Shopware helpers - getBreadcrumbs", () => {
  it("Should return array of breadcrumbs for given CMS breadcrumbs object", () => {
    const breadcrumbsObject = {
      "some-id": {
        path: "toys/",
        name: "Toys",
      },
    };

    const result = getBreadcrumbs(breadcrumbsObject);
    expect(result).toStrictEqual([
      { link: "toys/", route: { link: "toys/" }, text: "Toys" },
    ]);
  });
  it("Should return array of breadcrumbs for given CMS breadcrumbs object using passed function for generating routes", () => {
    const breadcrumbsObject = {
      "some-id": {
        path: "toys/",
        name: "Toys",
      },
    };
    const routeFunction = (route: string) => `/en-US/${route}`;
    const result = getBreadcrumbs(breadcrumbsObject, routeFunction);
    expect(result).toStrictEqual([
      { link: "/en-US/toys/", route: { link: "/en-US/toys/" }, text: "Toys" },
    ]);
  });
  it("Should return an empty array on breadcrumbObject empty parameter", () => {
    const result = getBreadcrumbs(undefined as any);
    expect(result).toStrictEqual([]);
  });
});
