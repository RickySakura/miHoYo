<template>
  <!-- 视频pv遮罩 -->
  <div class="home-pv custom-mihoyo-common-mask pv" :style="mask_style" @click="closeVideo" v-if="isShowVideo">
    <div class="custom-mihoyo-common-container" style="animation-duration: 250ms; transition-duration: 250ms">
      <!-- 关闭按钮 -->
      <div class="home-pv-close" @click="closeVideo"></div>
      <video :src="isShowVideo" controls="controls" autoplay="autoplay" preload class="home-pv-video"
        :style="video_style"></video>
    </div>
  </div>
</template>

<script setup>
let videoSrc = ref("");
let isShowVideo = useState("isShowVideo"); // 控制是否渲染视频，传入视频地址字符串则渲染
let mask_style = ref(`background-color: rgba(0, 0, 0,0.9); `);
let video_style = ref(" opacity: 1;");
function closeVideo() {
  setTimeout(() => {
    isShowVideo.value = false;
    // 记得重置回原样式
    mask_style.value = "background-color: rgba(0, 0, 0,0.9); ";
    video_style.value = " opacity: 1;";
  }, 180);
  mask_style.value = "background-color: rgba(0, 0, 0,0);";
  video_style.value = " opacity: 0;";
}
</script>

<style lang="less" scoped>
.pv {
  left: 0;
  top: 0;
  width: 100%;
  height: 101.8%;
  display: flex;
  align-items: center;
  justify-content: center;

  &>* {
    pointer-events: auto;
  }
}

@keyframes masked {
  0% {
    background-color: rgba(0, 0, 0, 0.6);
  }

  100% {
    background-color: rgba(0, 0, 0, 0.9);
  }
}

@keyframes videoshow {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.custom-mihoyo-common-mask {
  // background-color: rgba(0, 0, 0, 0.9);
  position: fixed;
  z-index: 9999;
  animation-duration: 250ms;
  transition-duration: 250ms;
  animation: masked 180ms linear backwards;
  transition: all 250ms;
}

.custom-mihoyo-common-container {
  position: relative;
}

.home-pv-close {
  position: absolute;
  right: -0.64rem;
  top: -0.14rem;
  z-index: 9;
  width: 0.6rem;
  height: 0.6rem;
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAARRJREFUSEvN18sNwjAMgOE/VxZgBmAIBEuwASdWYAcuHNiAKXgsATMwhVFQQaI0tWMaSo+Vmi+uk9gJIjIBtsAihHCj4CMiQ2APrIKInIApcAVmpfAKPQBj4BzhOIsjMCqFNxrxz5bEU2OHZ0pL4G1jvuCuI9cCeYO7wjU0Oh/wt7gFTcJe3Iq2wg34BZin9nkOqsJWPBc1wRruQc1wCq/OANep17iqU3WiFl3MefzeddRmwQ2Rx1eu4vIt7EKzcuzd26m0mSNuW70iMgA2wNpaz02wtmVEZAcsc/KtwhrqTUErbEG99TwJ56Ae/H/KoifS+paxjNF/62OZZW6vrzZ7JVBtwfXX0P/4CvOs3Y8rTC+XtjtsokIg6khevAAAAABJRU5ErkJggg==") no-repeat center center/0.3rem 0.3rem;
  cursor: pointer;
  -webkit-transform: rotate(0);
  -ms-transform: rotate(0);
  transform: rotate(0);
  -webkit-transition: -webkit-transform 500ms;
  transition: -webkit-transform 500ms;
  -o-transition: transform 500ms;
  transition: transform 500ms;
  transition: transform 500ms, -webkit-transform 500ms;

  &:hover {
    transform: rotate(90deg);
  }
}

.home-pv-video {
  width: 12.8rem;
  animation: videoshow 250ms linear;
  transition: all 250ms;
}
</style>
