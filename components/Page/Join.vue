<template>
  <div :class="'home-' + page" class="fp-page" @mousemove="slideWithMouse">
    <img src="/img/decoration.560b085.png" class="aside-decoration" />
    <div class="wrapper">
      <div class="banner">
        <div class="banner__role">
          <img src="/img/char1.e4264de.png" class="banner__role-1" alt>
          <img src="/img/char2.04c821e.png" class="banner__role-2" alt>
        </div>
        <div class="banner__mask">
          <img src="/img/banner-mask1.png" alt>
          <img src="/img/banner-mask2.png" alt>
          <img src="/img/banner-mask3.png" alt>
          <img src="/img/banner-mask4.png" alt>
        </div>
      </div>
    </div>
    <div class="fp-page__wrap" v-if="ready">
      <div class="home-join-tabs">
        <div class="home-join-tab home-join-tab--active" @click="tabChange(0, $event)">
          {{ localText.jobTab }}
        </div>
        <div class="home-join-tab" @click="tabChange(1, $event)">
          {{ localText.valuesTab }}
        </div>
        <span class="line" :style="lineTrans"></span>
      </div>
      <div class="join-jobs home-join-container">
        <div class="join-jobs-tabs">
          <div class="join-jobs-tabs-wrap">
            <div class="join-jobs-tab join-jobs-tab--active">
              <div class="span-wrapper" v-for="(it, i) in [1, 2, 3]">
                <span>{{ localText.socialBtn }}</span>
              </div>
            </div>
          </div>
          <div class="join-jobs-tabs-wrap" @mouseenter="tabHover" @mouseleave="tabReset"
            @click="goTo('https://join.mihoyo.com/#/campus')">
            <div class="join-jobs-tab">
              <div class="span-wrapper" v-for="(it, i) in 3">
                <span>{{ localText.campusBtn }}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- <div v-if="listReady"></div> -->
        <div class="join-jobs-list">
          <div class="join-jobs-list-item" v-for="(item, index) in jobsList.jobs" :key="index">
            <div class="join-jobs-list-item__icon" @click="goTo('https://jobs.mihoyo.com/#/jobs?zhineng=' + item.id)">
              <img :src="localText['moka-' + item.id]" alt="miHoYo">
              <div class="join-jobs-list-item__icon--hover">
                <img :src="localText['moka-' + item.id + '-active']" alt="miHoYo_F">
              </div>
            </div>
            <span>{{ item.label }}</span>
            <span class="join-jobs-list-count">{{ item.jobCount }}</span>
          </div>
        </div>
        <div class="more-btn" @click="goTo('https://jobs.mihoyo.com/#/jobs')">全部职位</div>
      </div>
      <div class="join-weal home-join-container none">
        <div class="join-weal-card" v-for="(item, index) in valuesRes" :key="index"
          :class="{ hasContent: hasContent(item) }">
          <div class="join-weal-card__number" :style="`background-image: url(${item.bg})`"></div>
          <div class="weal-btn" v-if="hasContent(item)">
            <img
              src="data:image/png;base64,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"
              alt="">
          </div>
          <div class="join-weal-card__brief">
            <div class="join-weal-card__title">{{ item.title }}</div>
            <div class="join-weal-card__info">
              <div class="join-weal-card__info-subtitle" v-for="(subtitle, ind) in item.cards" :key="ind">
                {{ subtitle.subTitle }}
              </div>
            </div>
          </div>
          <div class="join-weal-card__desc" :class="['col' + item.cards.length]">
            <div v-for="(sub, is) in item.cards" :key="is">
              <div class="join-weal-card__desc-subtitle">{{ sub.subTitle }}</div>
              <div class="join-weal-card__desc-content">
                <p v-html="sub.content"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
const page = "join";
// const props = defineProps(["jobsList", "valuesRes"])
const props = defineProps({
  jobsList: {
    default: []
  },
  valuesRes: {
    default: []
  }
})
let ready = ref(false)
let localText = ref(null)

watch(() => useState("localText"), (v) => {
  localText.value = v.value
  ready.value = true
})

