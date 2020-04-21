<template>
  <div class="cms-element-category-navigation">
    <div class="cms-element-category-navigation__header">
      <h1 class="cms-element-category-navigation__title">{{ navTitle }}</h1>
    </div>
    <div class="cms-element-category-navigation__menu">
      <SfHeading subtitle="No subcategories" v-if="!navigation.length" />
      <SfAccordion :show-chevron="true">
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
    SfHeading,
  },
  name: 'CmsElementCategoryNavigation',
  props: {
    content: {
      type: Object,
      default: () => ({}),
    },
  },
  setup() {
    const { categoryId } = useCms()

    return { categoryId }
  },
  data() {
    return {
      navTitle: 'Subcategories',
      navigationElements: [],
    }
  },
  computed: {
    navigation() {
      return this.navigationElements
    },
  },
  async mounted() {
    const { children } = await getNavigation({
      depth: 2,
      rootNode: this.categoryId,
    })
    this.navigationElements = children
  },
  methods: {
    getCategoryUrl(route) {
      return route.path || ''
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../settings.scss';

.cms-element-category-navigation {
  &__header {
    flex: 0 0 15%;
    align-items: center;
    display: flex;
    height: 3.22rem;
    padding-top: 20px;
    @include for-desktop {
      padding: 20px;
      border-top: 1px solid var(--c-light);
      border-bottom: 1px solid var(--c-light);
    }
  }

  &__title {
    padding: 0;
    font-size: var(--font-size-big-desktop);
  }

  &__menu {
    flex: 0 0 15%;
    padding: 20px 0 20px 0;

    @include for-desktop {
      width: 12rem;
    }

    &__aside {
      display: flex;
      align-items: center;
      flex: 0 0 15%;
      padding: var(--spacer-big) var(--spacer-extra-big);
      border-right: 1px solid var(--c-light);
    }
  }
}
</style>
