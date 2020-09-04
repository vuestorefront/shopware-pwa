<template>
  <SfAlert :message="message" :type="type" />
</template>

<script>
import { SfAlert } from "@storefront-ui/vue"

export default {
  name: "SwAlert",

  components: {
    SfAlert,
  },

  props: {
    message: {
      type: String,
      default: "",
    },

    type: {
      type: String,
      default: "secondary",
    },
  },
}
</script>
