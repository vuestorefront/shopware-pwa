<script>
// import any extra components here
import { SfLink } from "@storefront-ui/vue"
import SwButton from "@/components/atoms/SwButton.vue"
import { renderHtml, getOptionsFromNode } from "html-to-vue"
export default {
  name: "CmsElementText",
  functional: true,
  props: {
    content: {
      type: Object,
      default: () => ({}),
    },
  },
  render(h, context) {
    const config = {
      textTransformer: context.parent.$entitiesDecoder,
      extraComponentsMap: {
        link: {
          conditions(node) {
            return (
              node.type === "tag" &&
              node.name === "a" &&
              !node.attrs?.class?.match(/btn\s?/)
            )
          },
          renderer(node, children, createElement) {
            return createElement(
              SfLink,
              {
                ...getOptionsFromNode(node),
                props: {
                  link: node.attrs?.href,
                },
              },
              [...children]
            )
          },
        },
        button: {
          conditions(node) {
            return (
              node.type === "tag" &&
              node.name === "a" &&
              node.attrs?.class?.match(/btn\s?/)
            )
          },
          renderer(node, children, createElement) {
            const _class = node?.attrs?.class
              .replace("btn-secondary", "color-secondary")
              .replace("btn-primary", "color-primary")
            return createElement(
              SwButton,
              {
                class: _class,
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
    }
    const rawHtml = context.props.content?.data?.content
    return (
      (rawHtml && renderHtml(rawHtml, config, h, context)) ||
      renderHtml("<div></div>", config, h, context)
    )
  },
}
</script>

<style lang="scss">
@import "@/cms/settings.scss";

.cms-element-text {
  @include sizing-mode-boxed;
  padding: var(--spacer-xl);
}
</style>
