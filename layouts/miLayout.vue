<template>
  <div class="container">
    <slot name="header"></slot>
    <div class="home">
      <!-- <div style="width: 100%;height: 100%;background-color: white;z-index: 999;" v-if="isReady"></div> -->
      <div class="swiper-container home-swiper">
        <!-- 第二层一个包裹块 -->
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <slot></slot>
          </div>
          <div class="swiper-slide">
            <slot name="product"></slot>
          </div>
          <div class="swiper-slide">
            <slot name="about"></slot>
          </div>
          <div class="swiper-slide">
            <slot name="join"></slot>
          </div>
          <div class="swiper-slide">
            <slot name="news"></slot>
          </div>
        </div>
      </div>
      <!-- <div class="swiper-pagination"></div> -->
      <div class="aside-slogan" v-if="isRender">
        <img src="https://www.mihoyo.com/_nuxt/img/line.a3e37b6.png" alt="miHoYo_F" class="aside-slogan__line"
          v-if="asideImg" />
        <img
          src="data:image/png;base64,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"
          alt="miHoYo_F" class="aside-slogan__text" />
      </div>
      <div class="aside-scroll scroll-btn scroll-btn--dark" v-if="isRender">
        <div class="scroll-btn__mouse"></div>
        <div class="scroll-btn__arrow">
          <img
            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSImI3g3QkFEOyYjeDU5MzQ7XyYjeDYyRjc7JiN4OEQxRDtfMV8iDQoJIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgOCAxMSINCgkgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgOCAxMTsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGcgaWQ9IiYjeDdCQUQ7JiN4NTkzNDtfJiN4NjJGNzsmI3g4RDFEOyI+DQoJPGc+DQoJCTxwb2x5Z29uIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtmaWxsOiMzRDQyNEQ7IiBwb2ludHM9IjUsNy45OTggNSwwIDMuMDAxLDAgMy4wMDEsOCAwLDQuOTk5IDAsNi45OTkgDQoJCQkzLjAwMSwxMCA0LjAzMywxMSA1LDkuOTk4IDgsNi45OTkgOCw0Ljk5OSAJCSIvPg0KCTwvZz4NCjwvZz4NCjwvc3ZnPg0K "
            alt="miHoYo_F" />
        </div>
        <div class="scroll-btn__line"></div>
      </div>
    </div>
  </div>
  <slot name="video"></slot>
</template>

<script setup>
// 这个布局通过第一个 div 的类名来修改路由
import Swiper from "swiper";
// definePageMeta({
//   keepalive: true,
// });
console.warn = () => { };
let mySwiper = null;
// 方法
function init() {
  mySwiper = new Swiper(".home-swiper", {
    // Optional parameters
    speed: 500,
    direction: "vertical",
    mousewheel: true,
    preloadImages: true,
    updateOnImagesReady: true,
    threshold: 50,
    on: {
      init: () => { },
      transitionEnd: () => {
        // 滑动后事件
      },
      slideChangeTransitionStart: () => {
        // 滑动前修改路由和 url
        let page = mySwiper.slides[mySwiper.activeIndex].children[0].classList[0].replace(
          "home-",
          ""
        ); // 当前活跃页

        useState("homePage").value = page; //修改当前活跃页面的状态
        useState("pageIndex").value = mySwiper.activeIndex; //修改当前活跃页面的状态
        page = page == "index" ? "" : "/?page=" + page;
        useRouter().push(page);
      },
    },
  });
  return mySwiper;
}
/**
 *
 * @param {number} speed swiper-slide滚动的速度，默认为0
 */
