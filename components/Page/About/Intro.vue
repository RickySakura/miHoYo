<template>
  <div class="about-intro">
    <div class="about-intro__vision">
      <div class="about-intro__vision-title">
        我们的愿景
        <b> Our Vision</b>
      </div>
      <div class="about-intro__vision-slg">
        <div class="anim" v-html="res.visionRes.desc"></div>
      </div>
    </div>
    <div class="about-intro__mihoyo">
      <div class="about-intro__mihoyo-title">
        关于米哈游
        <b> About miHoYo</b>
      </div>
      <div class="about-intro__mihoyo-desc" v-html="res.introRes.desc"></div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['res']);
</script>

<style lang="less" scoped>
.about-intro {
  width: 98%;
  height: 100%;
  padding-right: 0.4rem;
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
}

.about-intro__vision {
  max-height: 2.84rem;
}

.about-intro__vision-slg {
  position: relative;
  display: inline-block;
  width: calc(100% - 0.76rem);
  padding-left: 0.2rem;
  margin-bottom: 1.4rem;
  margin-left: 0.64rem;
  font-size: 0.54rem;
  line-height: 0.8rem;
  letter-spacing: 0.1em;
  font-weight: lighter;
  color: #4ea1d9;

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 0.08rem;
    height: 0.25rem;
    background-size: cover;
    background-position: center center;
  }

  &::before {
    left: 0;
    top: 0;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAZCAYAAAAMhW+1AAAAAXNSR0IArs4c6QAAACZJREFUOE9j9Ft48z8DHsBIXQWb4tUZ0W1DsWJUASR4RsNhcIcDADoPYG82O/IpAAAAAElFTkSuQmCC);
  }

  &::after {
    right: 0;
    bottom: 0;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAZCAYAAAAMhW+1AAAAAXNSR0IArs4c6QAAAChJREFUOE9jZMACrsx98h8mzDiqABwCo+EASQhDIxyQUzC2BMxIsQIAEOdTTmAeOPYAAAAASUVORK5CYII=);
  }

  .anim {
    background-image: linear-gradient(-135deg,
        #418ae0,
        #56a0d8,
        #dc8bc3,
        #56a0d8,
        #418ae0,
        #56a0d8,
        #dc8bc3,
        #56a0d8,
        #418ae0);
    background-size: 200% 100%;
    animation: masked-animation 3s infinite linear;
  }
}

.about-intro__mihoyo-desc {
  text-align: left;
  margin-bottom: 0.7rem;
  font-size: 0.17rem;
  color: #3d424d;
  line-height: 0.34rem;
  height: 2rem;
}
</style>
