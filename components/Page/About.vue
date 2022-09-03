<template>
  <div :class="'home-' + page" class="fp-page">
    <img src="/img/decoration.b195643.png" class="aside-decoration" />
    <div class="fp-page_wrap">
      <div class="home-about-cates">
        <div class="home-about-cates-wrap" v-for="(item, index) in aboutcates" :key="item"
          @mouseenter="cateHover(index)" @mouseleave="cateReset(index)" @click="cateChange(index)"
          :class="clickIndex == index ? 'home-about-cates-wrap--active' : ''">
          <div class="home-about-cate-wrap" :style="cateActive[index]">
            <div class="span-wrapper" v-for="(it, i) in 3" :class="i == 1 ? 'active' : ''">
              <span>{{  item  }}</span>
            </div>
          </div>
          <!-- </div> -->
        </div>
      </div>
      <div class="home-about-container">
        <transition>
          <component :is='component' :res="res"></component>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>

const page = "about";
let aboutcates = ["关于米哈游", "发展历程", "荣誉资质"];
let component = ref("")
let res = ref("")

onMounted(async () => {
  // 生产模式
  let url = "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-b02b7f48-0227-438f-8c3a-3a5f94afa017/68d7f4e4-fa61-4cb6-8784-5e4a3eba89b2.json"
  const { data } = await useFetch("/data/mihoyo.json", {
    pick: ["yearsEvents", "introRes", "visionRes", "yearsHonor"],
  });
  res.value = data.value

  component.value = resolveComponent('PageAboutIntro')
  cateChange(0)
})

let cateActive = ref([]);
let task = null;
let activeIndex = ref(null);
let clickIndex = ref(null);
let beforeIndex = null;

function cateHover(index) {
  activeIndex.value = index;
  cateActive.value[index] = "transform: translateY(-0.3rem); transition-duration: 300ms";
}
function cateReset(index, is = false) {
  clearTimeout(task);
  if (beforeIndex == index && is != true) return;
  cateActive.value[index] = "transform: translateY(0rem); transition-duration: 300ms";
  task = setTimeout(() => {
    cateActive.value[index] =
      "transform: translateY(-0.602rem); transition-duration: 0ms";
  }, 300);
}
function cateChange(index) {
  if (clickIndex.value == index) return
  cateReset(beforeIndex, true);
  clickIndex.value = index;
  beforeIndex = index;
  cateRoute(index)
}
// 切换组件路由的方法
function cateRoute(index) {
  if (index == 0) component.value = resolveComponent('PageAboutIntro')
  if (index == 1) component.value = resolveComponent('PageAboutHistory')
  if (index == 2) component.value = resolveComponent('PageAboutHonor')
}
</script>

<style lang="less" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 700ms;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.swiper-slide-active {

  // 滑动到当前页面后的移动动画
  .home-about-cates,
  .home-about-container {
    transform: translateY(0);
  }
}

.swiper-slide-prev {
  .home-about-cates {
    transform: translateY(-1rem);
  }

  .home-about-container {
    transform: translateY(-1.5rem);
  }
}

.swiper-slide-next {
  .home-about-cates {
    transform: translateY(1.5rem);
  }

  .home-about-container {
    transform: translateY(2rem);
  }
}

.home-about {
  height: 100%;
  overflow: hidden;
  background-image: linear-gradient(to bottom, rgba(248, 249, 251, 0) 10%, rgba(248, 249, 251, 0.5) 40%, #f8f9fb 100%);
}

.home-about-cates {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 0.5rem;
  margin-right: -0.3rem;
  height: 0.25rem;
}

.home-about-cates,
.home-about-container {
  transition: transform 800ms;
  transition-delay: 200ms;
}

.home-about-cates-wrap {
  position: relative;
  height: 0.3rem;
  overflow: hidden;
  margin-right: -1px;
  cursor: pointer;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    width: 1px;
    height: 0.18rem;
    background: #707173;
    transform: translateY(-50%);
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }

  &:hover::before,
  &:hover::after {
    background-color: #3778e5;
  }
}

.home-about-cates-wrap--active {
  color: #fff;

  .home-about-cate-wrap {
    transform: translateY(-0.3rem);
  }

  span {
    color: #fff;
    background-color: #3778e5;
  }

  &::before,
  &::after {
    background-color: #3778e5;
  }
}

.home-about-cate-wrap {
  font-size: 0;
  color: #676b73;
  white-space: nowrap;
  position: relative;
  height: 0.9rem;
  transform: translateY(-0.602rem);

  .span-wrapper {
    height: 0.3rem;
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  span {
    font-size: 0.18rem;
    display: block;
    font-size: 0.18rem;
    height: 0.25rem;
    line-height: 0.25rem;
    position: relative;
    padding: 0 0.38rem;
  }

  .active {
    span {
      color: #fff;
      background-color: #3778e5;
    }
  }
}

.home-about-container {
  position: relative;
  width: 11rem;
  height: 6.2rem;
}
</style>
