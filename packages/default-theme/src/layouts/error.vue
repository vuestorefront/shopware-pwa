<template>
  <ErrorPage :error="error" />
</template>
<script>
import ErrorPage from "@/components/views/error.page.vue"

export default {
  name: "ErrorLayout",
  components: {
    ErrorPage,
  },
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
