<template>
  <div class="home-product-swiper swiper-container" @mousemove="slideWithMouse">
    <!-- 第二层一个包裹块 -->
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item, index) in datasets">
        <div :class="index == activeIndex ? 'animated' : ''">
          <div class="minbanner">
            <div class="mibanner-board">
              <img :src="item.bannerboard" alt="miHoYo_F" :style="boardstyle" />
            </div>
            <div class="mibanner-box">
              <slot name="game">
                <img :src="item.bannerimg" alt="miHoYo_imitate" class="mibanner-game"
                  :class="index == activeIndex ? 'animate' : ''" :style="style" />
              </slot>
            </div>
            <MiBannerBtn @click="showVideo(datasets[activeIndex].videosrc)" v-if="item.videosrc || item.videosrc != ''">
            </MiBannerBtn>
          </div>
          <div class="mibanner__info">
            <div class="mibanner__info-name">
              <img v-if="item.name.img" :src="item.name.img" alt class="mibanner__info-name-img" />
              <div v-else style="font-weight: bold">{{  item.name.cnname  }}</div>
              <span class="enname anim">{{  item.name.enname  }}</span>
            </div>
            <div class="mibanner__info-slash"></div>
            <div class="mibanner__info-desc">
              <p v-for="desc in item.desc">{{  desc  }}</p>
            </div>
            <div class="mibanner__info-socials" v-if="item.socials || item.socials.length > 0">
              <div v-for="(social, index) in item.socials" @click="goblank(datasets[activeIndex].socials[index].href)"
                class="mibanner__info-social">
                <span>
                  {{  social.title  }}
                  <div class="mibanner__info-social-qrcode" v-if="social.qrcode">
                    <img :src="social.qrcode" alt="miHoYo" />
                  </div>
                </span>
              </div>
            </div>
            <!-- <h1 :class="index == activeIndex ? 'ani' : 'ani-exit'">{{ index }}</h1> -->
            <!-- <div class="txt" :class="index == activeIndex ? 'ani' : 'ani-exit'">HAHAHA</div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Swiper from "swiper";
const props = defineProps({
  delay: {
    type: Number,
    default: 3420,
  },
  datasets: {
    type: Array,
  },
});
const emit = defineEmits(["bannerchange", "bannertransition"]);
let swiper = null;
let timeOut = null;
let activeIndex = ref(-1);
let translate = 0;
let style = ref(null);
let boardstyle = ref(null);

function goblank(url) {
  window.open(url, "_blank");
}
onMounted(() => {
  swiper = new Swiper(".home-product-swiper", {
    observer: true, // 修改swiper自己或子元素时，自动初始化swiper,也就是响应式
    observeParents: true, // 修改swiper的父元素时，自动初始化swiper
    preloadImages: true,
    updateOnImagesReady: true,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    on: {
      init: () => {
        // 将原本没有的animated类，经过一定的延时添加，才能产生过渡效果，直接添加的话是没有过渡的，直接就是最终样式
        setTimeout(() => (activeIndex.value = swiper.activeIndex), 10);
      },
      transitionStart: () => {
        // 向外发出当前的index
        emit("bannerchange", swiper.activeIndex);
        activeIndex.value = swiper.activeIndex;
      },
      touchMove: () => {
        // 手动切换元素后，也暂停10s，
        pause(10000);
      },
    },
  });
  autoplay();
});
// wathc监听路由的变化，在离开当前页面后轮播图不再播放，当回到该页面后重新播放并重新加载动画类，让动画也重新播放
watch(
  () => useRoute().query,
  (newRoute) => {
    if (newRoute.page != "product") {
      activeIndex.value = -1; // activeIndex的值控制动画是否加载，只需要变化这个值即可重新加载动画。
      pause(true);
    } else {
      activeIndex.value = swiper.activeIndex; // activeIndex的值控制动画是否加载，只需要变化这个值即可重新加载动画。
      pause(false);
    }
  }
);
function autoplay() {
  timeOut = setTimeout(() => {
    if (swiper.isEnd) {
      // 如果是结尾 就回到开头
      swiper.slideTo(0);
    } else {
      swiper.slideNext();
    }
    autoplay();
  }, props.delay);
}
function slideTo(index) {
  swiper.slideTo(index);
  // 用户调用方法后，延迟10秒再开始自动播放
  pause(10000);
}
/**
 * 设置轮播图暂停一段时间
 * @param {number|boolean} time 需要暂停的时间，单位为毫秒(ms),如果传入true则永久暂停直到手动开启，传入false重新启动
 */
