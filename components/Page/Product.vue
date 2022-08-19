<template>
  <div :class="'home-' + page">
    <MiBanner ref="mibanner" @bannerchange="bannerchange" @bannertransition="bannertransition" :datasets="datasets" />
  </div>
  <NavBar ref="minavbar" @navchange="navchange" />
</template>

<script>
import axios from "axios";
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
    // const { data } = await axios.get('/assets/bannerinfo.json')
    const { data } = await axios.get("/data/bannerinfo.json");
    // const { data } = await axios.get('https://vkceyugu.cdn.bspapp.com/VKCEYUGU-b02b7f48-0227-438f-8c3a-3a5f94afa017/e8181bf0-3635-47c4-bd94-110464e2cb5a.json')
    this.datasets = data;
  },
  unmounted() {
    console.log("unm");
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
