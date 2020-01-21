<template>
  <div class="sw-category-navigation">
    <div class="sw-category-navigation__header">
      <h1 class="sw-category-navigation__title">{{ navTitle }}</h1>
    </div>
    <div class="sw-category-navigation__menu">
      <SfHeading subtitle="No subcategories" v-if="!navigation.length"/>
      <SfAccordion :first-open="true" :show-chevron="true">
        <SfAccordionItem
          v-for="accordion in navigation"
          :key="accordion.id"
          :header="accordion.name"
        >
          <template v-if="accordion.children.length > 0">
            <SfList>
              <SfListItem v-for="item in accordion.children" :key="item.id">
                <nuxt-link
                  v-if="item.route && item.name"
                  :to="getCategoryUrl(item.route)"
                >
                  <SfMenuItem :label="item.name" />
                </nuxt-link>
              </SfListItem>
            </SfList>
          </template>
          <template v-else>
            <nuxt-link
              v-if="accordion.route && accordion.name"
              :to="getCategoryUrl(accordion.route)"
            >
            See {{ accordion.name }}
            </nuxt-link>
          </template>
        </SfAccordionItem>
      </SfAccordion>
    </div>
  </div>
</template>

<script>
import { SfList, SfAccordion, SfMenuItem, SfHeading } from '@storefront-ui/vue'
import { getNavigation } from '@shopware-pwa/shopware-6-client'
import { useCms } from '@shopware-pwa/composables'

export default {
  components: {
    SfAccordion,
    SfList,
    SfMenuItem,
    SfHeading
  },
  props: {
    content: {
      type: Object,
      default: () => ({})
    }
  },
  setup() {
    const { categoryId } = useCms()

    return { categoryId: categoryId.value }
  },
  data() {
    return {
      navTitle: 'Subcategories',
      navigationElements: []
    }
  },
  computed: {
    navigation() {
      return this.navigationElements
    }
  },
  async mounted() {
    const { children } = await getNavigation({
      depth: 2,
      rootNode: this.categoryId
    })
    this.navigationElements = children
  },
  methods: {
    getCategoryUrl(route) {
      return route.path || ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles.scss';

@mixin for-desktop {
  @media screen and (min-width: $desktop-min) {
    @content;
  }
}

.sw-category-navigation {
  margin-right: 0 !important;
  &__header {
    margin-left: 2.5rem;
    flex: 0 0 15%;
    align-items: center;
    display: flex;
    height: 3.9rem;
    @include for-desktop {
      border-top: 1px solid $c-light;
      border-bottom: 1px solid $c-light;
    }
  }

  &__title {
    padding: 0;
    font-size: $font-size-big-desktop;
  }

  &__menu {
    margin-right: 20px;
    flex: 0 0 15%;
    padding: $spacer-extra-big;

    &__aside {
      display: flex;
      align-items: center;
      flex: 0 0 15%;
      padding: $spacer-big $spacer-extra-big;
      border-right: 1px solid $c-light;
    }
  }
}
</style>
