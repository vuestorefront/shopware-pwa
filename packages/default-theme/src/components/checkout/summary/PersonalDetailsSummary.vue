<template>
  <SwPersonalDetails :personal-details="personalDetails">
    <!-- <template #after-content>
      <SwButton
        class="sf-button--text review__edit"
        @click=""
      >
        {{ $t("Edit") }}
      </SwButton>
    </template> -->
  </SwPersonalDetails>
</template>
<script lang="ts">
// import SwButton from "@/components/atoms/SwButton.vue"
import { useUser } from "@shopware-pwa/composables"
import { computed } from "@vue/composition-api"
import SwPersonalDetails from "@/components/SwPersonalDetails.vue"

export default {
  name: "PersonalDetailsSummary",
  components: {
    SwPersonalDetails,
    // SwButton,
  },
  setup(props, { root }) {
    const { user } = useUser(root)

    return {
      personalDetails: computed(() => ({
        firstName: user.value?.firstName,
        lastName: user.value?.lastName,
        email: user.value?.email,
      })),
    }
  },
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables";
.review {
  &__item {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: var(--spacer-base);
    padding: var(--spacer-sm);
    @include for-desktop {
      padding: 0;
    }
  }
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
