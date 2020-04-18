<template>
  <div class="card-container">
    <el-card class="box-card">
      <h3>新产品信息</h3>
      <el-form
        ref="productForm"
        :model="productForm"
        :rules="rules"
        label-width="100px"
      >

        <el-row>

          <!--          级联 分类-->
          <!--          <el-cascader-->
          <!--            v-model="value"-->
          <!--            :options="parentOptions"-->
          <!--            :props="{ expandTrigger: 'hover' }"-->
          <!--          />-->
          <el-col :span="12">
            <el-form-item label="商品名称:" prop="name">
              <component
                is="YInput"
                v-model="productForm.name"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="缩略图" prop="thumbnail">
              <component
                is="YInput"
                v-model="productForm.thumbnail"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="总销量:" prop="totalSale">
              <component
                is="YInput"
                v-model="productForm.totalSale"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="商品描述:" prop="description">
              <component
                is="YInput"
                v-model="productForm.description"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="原价:" prop="originPrice">
              <component
                is="YInput"
                v-model="productForm.originPrice"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="当前价:" prop="currentPrice">
              <component
                is="YInput"
                v-model="productForm.currentPrice"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="库存:" prop="inventory">
              <component
                is="YInput"
                v-model="productForm.inventory"
              />
            </el-form-item>
          </el-col>

          <el-col>
            <el-table
              :data="tableData"
              style="width: 100%"
            >
              <el-table-column type="expand">
                <template slot-scope="props">
                  <!--                  <el-form label-position="left" inline class="demo-table-expand">-->
                  <!--                    <el-form-item label="商品名称">-->
                  <!--                      <span>{{ props.row.name }}</span>-->
                  <!--                    </el-form-item>-->

                  <!--                    <el-form-item label="商品描述">-->
                  <!--                      <span>{{ props.row.desc }}</span>-->
                  <!--                    </el-form-item>-->
                  <!--                  </el-form>-->
                  <el-table
                    :data="sizesDate"
                    style="width: 100%"
                  >
                    <el-table-column
                      label="尺码"
                      prop="name"
                    />
                    <el-table-column
                      label="库存"
                      prop="inventory"
                    >
                      <template slot-scope="scope">
                        <el-input-number v-model="num" size="small" :min="0" label="库存数量" @change="handleChange" />
                      </template>

                    </el-table-column>

                    <el-table-column label="操作">
                      <template slot-scope="scope">
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
                label="编号"
                prop="id"
              />
              <el-table-column
                label="商品颜色"
                prop="name"
              />

              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="onEditColor(scope.$index, scope.row)"
                  >编辑颜色
                  </el-button>
                  <el-button
                    size="mini"
                    @click="onAddSize(scope.$index, scope.row)"
                  >添加尺码
                  </el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="onDelColor(scope.$index, scope.row)"
                  >删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>

          <el-col :span="24">
            <el-form-item>
              <el-button @click="submit('productForm')">提交</el-button>
              <el-button @click="back">返回</el-button>
              <el-button @click="addColor">添加颜色</el-button>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
    </el-card>

    <!--    添加颜色-->
    <el-dialog
      title="X颜色"
      :visible.sync="showColor"
      width="30%"
      :before-close="handleClose"
    >
      <el-form label-position="left" inline class="demo-table-expand">
        <el-form-item label="编号">
          <component
            is="YInput"
            v-model="productForm.name"
          />
        </el-form-item>
        <el-form-item label="颜色">
          <component
            is="YInput"
            v-model="productForm.name"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showColor = false">取 消</el-button>
        <el-button type="primary" @click="showColor = false">确 定</el-button>
      </span>
    </el-dialog>
    <!--    添加尺码-->
    <el-dialog
      title="为X颜色添加尺码"
      :visible.sync="showSize"
      width="30%"
      :before-close="handleClose"
    >
      <el-form label-position="left" inline class="demo-table-expand">
        <el-form-item label="尺码">
          <component
            is="YInput"
            v-model="productForm.name"
          />
        </el-form-item>
        <el-form-item label="库存">
          <component
            is="YInput"
            v-model="productForm.name"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showSize = false">取 消</el-button>
        <el-button type="primary" @click="showSize = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>

import { addProduct } from '../../api/product'

export default {

  data() {
    return {
      productForm: {},
      rules: {},
      tableData: [{
        id: '12987122',
        name: '黄色'
      }, {
        id: '12987123',
        name: '绿色'
      }],
      sizesDate: [
        { name: 'S', inventory: '1' },
        { name: 'M', inventory: '1' },
        { name: 'L', inventory: '1' }

      ],
      num: 2,
      showColor: false,
      showSize: false
      // parentOptions: [
      //   {
      //     value: '0',
      //     label: '裤子',
      //     children: [
      //       {
      //         value: '1',
      //         label: '牛仔裤'
      //       }, {
      //         value: '2',
      //         label: '休闲裤'
      //       }
      //     ]
      //   },
      //   {
      //     value: '1', label: '衣服',
      //     children: [
      //       {
      //         value: '1',
      //         label: '牛仔裤'
      //       }, {
      //         value: '2',
      //         label: '休闲裤'
      //       }
      //     ]
      //
      //   }
      // ]

    }
  },
  methods: {

    async api() {
      const res = await addProduct(this.productForm)
      this.$router.push({ path: '/products' })

      this.$message({
        message: '添加成功',
        type: 'success'
      })
    },

    async submit(productForm) {
      this.$refs.productForm.validate(valid => {
        if (valid) {
          this.api()
        } else {
          return false
        }
      })
    },

    addColor() {
      this.showColor = true
      this.tableData.push({
        id: '12987123',
        name: '红色'
      })
    },
    onAddSize() {
      this.showSize = true
      this.sizesDate.push({ name: 'test' })
    },
    onDelSize() {
      this.sizesDate.pop()
    },
    onDelColor() {
      this.tableData.pop()
    },
    onEditColor(obj1, obj2) {
      this.showColor = true
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

    .demo-table-expand {
      font-size: 0;
    }

    .demo-table-expand label {
      width: 90px;
      color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }

  }
</style>
