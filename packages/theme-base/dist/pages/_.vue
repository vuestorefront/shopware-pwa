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
import { ref } from "vue-demi";

export default {
  name: "DynamicRoute",
  components: {},
  setup() {
    const { page, error, loading } = useCms();

    const cmsPage = ref(page.value?.cmsPage);
    const staticPage = ref(page.value);
    const staticError = ref(error.value);

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
    };
  },
};
</script>
