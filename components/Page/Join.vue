<template>
  <div :class="'home-' + page">this is {{ page }}</div>
</template>

<script setup>
const page = "join";
</script>

<style lang="less" scoped>
</style>