function pause(time) {
  clearTimeout(timeOut);
  // 切记一定要获得延迟后的定时器id，否则如果短时间内多次调用会导致产生很多定时器，从而混乱
  if (time == false) {
    autoplay();
  } else if (typeof time == "number") {
    timeOut = setTimeout(() => {
      // 一定要在这里清除一次鼠标对轮播图的位移影响，不然自动播放后，图片会"跳"一下
      style.value = null;
      boardstyle.value = null;
      autoplay();
    }, time);
  }
}

// 下面这个问题，随鼠标滑动这个问题 一直没解决，怎么才能像官网那么丝滑呢？一直很卡！！
let transition_duration = 700;
function slideWithMouse(e) {
  emit("bannertransition", transition_duration);
  // 让元素随着鼠标相反的方向移动
  translate = -0.05 * e.pageX + 38.4; // box中的轮播大图最终位移位置
  let trans_board = -0.015 * e.pageX + 11.52; // board中背景小图的最终位移位置
  style.value = `transform: translate(${translate}px, 0); transition: transform ${transition_duration}ms cubic-bezier(0,.3,.5,1);`;
  boardstyle.value = `transform: translate3d(${trans_board}px, 0px, 0px) scale(1.2, 1.2); backface-visibility: hidden; transform-style: preserve-3d;transition: transform 600ms cubic-bezier(0,.3,.5,1)`;
  pause(transition_duration);
}
// 向外公开的变量
defineExpose({
  slideTo,
});

let isShowVideo = useState("isShowVideo");
function showVideo(videoSrc) {
  isShowVideo.value = videoSrc;
}
// 监听视频是否播放。如果视频正在播放，则停止导航图轮播，否则重新开始轮播
watch(isShowVideo, (n) => {
  if (n != false) {
    pause(true);
  } else {
    pause(false);
  }
});
</script>

<style lang="less" scoped>
@keyframes shiftslide {
  0% {
    transform: translate(-71px, 0);
    opacity: 0;
  }

  15% {
    transform: translate(-30px, 0);
    opacity: 1;
  }

  100% {
    transform: translate(0px, 0);
  }
}

@keyframes infoslide {
  0% {
    transform: translate(500px, 0);
    opacity: 0;
  }

  15% {
    transform: translate(30px, 0);
    opacity: 1;
  }

  100% {
    transform: translate(30px, 0);
  }
}

@keyframes exit {
  0% {
    transform: translate(30px, 0);
  }

  15% {
    transform: translate(500px, 0);
  }

  100% {
    transform: translate(500px, 0);
  }
}

@keyframes masked-animation {
  0% {
    background-position-x: 0px;
  }

  100% {
    background-position-x: 100px;
  }
}

.swiper-slide {
  transition-property: opacity;
}

.home-product-swiper {
  width: 100%;
  height: 100%;

  .mibanner__info-name,
  .mibanner__info-slash,
  .mibanner__info-desc,
  .mibanner__info-socials {
    opacity: 0;
    transform: translateX(0.6rem);
    -webkit-transform: translateX(0.6rem);
    -ms-transform: translateX(0.6rem);
    transition: opacity 500ms ease-out, transform 500ms ease-out;
  }

  .animated {

    .mibanner__info-name,
    .mibanner__info-slash,
    .mibanner__info-desc,
    .mibanner__info-socials {
      opacity: 1;
      transform: translateX(0);
      -webkit-transform: translateX(0);
    }

    .mibanner__info-name {
      transition-delay: 300ms;
    }

    .mibanner__info-slash {
      transition-delay: 500ms;
    }

    .mibanner__info-desc {
      transition-delay: 700ms;
    }

    .mibanner__info-socials {
      transition-delay: 900ms;
    }
  }
}

.minbanner {
  position: relative;
  width: 12.8rem;
  height: calc(100% - 0.9rem);
  margin: 0 auto;
  top: 0.9rem;

  &::before {
    content: "";
    position: absolute;
    right: 3.5rem;
    top: 5.2rem;
    width: 0.3rem;
    height: 0.3rem;
    background-color: #3778e5;
  }
}

.mibanner-box {
  position: absolute;
  top: 0;
  left: -5.4rem;
  z-index: 1;
  min-width: 13.7rem;
  height: 8rem;
  overflow: hidden;
  padding-left: 0.3rem;
  margin: 0 auto;
}

