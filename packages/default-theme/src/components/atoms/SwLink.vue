<template>
  <SfLink :link="link" :target="target">
    <slot />
  </SfLink>
</template>

<script>
import { SfLink } from "@storefront-ui/vue"

export default {
  name: "SwLink",

  components: {
    SfLink,
  },

  props: {
    link: {
      required: true,
      type: String,
    },

    target: {
      default: "_blank",
      type: String,
    },
  },
}
</script>
