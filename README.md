## 路由与url动态变化
本项目中，url的变化逻辑写在layouts/miLayout.vue组件里，其原理是通过获取第一个div的DOM元素，取得其类名（形同home-xxx）xxx代表当前页面的名字，也是路由的名字，然后调用useRoute()修改路由。

## 。。