// let jobsList = ref(null)
// let listReady = ref(false)
// onMounted(async () => {
//   let { data,pending } = await useFetch("https://api.mokahr.com/api-platform/v1/jobs-groupedby-zhineng/mihoyo?mode=social&siteId=42280")
//   jobsList.value = data.value
//   listReady.value = pending.value
// })

let timeTask = null
function tabHover({ target }) {
  target.firstChild.style.transitionDuration = "300ms"
  target.firstChild.style.transform = "translateY(-0.3rem)"
}
function tabReset({ target }) {
  clearTimeout(timeTask);
  target.firstChild.style.transform = "translateY(0rem)"
  timeTask = setTimeout(() => {
    target.firstChild.style.transitionDuration = "0ms"
    target.firstChild.style.transform = "translateY(-0.6rem)"
  }, 300)
}
function goTo(url) { window.open(url, "_blank") }   // 无关

let lineTrans = ref("")
function tabChange(num, { target }) {
  document.querySelector(".home-join-tab--active").classList.remove("home-join-tab--active")
  target.classList.add("home-join-tab--active")
  if (num == 1) {
    lineTrans.value = "transform: translateY(1.04rem)"
    document.querySelector(".join-weal").classList.remove("none")
    document.querySelector(".join-jobs").classList.add("none")
    setTimeout(() => {
      document.querySelector(".join-weal").classList.add("join-weal--active")
    }, 1)
  } else {
    lineTrans.value = ""
    document.querySelector(".join-weal").classList.remove("join-weal--active")
    document.querySelector(".join-weal").classList.add("none")
    document.querySelector(".join-jobs").classList.remove("none")
  }
}
function hasContent(item) {
  for (let i in item.cards) {
    if (item.cards[i].content != "") {
      return true
    }
  }
}
function slideWithMouse(e) {
  // 角色图片随鼠标移动
  // role1   0.22rem  ~  -0.22remz
  // y = (-0.44 / window.innerWidth) * e.pageX + 0.22
  document.querySelector('.banner__role-1').style.transform = `translateX(${(-0.44 / window.innerWidth) * e.pageX + 0.22}rem) scale(1.08)`
  // role2 0.52rem ~ -0.52rem
  // y = (-1.04 / window.innerWidth) * e.pageX + 0.52
  document.querySelector('.banner__role-2').style.transform = `translateX(${(-1.04 / window.innerWidth) * e.pageX + 0.52}rem) scale(1.13)`
}
</script>

