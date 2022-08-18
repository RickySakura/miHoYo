<template>
  <div :class="'home-' + page" class="fp-page">
    <!-- <img src="img/decoration.560b085.png" class="aside-decoration" /> -->
    <img src="img/Elysia.png" alt="Elysia" class="Elysia">
  </div>

</template>

<script setup>
const page = "join";
</script>

<style lang="less" scoped>
.home-join {
  height: 100%;
  overflow: hidden;
}

.Elysia {
  // margin: 0 auto;
}
</style>
