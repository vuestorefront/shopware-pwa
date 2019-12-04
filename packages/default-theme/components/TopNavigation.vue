<template>
  <SfHeader
    title="Storefront UI"
    logo="/img/logo.svg"
    active-sidebar="activeSidebar"
  >
    <template #navigation>
      <!-- <nuxt-link to="/"><SfHeaderNavigationItem>Home</SfHeaderNavigationItem></nuxt-link>
      <nuxt-link v-for="element in navigationElements" :key="element.id" :to="convertToSlug(element.name)">
        <SfHeaderNavigationItem>{{ element.name }}</SfHeaderNavigationItem>
      </nuxt-link> -->
      <nuxt-link to="/"><span>Home</span></nuxt-link>
      <nuxt-link v-for="element in navigationElements" :key="element.id" :to="convertToSlug(element.name)">
        <span>{{ element.name }}</span>
      </nuxt-link>
    </template>
    
  </SfHeader>
</template>
<script>

import slugify from 'slugify' // TODO: remove after the navigation is fully implemented
import { getNavigation, getPage,  } from '@shopware-pwa/shopware-6-client'
import { SfHeader, SfCircleIcon } from '@storefront-ui/vue'

export default {
  components: { SfHeader, SfCircleIcon },
  data () {
    return {
      navigationElements: [],
      activeSidebar: 'account',
    }
  },
  methods: {
    convertToSlug(name) {
      return "/" + slugify(name, {
        remove: /and|[*+~.,()'"!:@]/g
      })
    },
  },
  async mounted() {
    const { children } = await getNavigation({depth: 1}) 
    this.navigationElements = children
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
