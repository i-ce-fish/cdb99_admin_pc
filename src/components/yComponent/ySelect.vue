<template>
  <el-select
    v-model="result"
    placeholder="请选择"
    :disabled="disabled"
    :size="size"
    @change="change"
  >
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
</template>
<script>

export default {
  components: {},
  props: {
    disabled: { type: Boolean, default: false },
    value: String, config: Object,
    options: {
      type: Array,
      default: () => [{
        value: "选项1",
        label: "黄金糕"
      }, {
        value: "选项2",
        label: "双皮奶"
      }, {
        value: "选项3",
        label: "蚵仔煎"
      }, {
        value: "选项4",
        label: "龙须面"
      }, {
        value: "选项5",
        label: "北京烤鸭"
      }]
    },
    size: { type: String, default: "small", required: false }
  },
  data() {
    return {
      result: this.value
    }
  },
  computed: {},
  watch: {
    value(val) {
      this.result = val
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    change() {
      this.$emit("input", this.result.toString())
    }
  }
}
</script>

<style scoped lang="scss">
  .base-select {
  }
</style>
