<template>
  <div class="dashboard-container">
    <div class="app-container">
      <template>
        <el-tabs v-model="activeName">
          <el-tab-pane label="用户管理" name="first">
            <el-button type="primary" @click="dialogVisible = true"
              >新增角色</el-button
            >
            <!-- 表格 -->
            <el-table :data="tableData" style="width: 100%">
              <el-table-column type="index" label="序号"> </el-table-column>
              <el-table-column prop="name" label="角色"> </el-table-column>
              <el-table-column prop="description" label="描述">
              </el-table-column>
              <el-table-column prop="address" label="操作">
                <template slot-scope="{ row }">
                  <el-button type="success" @click="showPermDialog(row)"
                    >分配权限</el-button
                  >
                  <el-button type="primary">编辑</el-button>
                  <el-button type="danger" @click="removeRole(row.id)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination
              :page-sizes="[2, 5, 10]"
              :page-size="pagesize"
              layout="total,sizes,prev,pager, next"
              :total="totalCount"
              @current-change="currentChange"
              @size-change="sizeChange"
            >
            </el-pagination>
          </el-tab-pane>
          <el-tab-pane label="配置管理" name="second">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            >
            </el-alert>
            <el-form
              ref="form"
              :model="companyInfo"
              label-width="80px"
              :style="{ marginTop: '50px' }"
            >
              <el-form-item label="公司名称">
                <el-input v-model="companyInfo.name" disabled></el-input>
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input
                  v-model="companyInfo.companyAddress"
                  disabled
                ></el-input>
              </el-form-item>
              <el-form-item label="公司邮箱">
                <el-input v-model="companyInfo.mailbox" disabled></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="companyInfo.remarks" disabled></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </template>
      <!-- 对话框 -->
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="50%"
        @close="dialogClose"
      >
        <el-form
          :model="addRoleForm"
          :rules="addRoleFormRules"
          ref="form"
          label-width="100px"
        >
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="addRoleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input v-model="addRoleForm.description"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addRole">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 分配权限对话框 -->
      <el-dialog
        title="给角色分配权限"
        :visible.sync="setRightDialog"
        width="50%"
        @close = "closePerDialog"
      >
        <el-tree
          :props="{ label: 'name' }"
          show-checkbox
          :data="permissions"
          node-key="id"
          default-expand-all
          :default-checked-keys="checkedPermissionsList"
          ref="perTree"
        >
        </el-tree>
        <span slot="footer" class="dialog-footer">
          <el-button @click="closePerDialog">取 消</el-button>
          <el-button type="primary" @click="assignPrem">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getRolesApi,
  addRoleApi,
  removeRoleApi,
  getRoleDetail,assignPerm
} from '@/api/role'
import { getCompanyInfo } from '@/api/setting'
import { getPermissionList } from '@/api/permission'
import { transLitToTree } from '@/utils'
export default {
  data() {
    return {
      activeName: 'first',
      tableData: [],
      totalCount: 0,
      pagesize: 2,
      page: 1,
      dialogVisible: false,
      addRoleForm: {
        name: '', //部门名称
        description: ''
      },
      addRoleFormRules: {
        name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }]
      },
      companyInfo: {},
      setRightDialog: false,
      permissions: [], //权限列表
      checkedPermissionsList: [], //默认选中权限
      currentRoleId:'',
    }
  },

  created() {
    this.getRoles()
    this.getCompanyInfo()
  },

  methods: {
    async getRoles() {
      const res = await getRolesApi({
        page: this.page,
        pagesize: this.pagesize
      })
      // console.log(res)
      this.tableData = res.rows
      this.totalCount = res.total
    },
    currentChange(val) {
      console.log(val)
      this.page = val
      this.getRoles()
    },
    sizeChange(val) {
      this.pagesize = val
      this.getRoles()
    },
    addRole() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          // console.log('校验通过');
          const res = await addRoleApi(this.addRoleForm)
          console.log(res)
          this.getRoles()
          this.dialogVisible = false
        }
      })
    },
    async removeRole(id) {
      // console.log('删除');
      await removeRoleApi(id)
      this.getRoles()
    },
    // 监听会话框关闭
    dialogClose() {
      // 前置：只能重置有校验的表单
      this.$refs.form.resetFields()
      this.addRoleForm.description = ''
    },
    // 获取公司信息
    async getCompanyInfo() {
      const res = await getCompanyInfo(
        this.$store.state.user.userInfo.companyId
      )
      // console.log(res);
      this.companyInfo = res
      // console.log(this.companyInfo)
    },
    // 显示分配权限对话框
    async showPermDialog(row) {
      this.currentRoleId = row.id
      this.setRightDialog = true
      this.getPermission()
      // 获取角色已分配权限
      const res = await getRoleDetail(row.id)
      // console.log(res.permIds)
      this.checkedPermissionsList = res.permIds
    },
    // 关闭分配权限对话框
    closePerDialog() {
      this.setRightDialog = false
      this.checkedPermissionsList=[]
    },
    // 获取权限列表
    async getPermission() {
      const res = await getPermissionList()
      // console.log(res)
      this.permissions = transLitToTree(res, '0')
      // console.log(this.permissions)
    },
    // 给角色分配权限
   async assignPrem(){
    // console.log(this.$refs.perTree.getCheckedKeys());
    const res = await assignPerm({
        id:this.currentRoleId,
        permIds:this.$refs.perTree.getCheckedKeys()
      })
      console.log(res);
      this.$message.success('权限分配成功')
    //   this.closePerDialog()
    },
  }
}
</script>

<style scoped lang="less"></style>
