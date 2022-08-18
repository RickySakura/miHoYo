
<script setup>
import Swiper from 'swiper';
definePageMeta({
  keepalive: true
})
console.warn = () => { }

let isReady = ref(false)
let mySwiper = ref(null)
let index = ref(0)

// 方法
function init() {
  mySwiper = new Swiper('.swiper-container', {
    // Optional parameters
    direction: 'vertical',
    // loop: true,++
    mousewheel: true,
    on: {
      // 监听init事件，当swiper加载完成后再撤销遮罩，注意：要使用箭头函数，这样才能拿到上下文中的 this
      init: () => {
      },
      transitionEnd: () => {
        // 滑动后事件
      },
      slideChangeTransitionStart: () => {
        // 滑动前修改路由
        index = mySwiper.activeIndex
        let page = mySwiper.slides[mySwiper.activeIndex].children[0].className.replace('home-', '')
        if (page === 'index') {
          useRouter().push('')
        } else {
          useRouter().push('/?page=' + page)
        }
      }
    }
  });
}
function routeMatch() {
  // 匹配当前url中的query，将slide跳转到对应的块中
  let { query } = useRoute()
  // 如果是首页
  if (query.page == undefined) {
    //如果地址为首页，则直接显形
    isReady = true
    mySwiper.slideTo(0, 0);
  } else {
    for (let i in mySwiper.slides) {
      let { className } = mySwiper.slides[i].children[0]
      // console.log(className);
      if (className.indexOf(query.page) !== -1) {
        mySwiper.slideTo(i, 0);
        //如果地址为其他页面，则先跳转后显形
        isReady = true
        break;
      }
    };
  }
}
onMounted(() => {
  init()
  routeMatch()
  console.log('mount');
})
</script>
