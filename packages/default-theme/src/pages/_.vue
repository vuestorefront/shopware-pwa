<template>
  <div :key="$route.path" style="min-height: 55vh">
    <component
      :is="getComponent"
      :cms-page="cmsPage"
      :page="staticPage"
      :error="staticError"
    />
  </div>
</template>
<script>
import { useCms } from "@shopware-pwa/composables";
import { ref, provide, computed } from "vue-demi";

export default {
  name: "DynamicRoute",
  components: {},
  setup() {
    const { page, error, loading, metaTitle, metaDescription, metaKeywords, pageTitle } = useCms();

    const cmsPage = ref(page.value?.cmsPage);
    const staticPage = ref(page.value);
    const staticError = ref(error.value);

    provide("cms-page", page);

    const getComponent = () => {
      if (staticPage.value) {
        return () =>
          import("@/components/views/" + page.value.resourceType + ".vue");
      }
      if (staticError.value)
        return () => import("@/components/views/error.page.vue");
    };

    return {
      staticPage,
      cmsPage,
      staticError,
      loading,
      getComponent: getComponent(),
      metaObject: computed(() => [
        {
          hid: "title",
          name: "title",
          content: metaTitle.value
        },
        {
          hid: "description",
          name: "description",
          content: metaDescription.value
        },
        {
          hid: "keywords",
          name: "keywords",
          content: metaKeywords.value
        }
      ]),
      pageTitle,
    };
  },
  head() {
    return {
      title: this.pageTitle,
      meta: this.metaObject
    }
  }
};
</script>
