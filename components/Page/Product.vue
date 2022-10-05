<template>
  <div :class="'home-' + page">
    <MiBanner ref="mibanner" @bannerchange="bannerchange" @bannertransition="bannertransition" :datasets="datasets" />
  </div>
  <NavBar ref="minavbar" @navchange="navchange" />
</template>

<script>
import axios from "axios";
import { getBannerInfo } from '/assets/js/api.js'
export default {
  data() {
    return {
      page: "product",
      datasets: null,
    };
  },
  methods: {
    navchange(i) {
      this.$refs.mibanner.slideTo(i);
    },
    bannerchange(i) {
      this.$refs.minavbar.change(i);
    },
    bannertransition(time) {
      this.$refs.minavbar.pause(time);
    },
  },
  async mounted() {
    // const { data } = await axios.get("/data/bannerinfo.json");
    // this.datasets = data;
    this.datasets = getBannerInfo()
  },
};
</script>

<style lang="less" scoped>
.home-product {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
