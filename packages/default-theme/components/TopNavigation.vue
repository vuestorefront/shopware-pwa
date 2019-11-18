<template>
  <div id="nav">
      <nuxt-link to="/">Home</nuxt-link>
      <nuxt-link v-for="element in navigationElements" :key="element.id" :to="convertToSlug(element.name)"> | {{ element.name }}</nuxt-link>
</div>
</template>
<script>
import { getNavigation, getPage } from "@shopware-pwa/shopware-6-client";
import slugify from "slugify" // todo remove after the navigation is fully implemented

export default {
  data: function () {
    return {
      navigationElements: []
    }
  },
  async mounted () {
    const { elements } = await getNavigation({depth:1})
    this.navigationElements = elements
  },
  methods: {
    convertToSlug(name) {
      return "/" + slugify(name, {
        remove: /and|[*+~.,()'"!:@]/g
      })
    }
  },
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
