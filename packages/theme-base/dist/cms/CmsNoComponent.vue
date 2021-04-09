<template>
  <span class="sw-text-error">
    <b>
      {{ elementType }}<i> {{ getElementType }} </i>
    </b>
    is not implemented yet!
  </span>
</template>

<script>
export default {
  components: {},
  name: "CmsNoComponent",
  data() {
    return {};
  },
  props: {
    content: {
      type: Object,
      default: null,
    },
  },
  computed: {
    elementType() {
      if (this.content.pageId) return "Section";
      return this.content.sectionId ? `Block` : `Slot`;
    },
    getElementType() {
      return this.content ? this.content.type : "";
    },
  },
};
</script>

<style lang="scss" scoped>
.sw-text-error {
  --tw-text-opacity: 1;
  color: rgba(239, 68, 68, var(--tw-text-opacity));
}
</style>
