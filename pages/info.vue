<template>
  <div class="wrap">
    <div class="swiper-container home-product-swiper">
      <!-- 第二层一个包裹块 -->
      <div class="swiper-wrapper">
        <div class="swiper-slide" style="opacity: 1">slider1</div>
        <div class="swiper-slide" style="opacity: 1;">slider2</div>
        <div class="swiper-slide" style="opacity: 1;">slider3</div>
      </div>
    </div>

  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  mounted() {
    let s = new Swiper('.home-product-swiper', {
      // Optional parameters
      // loop: true,++
      threshold: 50,
    });
  },
  data() {
    return {
    };
  },
}
</script>

<style lang="less" scoped>
.wrap {
  height: 11rem;
  width: 100%;
}

.swiper-slide {
  display: inline-block;
  height: 100px;
  width: 400px;
  background-color: aquamarine;
}

.swiper-container {
  overflow: hidden;
  box-sizing: content-box;
  width: 100%;
  height: 100%;
}

.swiper-wrapper {
  // display: flex;
  width: 1000%;
  height: 100%;
  box-sizing: content-box;
  position: relative;
  overflow: hidden;
  // transition-property: transfrom;
}
</style>