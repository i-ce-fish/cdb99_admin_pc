<template>
  <div class="card-container">
    <el-card class="box-card">
      <h3>新产品信息</h3>
      <el-form
        ref="goodForm"
        :model="goodForm"
        :rules="rules"
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
            <el-form-item label="吊牌价格:" prop="gender">
              <YInput
                v-model="goodForm.gender"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="优惠价格:" prop="gender">
              <YInput
                v-model="goodForm.gender"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="vip价格:" prop="gender">
              <YInput
                v-model="goodForm.gender"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="颜色:" prop="gender">
              <YInput
                v-model="goodForm.gender"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="轮播图:" prop="gender">
              <YInput
                v-model="goodForm.gender"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="页面主图:" prop="gender">
              <YInput
                v-model="goodForm.gender"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="产品详情:" prop="gender">
              <YInput
                v-model="goodForm.gender"
              />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="材质:" prop="material">

              <el-table
                :data="goodForm.materialForm"
                style="width: 100%"
              >
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-table
                      :data="goodForm.materialForm[props.$index].value"
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
            <el-form-item label="颜色尺码:" prop="gender">
              <el-table
                :data="tableData"
                style="width: 100%"
              >
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-table
                      :data="sizesDate"
                      style="width: 100%"
                    >
                      <el-table-column
                        label="尺码名"
                        prop="name"
                      />
                      <el-table-column
                        label="尺码显示名"
                        prop="name"
                      />
                      <el-table-column
                        label="尺寸解释"
                        prop="name"
                      />
                      <el-table-column
                        label="库存数量"
                        prop="inventory"
                      />
                      <el-table-column
                        label="货品id"
                        prop="inventory"
                      />

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
                  label="颜色名字"
                  prop="name"
                />
                <el-table-column
                  label="颜色缩略图"
                  prop="name"
                />
                <el-table-column
                  label="图片缩略图"
                  prop="name"
                />
                <el-table-column
                  label="商品id"
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

                <!--                颜色尺码底部操作-->

              </el-table>
              <el-button @click="addColor">添加颜色</el-button>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="产品参数:" prop="gender">
              <div v-for="(item,index) in goodForm.product_props" class="">
                <el-row>
                  <el-col :span="12">
                    <el-row type="flex">
                      <el-col :span="4">
                        属性名:
                      </el-col>
                      <el-col>
                        <y-input v-model="item.key" />
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="12">
                    <el-row type="flex">
                      <el-col :span="4">
                        属性值:
                      </el-col>
                      <el-col>
                        <y-input v-model="item.key" />
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </div>
              <el-button @click="addProp">添加参数</el-button>

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
            v-model="goodForm.name"
          />
        </el-form-item>
        <el-form-item label="颜色">
          <component
            is="YInput"
            v-model="goodForm.name"
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
            v-model="goodForm.name"
          />
        </el-form-item>
        <el-form-item label="库存">
          <component
            is="YInput"
            v-model="goodForm.name"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showSize = false">取 消</el-button>
        <el-button type="primary" @click="showSize = false">确 定</el-button>
      </span>
    </el-dialog>

    <!--    添加材质二级属性-->

    <el-dialog
      title="为XX属性添加二级属性"
      :visible.sync="showMaterial"
      width="30%"
      :before-close="handleClose"
    >
      <el-form label-position="left" inline class="demo-table-expand">
        <el-form-item label="二级属性名称">
          <component
            is="YInput"
            v-model="goodForm.name"
          />
        </el-form-item>
        <el-form-item label="二级属性内容">
          <component
            is="YInput"
            v-model="goodForm.name"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showMaterial = false">取 消</el-button>
        <el-button type="primary" @click="showMaterial = false">确 定</el-button>
      </span>
    </el-dialog>

    <!--    编辑材质二级属性-->

  </div>
</template>

<script>

import { addGood } from '../../api/goods'

export default {

  data() {
    return {
      goodForm: {
        // materialForm: {
        //   '面料组成': { '里料': 'xxxxx', '面料': 'xxxx' },
        //   '洗涤信息': '洗涤信息'
        // },
        materialForm: [
          {
            key: '面料组成',
            value: [{ key: '里料', value: 'xxxxx' }, { key: '面料', value: 'xxxx' }]
          }, {
            key: '洗涤信息', value: [{ key: '手洗', value: '' }]

          }
        ],
        product_props: [{ key: 'test', value: 'test' }, { key: 'test', value: 'test' }]
      },
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
      showSize: false,

      // 材质
      showMaterial: false
    }
  },
  methods: {

    async api() {
      this.goodForm.material = this.goodForm.materialForm
      const res = await addGood(this.goodForm)
      this.$router.push({ path: '/goods' })

      this.$message({
        message: '添加成功',
        type: 'success'
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

    handleClose() {
    },
    //
    addMaterial() {
      this.showMaterial = true
    },
    addMaterial2() {
      this.showMaterial = true
    },
    //  todo list.remove util
    addProp() {
      this.goodForm.product_props.push({ test: 'null' })
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