function routeMatch(speed = 0) {
  // 匹配当前url中的query，将slide跳转到对应的块中
  let { query } = useRoute();
  // 如果是首页
  if (query.page == undefined || query.page == "/" || query.page == "") {
    mySwiper.slideTo(0, speed);
  } else {
    for (let i in mySwiper.slides) {
      let { className } = mySwiper.slides[i].children[0];
      // console.log(className);
      if (className.indexOf(query.page) !== -1) {
        mySwiper.slideTo(i, speed);
        break;
      } else {
        // 如果不是任何一个已有的页面，则默认重定向到首页
        mySwiper.slideTo(0, speed);
      }
    }
  }
}
// 创建监听器，监听路由的变化，重新将slide导航到对应的位置
let asideImg = ref(true);
onMounted(() => {
  const swiper = init();
  routeMatch();
  console.log("mount");
  // vue3 setup中监听器使用watch函数，监听路由中 query的变化
  watch(
    () => useRoute().query,
    ({ page }) => {
      routeMatch(500);
      // 让左侧边栏图片在 index product 页面不显示
      if (page == undefined || page == "product") {
        asideImg.value = false;
      } else {
        asideImg.value = true;
      }
    }
  );
});

// 监听 news 页面子 swiper 的进程，如果到黑块了则停止该swiper响应鼠标滚动
watch(() => useState('newsSwiperProgress').value, (v) => {
  if (v.toFixed(0) == -1) {
    document.querySelector(".aside-slogan").classList.add("aside-fade")
    document.querySelector(".aside-scroll").classList.add("aside-fade")
    mySwiper.mousewheel.disable();
  } else {
    document.querySelector(".aside-slogan").classList.remove("aside-fade")
    document.querySelector(".aside-scroll").classList.remove("aside-fade")
    setTimeout(() => {
      mySwiper.mousewheel.enable();
    })
  }
})

// 使用全局淡出方法，当页面进入到主页时，移除侧边标语和鼠标滚动条 aside-slogan/ aside-scroll
let isRender = ref(false);
let useFaded = useState("useFaded").value;
useFaded("aside-slogan", isRender);
useFaded("aside-scroll", isRender);
</script>
<style lang="less" scoped>
img {
  display: block;
}

.container {
  /* height: 100%; */
  overflow-y: auto;
  min-width: 1280px;
  min-height: 720px;
  width: 100%;
  height: 10.8rem;
}

.home {
  width: 100%;
  height: 100%;
  position: sticky;
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAAXNSR0IArs4c6QAAAFVJREFUSEtjfPn+238GJMDBxozMJZn949dfuB5GkOHiglyMJJtChIYhbPjHrz//83Oz0yZYRg3HlngYR4NlNFiIKFUgSkZTC9agGg0W7MEyWs1hCxcAF5pe5Ya82ZoAAAAASUVORK5CYII=") repeat center center/.23rem 0.23rem;

  .aside-slogan {
    position: fixed;
    z-index: 6;
  }

  .aside-scroll {
    position: absolute;
    right: 0.3rem;
    bottom: 0.38rem;
    z-index: 6;
  }
}

.home-swiper>.swiper-wrapper {
  flex-direction: column;
}

.home-swiper,
.swiper-slide,
.swiper-wrapper {
  height: 100%;
}

.swiper-container {
  /* margin-left: auto; */
  /* margin-right: auto; */
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  z-index: 1;
  padding: 0;
}

.swiper-slide {
  flex-shrink: 0;
  width: 100%;
  position: relative;
  transition-property: transform, -webkit-transform;
  /* transition: all; */
}

.swiper-wrapper {
  position: relative;
  width: 100%;
  z-index: 1;
  display: flex;
  transition-property: transform, -webkit-transform;
  box-sizing: content-box;
}

.swiper-slide-active {
  z-index: 99;
  height: 746px;
}

.aside-slogan {
  position: absolute;
  left: 0.8rem;
  bottom: 0.38rem;
  transition: all 300ms;
}

.aside-fade {
  opacity: 0;
}

