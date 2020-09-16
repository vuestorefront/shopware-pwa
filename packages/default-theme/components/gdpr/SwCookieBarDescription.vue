<template>
  <div class="cookie-description">
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque esse natus
      recusandae voluptatem cum ex porro hic dignissimos necessitatibus, dolorem
      magni sapiente, et, iste laboriosam maxime? At corporis odio architecto?

      <SfLink class="link" :link="$i18n.path()">
        Link
      </SfLink>
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
  .link {
    margin-left: var(--spacer-xs);
    font-size: var(--font-xs);
    color: var(--c-white);
  }
}
</style>
