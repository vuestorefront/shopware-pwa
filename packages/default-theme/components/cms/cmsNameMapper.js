const slotsMap = {
  'product-box': 'CmsSwProductCart',
  'product-slider': 'SwProductSlider',
  image: 'SwImage',
  text: 'SwTextSlot',
  'vimeo-video': 'SwVimeoVideo',
  'youtube-video': 'SwYoutubeVideo',
  'product-listing': 'SwProductListingSlot',
  'category-navigation': 'SwCategoryNavigationSlot', // waiting for navigation hydration, and domething wrong with accordion
  'sidebar-filter': 'SwCategorySidebarFilter',
  'image-bubble-row': 'SwImageBubbleRow'
}

const excludedSlots = ['image-bubble-row']

export function getComponentBy(content) {
  if (!content) return
  const isSlot =
    !!content.slot || !!excludedSlots.find(slot => slot === content.type)
  let componentName = isSlot ? slotsMap[content.type] : 'SwSlots'
  if (!componentName) componentName = 'SwNoComponent'
  return () =>
    import(
      `@shopware-pwa/default-theme/components/cms/elements/${componentName}`
    )
}
