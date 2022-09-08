<template>
  <div class="view hide">
    <NuxtLayout name="mi-layout">
      <template #header>
        <LazyMiHeader :links="links" @click="linkMatchRoute" ref="miheader" />
        <MiLangSelect />
      </template>
      <template #default>
        <Page />
      </template>
      <template #product>
        <LazyPageProduct />
      </template>
      <template #about>
        <PageAbout />
      </template>
      <template #join>
        <!-- <div class="home-join"></div> -->
        <PageJoin :values-res="valuesRes" :jobs-list="jobslist" />
      </template>
      <template #news>
        <PageNews :news-res="newsRes" />
      </template>
    </NuxtLayout>
    <MiMaskVideo></MiMaskVideo>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false,
});

// 所有子组件所需要的数据请求
let links = ref([]);
let paths = ref([]);
let miheader = ref(null);
let valuesRes = ref(null);  // join页面数据
let jobslist = ref({})
let newsRes = ref(null)// news页面数据
onMounted(async () => {
  const { data: res , pending } = await useFetch("/data/mihoyo.json")
  useState("localText").value = res.value.localText
  let { data:jobs } = await useFetch("https://api.mokahr.com/api-platform/v1/jobs-groupedby-zhineng/mihoyo?mode=social&siteId=42280")
  const { data } = await useFetch("/data/headerlinks.json"); // 生产环境


  data.value.forEach((item) => {
    links.value.push(item.title);
    paths.value.push(item.path);
  });
  
  valuesRes.value = res.value.valuesRes
  jobslist.value = jobs.value

  newsRes.value = res.value.newsRes.list
  routeMatchLink();
  setTimeout(() => {
    document.querySelector(".view").classList.remove("hide")
  }, 8)
});

// 点击头部导航栏链接后切换路由
function linkMatchRoute(index) {
  // 如果是个网络链接就开一个新窗口
  if (paths.value[index].indexOf("http") != -1) {
    window.open(paths.value[index], "_blank");
  } else {
    useRouter().push("/?page=" + paths.value[index]);
  }
}
// 根据路由改变顶部导航栏链接状态
function routeMatchLink() {
  // 当顶部栏组件创建后
  if (miheader.value != null) {
    if (useRoute().query.page == undefined) {
      miheader.value.linkSelect(0);
    } else {
      for (let i = 0; i < paths.value.length; i++) {
        if (useRoute().query.page == paths.value[i]) {
          miheader.value.linkSelect(i);
          break;
        }
      }
    }
  }
}
watch(
  () => useRoute().query,
  () => {
    routeMatchLink();
  }
);

// 全局的淡入淡出方法，在页面上消除渲染的方法，一般用于到主页的过渡
let useFaded = useState("useFaded");
useFaded.value = function (className, isRender) {
  isRender.value = false;
  let current_page = useRoute().query.page;
  function isNotIndexPage(p) {
    if (p != undefined) {
      return true;
    } else {
      return false;
    }
  }
  isRender.value = isNotIndexPage(current_page);
  // 监听路由，如果为当前页为主页则不渲染头部导航栏
  watch(
    () => useRoute().query.page,
    (nextPage) => {
      if (!isNotIndexPage(nextPage)) {
        let e = document.getElementsByClassName(className)[0];
        e.classList.add("fade-leave-active");
        e.classList.add("fade-leave-to");
        setTimeout(() => {
          isRender.value = isNotIndexPage(nextPage);
        }, 400);
      } else {
        new Promise((resolve, reject) => {
          isRender.value = isNotIndexPage(nextPage); // 因为 ref 对象的修改是一个异步操作，所以为了正确的获取 DOM 元素，需要用Promise包装一下
          resolve("");
        }).then((res) => {
          let e = document.getElementsByClassName(className)[0];
          e.classList.add("fade-enter-active");
          e.classList.add("fade-enter-to");
          setTimeout(() => {
            e.classList.remove("fade-enter-to");
          }, 40);
          setTimeout(() => {
            e.classList.remove("fade-enter-active");
          }, 200);
        });
      }
    }
  );
};
</script>

<style lang="less" scoped>
.view {
  position: relative;
  width: 100%;
  background: #f8f9fb url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAAXNSR0IArs4c6QAAAFVJREFUSEtjfPn+238GJMDBxozMJZn949dfuB5GkOHiglyMJJtChIYhbPjHrz//83Oz0yZYRg3HlngYR4NlNFiIKFUgSkZTC9agGg0W7MEyWs1hCxcAF5pe5Ya82ZoAAAAASUVORK5CYII=) repeat center center/0.23rem 0.23rem;
  // min-width: 100%;
  // min-height: 100%;
}

.hide {
  visibility: hidden;
}
</style>
