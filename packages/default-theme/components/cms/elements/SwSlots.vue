<template>
  <div :class="slotClass">
    <div v-if="hasSidebar && sidebarSlot">
      <SwGenericBlock
        :key="sidebarSlot.id"
        :content="sidebarSlot"
        :style="slotStyles"
      />
    </div>
    <div class="elements">
      <SwGenericBlock
        v-for="cmsSlot in elementsSlots"
        :key="cmsSlot.id"
        :content="cmsSlot"
        :style="slotStyles"
      />
    </div>
  </div>
</template>

<script>
import SwGenericBlock from './SwGenericBlock'

export default {
  components: {
    SwGenericBlock
  },
  props: {
    content: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    isBlock() {
      return this.content.blocks && this.content.blocks.length
    },
    cmsSlots() {
      const key = this.isBlock ? 'blocks' : 'slots'
      return this.content && this.content[key] ? this.content[key] : []
    },
    elementsSlots() {
      return this.hasSidebar ? this.cmsSlots.slice(1) : this.cmsSlots
    },
    sidebarSlot() {
      return this.cmsSlots && this.cmsSlots.length ? this.cmsSlots[0] : null
    },
    slotStyles() {
      const {
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        backgroundColor
      } = this.content
      return {
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        backgroundColor
      }
    },
    slotClass() {
      return {
        'sw-blocks': this.isBlock,
        'sw-slots': !this.isBlock,
        'has-sidebar': this.hasSidebar
      }
    },
    hasSidebar() {
      return this.content && this.content.type === 'sidebar'
    }
  }
}
</script>

<style lang="scss">
@import '~@storefront-ui/vue/styles.scss';

@mixin for-desktop {
  @media screen and (min-width: $desktop-min) {
    @content;
  }
}

.sw-blocks {
  &:nth-child(2) > div:nth-child(1) {
    @include for-desktop() {
      min-height: 50vh;
      margin-top: 20px;
      border-right: 1px solid $c-light;
    }
  }
}

.sw-slots {
  display: flex;
  width: 100%;
  justify-content: center;
}

.has-sidebar {
  display: flex;
  flex-direction: column;
  @include for-desktop() {
    flex-direction: row;
  }
  position: relative;
}

.elements {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
