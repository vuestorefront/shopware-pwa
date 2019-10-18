<template>
  <div class="about">
    <SfBadge> LIMITED </SfBadge>
    <pre> {{ categories }} </pre>
  </div>
</template>

<script>
import { getCategories } from "@shopware-pwa/shopware-6-client";
import { SfBadge } from "@storefront-ui/vue";

export default {
  components: {
    SfBadge
  },
  data() {
    return {
      categories: []
    };
  },
  async mounted() {
    this.categories = await getCategories();
  }
};
</script>
