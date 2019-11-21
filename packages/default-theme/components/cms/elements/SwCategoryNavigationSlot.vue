<template>
  <div class="sw-category-navigation">
    <SfAccordion :firstOpen="true" :showChevron="true">
      <SfAccordionItem
        v-for="accordion in navigation"
        :key="accordion.id"
        :header="accordion.name"
      >
        <template v-if="accordion.children.length > 0">
          <SfList>
            <SfListItem v-for="item in accordion.children" :key="item.id">
              <SfMenuItem :label="item.name" />
            </SfListItem>
          </SfList>
        </template>
      </SfAccordionItem>
    </SfAccordion>
  </div>
</template>

<script>
import { SfList, SfAccordion, SfMenuItem } from "@storefront-ui/vue";
import { getNavigation } from "@shopware-pwa/shopware-6-client";

export default {
  components: {
    SfAccordion,
    SfList,
    SfMenuItem
  },
  data() {
    return {
      navigationElements: []
    };
  },
  props: {
    content: {
      type: Object,
      default: () => ({})
    }
  },
  async mounted() {
    const { elements } = await getNavigation({depth:2})
    this.navigationElements = elements
  },
  computed: {
    navigation() {
      return this.navigationElements;
    }
  }
};
</script>

<style lang="scss" scoped></style>
