<template>
  <SwPluginSlot name="cms-generic-block" :slot-context="content">
    <component
      :is="getComponent"
      :content="content"
      :style="cmsStyles"
      :class="cmsClass"
    />
  </SwPluginSlot>
</template>

<script>
import { getCmsBlockComponent } from "sw-cms/cmsNameMapper";
import { getCmsLayoutConfiguration } from "@shopware-pwa/helpers";
import { computed } from "@vue/composition-api";
import SwPluginSlot from "sw-plugins/SwPluginSlot.vue";

export default {
  name: "CmsGenericBlock",
  components: { SwPluginSlot },
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
    const getComponent = computed(() => getCmsBlockComponent(content));

    return {
      getComponent,
      cmsClass,
      cmsStyles,
    };
  },
};
</script>

<style lang="scss" scoped></style>
