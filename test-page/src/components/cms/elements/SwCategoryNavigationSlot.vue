<template>
  <div class="sw-category-navigation">
    <SfAccordion :firstOpen="true" :showChevron="true">
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
  },
  computed: {
    navigation() {
      return this.navigationResponse;
    }
  }
};
</script>

<style lang="scss" scoped></style>
