<template>
  <div class="lang-select" :style="props.style">
    <div class="lang-select-item lang-select-item--active"> CH </div>
    <div class="lang-select-item lang-select-item--en" @click="toEn"> EN </div>
  </div>
</template>

<script setup>
const props = defineProps({
  style: {
    type: Object,
  }
})
function toEn() {
  window.open("https://www.mihoyo.com/en/" + "?page=" + useRoute().query.page, "_self")
}
</script>

<style lang="less" scoped>
.lang-select {
  position: fixed;
  right: .7rem;
  top: .28rem;
  z-index: 9999;
  display: flex;
  align-items: center;
  width: .6rem;
  color: #dee1e6;
  font-size: .14rem;
  font-weight: bold;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: .04rem;
    border-top: 2px solid #e9e9e9;
    width: .48rem;
    transform: rotate(-36deg);
    transform-origin: top right;
  }
}

.lang-select-item {
  margin-top: -0.2rem;
  position: relative;
  cursor: pointer;
  vertical-align: middle;
  color: #dee1e6;
  font-family: HarmonyOS, Arial, Helvetica, sans-serif;
}

.lang-select-item--active {
  color: #676b73;
}

.lang-select-item--en {
  margin-top: .2rem;
  margin-left: .12rem;
}
</style>