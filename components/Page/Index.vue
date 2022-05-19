<template>
  <div :class="'home-' + page">
    <!-- this is {{ page }} -->
   <!--  <NavBar /> -->

  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      page: 'index'
    }
  },
}
</script>

<style lang="less" scoped>
</style>
