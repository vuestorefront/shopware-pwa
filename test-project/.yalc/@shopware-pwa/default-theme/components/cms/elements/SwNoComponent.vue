<template>
  <SfAlert type="danger">
    <template #message>
      <span class="sf-alert__message">
        <b>
          {{ elementType }}<i> {{ getBlockType }} </i>
        </b>
        is not implemented yet!
      </span>
    </template>
  </SfAlert>
</template>

<script>
import { SfAlert } from "@storefront-ui/vue";

export default {
  components: {
    SfAlert
  },
  data() {
    return {};
  },
  props: {
    content: {
      type: Object,
      default: null
    }
  },
  computed: {
    elementType() {
      return this.content.slot ? `Slot` : `Block`;
    },
    getBlockType() {
      return this.content ? this.content.type : "";
    }
  }
};
</script>

<style lang="scss" scoped></style>
