<template>
  <div class="about-history">
    <div class="about-history-title">
      发展历程
      <b style="left:0.56rem"> Milestones</b>
    </div>
    <div class="about-history-process">
      <div class="swiper-container event-swiper swiper-container-fade">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item, index) in yearsEvents">
            <div class="event-item__info">
              <img :src="item.img" alt="mihoyo" />
              <div class="event-item__info-label">{{ item.label }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="line"></div>
      <div class="timeline">
        <div class="centered-container"></div>
        <ul class="timeline-list" :style="style">
          <li v-for="(item, index) in yearsEvents" class="timeline-item"
            :class="[item.sExt.fp == true ? 'hasYear' : '', 'index-' + index]" :key="index" @click="navTo(index)">
            <div class="timeline-item__year" v-if="item.sExt.fp">
              <span> {{ item.sCategoryName }} </span>
            </div>
            <div class="timeline-item__event">
              <div class="timeline-item__nav">
                <img :src="item.icon" alt="mihoyo" class="timeline-item__nav-icon" />
                <b class="timeline-item__nav-month">{{ item.month }}</b>
              </div>
            </div>
          </li>
          <li class="timeline-item">
            <div class="timeline-item__event">
              <div class="timeline-item__nav">
                <img
                  src="data:image/png;base64,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"
                  class="timeline-item__nav-icon">
                <b class="timeline-item__nav-month">敬请期待</b>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="about-history-process-arrow__lf" :class="{ disabled: disl }" @click="navChange(-1)"></div>
      <div class="about-history-process-arrow__rt" :class="{ disabled: disr }" @click="navChange(1)"></div>
    </div>
  </div>
</template>

<script setup>
import Swiper from "swiper";
// 数据现在这请求，实际上线后在想办法移到一个模块里吧
const props = defineProps(["res"]);
let swiper = null
let yearsEvents = ref('');
let navActiveIndex = 0;
let activeNav = () => {
  return document.querySelector(`.index-${navActiveIndex}`);
}; // 记录当前活跃的是哪一个nav
onMounted(() => {
  yearsEvents.value = props.res.yearsEvents   // 这一步的目的是让swiper尽快渲染，就不会让所有图片在页面上一闪而过了
  console.log(yearsEvents.value);
  swiper = new Swiper(".event-swiper", {
    observer: true, // 修改swiper自己或子元素时，自动初始化swiper,也就是响应式
    observeParents: true, // 修改swiper的父元素时，自动初始化swiper
    preloadImages: true,
    updateOnImagesReady: true,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    on: {
      // 监听活跃slide的变换
      transitionStart: () => {
        if (swiper.activeIndex == 0) {
          disl.value = true;
        } else disl.value = false;
        if (swiper.isEnd) {
          disr.value = true;
        } else disr.value = false;
        navTo(swiper.activeIndex);
      },
    },
  });

  // nextTick，确保DOM渲染完毕后获取DOM元素
  nextTick(() => {
    swiper.slideTo((navActiveIndex = yearsEvents.value.length - 1));
    activeNav().classList.add("active");
    for (let i = 1; i < yearsEvents.value.length; i++) {
      transX -= document.querySelector(`.index-${i}`).offsetWidth;
    }
    style.value = `transform:translate(${transX}px)`;
  });
});

let transX = 186; // 第一个nav的偏移量
let style = ref(`transform:translate(${transX}px)`);
let disl = ref(false);
let disr = ref(true);

function navChange(num) {
  if (num == 1) {
    swiper.slideNext();
    navTo(swiper.activeIndex);
  }
  if (num == -1) {
    swiper.slidePrev();
    navTo(swiper.activeIndex);
  }
}

// 底部导航栏移动方法
function navTo(num) {
  activeNav().classList.remove("active");
  if (num > navActiveIndex) {
    // 向前（左）移动,即移动距离为后面那块的宽度
    for (let i = navActiveIndex + 1; i <= num; i++) {
      transX -= document.querySelector(`.index-${i}`).offsetWidth;
    }
  }
  if (num < navActiveIndex) {
    // 向后（右）移动,即移动距离为自身块的宽度
    for (let i = navActiveIndex; i > num; i--) {
      transX += document.querySelector(`.index-${i}`).offsetWidth;
    }
  }
  style.value = `transform:translate(${transX}px)`;
  navActiveIndex = num;
  activeNav().classList.add("active");
  swiper.slideTo(num);
}
</script>

<style lang="less" scoped>
.about-history-title {
  position: absolute;
  font-size: 0.24rem;
  font-weight: bold;
  color: #242933;
}

.about-history-process {
  position: relative;
  width: 11rem;
  padding: 0 0.5rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.event-swiper {
  position: relative;
  margin-right: 1rem;
  width: 6rem;
}

.swiper-slide {
  transition-property: opacity;
  // transition: opacity 500ms ease-out, transform 500ms ease-out;
}

.about-history .event-swiper {
  .event-item__info {
    margin: 0 auto;
    width: 5.9rem;
    height: 5.4rem;
    margin-bottom: 0.1rem;
    text-align: center;
    opacity: 1;
    transition: opacity 500ms ease-out;

    img {
      width: 100%;
    }
  }

  .event-item__info-label {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 0.9rem;
    font-size: 0.18rem;
    font-weight: bold;
    overflow: hidden;
  }
}

.line {
  position: absolute;
  border-bottom: 1px solid #2c2c2c;
  width: calc(100% - 1rem);
  bottom: 0.84rem;
}

.timeline {
  margin: 0 auto;
  display: block;
  width: 100%;
  padding-top: 0.14rem;
  overflow-x: hidden;
  height: 92.54px;

  .timeline-list {
    display: inline-block;
    text-align: center;
    white-space: nowrap;
    transition: transform 500ms;
    font-family: HarmonyOS, Arial, Helvetica, sans-serif;

    .timeline-item {
      display: inline-block;
      position: relative;
      width: 0.7rem;
      font-size: 0;
      padding: 0 1.26rem;
      white-space: nowrap;
      vertical-align: top;
      cursor: pointer;

      &.hasYear {
        padding-left: 3.3rem;
      }

      &:last-child {
        .timeline-item__nav-month {
          color: #a4afbc;
        }

        .timeline-item__nav-icon {
          background: #a4afbc;
          border: 0;
        }

        margin-left: .01rem;
        transform: translateX(3%);
      }
    }

    .timeline-item__year {
      position: absolute;
      left: 0;
      width: 1.56rem;
      background-color: #f8f9fb;
      font-size: 0.5rem;
      font-weight: bold;
      text-align: center;
      color: #242933;
      cursor: default;
    }

    .timeline-item__event {
      // width: 100%;
      padding-bottom: 0.5rem;
    }

    .timeline-item__nav {
      position: relative;
      height: 0.7rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 0.54rem;
      transform: translateX(-50%);

      &::before,
      &::after {
        content: "";
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 0.25rem;
        height: 0.07rem;
        background: center center/0.25rem 0.07rem no-repeat;
      }

      &::before {
        left: -0.34rem;
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAHCAYAAAD9NeaIAAAAAXNSR0IArs4c6QAAAIxJREFUKFOl0kEOgUEMhuHnD2uuwA2sSbgH/11wFw5iY+0GXIE1iUxSScPKzKz69U36tdN2ft8ax5QucZ/037z78pjggnHkr5jhEbqKZ5MBTlhEwSdWOIeu5tlki12arMT7pKv5x2QeUwyjaOl+iVfoJl5MRrGHaRS8xx5uoVu5YnLAJn1LuaR8Xa3cG9DtNLqF0BKHAAAAAElFTkSuQmCC);
      }

      &::after {
        right: -0.34rem;
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAHCAYAAAD9NeaIAAAAAXNSR0IArs4c6QAAAIxJREFUKFOl0kEOgUEMhuHnD2uuwA2sSbgH/11wFw5iY+0GXIE1iUxSScPKzKz69U36tdN2ft8ax5QucZ/037z78pjggnHkr5jhEbqKZ5MBTlhEwSdWOIeu5tlki12arMT7pKv5x2QeUwyjaOl+iVfoJl5MRrGHaRS8xx5uoVu5YnLAJn1LuaR8Xa3cG9DtNLqF0BKHAAAAAElFTkSuQmCC);
      }
    }

    .timeline-item__nav-month {
      position: absolute;
      bottom: -0.4rem;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      color: #242933;
      font-size: 0.16rem;
      font-weight: bold;
    }
  }
}

