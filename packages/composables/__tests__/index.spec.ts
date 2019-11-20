import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
Vue.use(VueCompositionApi);

import { useCms } from "@shopware-pwa/composables";
import * as shopwareClient from "@shopware-pwa/shopware-6-client";

jest.mock("@shopware-pwa/shopware-6-client");
const mockedGetPage = shopwareClient as jest.Mocked<typeof shopwareClient>;

describe("Shopware composables", () => {
  it("should have value", async () => {
    const { search, page } = useCms();
    const response: shopwareClient.PageResolverResult<any> = {
      breadcrumb: [],
      cmsPage: { name: "super category", type: "product_list" },
      resourceIdentifier: "3f637f17cd9f4891a2d7625d19fb37c9",
      resourceType: "frontend.navigation.page"
    };
    mockedGetPage.getPage.mockResolvedValueOnce(response);
    expect(page.value).toEqual(null);
    await search();
    expect(page.value).toBeTruthy();
    expect(page.value.resourceIdentifier).toEqual("3f637f17cd9f4891a2d7625d19fb37c9");
  });

  it("should have failed on bad url settings", async () => {
    const { search, page, error } = useCms();
    mockedGetPage.getPage.mockRejectedValueOnce("Something went wrong...");
    expect(page.value).toEqual(null);
    await search();
    expect(page.value).toEqual(null);
    expect(error.value).toBeTruthy();
    expect(error.value).toEqual("Something went wrong...");
  });
});
