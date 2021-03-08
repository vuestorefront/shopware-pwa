<template>
  <component
    :is="getComponent"
    :content="content"
    :style="cmsStyles"
    :class="cmsClass"
  />
</template>

<script>
import { getCmsBlockComponent } from "sw-cms/cmsNameMapper"
import { getCmsLayoutConfiguration } from "@shopware-pwa/helpers"
import { computed } from "@vue/composition-api"

export default {
  name: "CmsGenericBlock",

  props: {
    content: {
      type: Object,
      default: () => ({}),
    },
  },
  setup({ content }, {}) {
    const { cssClasses, layoutStyles } = getCmsLayoutConfiguration(content)
    const cmsClass = computed(() => cssClasses)
    const cmsStyles = computed(() => layoutStyles)
    const getComponent = computed(() => getCmsBlockComponent(content))

    return {
      getComponent,
      cmsClass,
      cmsStyles,
    }
  },
}
</script>

<style lang="scss" scoped></style>
