<template>
  <component
    :is="getComponent"
    :content="content"
    :class="cmsClass"
    :style="cmsStyles"
  />
</template>

<script>
import { getCmsElementComponent } from "sw-cms/cmsNameMapper";
import { getCmsLayoutConfiguration } from "@shopware-pwa/helpers";
import { computed } from "@vue/composition-api";

export default {
  name: "CmsGenericElement",
  props: {
    content: {
      type: Object,
      default: () => ({}),
    },
  },
  setup({ content }, {}) {
    const { cssClasses, layoutStyles } = getCmsLayoutConfiguration(content);
    const cmsClass = computed(() => cssClasses);
    const cmsStyles = computed(() => layoutStyles);
    const getComponent = computed(() => getCmsElementComponent(content));

    return {
      getComponent,
      cmsClass,
      cmsStyles,
    };
  },
};
</script>

<style lang="scss" scoped></style>
