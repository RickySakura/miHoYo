<template>
  <div :class="'home-' + page">
    this is {{ page }}

  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 'about'
    }
  },
}
</script>

<style lang="less" scoped>
</style>