export const useFaded = function (className, isRender) {
  isRender.value = false
  let current_page = useRoute().query.page;
  function isNotIndexPge(p) {
    if (p != undefined && p != "index" && p != null && p != "" && p != "/") {
      return true;
    } else {
      return false;
    }
  }
  isRender.value = isNotIndexPge(current_page);
  // 监听路由，如果为当前页为主页则不渲染头部导航栏
  watch(
    () => useRoute().query.page,
    (nextPage) => {
      if (!isNotIndexPge(nextPage)) {
        let e = document.getElementsByClassName(className)[0]
        e.classList.add("fade-leave-active");
        e.classList.add("fade-leave-to");
        setTimeout(() => {
          isRender.value = isNotIndexPge(nextPage);
        }, 400);
      } else {
        new Promise((resolve, reject) => {
          isRender.value = isNotIndexPge(nextPage); // 因为 ref 对象的修改是一个异步操作，所以为了正确的获取 DOM 元素，需要用Promise包装一下
          resolve('');
        }).then((res) => {
          let e = document.getElementsByClassName(className)[0]
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
}