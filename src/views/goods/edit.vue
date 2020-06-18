<template>
  <div class="card-container">
    <el-card class="box-card">
      <h3>修改信息</h3>
      <el-form
        ref="goodForm"
        :model="goodForm"
        :rules="goodRules"
        label-width="100px"
      >

        <el-row>

          <el-col :span="12">
            <el-form-item label="商品名称:" prop="name">
              <YInput
                v-model="goodForm.product_name"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="商品编号:" prop="product_sn">
              <YInput
                v-model="goodForm.product_sn"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="款式编号:" prop="type_sn">
              <YInput
                v-model="goodForm.type_sn"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="适合性别:" prop="gender">
              <YSelect
                v-model="goodForm.gender"
                :options="genderOptions"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="吊牌价格:" prop="original_price">
              <YInput
                v-model="goodForm.original_price"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="优惠价格:" prop="onsale_price">
              <YInput
                v-model="goodForm.onsale_price"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="vip价格:" prop="vip_price">
              <YInput
                v-model="goodForm.vip_price"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="页面主图:" prop="main_pic">
              <YInput
                v-model="goodForm.main_pic"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="产品详情:" prop="detail">
              <YInput
                v-model="goodForm.detail"
              />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="材质:" prop="material">

              <el-table
                :data="goodForm.material"
                style="width: 100%"
              >
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-table
                      :data="goodForm.material[props.$index].value"
                      style="width: 100%"
                    >
                      <el-table-column
                        label="二级属性名称"
                        prop="key"
                      />

                      <el-table-column
                        label="二级属性内容"
                        prop="value"
                      />

                      <el-table-column label="操作">
                        <template slot-scope="scope">
                          <el-button
                            size="mini"
                            @click="onEditColor(scope.$index, scope.row)"
                          >编辑二级属性
                          </el-button>

                          <el-button
                            size="mini"
                            type="danger"
                            @click="onDelSize(scope.$index, scope.row)"
                          >删除
                          </el-button>
                        </template>
                      </el-table-column>
                    </el-table>

                  </template>
                </el-table-column>

                <el-table-column
                  label="一级属性名称"
                  prop="key"
                />

                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="addMaterial(scope.$index, scope.row)"
                    >编辑一级属性
                    </el-button>

                    <el-button
                      size="mini"
                      type="danger"
                      @click="onDelColor(scope.$index, scope.row)"
                    >删除一级属性
                    </el-button>

                    <el-button
                      size="mini"
                      @click="addMaterial2(scope.$index, scope.row)"
                    >添加二级属性
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>

              <el-button
                size="mini"
                @click="addMaterial"
              >添加一级属性
              </el-button>

            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="颜色尺码:" prop="colors">
              <el-table
                :data="goodForm.colors"
                style="width: 100%"
              >
                <el-table-column type="expand">
                  <template slot-scope="color">
                    <el-table
                      :data="goodForm.colors[color.$index].sizes"
                      style="width: 100%"
                    >
                      <el-table-column
                        label="尺码名"
                        prop="size_name"
                      />
                      <el-table-column
                        label="尺码显示名"
                        prop="display_name"
                      />
                      <el-table-column
                        label="尺寸解释"
                        prop="description"
                      />
                      <el-table-column
                        label="库存数量"
                        prop="inventory"
                      />

                      <el-table-column label="操作">
                        <template slot-scope="scope">
                          <el-button
                            size="mini"
                            @click="onEditColor(color.$index, color.row)"
                          >编辑尺码
                          </el-button>

                          <el-button
                            size="mini"
                            type="danger"
                            @click="onDelSize(scope.$index, scope.row)"
                          >删除
                          </el-button>
                        </template>
                      </el-table-column>
                    </el-table>

                  </template>
                </el-table-column>

                <el-table-column
                  label="颜色名字"
                  prop="color_name"
                />
                <el-table-column
                  label="颜色缩略图"
                  prop="color_thumbnail"
                />
                <el-table-column
                  label="图片缩略图"
                  prop="product_thumbnail"
                />

                <el-table-column label="操作">
                  <template slot-scope="color">
                    <el-button
                      size="mini"
                      @click="onEditColor(color.$index, color.row)"
                    >编辑颜色
                    </el-button>
                    <el-button
                      size="mini"
                      @click="onAddSize(color.$index, color.row)"
                    >添加尺码
                    </el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="onDelColor(color.$index, color.row)"
                    >删除
                    </el-button>
                  </template>
                </el-table-column>

                <!--                颜色尺码底部操作-->

              </el-table>
              <el-button @click="addColor">添加颜色</el-button>
            </el-form-item>
          </el-col>

          <!--           todo y-upload-mutiple和y-upload组件优化-->
          <el-col :span="24">
            <el-form-item label="轮播图:" prop="carousels">

              <div v-for="(item,index) in goodForm.carousels" :key="index" class="">

                <y-input v-model="item.url" />

              </div>
              <y-upload-mutiple
                v-model="goodForm.carousels"
                :multiple="true"
                type="img"
              />

            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="产品参数:" prop="gender">
              <div v-for="(item,index) in goodForm.produt_parameter" class="">
                <el-row type="flex">
                  <el-col :span="10">
                    <el-row type="flex">
                      <el-col :span="4">
                        属性名:
                      </el-col>
                      <el-col :span="16">
                        <y-input v-model="item.key" />
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="10">
                    <el-row type="flex">
                      <el-col :span="4">
                        属性值:
                      </el-col>
                      <el-col :span="16">
                        <y-input v-model="item.value" />
                      </el-col>
                    </el-row>
                  </el-col>

                  <el-col :span="4">
                    <el-button @click="removeProp(item)">删除</el-button>

                  </el-col>

                </el-row>
              </div>
              <el-button @click="addProp">添加产品参数</el-button>

            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item>
              <el-button @click="submit('goodForm')">提交</el-button>
              <el-button @click="back">返回</el-button>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
    </el-card>
  </div>