.timeline-item__nav-icon {
  border: 2px solid #868686;
  border-radius: 50%;
  width: 0.54rem;
  height: 0.54rem;
  overflow: hidden;
  position: relative;
}

.centered-container {
  width: 1.3rem;
  height: 0.7rem;
  background-color: #f8f9fb;
  position: absolute;
  bottom: 0.5rem;
  right: 3.82rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &::before,
  &::after {
    content: "";
    // position: absolute;
    // top: 50%;
    width: 0.14rem;
    height: 0.15rem;
    // transform: translateY(-50%);
    background-size: 100% 100%;
    background-position: center center;
    background-repeat: no-repeat;
    flex-shrink: 0;
  }

  &::before {
    // left: 0;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAPCAYAAADUFP50AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozQTdDQURGMjIwNUExMUVDQjM0NEU0RTJDN0IxRDREOSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozQTdDQURGMzIwNUExMUVDQjM0NEU0RTJDN0IxRDREOSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjNBN0NBREYwMjA1QTExRUNCMzQ0RTRFMkM3QjFENEQ5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjNBN0NBREYxMjA1QTExRUNCMzQ0RTRFMkM3QjFENEQ5Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+uJgRhQAAAKVJREFUeNpiYGBg6ATi/zhwKQMBMBeHxn9AnIRPIzMQr8Oh+TcQB+DTzA7E+3Bo/g7Ejvg08wLxaRyaPwKxMT7NokB8A4fml0Cshk+zHBA/wqH5IRDL4NNsiyeaDuLSxAfEZ3Bo+oDLr1xAfAiHpq9AbINNExsQb8eh6QcQu+NKBGvwJIIgbJoYgXgBDk1/gTgOV2BMwZNWs3FpasMT7BW4NAEEGAD2LGiDzXK8XwAAAABJRU5ErkJggg==);
  }

  &::after {
    // right: 0;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAPCAYAAADUFP50AAAAAXNSR0IArs4c6QAAAO1JREFUOE910j8rxVEYwPHPlSLDtZlk9Aas3GLBREo2hfFalXdw666yiYySZBEDkmy8ACujjVKU6Cm/uv0852zP+fY9z7/TUD5b6BZwt1EA69hDxvexkYFFHKM/efQUy/iui9M4x2Ai3WAen8F6xQlco5lID5jBe8UqcRx3GEmkJ0zhtZeFOIp7jCXSCybxXGch3qJVmG7cRyX/TojR2xWGE/7419tbljHuopxLDCVyZJzDR73HKp7FGQYS+QIL+KpPtYqXcFRY/glWYvn1PVbyKg7Ql2Q+xBp+Sn+1jZ3CX93FZkmMZNvoFNbU+QVnuCcf5WzuqQAAAABJRU5ErkJggg==);
  }
}

