<template>
  <div style="margin: 0 8px">
    <svg-icon
      @click="onFullScreen"
      className="fullscreen"
      iconClass="fullscreen"
    />
  </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
  name: 'FullScreen',
  data() {
    return {}
  },

  created() {},

  methods: {
    onFullScreen() {
      if (screenfull.isEnabled) {
        screenfull.toggle()
      }
    }
  }
}
</script>

<style scoped>
.fullscreen {
  color: #fff;
}
</style>
