<template>
  <div class="sw-generic-method">
    <div class="sw-generic-method__content">
      <h4 class="sw-generic-method__title">{{ label }}</h4>
      <p class="content">{{ method.name }}</p>
    </div>
    <slot name="after-content"></slot>
  </div>
</template>

<script>
export default {
  name: "SwCheckoutMethod",
  props: {
    label: {
      type: String,
      default: "",
    },
    method: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style lang="scss" scoped>
.sw-generic-method {
  margin-bottom: var(--spacer-sm);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  &__title {
    font-size: var(--font-sm);
    margin-bottom: var(--spacer-xs);
    color: var(--c-text);
  }
  &__content {
    font-size: var(--font-xs);
    color: var(--c-text-muted);
  }
}

.content {
  margin: 0;
  color: var(--c-text-muted);
}
</style>
