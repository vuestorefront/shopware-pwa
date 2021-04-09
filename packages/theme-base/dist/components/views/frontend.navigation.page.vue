<template>
  <div>
    <CmsPage :content="cmsPage" />
  </div>
</template>
<script>
import CmsPage from "sw-cms/CmsPage";

export default {
  name: "FrontendNavigationPage",
  components: {
    CmsPage,
  },
  props: {
    cmsPage: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
<style lang="scss" scoped></style>
