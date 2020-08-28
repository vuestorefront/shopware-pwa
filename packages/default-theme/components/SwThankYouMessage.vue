<template>
  <div class="thanks-message">
    <SfIcon size="21px" icon="heart_fill" />
    <SfHeading :title="success" :subtitle="desc" />
  </div>
</template>

<script>
import { SfHeading, SfIcon } from "@storefront-ui/vue"

export default {
  components: {
    SfHeading,
    SfIcon,
  },

  props: {
    success: {
      type: String,
      default: "Thanks!",
    },
    desc: {
      type: String,
      default: "",
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

.thanks-message {
  --icon-color: var(--_c-blue-primary);
  --heading-title-color: var(--_c-green-primary);

  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
