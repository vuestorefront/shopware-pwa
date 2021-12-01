<template>
  <div>
    <H1> We cannot display this page </H1>
    <p>
      Please overwrite this page in your theme
      <code> /src/components/views/error.page.vue </code>
    </p>
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
