<template>
  <div class="view">
    <NuxtLayout name="mi-layout">
      <template #header>
        <MiHeader :links="links" @click="linkMatchRoute" ref="miheader" />
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
        <PageJoin />
      </template>
      <template #news>
        <PageNews />
      </template>
    </NuxtLayout>
    <!-- <NavBar /> -->
    <MiMaskVideo></MiMaskVideo>
  </div>
</template>


<script setup>
definePageMeta({
  layout: false,
});
let links = ref([])
let paths = ref([])
let miheader = ref(null)
onMounted(async () => {
  // router.push('/?page=about')
  // const { data } = await useFetch('/assets/headerlinks.json')
  const { data } = await useFetch('https://vkceyugu.cdn.bspapp.com/VKCEYUGU-b02b7f48-0227-438f-8c3a-3a5f94afa017/6b7d01eb-6611-4cf6-b052-b2312630cd3d.json')
  data.value.forEach(item => {
    links.value.push(item.title)
    paths.value.push(item.path)
  });
  routeMatchLink()
})
// 点击链接后切换路由
function linkMatchRoute(index) {
  // 如果是个网络链接就开一个新窗口
  if (paths.value[index].indexOf('http') != -1) {
    window.open(paths.value[index], '_blank');
  } else {
    useRouter().push('/?page=' + paths.value[index])
  }
}
// 根据路由改变链接状态
function routeMatchLink() {
  if (useRoute().query.page == undefined) {
    miheader.value.linkSelect(0)
  } else {
    for (let i = 0; i < paths.value.length; i++) {
      if (useRoute().query.page == paths.value[i]) {
        miheader.value.linkSelect(i)
        break
      }
    }
  }
}
watch(() => useRoute().query, () => {
  routeMatchLink()
})
</script>

<style lang="less" scoped>
.view {
  position: relative;
  width: 100%;
  background: #f8f9fb url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAAXNSR0IArs4c6QAAAFVJREFUSEtjfPn+238GJMDBxozMJZn949dfuB5GkOHiglyMJJtChIYhbPjHrz//83Oz0yZYRg3HlngYR4NlNFiIKFUgSkZTC9agGg0W7MEyWs1hCxcAF5pe5Ya82ZoAAAAASUVORK5CYII=) repeat center center/0.23rem .23rem;
  // min-width: 100%;
  // min-height: 100%;
}
</style>