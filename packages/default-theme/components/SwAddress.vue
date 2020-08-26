<template>
  <div v-if="address" class="sw-address">
    <div class="sw-address__content">
      <h4 class="sw-address__title">{{ addressTitle }}</h4>
      <slot name="before-content" />
      <p class="content">
        {{ street }} {{ apartment }}, {{ zipcode }}<br />
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
  name: "SwPersonalDetails",
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
    apartment() {
      return this.address.apartment
    },
    phoneNumber() {
      return this.address.phoneNumber
    },
  },
}
</script>

<style lang="scss" scoped>
.sw-address {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  &__title {
    font-size: var(--font-sm);
    margin-bottom: var(--spacer-sm);
    color: var(--c-text);
  }
  &__content {
    font-size: var(--font-xs);
  }
}
.content {
  margin: 0;
  color: var(--c-text-muted);
}
</style>
