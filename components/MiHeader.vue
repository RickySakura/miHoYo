<template>
  <div class="header" v-if="isRender">
    <div class="header__navwrap">
      <div class="header__navbar">
        <div class="header__navbar-logo">
          <NuxtLink to="/">
            <slot name="logo">
              <img src="https://www.mihoyo.com/_nuxt/img/mihoyo-logo.754bbce.png" alt="miHoYo_F" />
            </slot>
          </NuxtLink>
          <!-- <a href="/">
          </a> -->
        </div>
        <div class="header__navbar-links">
          <slot name="links">
            <div class="header__navbar-link" v-for="(item, index) in links" @click="
  linkSelect(index);
click(index);
            " :class="state[index] == true ? 'header__navbar-link--active' : ''">
              <span>{{ item }}</span>
              <b>{{ item }}</b>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  links: Array,
});
const emits = defineEmits(["click"]);
// 初始化一个状态数组，根据状态改变连接的选中样式
let state = ref([]);
function linkSelect(index) {
  state.value = [];
  for (let i in props.links) {
    state.value.push(false);
  }
  state.value[index] = true;
}
function click(index) {
  emits("click", index); //发送事件，让父元素监听
}
onMounted(() => {
  linkSelect(useState("pageIndex").value)
  for (let i in props.links) {
    state.value.push(false);
  }
});
// 向外公开修改选中的方法
defineExpose({
  linkSelect,
});

// 控制顶部导航栏 在首页不渲染
let isRender = ref(false);
let current_page = useRoute().query.page;
function isNotIndexPge(p) {
  if (p != undefined) {
    return true;
  } else {
    return false;
  }
}
isRender.value = isNotIndexPge(current_page);
// 监听路由，如果为当前页为主页则不渲染头部导航栏
watch(
  () => useRoute().query.page,
  (nextPage) => {
    isRender.value = isNotIndexPge(nextPage);
    if (nextPage == 'join') {
      isRender.value = false;
    }
  }
);
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  min-width: 14rem;
  height: 0.9rem;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 1px solid #e6e7eb !important;
  transition: top 500ms;
}

.header__navwrap {
  width: 100%;
}

.header__navbar {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.48rem 0 0.7rem;
  margin-right: 1.8rem;
  white-space: nowrap;
  flex-wrap: nowrap;

  &::after {
    content: "";
    position: absolute;
    right: 0;
    width: 1px;
    height: 0.18rem;
    background-color: #e6e7eb;
  }
}

.header__navbar-logo {
  height: 0.46rem;

  img {
    height: 0.46rem;
  }
}

.header__navbar-links {
  display: flex;
  align-items: center;
}

.header__navbar-link {
  position: relative;
  font-size: 0.18rem;
  color: #676b73;
  padding: 0.1rem;
  padding-right: 0.05rem;
  margin-left: 0.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  overflow: hidden;
  transition: color 500ms;

  span {
    visibility: visible;
  }

  b {
    position: absolute;
    top: 50%;
    right: 0.05rem;
    visibility: hidden;
    transform: translateY(-50%);
  }

  &:hover {
    color: #3778e5;

    // 选中后隐藏span，露出span底下的b标签，表示加粗
    span {
      visibility: hidden;
    }

    b {
      visibility: visible;
    }
  }
}

// 表示该项选中的类
.header__navbar-link--active {
  color: #3778e5;

  span {
    visibility: hidden;
    // 选中后隐藏span，露出span底下的b标签，表示加粗
  }

  b {
    visibility: visible;
  }
}
</style>
