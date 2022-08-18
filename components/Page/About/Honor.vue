<template>
  <div class="about-honor">
    <div class="about-honor-title">
      荣誉资质
      <b> Honors & Awards</b>
    </div>
    <div class="about-honor-container">
      <div class="about-honor-container__content">
        <div class="about-honor-container__data" :style="dataTrans">
          <div class="about-honor-list" v-for="(list, index) in showList" :key="index">
            <div class="about-honor-item" v-for="(item, cIndex) in list">
              <div class="about-honor-item__title">{{ item.label }}</div>
              <div class="about-honor-item__origin"> {{ item.origin }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="about-honor-btns" v-if="showList.length > 1">
        <button class="about-honor-btns__prev disabled" @click="prev()"></button>
        <button class="about-honor-btns__next" @click="next()"></button>
      </div>
      <div class="about-honor-container__tool">
        <div class="swiper-container about-honor-swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item, index) in data" @click="navTo(index)">
              <div class="about-honor-year" :class="active == index ? 'about-honor-year--active' : ''">{{ item.y }}
              </div>
            </div>
            <span class="line" :style="lineTrans">
            </span>
          </div>
        </div>
      </div>

    </div>
    <div class="about-history-process"></div>
  </div>
</template>

<script setup>
import Swiper from "swiper";

const props = defineProps(['res'])
const yearsHonor = props.res.yearsHonor
let dataTrans = ref('')
let translate = 0

// 分页逻辑
let pageCount = 8         // 一页展示的数据条目
let pageSum = 0           // 总页数
let pageIndex = 1         // 当前所在页码
// 预处理 用于 v-for
let data = []
yearsHonor.forEach((item, index) => {
  let origin = [...item.list]
  let y = item.y
  let list = []
  pageSum = Math.ceil(origin.length / pageCount)
  for (let i = 0; i < pageSum; i++) {
    list.push(origin.splice(0, 8))
  }
  data.push({ y, list })
})
let showList = ref(data[0].list)  // 当前展示荣誉数据的列表,初始化默认第一个
// 换页的方法
function next() {
  let dom = document.querySelector(".about-honor-container__data")
  translate += dom.clientWidth
  dataTrans.value = `transform:translateX(-${translate}px)`
  pageIndex++
  if (pageIndex == pageSum) {
    document.querySelector(".about-honor-btns__next").classList.add('disabled')
  }
  if (pageIndex > 1) {
    document.querySelector(".about-honor-btns__prev").classList.remove('disabled')
  }
}
function prev() {
  let dom = document.querySelector(".about-honor-container__data")
  translate -= dom.clientWidth
  dataTrans.value = `transform:translateX(-${translate}px)`
  pageIndex--
  if (pageIndex == 1) {
    document.querySelector(".about-honor-btns__prev").classList.add('disabled')
  }
  if (pageIndex < pageSum) {
    document.querySelector(".about-honor-btns__next").classList.remove('disabled')
  }
}

// 改变侧边栏的方法
let active = ref(0)
let lineTrans = ref('')
let translateY = 0
let time1 = 0
let time2 = 0
function navTo(index) {
  clearTimeout(time1)
  clearTimeout(time2)
  translateY = 0
  for (let i = 0; i < index - 0; i++) {
    translateY += document.querySelector('.about-honor-swiper .swiper-slide').clientHeight
  }
  lineTrans.value = `transform:translateY(${translateY}px)`
  let dom = document.querySelector('.about-honor-container__content')
  if (index > active.value) {
    dom.classList.add('honor-leave-active')
    dom.classList.add('honor-leave-top-to')
    time1 = setTimeout(() => {
      showList.value = data[index].list
      dom.classList.remove('honor-leave-top-to')
    }, 250)
    time2 = setTimeout(() => {
      dom.classList.remove('honor-leave-active')
    }, 750)
  }
  if (index < active.value) {
    dom.classList.add('honor-leave-active')
    dom.classList.add('honor-leave-bottom-to')
    time1 = setTimeout(() => {
      showList.value = data[index].list
      dom.classList.remove('honor-leave-bottom-to')
    }, 250)
    time2 = setTimeout(() => {
      dom.classList.remove('honor-leave-active')
    }, 750)
  }

  active.value = index
}
onMounted(() => {
  let swiper = new Swiper(".about-honor-swiper", {
    direction: 'vertical',
    freeMode: {
      enabled: false,
      sticky: true,
    },
    on: {
      transitionStart() {
        swiper.slideTo(0)
      }
    }
  })

})
</script>

<style lang="less" scoped>
.about-honor-title {
  margin-bottom: 1rem;

  b {
    left: .56rem;
  }
}

.about-honor-container {
  position: relative;
  display: flex;
  align-items: flex-start;
  -webkit-box-align: start;
  width: 11rem;
  height: 4.78rem;
  padding-right: 1rem;

  .about-honor-container__content {
    position: relative;
    width: 10rem;
    height: 4.77rem;
    padding: .4rem 0;
    margin-top: -0.4rem;
    overflow: hidden;

    .about-honor-container__data {
      display: flex;
      transition: transform 500ms ease-in-out, -webkit-transform 500ms ease-in-out;

      .about-honor-list {
        width: 100%;
        display: flex;
        flex-wrap: wrap; // 设置元素多行显示（换行）
        justify-content: flex-start;
        align-content: flex-start; // 在多行时align-items失效，align-content生效
        flex-shrink: 0;
        margin-top: -0.1rem;

        .about-honor-item {
          position: relative;
          width: 4.1rem;
          height: 1.2rem;
          padding: 0 .4rem;
          margin-right: 1.1rem;
          margin-top: -0.1rem;
          text-align: center;
          line-height: 1.4;
          display: flex;
          flex-direction: column;
          justify-content: center;

          .about-honor-item__title,
          .about-honor-hover__title {
            font-size: .16rem;
            font-weight: bold;
            color: #242933;
            margin-bottom: .08rem;
          }

          .about-honor-item__origin,
          .about-honor-hover__origin {
            font-size: .14rem;
            color: #676b73;
          }

          &::before,
          &::after {
            content: "";
            width: .32rem;
            height: .72rem;
            position: absolute;
            top: 50%;
            margin-top: -0.36rem;
            background-size: cover;
            background-position: center center;

          }

          &::before {
            left: 0;
            background-image: url(data:image/png;base64,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);
          }

          &::after {
            right: 0;
            background-image: url(data:image/png;base64,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);
            transform: scaleX(-1);
          }

          // 所有偶数的孩子，右外边距为0，也可以用even代替2n
          &:nth-child(2n) {
            margin-right: 0;
          }
        }
      }
    }
  }

  .about-honor-btns {
    position: absolute;
    bottom: .02rem;
    right: 1.1rem;
    display: flex;
    z-index: 2;

    .about-honor-btns__prev,
    .about-honor-btns__next {
      width: .38rem;
      height: .45rem;
      margin-right: .1rem;
      font-size: 0;
      line-height: .45rem;
      text-align: center;
      border: 1px solid #868686;
      cursor: pointer;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAASCAYAAABit09LAAAAAXNSR0IArs4c6QAAAKVJREFUKFOF0jEOAiEQBdA/aOAWJmtiwyno9ALcVqOx0oKac1hpaWYDm4UdgIbmDZn5DGFwvPc7JtRz1tqDUuoK4NeECd0BHAE8RbhGRPTWWp83UEIhhE8BW6gYpocWOEIz5JxijBHAKTfOPdWxFRDAyxhzESFXVpmJeJk64QeASXpZimfGdb+twDe494UFHi1F7lleipxhGvAG4NvdRy5wzu35/gN9Q1JfwOUE0gAAAABJRU5ErkJggg==) center/0.1rem .18rem no-repeat;

      &:hover {
        background-color: #3778e5;
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAASCAYAAABit09LAAAAAXNSR0IArs4c6QAAAJNJREFUKFOF0jEOwjAMheHfKudAohJnoYemAjGVE3COTnQzCnUrxXHSLFk+K/aLhYOjql0i0nKqegbuwFKFhh5AD7xC6NAbuBUwRCJzBmsoG6aFdniE/tBy+gBXYG1cZPaxeTgBQwhTpXs6xPvUhp/ABShwFM+Gs35rgRe49YU5rm2P6zleiq3Y8Ah8m/to0Z3S/QPLCV9Gvg2wEQAAAABJRU5ErkJggg==);
        border-color: rgba(0, 0, 0, 0);
      }

      &.disabled {
        opacity: .4;
        pointer-events: none;
      }
    }

    .about-honor-btns__next {
      transform: scaleX(-1);
    }

  }

  .about-honor-container__tool {
    position: absolute;
    right: 0;
    // top: 0.4rem;  // 标记
    width: 1rem;
    height: 100%;
    border-left: 1px solid #2c2c2c;

    .about-honor-swiper {
      // width: 1rem;
      height: auto;
      max-height: 100%;
      position: relative;
      margin-left: -2px;
      // pointer-events: none;
    }

    .swiper-wrapper {
      transition-timing-function: ease-out;
      margin: 0 auto;
      flex-direction: column;

      .swiper-slide {
        height: .6rem !important;
        cursor: pointer;

        .about-honor-year {
          font-size: .18rem;
          font-weight: bold;
          text-align: center;
          color: #9e9e9e;
          position: relative;
          font-family: HarmonyOS, Arial, Helvetica, sans-serif;
          height: 100%;
          transform: scale(1);
          transition: transform 300ms ease-out;

          &:hover {
            color: #3778e5;
          }
        }

        .about-honor-year--active {
          color: #3778e5;
          transform: scale(1.1);
        }
      }
    }

    .line {
      position: absolute;
      top: 0;
      left: 0;
      width: .04rem;
      height: .24rem;
      background: #3778e5;
      transform: translateY(0);
      transition: transform 500ms ease-out, -webkit-transform 500ms ease-out;
    }
  }
}

.honor-leave-active,
.honor-enter-active {
  transform: translateY(0);
  transition: opacity 500ms, transform 500ms
}

.honor-enter-top-from,
.honor-leave-top-to {
  opacity: 0;
  transform: translateY(-0.6rem);
}

.honor-enter-bottom-from,
.honor-leave-bottom-to {
  opacity: 0;
  transform: translateY(0.6rem);
}
</style>
