<template>
  <div class="sw-footer">
    <slot class="sw-footer__content" name="content" v-bind="column">
        <div class="content sw-footer__signature">
          Made with ❤️ by shopware AG & Vue Storefront
        </div>
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
  width: 100%;
  height: auto;
  display: flex;
  margin-top: 1em;
  
  @include for-desktop {
    margin-top: 2em;
    margin-bottom: 0;
  }
  justify-content: center;
  align-items: flex-end;
  flex-shrink: 0;
  &__signature {
    padding: 2em;
    width: 100%;
    text-align: center;
    margin-bottom: 6em; 
    @include for-desktop {
      margin-bottom: 0;
    }
  }
}
</style>
