<template>
  <div :class="'home-' + page" @wheel="wheel" @mousemove="bgAct">
    <img src="/img/decoration.7a97c88.png" alt="" class="aside-decoration" />
    <div class="swiper-container last-swiper ">
      <div class="swiper-wrapper">
        <div class="swiper-slide content-slide">
          <div class="home-news__wrap">
            <div class="home-news-center">
              <div class="home-news__content">
                <div class="swiper-wrapper">
                  <div class="swiper-slide" v-for="(item, index) in newsRes">
                    <a :href="viewHref" class="home-news-view">
                      <div class="home-news-view__info">
                        <div class="home-news-view__info-date">
                          <div>
                            {{ item.date.split('-')[1] }}
                            <span class="slash">/</span>
                            {{ item.date.split('-')[2] }}
                          </div>
                          <div class="year">{{ item.date.split('-')[0] }}</div>
                        </div>
                        <div class="home-news-view-box">
                          <div class="home-news-view__title">
                            {{ item.title }}
                          </div>
                          <div class="home-news-view__desc">
                            {{ item.summary }}
                          </div>
                        </div>
                        <div class="more-icon">
                          <b>
                            read more
                          </b>
                          <img
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAUCAYAAADLP76nAAAAAXNSR0IArs4c6QAAAkhJREFUWEell0FrE1EUhc+dhBIlgl2ajKAWIlSEomkiSMFKFoLgzj/gotWi0C5sp7usnBhBVKjQuPAfCIKgOy2KZlKDO7ciZlKxIF0UmmbiPHkjFNt5mTfJneWE83G+N3NvEiosuU+IcAeKiwTN1O9nnqk++/8el8HJE66LROGU+5KIrh4sKgR2SYhLTtWsR0pwGYw8yWLj5V/p9I73nggTiqKu/6ebX39w8meUBJcxbD4QkFdxsWXCIHnSWUXRD73fG5ebtbwXJcFlDJPfE5DFLtx1z4kErQEiHSpKWHHs7G3dPHAZg+b3CQQSy+414eMFCIlQWR83nGr2uVaCyRikQ0hAlitYrQUCPVQU7QifphrVzGedBJcRN68UCCSWWk+J6FZoMwE/PDLOf7GPbWolmIw4HfoKBOt1rP2KgCthCbF2OJUtvStTT7teOYwYHfoLALi4uHmkZ3TlZhoPFxWPnYo5r3sKXIYuHylQWG7lSASrdTT0FIhWG3bmpk6Ay9Dl+wqctb6PHkKyTkBOMQcft1Nb01/LZ7pRAlxGnLxaoPw2WezkXgMoKQq2ex0v33x0YiPy9LmMmHmlQNFyVwDMKU5+FySmG7b5SffqcBlx8yGBScudMwApEP4yJpqp2/pfp1zGIPl9ApOWWzIA+eokD7b3IWrrFXNWd/JcxqD5PYHIaQdiDS2XMUw+EJiY/3Z0JDUiN85p5dAaXr55L3pouYxh88EfmuJY+41q4wgg3tByGYw89Zv2f0/Cn3Uqx2u6957L4OT/AhHc47y6QZ8OAAAAAElFTkSuQmCC"
                            alt="">
                        </div>
                      </div>
                      <div class="home-news-view__banner">
                        <div class="home-news-view__banner-bg">
                          <div class="mask">
                            <img
                              src="data:image/png;base64,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"
                              alt="" class="text1">
                            <img data-v-f2eaee8a=""
                              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAdCAYAAABcz8ldAAAAAXNSR0IArs4c6QAAA8FJREFUaEPlmk/IVVUUxX9LraRITCqowIJKKswyLAwMA4OKgoqCEglKIkiIIKMGCgUlFGREkCJBQgQJDUIciEF/oAYF/S9HTmyggwYNgiD6t2LD+eS+9/k93z7ng+7FM3mTvfa6Z61z7ztn7yPmcdh+ENjXmHKfpI01OWxvAt6twRbM/86thocfgdq+GPgRWNaQ8xiwStKv2Ry2Lwe+AZZksSW+F9zzachB4I5KMQJm4E5Jh7I5bJ8BfA7clMWW+N5wz4shtp8AdlWKMQPbLWlLTQ7bLwPP1WALpjfczYbYvhL4FjinQZAjwGpJv2dz2N4AfAgsyGJLfK+4mwyxvRD4DLi5UoyA/Q3cIumLbA7b5wPfA/H/VTN6x91qyDbgpRolOpgdkrbX5LB9ALi7BlswveOuNsT2aiBW9ZkNgsSuaK2kv7I5bD8JvJHFdeJ7yV1liO2zgK+AlQ2C/AGskXQ4m8P2KuBLYHEWW+J7y11ryKvA1koxZmBbJb2WzWH77LIYrs5iO/G95U4bYns98HHDriZ0+RTYIOnfrKi29wCPZ3Gd+F5zpwyxfS7wA3BZgyC/ldP4z9kctu8H3gdSz93h6T13amK23wYezQo5Fr9Z0t5sDtvLge+A87LYTnzvuac2xPY9wAcNqzN02S/p3qyg5bzzSZxXsthO/CC4pzLE9gXAT8CFDYL8AlwrKX5Tw/bzwAsp0GjwYLinNSTejPTK7mgSxbv7JO3Pimp7HRBvx6IstsQPivuUhth+BEh/88fE2ytpc1ZQ20vL/8alWWwnflDcEw2xHULErqq2xxC6HAWukxQ7nNSwHTuqB1Kg0eDBcc9piO2onn4E3NogSJwz4rwRe//UsP0Y8FYKNBo8SO5JhjwN7GwQJKA7JT2TzWH7qnIabynpD447dDqpIbavAb5uqBVF7qhRRa0q6kZTj1Ini6Ll9VODZgcOjntmCrMMKe3QEOSGBkH+LFXcaFylhu3XgadSoNHgQXJPMuRFoKo/0dFlu6QdWVFt3wVEj+OUu78JuQfH3Z3LyMRtry0dwNo9f+SOt2udpH8yhti+qHT/4hBaOwbHPT7RE4aUsnZ8YlbUqgFETzx649GnnnrYjueIvvhtU4NmBw6O+2Rz7RryJlB166OTeIuk3VlRbT8LvJLFjcUPjntOQ2zfDsS9qpZv9yFJ6XtZtm8sd6paWsGD455r8cl2lLPjxuElDSs0bhpG4fB4Jkfpr0Rv+4oMbix2cNyT5hqGvAc81CBIQDdKSt/ptf0O8PDpxj1pvv8BVQ3mLa1fjFIAAAAASUVORK5CYII="
                              alt="" class="text2">
                          </div>
                          <img :src="item.cover" alt="miHoYo" class="home-news-view__banner-bg-img">
                        </div>
                        <div class="home-news-view__banner-img">
                          <img :src="item.cover" alt="miHoYo">
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
                <div class="home-news-nav swiper-no-swiping">
                  <div class="home-news-nav__item" :class="navIndex == index ? 'home-news-nav__item--active' : ''"
                    v-for="(item, index) in newsRes" @click="navChange(index, $event)">
                    <span>{{ index + 1 }}</span>
                  </div>
                </div>
              </div>
              <a href="https://www.mihoyo.com/news" class="no-swiper-slide">
                <div class="more-btn">
                  查看更多新闻
                </div>
              </a>
            </div>
          </div>
        </div>
        <div class="swiper-slide content-slide">
          <MiFooter :footer-res="localText" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  data() {
    return {
      page: 'news',
      swiper: null,
      contentSwiper: null,
      navIndex: 0,
      localText: useState("localText")
    }
  },
  computed: {
    viewHref() {
      return 'https://www.mihoyo.com/news/' + this.newsRes[this.navIndex].id
    }
  },
  props: {
    newsRes: Object
  },
  methods: {
    wheel() {
      useState("newsSwiperProgress").value = this.swiper.slides[1].progress
    },
    navChange(index) {
      this.contentSwiper.slideTo(index)
      this.navIndex = index
    },
    bgAct(e) {
      document.querySelector(".home-news__content .swiper-slide-active .home-news-view__banner-bg-img").style.transform = `translate(${(-39.35 / window.innerWidth) * e.pageX + 20}px,${(-20.46 / window.innerHeight) * e.pageY + 9.36}px)`
    }
  },
  mounted() {
    this.swiper = new Swiper(".last-swiper", {
      direction: "vertical",
      // freeMode: true,
      watchSlidesProgress: true,
      slidesPerView: 'auto',
      observer: true, // 修改swiper自己或子元素时，自动初始化swiper,也就是响应式
      observeParents: true, // 修改swiper的父元素时，自动初始化swiper
      mousewheel: true,
      height: window.innerHeight,
    })
    this.contentSwiper = new Swiper(".home-news__content", {
      observer: true, // 修改swiper自己或子元素时，自动初始化swiper,也就是响应式
      observeParents: true, // 修改swiper的父元素时，自动初始化swiper
      effect: "fade",     // 开启淡出模式，此时slide会叠在一起
      fadeEffect: {
        crossFade: true,
      },
      noSwiping: true,
      on: {
        transitionStart: () => {
          this.navIndex = this.contentSwiper.activeIndex
        }
      }
    })
    setTimeout(() => {
      useState("pageShow").value = true
    }, 10)
  }
}
</script>

