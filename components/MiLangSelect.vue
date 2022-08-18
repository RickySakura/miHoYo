<template>
  <div class="lang-select" :style="props.style" v-if="isRender">
    <div class="lang-select-item lang-select-item--active">CH</div>
    <div class="lang-select-item lang-select-item--en" @click="toEn">EN</div>
  </div>
</template>

<script setup>
const props = defineProps({
  style: {
    type: Object,
  },
});
function toEn() {
  window.open("https://www.mihoyo.com/en/" + "?page=" + useRoute().query.page, "_self");
}

// 控制顶部导航栏 在首页不渲染
let isRender = ref(false);
let useFaded = useState("useFaded").value;
useFaded("lang-select", isRender);
// 标记
watch(() => useRoute().query.page, (page) => {
  if (page == 'join') {
    isRender.value = false;
  } else {
    isRender.value = true
  }
})

// let current_page = useRoute().query.page;
// function isNotIndexPge(p) {
//   if (p != undefined && p != "index" && p != null && p != "" && p != "/") {
//     return true;
//   } else {
//     return false;
//   }
// }
// isRender.value = isNotIndexPge(current_page);
// // 监听路由，如果为当前页为主页则不渲染头部导航栏
// watch(
//   () => useRoute().query.page,
//   (nextPage) => {
//     if (!isNotIndexPge(nextPage)) {
//       let lang = document.querySelector(".lang-select");
//       lang.classList.add("fade-leave-active");
//       lang.classList.add("fade-leave-to");
//       setTimeout(() => {
//         isRender.value = isNotIndexPge(nextPage);
//       }, 400);
//     } else {
//       new Promise((resolve, reject) => {
//         isRender.value = isNotIndexPge(nextPage); // 因为 ref 对象的修改是一个异步操作，所以为了正确的获取 DOM 元素，需要用Promise包装一下
//         resolve();
//       }).then((res) => {
//         let lang = document.querySelector(".lang-select");
//         lang.classList.add("fade-enter-active");
//         lang.classList.add("fade-enter-to");
//         setTimeout(() => {
//           lang.classList.remove("fade-enter-to");
//         }, 40);
//         setTimeout(() => {
//           lang.classList.remove("fade-enter-active");
//         }, 200);
//       });
//     }
//   }
// );
</script>

<style lang="less" scoped>
.lang-select {
  position: fixed;
  right: 0.7rem;
  top: 0.28rem;
  z-index: 9999;
  display: flex;
  align-items: center;
  width: 0.6rem;
  color: #dee1e6;
  font-size: 0.14rem;
  font-weight: bold;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0.04rem;
    border-top: 2px solid #e9e9e9;
    width: 0.48rem;
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
  margin-top: 0.2rem;
  margin-left: 0.12rem;
}
</style>