<style lang="less" scoped>
.home-join {
  height: 100%;
  overflow: hidden;
  background-image: linear-gradient(to bottom, rgba(248, 249, 251, 0) 10%, rgba(248, 249, 251, 0.5) 40%, #f8f9fb 100%);
}

.wrapper {
  position: relative;
  width: 11rem;
  height: 2.3rem;
  z-index: 9;
  margin: 0 auto;
  transform: translateY(-.5rem);

  .banner {
    position: absolute;
    left: -2.3rem;
    width: 10.83rem;
    height: 2.28rem;
    margin-top: .15rem;
    background: url(/img/bg.966cc20.png) no-repeat right center/cover;
  }

  .banner__mask {
    img {
      position: absolute;

      &:nth-child(1) {
        top: 0;
        left: -1.77rem;
        width: 2.35rem;
      }

      &:nth-child(2) {
        bottom: .26rem;
        left: -0.26rem;
        width: 3.31rem;
      }

      &:nth-child(3) {
        top: .6rem;
        right: -0.65rem;
        width: 3.38rem;
      }

      &:nth-child(4) {
        bottom: -0.14rem;
        right: 1.13rem;
        width: .99rem;
      }
    }

  }

  .banner__role {
    overflow: hidden;
    height: 100%;
    width: 100%;
    position: absolute;
    right: 0;

    img {
      transform-style: preserve-3d;
      transition: transform 600ms cubic-bezier(0, .3, .5, 1);
      backface-visibility: hidden;
    }
  }

  .banner__role-1 {
    position: absolute;
    top: 50%;
    margin-top: -1.12rem;
    right: 1.78rem;
    width: 9.2rem;
    height: 100%;
    -webkit-transform-origin: center;
    transform-origin: center;
    -webkit-transform: scale(1.08);
    transform: scale(1.08);
  }

  .banner__role-2 {
    position: absolute;
    top: 50%;
    margin-top: -1.12rem;
    right: 6.26rem;
    width: 5.18rem;
    height: 100%;
    transform-origin: center;
    -webkit-transform: scale(1.13);
    transform: scale(1.13);
  }
}

.fp-page__wrap {
  width: 11rem;
  display: flex;
  padding-right: .5rem;
  transform: translateY(-0.25rem);
}

.home-join-tabs {
  min-width: 1.6rem;
  position: relative;
  white-space: nowrap;
  margin-top: -0.14rem;
  padding-top: 1.5rem;
  padding-right: .2rem;
  border-right: 1px solid #242933;
  flex-shrink: 0;
  z-index: 9;

  .line {
    position: absolute;
    top: 1.48rem;
    right: -0.04rem;
    z-index: 2;
    width: .06rem;
    height: .32rem;
    background: #3778e5;
    -webkit-transform: translateY(0);
    transform: translateY(0);
    -webkit-transition: -webkit-transform 500ms ease-out;
    transition: -webkit-transform 500ms ease-out;
    transition: transform 500ms ease-out;
    transition: transform 500ms ease-out, -webkit-transform 500ms ease-out;
  }
}

.home-join-tab {
  font-size: .2rem;
  font-weight: bold;
  color: #3d424d;
  margin-bottom: .8rem;
  margin-right: -0.03rem;
  position: relative;
  cursor: pointer;
  text-align: right;
  transition: transform 300ms;
  transition: transform 300ms, -webkit-transform 300ms;
  transform-origin: right center;
}

.home-join-tab--active,
.home-join-tab:hover {
  color: #242933;
  transform: scale(1.5);
}

.join-jobs {
  width: calc(100% - 1.2rem);
  display: flex;
  -webkit-box-direction: normal;
  flex-direction: column;
  -webkit-box-pack: justify;
  justify-content: space-between;
  position: relative;
}

.home-join-container {
  height: 6rem;
  flex-shrink: 0;
}

.join-jobs-tabs {
  position: relative;
  right: -0.5rem;
  width: 100%;
  height: .25rem;
  margin-top: .4rem;
  padding-right: 0.0105rem;
  overflow: hidden;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: flex-end;
  -webkit-box-align: center;
  align-items: center;

}

.join-jobs-tabs-wrap {
  position: relative;
  height: .3rem;
  overflow: hidden;
  margin-right: -1px;

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }

  &:hover::before,
  &:hover::after {
    background-color: #3778e5;
  }

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    width: 1px;
    height: 0.18rem;
    background: #707173;
    transform: translateY(-50%);
  }
}

.join-jobs-tab {
  &.join-jobs-tab--active {
    transform: translateY(-0.3rem);
  }

  position: relative;
  height: .9rem;
  color: #676b73;
  cursor: pointer;
  transition: transform 300ms;
  transform: translateY(-0.6rem);

  .span-wrapper {
    height: .3rem;
    display: flex;
    align-items: center;
    overflow: hidden;

    &:nth-child(2) span {
      color: #fff;
      background: #3778e5;
    }
  }

  span {
    font-size: .18rem;
    padding: 0 .38rem;
    height: .25rem;
    line-height: .25rem;
    text-align: center;
    z-index: 9999;
    display: block;
  }



  .dark {
    color: #fff;
    background: #3778e5;
  }
}

