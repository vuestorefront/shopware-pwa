<template>
  <div class="about">
    <pre> {{ categories }} </pre>
  </div>
</template>

<script>
import { getCategories } from "@shopware-pwa/shopware-6-client";

export default {
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
