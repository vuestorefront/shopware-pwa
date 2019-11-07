const namesMap = {
  // custom elements (blocks) go here
};

const slotsMap = {
  "product-box": "CmsSwProductCart",
  "product-slider": "SwProductSlider",
  image: "SwImage",
  text: "SwTextSlot",
  "vimeo-video": "SwVimeoVideo",
  "youtube-video": "SwYoutubeVideo",
  "product-listing": "SwProductListingSlot",
  "category-navigation": "SwCategoryNavigationSlot"
};

export function getComponentBy(content) {
  if (!content) return;
  const isSlot = !!content.slot;
  const subdir = isSlot ? "slots" : "blocks";
  const componentsMap = isSlot ? slotsMap : namesMap;
  const componentName = componentsMap[content.type]
    ? componentsMap[content.type]
    : isSlot
    ? "SwNoComponent"
    : "SwSlots";
  return () => import(`./elements/${subdir}/${componentName}`);
}
