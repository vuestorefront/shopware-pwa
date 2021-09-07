<template>
  <div :key="$route.path" style="min-height: 55vh">
    <component
      :is="getComponent"
      :cms-page="cmsPage"
      :page="page"
      :error="error"
    />
  </div>
</template>
<script>
import { useCms, useNotifications } from "@shopware-pwa/composables";
import { computed } from "vue-demi";

export default {
  name: "DynamicRoute",
  components: {},
  setup() {
    const { page, error, loading } = useCms();

    const cmsPage = computed(() => page.value?.cmsPage);
    const cmsPageName = computed(() => cmsPage.value?.name);

    return {
      page,
      cmsPage,
      cmsPageName,
      error,
      loading,
    };
  },
  computed: {
    getComponent() {
      if (this.page) {
        return () =>
          import("@/components/views/" + this.page.resourceType + ".vue");
      }
      if (this.error) return () => import("@/components/views/error.page.vue");
    },
  },
  methods: {},
};
</script>
