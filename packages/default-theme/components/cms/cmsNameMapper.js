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
  let componentName = isSlot ? slotsMap[content.type] : "SwSlots";
  if (!componentName) componentName = "SwNoComponent";
  return () => import(`./elements/${componentName}`);
}
