<template>
  <div>
    <el-dialog @open="onOpen" title="提示" :visible="visible">
      <el-checkbox-group v-model="checkList">
        <el-checkbox v-for="item in checkLabel" :key="item.id" :label="item.id">
          <!-- 可以通过插槽渲染数据 -->
          {{ item.name }}
        </el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('closeAssignRole')">取 消</el-button>
        <el-button type="primary" @click="assignRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRolesApi } from '@/api/role'
import { getUserDetail } from '@/api/user'
import { assignRoles } from '@/api/employees'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    employeesId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      checkList: [],
      checkLabel: []
    }
  },

  created() {},

  methods: {
    onOpen() {
      this.getRoles()
      this.getUserDetail()
    },
    // 获取角色列表
    async getRoles() {
      const res = await getRolesApi()
      //   console.log(res)
      this.checkLabel = res.rows
    },
    // 获取员工基础信息
    async getUserDetail() {
      const { roleIds } = await getUserDetail(this.employeesId)
      this.checkList = roleIds
    },
    // 给用户分配角色
    async assignRole() {
      if (!this.checkList.length) return this.$message.error('请选择角色')
      await assignRoles({
        id: this.employeesId,
        roleIds: this.checkList
      })
      this.$message.success('分配成功')
    }
  }
}
</script>

<style scoped></style>
