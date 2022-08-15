<template>
  <div :class="'home-' + page" class="fp-page">
    <img src="" alt="" />
    <div class="fp-page_wrap">
      <div class="home-about-cates">
        <div
          class="home-about-cates-wrap"
          v-for="(item, index) in aboutcates"
          :key="item"
          @mouseenter="cateHover(index)"
          @mouseleave="cateReset(index)"
          @click="cateChange(index)"
          :class="clickIndex == index ? 'home-about-cates-wrap--active' : ''"
        >
          <!-- <div class="home-about-cate" style="height: 0.3rem; overflow: hidden"> -->
          <div class="home-about-cate-wrap" :style="cateActive[index]">
            <div
              class="span-wrapper"
              v-for="(it, i) in 3"
              :class="i == 1 ? 'active' : ''"
            >
              <span>{{ item }}</span>
            </div>
          </div>
          <!-- </div> -->
        </div>
      </div>
      <div class="home-about-container">
        <!-- <AboutIntro :intro-res="introRes" :vision-res="visionRes" /> -->
        <AboutHistory :h-res="hRes" />
      </div>
    </div>
  </div>
</template>

<script setup>
const page = "about";
let aboutcates = ["关于米哈游", "发展历程", "荣誉资质"];
let visionRes = {
  title: `我们的愿景
                <b> Our Vision</b>`,
  desc: `<p style="white-space: pre-wrap;">2030年，打造出全球十亿人</p><p style="white-space: pre-wrap; text-align: right;">愿意生活在其中的虚拟世界。</p>`,
};
let introRes = `<p style="white-space: pre-wrap;">米哈游成立于2011年，致力于为用户提供美好的、超出预期的产品与内容。米哈游陆续推出了多款高品质人气产品，包括《崩坏学园2》、《崩坏3》、《未定事件簿》、《原神》，动态桌面软件《人工桌面》以及社区产品《米游社》，并围绕原创IP打造了动画、漫画、音乐、小说及周边等多元产品。</p><p style="white-space: pre-wrap;">秉承着“<strong>技术宅拯救世界</strong>”的使命，米哈游始终致力于技术研发、探索前沿科技，在卡通渲染、人工智能、云游戏技术等领域积累了领先的技术能力。</p><p style="white-space: pre-wrap;">米哈游总部位于中国上海，并在新加坡、美国、加拿大、日本、韩国等国家和地区进行全球化布局。目前，公司员工4,000人，来自世界顶尖高校和知名科技公司。</p><p style="white-space: pre-wrap; min-height: 1.5em;"></p><p style="white-space: pre-wrap;"><strong>米哈游的研发理念</strong></p><p style="white-space: pre-wrap;">Something New | Something Exciting | Something Out of Imagination</p>`;
let hRes = {
  title: `      发展历程
      <b style="left:0.56rem"> Milestones</b>`,
};

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
  cateReset(beforeIndex, true);
  clickIndex.value = index;
  beforeIndex = index;
}
</script>

<style lang="less" scoped>
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
    // background-color: #707173;
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
    color: #fff;
    background-color: #3778e5;
  }
}

.home-about-container {
  position: relative;
  width: 11rem;
  height: 6.2rem;
}
</style>
