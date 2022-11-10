<template>
  <div class="aside-slogan">
    <h1 v-if="level == 1"></h1>
    <h1 v-else-if="level == 2"></h1>
    <h1 v-else-if="level == 3"></h1>
    <h1 v-else-if="level == 4"></h1>
  </div>
</template>

<script setup>
let level = 1
const title = {
  tag: `h${level}`
}
</script>

<style lang="less" scoped>

</style>