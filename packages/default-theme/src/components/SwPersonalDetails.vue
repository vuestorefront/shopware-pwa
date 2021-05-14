<template>
  <div class="sw-personal-details">
    <div class="sw-personal-details__content">
      <h4 class="sw-personal-details__title">{{ $t("Personal details") }}</h4>
      <p class="content">{{ firstName }} {{ lastName }}<br /></p>
      <p class="content">
        {{ email }}
      </p>
    </div>
    <slot name="after-content" />
  </div>
</template>

<script>
export default {
  name: "SwPersonalDetails",
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
.sw-personal-details {
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
  margin: var(--spacer-sm);

  &__title {
    color: var(--c-text);
    font-size: var(--font-size--sm);
    margin-bottom: var(--spacer-sm);
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
