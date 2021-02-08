<template>
  <SfAlert class="cms-no-component" type="danger">
    <template #message>
      <span class="sf-alert__message">
        <b>
          {{ elementType }}<i> {{ getElementType }} </i>
        </b>
        {{ $t("is not implemented yet!") }}
      </span>
    </template>
  </SfAlert>
</template>

<script>
import { SfAlert } from "@storefront-ui/vue"

export default {
  components: {
    SfAlert,
  },
  name: "CmsNoComponent",
  data() {
    return {}
  },
  props: {
    content: {
      type: Object,
      default: null,
    },
  },
  computed: {
    elementType() {
      if (this.content.pageId) return "Section"
      return this.content.sectionId ? `Block` : `Slot`
    },
    getElementType() {
      return this.content ? this.content.type : ""
    },
  },
}
</script>

<style lang="scss" scoped></style>
