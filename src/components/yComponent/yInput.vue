<template>
  <el-input v-model="result" :size="size" placeholder="请输入" @input="input" />
</template>
<script>
export default {
  components: {},
  props: { value: String, size: { type: String, default: 'small', required: false }},
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
    input() {
      this.$emit('input', this.result)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