.aside-slogan__line {
  position: absolute;
  top: -5rem;
  left: -0.79rem;
  width: 2.72rem;
  height: 5.28rem;
  background: url(https://www.mihoyo.com/_nuxt/img/line.a3e37b6.png) no-repeat center center/100% 100%;
}

.aside-slogan__text {
  position: relative;
  z-index: 1;
  width: 0.1rem;
}

.scroll-btn {
  z-index: 9999;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1rem;
  cursor: pointer;
}

.scroll-btn__mouse {
  width: 0.24rem;
  height: 0.42rem;
  background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSImI3g1NzA2OyYjeDg5RDI7XzFfIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIg0KCSB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDE3IDI3IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxNyAyNzsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGcgaWQ9IiYjeDU3MDY7JiN4ODlEMjsiPg0KCTxnPg0KCQk8cGF0aCBzdHlsZT0iZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7ZmlsbDojRkZGRkZGOyIgZD0iTTguNSwwQzMuODA2LDAsMCwzLjgyOCwwLDguNTQ5djkuODk5DQoJCQljMCw0LjcyMiwzLjgwNiw4LjU0OSw4LjUsOC41NDljNC42OTUsMCw4LjUtMy44MjgsOC41LTguNTQ5VjguNTQ5QzE3LDMuODI4LDEzLjE5NSwwLDguNSwweiBNMTUsMTguNjA3DQoJCQljMCwzLjYxMS0yLjkxLDYuNTM4LTYuNSw2LjUzOGMtMy41OSwwLTYuNS0yLjkyNy02LjUtNi41MzhWOC41NDljMC0zLjYxMSwyLjkxLTYuNTM4LDYuNS02LjUzOGMzLjU5LDAsNi41LDIuOTI3LDYuNSw2LjUzOA0KCQkJVjE4LjYwN3ogTTguNSw1LjAyOUM3LjY3Miw1LjAyOSw3LDUuNzA1LDcsNi41Mzh2NS4wMjljMCwwLjgzMywwLjY3MiwxLjUwOSwxLjUsMS41MDlTMTAsMTIuNCwxMCwxMS41NjdWNi41MzgNCgkJCUMxMCw1LjcwNSw5LjMyOCw1LjAyOSw4LjUsNS4wMjl6Ii8+DQoJPC9nPg0KPC9nPg0KPC9zdmc+DQo=") no-repeat top center/0.18rem auto;
}

.scroll-btn--dark {
  color: #777;

  .scroll-btn__mouse {
    background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSImI3g1NzA2OyYjeDg5RDI7XzFfIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIg0KCSB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDE3IDI3IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxNyAyNzsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGcgaWQ9IiYjeDU3MDY7JiN4ODlEMjsiPg0KCTxnPg0KCQk8cGF0aCBzdHlsZT0iZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7ZmlsbDojM0Q0MjREOyIgZD0iTTguNSw1LjAyOUM3LjY3Miw1LjAyOSw3LDUuNzA1LDcsNi41Mzh2NS4wMjkNCgkJCWMwLDAuODMzLDAuNjcyLDEuNTA5LDEuNSwxLjUwOVMxMCwxMi40LDEwLDExLjU2N1Y2LjUzOEMxMCw1LjcwNSw5LjMyOCw1LjAyOSw4LjUsNS4wMjl6IE04LjUsMEMzLjgwNiwwLDAsMy44MjgsMCw4LjU0OXY5Ljg5OQ0KCQkJYzAsNC43MjIsMy44MDYsOC41NDksOC41LDguNTQ5YzQuNjk1LDAsOC41LTMuODI4LDguNS04LjU0OVY4LjU0OUMxNywzLjgyOCwxMy4xOTUsMCw4LjUsMHogTTE1LDE4LjYwNw0KCQkJYzAsMy42MTEtMi45MSw2LjUzOC02LjUsNi41MzhjLTMuNTksMC02LjUtMi45MjctNi41LTYuNTM4VjguNTQ5YzAtMy42MTEsMi45MS02LjUzOCw2LjUtNi41MzhjMy41OSwwLDYuNSwyLjkyNyw2LjUsNi41MzgNCgkJCVYxOC42MDd6Ii8+DQoJPC9nPg0KPC9nPg0KPC9zdmc+DQo=");
  }
}

.scroll-btn__arrow {
  position: relative;
  width: 0.08rem;
  height: 0.3rem;
  margin-top: 0.1rem;
  overflow: hidden;

  img {
    width: 0.08rem;
    transform: translateY(-50%);
    animation: scrollmove 1.4s ease-in-out 0.4s infinite;
  }
}

.scroll-btn__line {
  width: 0;
  height: 0.8rem;
  margin-top: 0.1rem;
  border-right: 2px solid #333;
}

.black {
  width: 100%;
  height: 10rem;
  background-color: black;
}
</style>
