<template>
  <div class="success-page" :key="$route.fullPath">
    <SfHeading level=2 title="Thank you" subtitle="for shopping with us!" class="success-page__heading" />
    <SfButton @click="$router.push('/')">
      <SfIcon icon="chevron_left" color="white" size="20px" />Return to homepage
    </SfButton>
  </div>
</template>
<script>
import { SfButton, SfHeading, SfIcon } from "@storefront-ui/vue";

export default {
  name: "SuccessPage",
  data() {
    return {
    }
  },
  components: {
    SfHeading,
    SfButton,
    SfIcon,
  },
};
</script>
<style lang="scss">
@import '~@storefront-ui/vue/styles.scss';

.success-page {
  height: 100%;
  text-align: center;
  margin: auto;

  &__heading {
    height: 100%;
    margin-bottom: 30px;
    text-align: center;
    h2 {
      font-size: 5rem;
      color: var(--c-primary);
    }
  }

  .sf-icon {
    float: left;
    margin-right: 20px;
  }
}
</style>
