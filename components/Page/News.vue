<template>
  <div :class="'home-' + page">
    this is {{ page }}
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