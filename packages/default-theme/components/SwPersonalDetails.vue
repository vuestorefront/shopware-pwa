<template>
  <div class="sw-personal-details">
    <div class="sw-personal-details__content">
      <h4 class="sw-personal-details__title">Personal details</h4>
      <p class="content">{{ firstName }} {{ lastName }}<br /></p>
      <p class="content">
        {{ email }}
      </p>
    </div>
    <slot name="after-content"/>
  </div>
</template>

<script>

export default {
  name: 'SwPersonalDetails',
  props: {
    personalDetails: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    email() {
      return this.personalDetails.email
    },
    firstName() {
      return this.personalDetails.firstName
    },
    lastName() {
      return this.personalDetails.lastName
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';

.sw-personal-details {
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
