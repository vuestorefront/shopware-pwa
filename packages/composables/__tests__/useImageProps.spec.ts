import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
Vue.use(VueCompositionApi);

import { useImageProps } from "@shopware-pwa/composables";

describe("Composables - useImageProps", () => {
  const content = {
    data: {
      media: {
        title: "title",
        alt: "alternative text",
        url: "image-url"
      }
    }
  };

  const emptyContent = {};

  it("should return computed url string", () => {
    const { getImgUrl } = useImageProps(content as any);
    expect(getImgUrl.value).toBe("image-url");
  });

  it("should return computed title string", () => {
    const { getTitle } = useImageProps(content as any);
    expect(getTitle.value).toBe("title");
  });

  it("should return computed alt string", () => {
    const { getAlt } = useImageProps(content as any);
    expect(getAlt.value).toBe("alternative text");
  });
  it("should return empty string", () => {
    const { getImgUrl } = useImageProps(emptyContent as any);
    expect(getImgUrl.value).toBe("");
  });

  it("should return empty string", () => {
    const { getTitle } = useImageProps(emptyContent as any);
    expect(getTitle.value).toBe("");
  });

  it("should return empty string", () => {
    const { getAlt } = useImageProps(emptyContent as any);
    expect(getAlt.value).toBe("");
  });
});
