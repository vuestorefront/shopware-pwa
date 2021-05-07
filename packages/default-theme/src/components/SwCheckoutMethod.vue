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
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacer-sm);
  margin: var(--spacer-sm);

  &__title {
    font-size: var(--font-size--sm);
    margin-bottom: var(--spacer-xs);
    color: var(--c-text);
  }

  &__content {
    font-size: var(--font-size--xs);
    color: var(--c-text-muted);
    margin-bottom: var(--spacer-sm);
  }
}

.content {
  margin: 0;
  color: var(--c-text-muted);
}
</style>
