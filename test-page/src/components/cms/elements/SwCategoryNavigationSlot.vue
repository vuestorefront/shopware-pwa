<template>
  <div class="sw-category-navigation">
    <SfAccordion :firstOpen="true" :showChevron="false">
      <SfAccordionItem
        v-for="accordion in navigation"
        :key="accordion.id"
        :header="accordion.header"
      >
        <template v-if="accordion.items.length > 0">
          <SfList>
            <SfListItem v-for="(item, j) in accordion.items" :key="j">
              <SfMenuItem :label="item.label" :count="item.count" />
            </SfListItem>
          </SfList>
        </template>
      </SfAccordionItem>
    </SfAccordion>
  </div>
</template>

<script>
import { SfList, SfAccordion, SfMenuItem } from "@storefront-ui/vue";
import { getNavigationTemp } from "@shopware-pwa/shopware-6-client";
export default {
  components: {
    SfAccordion,
    SfList,
    SfMenuItem
  },
  data() {
    return {
      navigationResponse: []
    };
  },
  props: {
    content: {
      type: Object,
      default: () => ({})
    }
  },
  async mounted() {
    // TODO get the current category id from state management
    this.navigationResponse = await getNavigationTemp(
      "3f637f17cd9f4891a2d7625d19fb37c9"
    );
  },
  computed: {
    navigation() {
      return this.navigationResponse;
    }
  }
};
</script>

<style lang="scss" scoped></style>
