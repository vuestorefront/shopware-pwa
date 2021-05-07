<template>
  <div class="cookie-description">
    <p>
      {{ $t("This site uses cookies. Read our cookies policy") }}

      <!-- <SfLink class="link" :link="$i18n.path()">
        cookies policy.
      </SfLink> -->
    </p>
  </div>
</template>

<script>
import { SfLink } from "@storefront-ui/vue"
export default {
  name: "SwCookieBarDescription",
  components: { SfLink },
}
</script>

<style lang="scss" scoped>
.cookie-description {
  padding: var(--spacer-xs) 0;

  .link {
    margin-left: var(--spacer-xs);
    font-size: var(--font-size--xs);
    color: var(--c-white);
  }
}
</style>
