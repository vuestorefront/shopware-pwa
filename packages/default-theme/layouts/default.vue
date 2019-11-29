<template>
  <div id="layout">
    <TopNavigation/>
    <div>
      <h2 @click="isCartOpen = true"> CART {{ count }} </h2>
    </div>
    <SfBreadcrumbs
       v-show="getBreadcrumbs.length > 0" 
      :breadcrumbs="getBreadcrumbs"
      class="sw-breadcrumbs"/>
    <nuxt />
    <SwCart :is-open="isCartOpen" @close="isCartOpen=false" />
  </div>
</template>
<script>
import TopNavigation from "../components/TopNavigation";
import SwCart from "../components/SwCart";
import { SfBreadcrumbs } from "@storefront-ui/vue";
import { useCart } from "@shopware-pwa/composables";
import { ref } from "@vue/composition-api";

export default {
  components: {
    TopNavigation,
    SfBreadcrumbs,
    SwCart
  },
  setup() {
    const {count} = useCart()
    const isCartOpen = ref(false)
    return {
      count,
      isCartOpen
    }
  },
  computed: {
    componentBreadcrumbs () { // TODO probably move to vuex now as it's not rendered on server side
      return this.$route.matched.map((r) => {
        return r.components.default.options.data().breadcrumbs
      })[0] || {}
    },
    getBreadcrumbs () {
      return Object.keys(this.componentBreadcrumbs).map(key => this.componentBreadcrumbs[key]).map(breadcrumb => ({
        text: breadcrumb.name,
        route: {
          link: breadcrumb.path
        }
      }))
    }
  },
}
</script>

<style lang="scss">
@import '~@storefront-ui/vue/styles';
@import '~@storefront-ui/shared/styles/helpers/visibility';
@import '~@storefront-ui/vue/src/utilities/transitions/transitions';

@mixin for-desktop {
  @media screen and (min-width: $desktop-min) {
    @content;
  }
}

body {
  padding: 0;
  margin: 0;
}

#layout {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1320px;
    margin: auto;
  }
}

.sw-breadcrumbs {
  padding: $spacer-big $spacer-extra-big $spacer-extra-big;
}
</style>
