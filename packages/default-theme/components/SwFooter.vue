<template>
  <div class="sw-footer">
    <SfFooter
      class="content sw-footer__columns"
      :column="column"
      :multiple="true"
    >
      <SfFooterColumn
        v-for="column in columns"
        :key="column.title"
        :title="column.title"
      >
        <SfList v-if="column.items">
          <SfListItem v-for="item in column.items" :key="item">
            <SfMenuItem :label="item" />
          </SfListItem>
        </SfList>
        <div v-else :style="{ display: 'flex', ...itemSpacer }"></div>
      </SfFooterColumn>
    </SfFooter>
    <slot class="sw-footer__content" name="content" v-bind="column">
      <div class="content sw-footer__signature">
        <SwPluginSlot name="footer-content">
          Made with ❤️ by shopware AG & Vue Storefront
        </SwPluginSlot>
      </div>
    </slot>
  </div>
</template>

<script>
import { SfCheckbox, SfFooter, SfList, SfMenuItem } from '@storefront-ui/vue'
import SwPluginSlot from 'sw-plugins/SwPluginSlot'

export default {
  components: {
    SfCheckbox,
    SwPluginSlot,
    SfFooter,
    SfList,
    SfMenuItem,
  },
  name: 'SwFooter',
  computed: {
    itemSpacer() {
      return this.isMobile ? { padding: '24px 32px' } : { padding: '16px 0' }
    },
  },
  mounted() {
    this.isMobile =
      Math.max(document.documentElement.clientWidth, window.innerWidth) <= 1023
    window.matchMedia('(max-width: 1023px)').addListener(this.mobileHandler)
  },
  beforeDestroy() {
    window.matchMedia('(max-width: 1023px)').removeListener(this.mobileHandler)
  },
  data() {
    return {
      columns: [
        {
          title: 'Service hotline',
          items: [
            'Support and counselling via:',
            '0180 - 000000 9 am - 5 pm',
            'Or via our contact form.',
          ],
        },
        {
          title: 'Customer',
          items: ['Privacy policy', 'Newsletter', 'Shipping & Payment'],
        },
        {
          title: 'About Us',
          items: ['Company history', 'Dealers'],
        },
      ],
    }
  },
  props: {
    column: {
      type: Number,
      default: 4,
    },
  },
}
</script>

<style lang="scss">
@import '~@storefront-ui/vue/styles.scss';

.sw-footer {
  width: 100%;
  height: auto;
  display: flex;
  margin-top: 1em;
  flex-direction: column;

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

  &__columns {
    width: 100%;
  }
}
</style>