.about-history-process-arrow__lf {
  left: 0;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAASCAYAAABit09LAAAAAXNSR0IArs4c6QAAAKVJREFUKFOF0jEOAiEQBdA/aOAWJmtiwyno9ALcVqOx0oKac1hpaWYDm4UdgIbmDZn5DGFwvPc7JtRz1tqDUuoK4NeECd0BHAE8RbhGRPTWWp83UEIhhE8BW6gYpocWOEIz5JxijBHAKTfOPdWxFRDAyxhzESFXVpmJeJk64QeASXpZimfGdb+twDe494UFHi1F7lleipxhGvAG4NvdRy5wzu35/gN9Q1JfwOUE0gAAAABJRU5ErkJggg==) center/0.1rem 0.18rem no-repeat;
}

.about-history-process-arrow__rt {
  right: 0;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAASCAYAAABit09LAAAAAXNSR0IArs4c6QAAAKVJREFUKFOF0jEOAiEQBdA/aOAWJmtiwyno9ALcVqOx0oKac1hpaWYDm4UdgIbmDZn5DGFwvPc7JtRz1tqDUuoK4NeECd0BHAE8RbhGRPTWWp83UEIhhE8BW6gYpocWOEIz5JxijBHAKTfOPdWxFRDAyxhzESFXVpmJeJk64QeASXpZimfGdb+twDe494UFHi1F7lleipxhGvAG4NvdRy5wzu35/gN9Q1JfwOUE0gAAAABJRU5ErkJggg==) center/0.1rem 0.18rem no-repeat;
  transform: rotate(180deg);
}

.about-history-process-arrow__lf,
.about-history-process-arrow__rt {
  width: 0.38rem;
  height: 0.45rem;
  position: absolute;
  bottom: 0.62rem;
  z-index: 5;
  cursor: pointer;
  border: 1px solid #868686;

  &.disabled {
    opacity: 0.3;
    cursor: default;
    pointer-events: none;

    &:hover {
      border-color: #868686;
      background-color: rgba(0, 0, 0, 0);
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAASCAYAAABit09LAAAAAXNSR0IArs4c6QAAAKVJREFUKFOF0jEOAiEQBdA/aOAWJmtiwyno9ALcVqOx0oKac1hpaWYDm4UdgIbmDZn5DGFwvPc7JtRz1tqDUuoK4NeECd0BHAE8RbhGRPTWWp83UEIhhE8BW6gYpocWOEIz5JxijBHAKTfOPdWxFRDAyxhzESFXVpmJeJk64QeASXpZimfGdb+twDe494UFHi1F7lleipxhGvAG4NvdRy5wzu35/gN9Q1JfwOUE0gAAAABJRU5ErkJggg==);
    }
  }

  &:hover {
    background-color: #3778e5;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAASCAYAAABit09LAAAAAXNSR0IArs4c6QAAAJNJREFUKFOF0jEOwjAMheHfKudAohJnoYemAjGVE3COTnQzCnUrxXHSLFk+K/aLhYOjql0i0nKqegbuwFKFhh5AD7xC6NAbuBUwRCJzBmsoG6aFdniE/tBy+gBXYG1cZPaxeTgBQwhTpXs6xPvUhp/ABShwFM+Gs35rgRe49YU5rm2P6zleiq3Y8Ah8m/to0Z3S/QPLCV9Gvg2wEQAAAABJRU5ErkJggg==);
    border-color: transparent;
  }
}

.active {
  .timeline-item__nav-icon {
    border-color: #242933;
    transform: scale(1.3);
    transition: transform 500ms ease-out;
  }

  .timeline-item__nav::before,
  .timeline-item__nav::after {
    display: none;
  }
}
</style>
