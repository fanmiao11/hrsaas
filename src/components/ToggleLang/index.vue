<template>
  <div>
    <el-dropdown @command="toggle">
      <span class="el-dropdown-link">
        <svg-icon style="color: #fff; font-size: 20px" icon-class="language" />
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          :disabled="index === $i18n.locale"
          v-for="(item, index) in messages"
          :key="index"
          :command="index"
          >{{ item.name }}</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { messages } from '@/i18n'
import Cookie from 'js-cookie'

export default {
  name: 'ToggleLang',
  data() {
    return {
      messages
    }
  },

  created() {},

  methods: {
    toggle(a) {
      this.$i18n.locale = a
      //   console.log(this.$root.$i18n.locale)
      this.$router.go(0)
      Cookie.set('lang',a)
    }
  }
}
</script>

<style scoped lang="scss">
.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
