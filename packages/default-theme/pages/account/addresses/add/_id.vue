<template>
  <div class="addresses-add">
    <SwAddress/>
  </div>
</template>

<script>
import SwAddress from '@/components/forms/SwAddress'

export default {
  components: { SwAddress },
  data() {
    return {}
  },
  mounted() {
    console.log(this.$router.params.id)
  }
}
</script>

<style lang="scss" scoped></style>
