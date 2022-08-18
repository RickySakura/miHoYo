<template>
  <div :class="'home-' + page" class="fp-page">
    <!-- <img src="img/decoration.560b085.png" class="aside-decoration" /> -->
    <img src="/img/Elysia.png" alt="Elysia" class="Elysia" @click="show">
  </div>

</template>

<script setup>
const page = "join";
function show() {
  // useState("isShowVideo").value = "blob:https://www.bilibili.com/fad8cd88-8281-4dec-8e30-29b5cfe7e4a5"
  window.open("https://www.bilibili.com/video/BV1fY4y1F7GL?spm_id_from=333.337.search-card.all.click&vd_source=3a181a307ff75b9a2c7938b501247037")
}
</script>

<style lang="less" scoped>
.home-join {
  height: 100%;
  overflow: hidden;
}

.Elysia {
  // margin: 0 auto;
  cursor: pointer;
}
</style>
