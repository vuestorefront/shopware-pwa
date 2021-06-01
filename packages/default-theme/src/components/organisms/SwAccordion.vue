<template>
  <div class="sw-accordion" :class="{ 'has-chevron': showChevron }">
    <!--@slot default slot to setup SWAccordionItem elements -->
    <slot />
  </div>
</template>
<script>
import Vue from "vue"
import SwAccordionItem from "./SwAccordionItem.vue"
Vue.component("SwAccordionItem", SwAccordionItem)
export default {
  name: "SwAccordion",
  props: {
    /**
     * Opens an accordion item based on title. If 'all' string is passed then all items will be open by default.
     */
    open: {
      type: [String, Array],
      default: "",
    },
    /**
     * Allows to open multiple accordion items if set to "true"
     */
    multiple: {
      type: Boolean,
      default: false,
    },
    /**
     * Overlay transition effect
     */
    transition: {
      type: String,
      default: "sf-expand",
    },
    showChevron: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      openHeader: this.open,
    }
  },
  mounted() {
    this.$on("toggle", this.toggleHandler)
    this.setAsOpen()
  },
  updated() {
    this.setAsOpen()
  },
  methods: {
    setAsOpen() {
      if (this.$children && this.$children.length) {
        if (this.open === "all") {
          this.multiple = true
          this.openHeader = this.$children.map((child) => child.header)
        }
        this.$children.forEach((child) => {
          child.isOpen = Array.isArray(this.openHeader)
            ? this.openHeader.includes(child.header)
            : this.openHeader === child.header
        })
      }
    },
    toggleHandler(slotId) {
      if (!this.multiple && !Array.isArray(this.openHeader)) {
        this.$children.forEach((child) => {
          if (child._uid === slotId) {
            child.isOpen = !child.isOpen
            this.openHeader = child.header
          } else {
            child.isOpen = false
          }
        })
      } else {
        const clickedHeader = this.$children.find((child) => {
          return child._uid === slotId
        })
        clickedHeader.isOpen = !clickedHeader.isOpen
      }
    },
  },
}
</script>
<style lang="scss">
.sw-accordion {
  &.has-chevron {
    --accordion-item-chevron-display: flex;
  }
}
</style>
