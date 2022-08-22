<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- <h2>权限管理</h2> -->
      <page-tools :isShowLeft="false">
        <template slot="right">
          <el-button>添加权限</el-button>
        </template>
      </page-tools>
      <!-- 表格 -->
      <el-table
        :data="permission"
        style="width: 100%"
        row-key="id"
        border
        ref="table"
      >
        <el-table-column prop="name" label="名称" width="180">
          <template v-slot="{ row }">
            <i
              v-if="row.children"
              class="el-icon-camera"
              style="margin-right: 5px"
              @click="expand(row)"
            ></i>
            <i v-if="row.type === 2" class="el-icon-folder"></i>
            {{ row.name }}
          </template>
        </el-table-column>
        <el-table-column prop="code" label="标识" width="180">
        </el-table-column>
        <el-table-column prop="description" label="描述"> </el-table-column>
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-button type="text" @click="showAddDialog(row.id)"
              >添加</el-button
            >
            <el-button type="text">编辑</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 放置一个弹层 用来编辑新增节点 -->
    <el-dialog
      :title="`${showText}权限点`"
      :visible="showDialog"
      @close="showDialog = false"
    >
      <!-- 表单 -->
      <el-form
        ref="perForm"
        :model="formData"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="formData.name" style="width: 90%" />
        </el-form-item>
        <el-form-item label="权限标识" prop="code">
          <el-input v-model="formData.code" style="width: 90%" />
        </el-form-item>
        <el-form-item label="权限描述">
          <el-input v-model="formData.description" style="width: 90%" />
        </el-form-item>
        <el-form-item label="开启">
          <el-switch
            v-model="formData.enVisible"
            active-value="1"
            inactive-value="0"
          />
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" type="primary" @click="onSave"
            >确定</el-button
          >
          <el-button size="small" @click="showAddDialog = false"
            >取消</el-button
          >
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getPermissionList, addPermission } from '@/api/permission'
import { transLitToTree } from '@/utils'
export default {
  data() {
    return {
      permission: [],
      showText: '添加',
      showDialog: false,
      formData: {
        pid: '',
        type: '',
        name: '',
        code: '',
        description: '',
        enVisible: ''
      },
      rules: {
        name: [
          { required: true, message: '权限名称不能为空', trigger: 'blur' }
        ],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]
      }
    }
  },

  created() {
    this.getPermissionList()
  },

  methods: {
    async getPermissionList() {
      const res = await getPermissionList()
      // console.log(res);
      this.permission = transLitToTree(res, '0')
      // this.permission = res
    },
    expand(row) {
      // 每一行的展开与否需要单独控制
      row.isexpand = !row.isexpand
      this.$refs.table.toggleRowExpansion(row, row.isexpand)
    },
    showAddDialog(id, type) {
      this.showDialog = true
      this.formData.pid = id
      this.formData.type = type
    },
    onSave() {
      this.$refs.perForm.validate(async (valid) => {
        if (!valid) return
        await addPermission(this.formData)
        this.$message.success('添加成功')
        this.showDialog = false
        this.getPermissionList()
      })
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-table [class*='el-table__row--level'] .el-table__expand-icon {
  display: none;
}
</style>
