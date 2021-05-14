<template>
  <SwPluginSlot name="cms-page" :slot-context="cmsSections">
    <CmsGenericSection
      :content="cmsSection"
      v-for="cmsSection in cmsSections"
      :key="cmsSection.id"
    />
  </SwPluginSlot>
</template>

<script>
import CmsGenericSection from "sw-cms/CmsGenericSection";
import SwPluginSlot from "sw-plugins/SwPluginSlot.vue";

export default {
  components: {
    CmsGenericSection,
    SwPluginSlot,
  },
  props: {
    content: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    cmsSections() {
      return this.content?.sections || [];
    },
  },
};
</script>

<style lang="scss" scoped></style>
