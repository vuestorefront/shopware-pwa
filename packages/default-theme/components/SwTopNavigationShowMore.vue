<template>
  <div>
    <span class="sf-header__link">{{ $t("More") }}</span>
    <SfIcon
      icon="chevron_down"
      class="sf-chevron_down"
      size="21px"
      view-box="0 0 24 12"
    />
  </div>
</template>

<script>
import { SfIcon } from "@storefront-ui/vue"

export default {
  components: {
    SfIcon,
  },
}
</script>

<style lang="scss" scoped>
.sf-header__link {
  margin-right: 8px;
}
</style>
