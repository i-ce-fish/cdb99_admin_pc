<script>
export default {
  name: "MenuItem",
  functional: true,
  props: {
    suffixicon: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    }
  },
  render(h, context) {
    const { icon, title, suffixicon } = context.props
    const vnodes = []

    if (icon) {
      vnodes.push(<svg-icon icon-class={icon} />)
    }

    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>)
    }

    if (suffixicon) {
      vnodes.push(<i class={suffixicon} />)
    }

    return vnodes
  }
}
</script>
