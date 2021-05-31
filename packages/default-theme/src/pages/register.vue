<template>
  <div id="register" :key="$route.fullPath">
    <SfHeading
      class="register__header desktop-only"
      :level="3"
      :title="$t('Create an account')"
    />
    <SwRegister
      class="register__component"
      @success="$router.push($routing.getUrl('/'))"
    />
  </div>
</template>
<script>
import { SfHeading } from "@storefront-ui/vue"

import SwRegister from "@/components/SwRegister"

export default {
  name: "LoginPage",
  components: {
    SwRegister,
    SfHeading,
  },
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables";
#register {
  margin-bottom: 10vh;
  flex-direction: column;
  align-items: center;
  display: flex;
  padding: 0 var(--spacer-sm);
  @include for-desktop {
    justify-content: center;
  }
  .register__component {
    max-width: var(--full-mode-max-width);
  }
}
</style>