</template>

<script>

import { getGood, putGood } from "../../api/goods"
import { listRemoveItem } from "@/utils"
import yUploadMutiple from "@/components/yComponent/yUploadMutiple"
import { json2js } from "@/utils/data"

export default {
  components: { yUploadMutiple },

  data() {
    return {
      goodForm: {},
      // 模态窗口
      showColor: false,
      showSize: false,
      showMaterial: false,
      genderOptions: [
        {
          value: "0",
          label: "中性"
        }, {
          value: "1",
          label: "男"
        }, {
          value: "2",
          label: "女"
        }
      ],
      goodRules: {}
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.get()
    },

    async get() {
      // const response = await getGood(this.id ? this.id : this.$route.query.id)
      const response = await getGood(this.$route.query.id)

      this.dataPrepare(response.data)
      this.goodForm = response.data

      // 先后顺序
    },

    async api() {
      const res = await putGood(this.$route.query.id, this.goodForm)
      this.$router.push({ path: "/goods" })

      this.$message({
        message: "修改成功",
        type: "success"
      })
    },

    async submit(goodForm) {
      this.$refs.goodForm.validate(valid => {
        if (valid) {
          this.api()
        } else {
          return false
        }
      })
    },

    //  model

    addColor() {
      this.showColor = true
      this.tableData.push({
        id: "12987123",
        name: "红色"
      })
    },
    onAddSize() {
      this.showSize = true
      this.sizesDate.push({ name: "test" })
    },
    onDelSize() {
      this.sizesDate.pop()
    },
    onDelColor() {
      this.tableData.pop()
    },

    handleClose() {
    },
    //
    addMaterial() {
      this.showMaterial = true
    },
    addMaterial2() {
      this.showMaterial = true
    },

    // 产品属性
    addProp() {
      this.goodForm.produt_parameter.push({})
    },
    removeProp(item) {
      listRemoveItem(this.goodForm.produt_parameter, item)
    },

    dataPrepare(obj) {
      console.log(obj)
      // 替换单引号为双引号
      json2js(obj, "produt_parameter")
      json2js(obj, "material")
      json2js(obj, "colors")
      json2js(obj, "carousels")
      console.log(2, obj)
    }
  }

}
</script>
<style lang='scss' scope>
  .card-container {
    background-color: #f0f2f5;
    padding: 30px;
    min-height: 100vh;

    .box-card {

    }
  }
</style>
