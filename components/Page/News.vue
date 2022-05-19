<template>
  <div :class="'home-' + page">
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 'news',
    }
  },
}
</script>

<style lang="less" scoped>
</style>
