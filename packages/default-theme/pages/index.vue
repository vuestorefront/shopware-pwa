<template>
  <div>
    <div id="nav">
      <nuxt-link to="/">Home</nuxt-link>
      <nuxt-link v-for="element in navigationElements" :key="element.id" :to="`/category/${element.id}`"> | {{ element.name }}</nuxt-link>
    </div>
    <nuxt-child/>
  </div>
</template>
<script>
import { getNavigation } from "@shopware-pwa/shopware-6-client";

export default {
  data: function () {
    return {
      navigationElements: []
    }
  },
  async asyncData ({ params }) {
    const { elements } = await getNavigation()
    return { navigationElements: elements }
  }
}
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles.scss';
@import '~@storefront-ui/shared/styles/helpers/visibility';
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.nuxt-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
