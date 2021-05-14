<template>
  <div v-if="address" class="sw-address">
    <div class="sw-address__content">
      <h4 class="sw-address__title">{{ addressTitle }}</h4>
      <slot name="before-content" />
      <p class="content">
        {{ street }}, {{ zipcode }}<br />
        {{ city }}
      </p>
      <p v-if="phoneNumber" class="content">
        {{ phoneNumber }}
      </p>
    </div>
    <slot name="after-content" />
  </div>
</template>

<script>
export default {
  name: "SwAddress",
  components: {},
  props: {
    addressTitle: {
      type: String,
      default: "",
    },
    address: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    title() {
      return this.address.title
    },
    zipcode() {
      return this.address.zipcode
    },
    street() {
      return this.address.street
    },
    city() {
      return this.address.city
    },
    phoneNumber() {
      return this.address.phoneNumber
    },
  },
}
</script>

<style lang="scss" scoped>
.sw-address {
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
  margin: var(--spacer-sm);

  &__title {
    font-size: var(--font-size--sm);
    margin-bottom: var(--spacer-sm);
    color: var(--c-text);
  }

  &__content {
    font-size: var(--font-size--xs);
  }
}

.content {
  margin: 0;
  color: var(--c-text-muted);
}
</style>
