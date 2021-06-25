<template>
  <div v-if="Array.isArray(list) && list.length" class="errors-list-component">
    <SwAlert :message="`${$t('Encountered problems')}:`" type="danger" />
    <ul class="list">
      <li v-for="error in list" :key="error.code" class="item">
        {{
          isFieldRelatedError(error.code) ? `${error.source.pointer}: ` : ""
        }}
        {{ error.detail }}
      </li>
    </ul>
  </div>
</template>

<script>
import SwAlert from "@/components/atoms/SwAlert.vue"

const FIELD_RELATED_ERRORS = [
  "VIOLATION::IS_BLANK_ERROR",
  "VIOLATION::TOO_LOW_ERROR",
  "VIOLATION::STRICT_CHECK_FAILED_ERROR",
]

export default {
  name: "SwErrorsList",
  components: { SwAlert },
  props: {
    list: {
      type: Array,
      default: [],
    },
  },
  setup(props, {}) {
    // enables to check whether error should also contain the field name
    const isFieldRelatedError = (errorCode) =>
      FIELD_RELATED_ERRORS.includes(errorCode)
    return {
      isFieldRelatedError,
    }
  },
}
</script>

<style lang="scss" scoped>
.errors-list-component {
  color: var(--_c-red-primary);
  font-size: var(--font-size--sm);

  .list {
    margin-top: var(--spacer-xs);
    padding-left: var(--spacer-xs);

    .item {
      list-style: inside;
    }
  }
}
</style>
