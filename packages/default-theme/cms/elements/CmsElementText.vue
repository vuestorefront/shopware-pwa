<script>
// import any extra components here
import { SfLink } from '@storefront-ui/vue'
import { renderHtml } from 'html-to-vue'

export default {
  name: 'CmsElementText',
  props: {
    content: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    config: {
      extraComponentsMap: {
        cta: {
          conditions(node) {
            return (
              node.type === 'tag' &&
              node.name === 'a' &&
              node.attrs?.class?.match(/btn\s?/)
            )
          },
          renderer(node, children, createElement) {
            return createElement(
              SfLink,
              {
                class: node.attrs?.class,
                attrs: {
                  target: node.attrs?.target,
                },
                props: {
                  link: node.attrs?.href,
                },
              },
              [...children]
            )
          },
        },
      },
    },
  }),
  computed: {
    rawHtml() {
      return this.content?.data?.content
    },
    verticalAlign() {
      return this.content?.config?.verticalAlign?.value
    },
  },
  render(createElement, context) {
    const _c = Object.assign({}, this.config)
    _c.textTransformer = this.$entitiesDecoder
    return renderHtml(this.rawHtml, _c, createElement)
  },
}
</script>

<style lang="scss" scoped>
@import '../settings.scss';

.cms-element-text {
  @include sizing-mode-boxed;
  padding: var(--spacer-xl);
}
</style>
