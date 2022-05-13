<template>
  <article class="cms-block-teaser-section">
    <CmsGenericElement
      :content="getLeftContent"
      class="cms-block-teaser-section__left"
    />
    <CmsGenericElement
      :content="getRightContent"
      class="cms-block-teaser-section__right"
    />
  </article>
</template>

<script>
import { computed } from '@vue/composition-api';
import CmsGenericElement from "sw-cms/CmsGenericElement"

export default {
  name: "CmsBlockTextTeaserSection",

  components: {
    CmsGenericElement,
  },

  props: {
    content: {
      type: Object,
      default: () => ({}),
    },
  },

  setup(props) {
    const slots = props.content?.slots || []

    const getLeftContent = computed(() => slots?.find(({ slot }) => slot === "left"));
    const getRightContent = computed(() => slots?.find(({ slot }) => slot === "right"));

    return {
      getLeftContent,
      getRightContent,
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

.cms-block-teaser-section {
  display: flex;
  flex-direction: row;

  &__left {
        flex: 0 0 calc(33.333% - 20px);
  }

  & > * {
    padding: var(--spacer-sm);
  }
}
</style>
