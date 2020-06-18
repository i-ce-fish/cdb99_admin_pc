<template>
  <div class="upload-container">
    <el-button
      :style="{background:color,borderColor:color}"
      icon="el-icon-upload"
      size="mini"
      type="primary"
      @click=" dialogVisible=true"
    >上传图片

    </el-button>

    <el-dialog :visible.sync="dialogVisible">
      <el-upload
        ref="upload"
        name="file"
        :multiple="multiple"
        :file-list="fileList"
        :on-success="handleSuccess"
        :on-remove="handleRemove"
        :on-change="handleChange"
        :before-upload="beforeUpload"
        :show-file-list="true"
        class="editor-slide-upload"
        :action="uploadUrl"
        list-type="picture-card"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>

      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </el-dialog>
  </div>
</template>
<script>

export default {
  name: "EditorSlideUpload",
  model: {
    prop: "input",
    event: "success"
  },
  props: {
    color: {
      type: String,
      default: "#1890ff"
    },
    // todo 组件优化点
    multiple: { type: Boolean, default: false, required: false }
  },
  data() {
    return {
      dialogVisible: false,
      uploadUrl: "http://shop.cdb99.com:8088/api/upload",
      readFileUrl: "http://shop.cdb99.com",
      // todo 组件优化点
      result: [],
      fileList: []
    }
  },
  methods: {
    checkAllSuccess() {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },
    handleSubmit() {
      this.$emit("success", this.result)
      this.dialogVisible = false
    },
    handleSuccess(response, file) {
      if (this.multiple) {
        this.result.push({ url: this.readFileUrl + response.data })
      } else {
        this.result = [{ url: this.readFileUrl + response.data }]
      }
      this.fileList = this.result
    },
    handleRemove(file, fileList) {
      this.result = fileList
    },
    beforeUpload(file) {
    },
    handleChange(file, fileList) {
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .editor-slide-upload {
    margin-bottom: 20px;

    /deep/ .el-upload--picture-card {
      width: 100%;
    }
  }
</style>
