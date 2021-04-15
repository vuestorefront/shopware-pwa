<template>
  <div class="sw-footer" data-cy="main-footer"></div>
</template>

<script>
import SwPluginSlot from "sw-plugins/SwPluginSlot.vue"
import SwFooterNavigation from "@/components/organisms/SwFooterNavigation.vue"

export default {
  name: "SwFooter",
  components: {
    SwPluginSlot,
    SwFooterNavigation,
  },
  props: {
    column: {
      type: Number,
      default: 4,
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

.sw-footer {
  align-items: flex-end;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: auto;
  justify-content: center;
  margin-top: 1em;
  width: 100%;

  @include for-desktop {
    margin-bottom: 0;
    margin-top: 2em;
  }

  &__link {
    font-weight: 500;

    &:hover {
      color: var(--_c-green-primary);
      text-decoration: underline;
    }
  }

  &__signature {
    text-align: center;
    width: 100%;

    @include for-desktop {
      margin-bottom: 0;
    }
  }

  &__bottom-navigation {
    margin-bottom: var(--spacer-sm);
    width: 100%;
  }
}
</style>
