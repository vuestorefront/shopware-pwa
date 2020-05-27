<template>
  <div class="sw-footer">
    <slot class="sw-footer__content" name="content" v-bind="column">
      <div class="content sw-footer__signature">
        <SwPluginSlot name="footer-content">
          {{
            $t('footer.description', {
              creator: 'shopware AG & Vue Storefront',
            })
          }}
        </SwPluginSlot>
      </div>
    </slot>
  </div>
</template>

<script>
import { SfCheckbox } from '@storefront-ui/vue'
import SwPluginSlot from 'sw-plugins/SwPluginSlot'

export default {
  components: {
    SfCheckbox,
    SwPluginSlot,
  },
  name: 'SwFooter',
  props: {
    column: {
      type: Number,
      default: 4,
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.sw-footer {
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
    @include for-desktop {
      margin-bottom: 0;
    }
  }
}
</style>