.join-jobs-list {
  width: 100%;
  -ms-flex-item-align: center;
  align-self: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  -webkit-box-pack: start;
  justify-content: flex-start;
  -webkit-box-align: start;
  align-items: flex-start;
  width: 100%;
  align-self: center;
  display: flex;
  flex-wrap: wrap;
  -webkit-box-pack: start;
  justify-content: flex-start;
  -webkit-box-align: start;
  align-items: flex-start;
  transform: translate(0.0052rem, .22rem);

  .join-jobs-list-item {
    width: 33.3%;
    text-align: center;
    font-size: .18rem;
    color: #3d424d;
    margin-bottom: .45rem;
    cursor: pointer;
    -webkit-transition: color 500ms;
    transition: color 500ms;

    &:hover {
      color: #3778e5;

      .join-jobs-list-item__icon--hover {
        height: .48rem;
      }
    }
  }

  img {
    width: 100%;
    height: 100%;
  }

  .join-jobs-list-item__icon {
    position: relative;
    width: .48rem;
    height: .48rem;
    margin: 0 auto .25rem;

    img {
      -webkit-transition: opacity 500ms;
      transition: opacity 500ms;
    }
  }

  .join-jobs-list-item__icon--hover {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0;
    overflow: hidden;
    -webkit-transition: height 500ms ease-out;
    transition: height 500ms ease-out;

    img {
      position: absolute;
      bottom: 0;
      left: 0;
      width: .48rem;
      height: .48rem;
    }
  }

  .join-jobs-list-count {
    display: inline-block;
    min-width: .26rem;
    height: .22rem;
    margin-left: .173rem;
    padding: 0 .04rem;
    line-height: .24rem;
    font-size: .16rem;
    font-family: HarmonyOS, Arial, Helvetica, sans-serif;
    text-align: center;
    background-color: #a1d6e4;
    color: #fff;
  }


}

.more-btn {
  align-self: flex-end;
  width: 1.7rem;
  height: .34rem;
  margin-right: .5rem;
  line-height: .32rem;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKoAAAAiCAYAAADPlUI3AAAAAXNSR0IArs4c6QAAAVtJREFUeF7t2bGtwkAURNFdNwZFUAIF4ABBAgGOEIEroAJogj6oxUZOkIUEa3u8Q3JJYfZJRzf6P5a7qg18EPiLQHyGplnXl+MjdT52odbnQ0z9kO8RmFtgs6+WsQ230LSrVKyEOrc+740SGBoroY5i5cc5BIbESqg55HlztEAqVkIdTcogl8CvWAk1lzrvThL4FiuhTuJklFOg3J4WoYj3/l8DCDWnOG9PFviMlVAnUzLMLdCPlVBza/O+JNDF2hbxSqgSI2OHQPffU0J1SHNDEiBUiY+xS4BQXdLckQQIVeJj7BIgVJc0dyQBQpX4GLsECNUlzR1JgFAlPsYuAUJ1SXNHEiBUiY+xS4BQXdLckQQIVeJj7BIgVJc0dyQBQpX4GLsECNUlzR1JgFAlPsYuAUJ1SXNHEiBUiY+xS4BQXdLckQQIVeJj7BIgVJc0dySBd6jSK4wRMAi8AJ+SBaX5vH7ZAAAAAElFTkSuQmCC) no-repeat center center/99% 100%;

  &:hover {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKoAAAAiCAYAAADPlUI3AAAAAXNSR0IArs4c6QAAAV1JREFUeF7t2cHNAVEYheG5twtRCFYUoQRFjApoQgU0YSV6sBNRBSOzkYmEOzNn7rF5bTn3S568q/8Pk/JWFXwQ+I/AJYa4Om1Gx9T5UId63o5D6od8j8DQAtPyuqiKuI8hLlOxEurQ+rzXSaBtrITaiZUf5xBoEyuh5pDnzc4CqVgJtTMpg1wCv2Il1FzqvNtL4FushNqLk1FOgdn6Pn9Wz0PzrwGEmlOct3sLfMZKqL0pGeYWaMZKqLm1eV8SqGN9FNWOUCVGxg6B+r+nhOqQ5oYkQKgSH2OXAKG6pLkjCRCqxMfYJUCoLmnuSAKEKvExdgkQqkuaO5IAoUp8jF0ChOqS5o4kQKgSH2OXAKG6pLkjCRCqxMfYJUCoLmnuSAKEKvExdgkQqkuaO5IAoUp8jF0ChOqS5o4kQKgSH2OXAKG6pLkjCRCqxMfYJUCoLmnuSALvUKVXGCNgEHgB9J7/obfYdYQAAAAASUVORK5CYII=);
    color: #3778e5;
  }
}

