<template>
  <div class="sw-accordion-item">
    <!-- @slot -->
    <slot
      name="header"
      v-bind="{
        header,
        isOpen,
        accordionClick,
        showChevron: $parent.showChevron,
      }"
    >
      <SwButton
        :aria-pressed="isOpen.toString()"
        :aria-expanded="isOpen.toString()"
        :class="{ 'is-open': isOpen }"
        class="sf-button--pure sw-accordion-item__header"
        @click="accordionClick"
      >
        {{ header }}
        <!-- @slot here you can add additional information about this item -->
        <slot name="additional-info" />
        <SfChevron
          tabindex="0"
          class="sw-accordion-item__chevron"
          :class="{ 'sf-chevron--right': !isOpen }"
        />
      </SwButton>
    </slot>
    <SwExpand :isOpen="isOpen" v-if="isOpen" :transition="$parent.transition">
      <div>
        <div class="sw-accordion-item__content">
          <!-- @slot -->
          <slot />
        </div>
      </div>
    </SwExpand>
  </div>
</template>
<script>
import SwExpand from "../../helpers/transitions/SwExpand"
import { SfChevron } from "@storefront-ui/vue"
import SwButton from "@/components/atoms/SwButton.vue"
export default {
  name: "SwAccordionItem",
  components: {
    SfChevron,
    SwButton,
    SwExpand,
  },
  props: {
    header: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    accordionClick() {
      this.$parent.$emit("toggle", this._uid)
    },
  },
}
</script>
<style lang="scss">
@import "@/assets/scss/variables";

.sw-accordion-item {
  will-change: height;
  transform: translateZ(0);
  backface-visibility: hidden;
  &__header {
    display: flex;
    justify-content: var(--accordion-item-header-justify, space-between);
    padding: var(--accordion-item-header-padding, var(--spacer-sm));
    color: var(--accordion-item-header-color);
    transition: color 150ms ease-in-out;
    width: 100%;
    border: solid var(--c-light);
    border-width: var(--accordion-item-header-border, 0 0 1px 0);
    font-size: var(--accordion-item-header-font-size, var(--font-size--base));
    font-weight: var(
      --accordion-item-header-font-weight,
      var(--font-weight--medium)
    );
    line-height: 1.4;
    font-family: var(--font-family--secondary);
    &.is-open {
      border-width: 0;
      --accordion-item-header-color: var(--c-primary);
      --chevron-color: var(--c-primary);
    }
  }
  &__content {
    padding: var(
      --accordion-item-content-padding,
      var(--spacer-base) var(--spacer-sm)
    );
    color: var(--accordion-item-content-color, var(--c-text));
    border-width: var(--accordion-item-content-border, 1px 0);
    border: solid var(--c-light);
    font-size: var(--accordion-item-content-font-size, var(--font-size--base));
    font-weight: var(
      --accordion-item-content-font-weight,
      var(--font-weight--light)
    );
    line-height: 1.6;
    font-family: var(--font-family--primary);
  }
  &__chevron {
    display: var(--accordion-item-chevron-display, none);
    flex: 0 0 auto;
  }
  @include for-desktop {
    --accordion-item-header-padding: var(--spacer-xs) 0;
    --accordion-item-header-font-size: var(--h4-font-size);
    --accordion-item-header-font-weight: var(--font-weight--normal);
    --accordion-item-header-border-width: 0;
    --accordion-item-content-border-width: 0;
    --accordion-item-content-padding: var(--spacer-base) 0;
  }
}
</style>
