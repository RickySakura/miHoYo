<template>
  <div :class="'home-' + page">
    this is {{ page }}
  </div>
  <img src="/img/decoration.7a97c88.png" class="aside-decoration" />

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