.join-weal-card {
  &.hasContent {
    pointer-events: auto;
  }

  position: relative;
  top: .4rem;
  width: 9.54rem;
  height: 1.4rem;
  color: #3d424d;
  border-bottom: 1px solid rgba(44, 44, 44, .16);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: all 300ms;
  pointer-events: none;

  &:nth-child(1) .join-weal-card__info {
    transition-delay: 300ms;
  }

  &:nth-child(2) {

    .join-weal-card__number,
    .weal-btn,
    .join-weal-card__title {
      transition-delay: 300ms;
    }

    .join-weal-card__info {
      transition-delay: 600ms;
    }
  }

  &:nth-child(3) {

    .join-weal-card__number,
    .weal-btn,
    .join-weal-card__title {
      transition-delay: 600ms;
    }

    .join-weal-card__info {
      transition-delay: 900ms;
    }
  }

  &:nth-child(4) {

    .join-weal-card__number,
    .weal-btn,
    .join-weal-card__title {
      transition-delay: 900ms;
    }

    .join-weal-card__info {
      transition-delay: 1200ms;
    }
  }

  &:hover {
    .join-weal-card__desc {
      transform: translate3d(0, 0, 0);
      opacity: 1;
      width: 100%;
    }
  }
}

.join-weal-card__number {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: .82rem;
  background: left bottom/1.9rem .82rem no-repeat;
  transition: all 1500ms;
}

.weal-btn {
  position: absolute;
  left: 7.46rem;
  bottom: .1rem;
  height: .2rem;
  line-height: .2rem;
  font-size: .12rem;
  font-family: HarmonyOS, Arial, Helvetica, sans-serif;
  font-weight: bold;
  font-style: italic;
  color: #d8e1eb;
  white-space: nowrap;
  text-transform: uppercase;
  width: 0;
  -webkit-transition: width 1500ms;
  -o-transition: width 1500ms;
  transition: width 1500ms;
  overflow: hidden;

  img {
    width: 2.06rem;
    height: .2rem;
  }
}

.join-weal-card__brief {
  width: 100%;
  padding-left: 2.4rem;
}

.join-weal-card__title {
  width: 0;
  font-size: .2rem;
  font-weight: bold;
  line-height: .32rem;
  height: .32rem;
  margin-bottom: .14rem;
  position: relative;
  z-index: 1;
  -webkit-transition: all 300ms;
  transition: all 300ms;
  overflow: hidden;
  -webkit-transition: all 1500ms;
  transition: all 1500ms;
}

.join-weal-card__info {
  display: flex;
  font-size: .14rem;
  overflow: hidden;
  -webkit-transition: all 1500ms;
  -o-transition: all 1500ms;
  transition: all 1500ms;
  width: 0;
}

.join-weal-card__info-subtitle {
  position: relative;
  margin-right: .14rem;
  flex-shrink: 0;
  font-size: .16rem;
  font-weight: normal;
  opacity: .8;
}

.join-weal-card__desc {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  padding: 0 .4rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: .14rem;
  color: #676b73;
  background: #ebeff5;
  transform: translateX(-100%);
  transition: transform 400ms cubic-bezier(0.17, 0.67, 0.22, 1.03), opacity 400ms ease-out, -webkit-transform 400ms cubic-bezier(0.17, 0.67, 0.22, 1.03);
  pointer-events: none;

  &::before {
    content: "";
    width: 1.9rem;
    height: 100%;
    background: url(data:image/png;base64,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) center/cover no-repeat;
    position: absolute;
    left: 0;
    top: 0;
  }

  &::after {
    content: "";
    width: .36rem;
    height: .1rem;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAKCAYAAADcpvzeAAAAAXNSR0IArs4c6QAAAk5JREFUOE91k0+ITlEYxp/nfvf8+WamkVKyUBYSsjDDLAzRNAuUZDEUyU6KyIIFiihSbPwpUhaSIpIslDRJ/tREM2WnJKWIlCbNfPece++8utN84/vOvXOWz3nezvO+7+8QcxwR0c5n7wCsCSwC4TZr42etunNulSAaAdDR7pdvXqvebvJ3U3cuPS3A2dLTwtucK1Dis+sQORTeC3CxbtSJVl1EupzP3gNYHvjTqQgDHUq9beqNRjrICM8B1ALvR6PjdZWBnMt2CeRBuQO8NiYeIJm33jWcv0dwT4X/uLXqclOfmJBFNZWNQbAw8P6F5H3W2k+lQEmSLANrRbfdbUXErzyNezo7+b1VT7w/AOHNikk/NTreQVKKOxGpOZcNg9gUegnuNia+X+htgUSkPsPN6qAoh2CrtepFq+6975kSFpzZdj+/Gl3rJflndlUuPU/gZAU3N6yNDzb1tkBJkt0CZX8FN+fqRp0JuJnnfP4BkKWB30eUDVrrYsrTJ0nSLSCKTxBuZNTouJ+kKwVquGwvIXdLHRDDRsWbQ24Slz4EMFTuWI5Yq6819clJWRxF2SiIBYF3HJL3Wmu/tOrTiZ1zKwRR0VFnUPQjS+Oeri7+bOMm8YdBXq3g5pE1amdTFxHlXPYSxPrAKwSHjIkfl3gSkY6ZL7sy5EYiDNaVehVw0zclfANAB9x8Nrq2luT47KpcegnAsYqpX7FaHa1oCHTO3xFwXykpcMoYdSHgZr7z+SggSwJ/ElH6tdZj/7nJtoPyJOSGwIjW8UaSvirQP4vG7ZpQuqn9AAAAAElFTkSuQmCC) bottom/cover no-repeat;
    position: absolute;
    right: .47rem;
    bottom: 0;
  }

  &>div {
    position: relative;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    max-width: 30%;
    padding: 0 .04rem;
  }

  &.col2>div {
    position: relative;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    max-width: 40%;
    padding: 0 .04rem;
  }
}