.mibanner-board {
  position: absolute;
  top: 5.2rem;
  left: -4.8rem;
  width: 13.7rem;
  height: 2.8rem;
  overflow: hidden;
  pointer-events: none;

  &::before,
  &::after {
    content: "";
    position: absolute;
    right: 0;
    z-index: 1;
  }

  &::before {
    width: 3.22rem;
    height: 2.02rem;
    top: 0;
    background: url("https://www.mihoyo.com/_nuxt/img/product-card-bg.2acc93f.png") top right/cover no-repeat;
  }

  &::after {
    width: 0.38rem;
    height: 0.34rem;
    bottom: 0;
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAiCAYAAAAzrKu4AAAAAXNSR0IArs4c6QAAAmhJREFUWEfNmD2MTUEYhp8XIRQUNDR0dJS0NH5XFMSqFKgo/HVERUOU6OhshZCgolLR0GgoNAoJCSHi95VvM7vZvXtm5kjO2Xsn2VvtfPPcOTPv95wrRmzYFnA5PkZm2F4M3ALGRwbM9nLgDrAtdmokwGyvBh4Cm6Ye39DBbK8HHgPrZp6poYLZ3gw8AFYNHvShgdneA0wAy5pu31DAbB8BrgOLcpEw72C2LwDxV1x73sBsLwSuAccqwfkXODsvYLaXpvM0VoH6ARyWNNE7mO2V6eZtqUB9BvZJetp7wNpemzJqQwXqPbBD0qveA9b2xpTmaypQrxPUu94D1vbW1PdWVKCeAWOSPvUesLYPJkNYUoG6BxyS9L33gLV9ErgCLKhARbiekPSn14CdkjvgdAXIwHlJF3P/15kozpS7CtSvCFdJIYKNozNRHJS7AthX4ICkRwWobkSxSe4yi34Adkl6UYDqRhRzctew8Btgu6S3BahuRNF2tJb7TXI3sPhzYLek2LHcmepGFGtyN2P1OEv7JX0rQHUjiraPJm3Jyl2CuJlu3+8CVDei2FLuIqMuSTpXio2WtcoWmeQuUjp2qzQiwY9LulHYpbaiOFki62O24yXhdjTZClT0uuh50ftyh7ytKE7PbwT7D7n7COyVFJaQg2orirPmzwGzHS+ecatqchf+FHIXPpWDaltrzvxZYEnuAiqSuDReAjslhXnmoEIU29RqnD8NluTuLhA9qzSeJDf/UoAKUWxTK7vOJJjtcSDypyZ3cRniLeZnAaptreK3l+1T8UNZC7m7CpyRFHmVe3xta1UeCvwDshr8RLnNUx4AAAAASUVORK5CYII=") top right/cover no-repeat;
  }

  img {
    height: 100%;
    position: absolute;
    transform: scale(1.2);
    left: 0;
    top: 0;
    transform-origin: center;
  }
}

.mibanner-game {
  height: 8rem;
  // width: 15rem;
  transform-origin: center;
  pointer-events: none;
  transition: all 300ms;
  overflow-y: hidden;
}

.animate {
  opacity: 1;
  animation: shiftslide 3000ms ease-out backwards;
  animation-delay: 0.2s;
  transition: opacity 500ms ease-out;
}