<style lang="less" scoped>
.home-news {
  position: relative;
  overflow: auto;
  background-image: linear-gradient(to bottom, rgba(248, 249, 251, 0) 10%, rgba(248, 249, 251, 0.5) 40%, #f8f9fb 100%);
}

.last-swiper {
  height: 100%;

  .content-slide:first-child {
    height: 748px
  }
}

.home-news__wrap {
  width: 11rem;
  margin: 0 auto;
  height: 100%;
  padding-top: .27rem;
  // 标记
  display: flex;
  justify-content: center;
  align-items: center;
}

.home-news-center {
  width: 100%;
  position: relative;

  // 标记
  // position: relative;
  // top: 50%;
  // transform: translateY(-50%);
  &>a {
    display: inline-block;
    margin-top: .8rem;
    position: absolute;
    left: 50%;
    top: 4.73rem;
    transform: translateX(-50%);
  }
}

.home-news__content {
  transition: transform 800ms;
  transition-delay: 200ms;
  transform: translateY(0);

  .swiper-slide {
    width: 100% !important;
  }
}

.home-news-view {
  width: 100%;
  height: 3.5rem;
  margin-bottom: .64rem;
  display: flex;
  flex-shrink: 0;
  justify-content: space-between;
  align-items: flex-end;

  &:hover {
    .more-icon b::after {
      transform-origin: 0 center;
      transform: none;
    }

    .home-news-view__title {
      color: #3778e5;
    }

    .home-news-view__banner-img img {
      transform: scale(1.2);
    }
  }
}

.home-news-view__info {
  width: 3.5rem;
  height: 4.6rem;
  position: relative;
  left: -0.5rem;
  bottom: 0;
  overflow: hidden;
}

.home-news-view__info-date {
  margin-bottom: .93rem;
  font-size: .76rem;
  text-align: left;
  color: #dee1e6;
  font-family: HarmonyOS, Arial, Helvetica, sans-serif;
  position: absolute;
  left: .5rem;
  top: 0;

  .slash {
    // padding: 0 .06rem;
    margin: 0 -0.16rem;
    font-weight: lighter;
  }

  .year {
    font-size: .3rem;
  }
}

.home-news-view-box {
  position: absolute;
  left: .5rem;
  bottom: .24rem;
  width: 3rem;
}

.home-news-view__title {
  width: 100%;
  margin-bottom: .25rem;
  font-weight: bold;
  font-size: .22rem;
  color: #242933;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.home-news-view__desc {
  font-size: .14rem;
  line-height: .25rem;
  color: #676b73;
  overflow: hidden;
  height: 1.5rem;
}

.more-icon {
  position: absolute;
  bottom: .06rem;
  left: .5rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: end;
  -ms-flex-align: end;
  align-items: flex-end;
  margin-top: .22rem;
  width: 1.7rem;
  height: .3rem;
  line-height: 1;
  font-size: .12rem;
  font-family: HarmonyOS, Arial, Helvetica, sans-serif;
  font-weight: bold;
  font-style: italic;
  color: #3778e5;
  text-transform: uppercase;
  white-space: nowrap;

  b {
    position: relative;
    margin-right: .3rem;

    &::after {
      position: absolute;
      bottom: -0.06rem;
      left: 0;
      width: 100%;
      content: "";
      border-bottom: 2px solid #3778e5;
      transition: transform 300ms cubic-bezier(0.215, 0.61, 0.355, 1), -webkit-transform 300ms cubic-bezier(0.215, 0.61, 0.355, 1);
      transform-origin: 100% 0;
      transform: scale(0);
    }
  }
}

.home-news-view__banner {
  position: absolute;
  width: 7.8rem;
  height: 3.5rem;
  top: 0;
  left: 3.3rem;
}

.home-news-view__banner-bg {
  position: absolute;
  right: 0;
  bottom: -0.64rem;
  width: 6.2rem;
  height: 6.72rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  overflow: hidden;
  background: center center/cover;

  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAYCAYAAADzoH0MAAAAAXNSR0IArs4c6QAAAGlJREFUOE9jPH37swMDDrBy4eT94fG5jvjkGXEZQIxmkOFYDSBWM8hlGAaQohnDAFI1oxhAjma4AeRqBhtQUtP2n1BU4ZPHGY0g04lx2Wg6QEqJxAQYttgAByK5mkfTAaSkGi0PqFAeAABoRPdF/0BnwgAAAABJRU5ErkJggg==) repeat center center/0.16rem .24rem;
    background-color: rgba(255, 255, 255, .6);

    .text1 {
      position: absolute;
      top: .65rem;
      right: .3rem;
      width: 2.82rem;
    }

    .text2 {
      width: 1rem;
      position: absolute;
      bottom: -.15rem;
      right: .83rem;
    }
  }

  .home-news-view__banner-bg-img {
    width: auto;
    height: 130%;
    margin-top: -12%;
    flex-shrink: 0;
    transition: transform 200ms cubic-bezier(0, .7, .8, 1);
    transform-style: preserve-3d;
    backface-visibility: hidden;
  }
}