.join-weal-card__desc-subtitle {
  font-size: .16rem;
  font-weight: bold;
  position: relative;
  opacity: .8;
  color: #3778e5;
  margin-bottom: .06rem;
}

.join-weal-card__desc-content {
  font-size: .14rem;
  width: auto;
  height: .9rem;
  line-height: .18rem;
  overflow: hidden;
  font-weight: 400;
}

.join-weal--active {
  .join-weal-card__number {
    width: 5rem;
    -webkit-transition-timing-function: cubic-bezier(0.17, 0.67, 0.22, 1.03);
    transition-timing-function: cubic-bezier(0.17, 0.67, 0.22, 1.03);
  }

  .weal-btn {
    width: 2.2rem;
    transition-timing-function: cubic-bezier(0.17, 0.67, 0.22, 1.03);
  }

  .join-weal-card__title {
    width: 100%;
    -webkit-transition-timing-function: cubic-bezier(0.17, 0.67, 0.22, 1.03);
    transition-timing-function: cubic-bezier(0.17, 0.67, 0.22, 1.03);
  }

  .join-weal-card__info {
    width: 100%;
    -webkit-transition-timing-function: cubic-bezier(0.17, 0.67, 0.22, 1.03);
    transition-timing-function: cubic-bezier(0.17, 0.67, 0.22, 1.03);
  }
}

.none {
  display: none;
}

.home-join-tabs,
.join-jobs-tabs,
.join-jobs-list,
.join-jobs-banner,
.scroll-tip,
.join-weal {
  -webkit-transition-property: -webkit-transform;
  -o-transition-property: transform;
  transition-property: transform, -webkit-transform;
  -webkit-transition-delay: 300ms;
  -o-transition-delay: 300ms;
  transition-delay: 300ms;
}

.swiper-slide-active {

  .join-jobs-tabs,
  .join-jobs-banner,
  .scroll-tip,
  .more-btn,
  .home-join-tabs,
  .weal-btn {
    transform: translateY(0);
  }
}

.swiper-slide-next {

  .join-jobs-tabs,
  .join-jobs-banner,
  .scroll-tip,
  .more-btn,
  .home-join-tabs {
    transform: translateY(1rem);
  }

  .join-jobs-list {
    transform: translate(.0052rem, 1.22rem);
  }

  .join-weal {
    transform: translateY(1.5rem);
  }
}

.swiper-slide-prev {

  .join-jobs-tabs,
  .join-jobs-banner,
  .scroll-tip,
  .more-btn,
  .home-join-tabs {
    transform: translateY(-1rem);
  }

  .join-jobs-list {
    transform: translate(.0052rem, -1.22rem);
  }

  .join-weal {
    transform: translateY(-1.5rem);
  }
}
</style>