.mibanner__info {
  position: absolute;
  top: 1.4rem;
  right: 0.8rem;
  z-index: 9;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.mibanner__info-name {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 0.85rem;
  font-family: HarmonyOS, Arial, Helvetica, sans-serif;
  line-height: 1;
  font-weight: bold;
  color: #242933;

  img {
    height: 0.88rem;
  }

  .enname {
    margin-top: 0.14rem;
    font-size: 0.2rem;
    font-family: HarmonyOS, Arial, Helvetica, sans-serif;
    background: linear-gradient(to right, #3778e5, #e98bc0);
    color: transparent;
    // background-clip: text;
  }

  .anim {
    background-image: linear-gradient(-135deg,
        #3778e5,
        #e98bc0,
        #3778e5,
        #e98bc0,
        #3778e5);
    -webkit-text-fill-color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
    background-size: 200% 100%;
    animation: masked-animation 3s infinite linear;
  }
}

.mibanner__info-slash {
  position: relative;
  width: 1rem;
  height: 0.5rem;
  margin: 0.16rem 0;

  &::before {
    content: "";
    position: absolute;
    width: 1rem;
    height: 0.6rem;
    border-top: 1px solid #242933;
    transform: rotate(-34deg);
    transform-origin: top right;
  }
}

.mibanner__info-desc {
  max-width: 7.5rem;
  text-align: right;
  font-size: 0.16rem;
  line-height: 0.28rem;
  color: #3d424d;

  p {
    text-align: right;
    white-space: pre-wrap;
  }
}

.mibanner__info-socials {
  display: flex;
  margin-top: 0.3rem;
  margin-right: 0.14rem;
  cursor: pointer;

  .mibanner__info-social {
    font-size: 0.2rem;
    font-weight: bold;
    color: #3d424d;
    margin-left: 0.3rem;
    cursor: pointer;

    &:hover {
      color: #3778e5;

      .mibanner__info-social-qrcode {
        display: block;
      }
    }

    span {
      position: relative;
    }
  }

  .mibanner__info-social-qrcode {
    position: absolute;
    bottom: -1.6rem;
    left: 50%;
    transform: translateX(-50%);
    width: 1.36rem;
    height: 1.45rem;
    padding: 0.08rem;
    padding-top: 0.17rem;
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIgAAACRCAYAAAAYY/ABAAAAAXNSR0IArs4c6QAABOlJREFUeF7t1E9olwUcx/Hn+flzjtFo5QK3JkYlURaElStsIEWdCoIivCT01yjoupkeFmgm3YIisTzkRRpCB6GDREVJ/0cHk6LMhG2GbbZYjN/mb3uiaESRbnyOvt+/6+/5HD6f7+t5ysKfC1xggdJ1/lnglv4Tl9bLFW82q5nHv9pzzW9uUxQCWVAwWNU2NMbeKYvi/rIoDq8+0f3A0FA5R0cikL8FbBgY21kW1fa1Xcu/+/70ueuqotz1+UvdOwRCX6Aoitv7Rx6uyvLg+qtXDL/25MrDz+ybuG/4x5n1ZVVt/nRPz9vkifBfkNueH7m5Nl8evXJlffzAc51vtbXU5qZn55c98sr4ltGJZud8rdr4xYs9X1ORoIH0bTt9xblq/stLWmsdbzzbuXdNZ316AcKp8WbbE6+Ob/29MT+5vKzd+tHurl+ISLBAbhj8pqW90XGkvqy8Y+fmy/ZvurH15/8C+OBYY9WOg78+1pyrPplqnbzn+OC6WRoSLJDebWOvl0W19dFN7Yeeurf92PkOv+/I1Lr97089VBXl3s92dz+NA9I7MFrRSi/07bu+9eOXt1z+3mL9+w+cvevD442+xZ67GP8v/wSyqqM+srarfupiLHi+Tm0risb2BzuOttRri74gs835ctehyY3TM0UrZaOTZ5o9IxPNNX8BWeqbRBnHnkXxwtDZO98dbtwtEDX87wICEcYFFxCIQASigXwBvyD5doikQBBnzksKJN8OkRQI4sx5SYHk2yGSAkGcOS8pkHw7RFIgiDPnJQWSb4dICgRx5rykQPLtEEmBIM6clxRIvh0iKRDEmfOSAsm3QyQFgjhzXlIg+XaIpEAQZ85LCiTfDpEUCOLMeUmB5NshkgJBnDkvKZB8O0RSIIgz5yUFkm+HSAoEcea8pEDy7RBJgSDOnJcUSL4dIikQxJnzkgLJt0MkBYI4c15SIPl2iKRAEGfOSwok3w6RFAjizHlJgeTbIZICQZw5LymQfDtEUiCIM+clBZJvh0gKBHHmvKRA8u0QSYEgzpyXFEi+HSIpEMSZ85ICybdDJAWCOHNeUiD5doikQBBnzksKJN8OkRQI4sx5SYHk2yGSAkGcOS8pkHw7RFIgiDPnJQWSb4dICgRx5rykQPLtEEmBIM6clxRIvh0iKRDEmfOSAsm3QyQFgjhzXlIg+XaIpEAQZ85LCiTfDpEUCOLMeUmB5NshkgJBnDkvKZB8O0RSIIgz5yUFkm+HSAoEcea8pEDy7RBJgSDOnJcUSL4dIikQxJnzkgLJt0MkBYI4c15SIPl2iKRAEGfOSwok3w6RFAjizHlJgeTbIZICQZw5LymQfDtEUiCIM+clBZJvh0gKBHHmvKRA8u0QSYEgzpyXFEi+HSIpEMSZ85ICybdDJAWCOHNeUiD5doikQBBnzksKJN8OkRQI4sx5SYHk2yGSAkGcOS8pkHw7RFIgiDPnJQWSb4dICgRx5rykQPLtEEmBIM6clxRIvh0iKRDEmfOSAsm3QyQFgjhzXlIg+XaIpEAQZ85LCiTfDpEUCOLMeUmB5NshkgJBnDkvKZB8O0RSIIgz5yUFkm+HSAoEcea8pEDy7RBJgSDOnJcUSL4dIikQxJnzkgLJt0Mk/wWkp7P+002rW35ANLfkkhb4dnT2qpNnmteWvQOj1ZISPoRc4A+oyxkEmgdh9wAAAABJRU5ErkJggg==") no-repeat center/100% 100%;
    display: none;

    img {
      width: 100%;
    }
  }
}

.ani {
  // animation-delay: 900ms;
  animation: infoslide 3420ms ease-out forwards;
}

.ani-exit {
  animation: exit 3000ms;
}

img {
  display: block;
}
</style>
