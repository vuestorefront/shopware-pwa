<template>
  <component :is="getComponent" :content="content" />
</template>

<script>
import { getComponentBy } from "../cmsNameMapper";

export default {
  props: {
    content: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    getComponent() {
      return getComponentBy(this.content);
    }
  }
};
</script>

<style lang="scss" scoped></style>
