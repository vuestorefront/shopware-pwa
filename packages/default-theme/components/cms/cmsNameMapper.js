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
  'image-bubble-row': 'SwImageBubbleRow',
  'image-two-column': 'SwImageColumn'
}

const excludedSlots = ['image-bubble-row', 'image-two-column']

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

export const setContentOrder = content => {
  const newContent = JSON.parse(JSON.stringify(content))
  const slotsArr = []
  const slotsArrLength = newContent.slots.length
  newContent.slots.forEach(slot => {
    switch (slot.slot) {
      case 'left':
        slotsArr[0] = slot
        break
      case 'right':
        slotsArr[slotsArrLength - 1] = slot
        break
      default:
        slotsArr[slotsArrLength - 2] = slot
    }
  })
  newContent.slots = slotsArr
  return newContent
}