.home-news-view__banner-img {
  position: relative;
  z-index: 2;
  width: 6.2rem;
  height: 3.5rem;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    transform: scale(1);
    transition: transform 2000ms cubic-bezier(0.01, 1.21, 0.96, 0.95), -webkit-transform 2000ms cubic-bezier(0.01, 1.21, 0.96, 0.95);
  }
}

.home-news-nav {
  width: 2rem;
  flex-shrink: 0;
  position: absolute;
  top: 4.34rem;
  display: flex;
  justify-content: space-between;
  transition: transform 800ms;
  transform: translateY(0);
  transition-delay: 200ms;

  .home-news-nav__item {
    width: .6rem;
    height: .6rem;
    line-height: .6rem;
    text-align: center;
    font-size: .26rem;
    color: #dee1e6;
    cursor: pointer;
    background-color: #f8f9fb;
    border: 1px solid #c9d0d8;
    transition: transform 300ms ease-out, -webkit-transform 300ms ease-out;
    transform-origin: top center;

    &:hover,
    &.home-news-nav__item--active {
      color: #676b73;
      border-color: #676b73;
      transform: scale(1.15);
    }
  }

}

.more-btn {
  margin: 0 auto;
  width: 1.7rem;
  height: .34rem;
  line-height: .34rem;
  font-size: .16rem;
  text-align: center;
  color: #676b73;
  cursor: pointer;
  -webkit-transition: -webkit-transform 800ms;
  transition: -webkit-transform 800ms;
  -o-transition: transform 800ms;
  transition: transform 800ms;
  transition: transform 800ms, -webkit-transform 800ms;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKoAAAAiCAYAAADPlUI3AAAAAXNSR0IArs4c6QAAAVtJREFUeF7t2bGtwkAURNFdNwZFUAIF4ABBAgGOEIEroAJogj6oxUZOkIUEa3u8Q3JJYfZJRzf6P5a7qg18EPiLQHyGplnXl+MjdT52odbnQ0z9kO8RmFtgs6+WsQ230LSrVKyEOrc+740SGBoroY5i5cc5BIbESqg55HlztEAqVkIdTcogl8CvWAk1lzrvThL4FiuhTuJklFOg3J4WoYj3/l8DCDWnOG9PFviMlVAnUzLMLdCPlVBza/O+JNDF2hbxSqgSI2OHQPffU0J1SHNDEiBUiY+xS4BQXdLckQQIVeJj7BIgVJc0dyQBQpX4GLsECNUlzR1JgFAlPsYuAUJ1SXNHEiBUiY+xS4BQXdLckQQIVeJj7BIgVJc0dyQBQpX4GLsECNUlzR1JgFAlPsYuAUJ1SXNHEiBUiY+xS4BQXdLckQQIVeJj7BIgVJc0dySBd6jSK4wRMAi8AJ+SBaX5vH7ZAAAAAElFTkSuQmCC) no-repeat 0 0/99% 100%;

  &:hover {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKoAAAAiCAYAAADPlUI3AAAAAXNSR0IArs4c6QAAAV1JREFUeF7t2cHNAVEYheG5twtRCFYUoQRFjApoQgU0YSV6sBNRBSOzkYmEOzNn7rF5bTn3S568q/8Pk/JWFXwQ+I/AJYa4Om1Gx9T5UId63o5D6od8j8DQAtPyuqiKuI8hLlOxEurQ+rzXSaBtrITaiZUf5xBoEyuh5pDnzc4CqVgJtTMpg1wCv2Il1FzqvNtL4FushNqLk1FOgdn6Pn9Wz0PzrwGEmlOct3sLfMZKqL0pGeYWaMZKqLm1eV8SqGN9FNWOUCVGxg6B+r+nhOqQ5oYkQKgSH2OXAKG6pLkjCRCqxMfYJUCoLmnuSAKEKvExdgkQqkuaO5IAoUp8jF0ChOqS5o4kQKgSH2OXAKG6pLkjCRCqxMfYJUCoLmnuSAKEKvExdgkQqkuaO5IAoUp8jF0ChOqS5o4kQKgSH2OXAKG6pLkjCRCqxMfYJUCoLmnuSALvUKVXGCNgEHgB9J7/obfYdYQAAAAASUVORK5CYII=);
    color: #3778e5;
  }
}

.swiper-slide-next {

  .home-news__content,
  .home-news-nav,
  .more-btn {
    transform: translateY(2rem);
  }
}
</style>