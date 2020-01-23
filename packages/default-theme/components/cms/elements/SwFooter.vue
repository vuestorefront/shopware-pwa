<template>
  <div class="sw-footer">
    <slot class="sw-footer__content" name="content" v-bind="column">
      <SfFooter :column="column" :multiple="true">
        <div class="content sw-footer__signature">
          Made with ❤️ by shopware AG & Vue Storefront
        </div>
      </SfFooter>
    </slot>
  </div>
</template>

<script>
import { SfFooter } from '@storefront-ui/vue'

export default {
  components: {
    SfFooter
  },
  name: 'SwFooter',
  props: {
    column: {
      type: Number,
      default: 4
    }
  }
}
</script>

<style lang="scss">
 @import "~@storefront-ui/vue/styles.scss";

.sw-footer{
  &__signature {
    width: 100%;
    text-align: center;
  }
}
</style>
