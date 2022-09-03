<template>
  <div class="home-about-cates">
    <div class="home-about-cates-wrap" v-for="(item, index) in props.aboutCates" :key="item"
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
</template>

<script setup>
const props = defineProps(["aboutCates"])

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
}
</script>

<style lang="less" scoped>
.home-about-cates {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 0.5rem;
  margin-right: -0.3rem;
  height: 0.25rem;
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
</style>
