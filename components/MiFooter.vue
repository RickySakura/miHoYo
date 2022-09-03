<template>
  <footer id="mihoyo-footer">
    <div class="mihoyo-cn-footer">
      <div class="footer-content">
        <div class="footer-logo">
          <img
            src="https://webstatic.mihoyo.com/upload/event/2021/03/01/ed39ba943da56c88dec2b18f4bfb0a32_2315648370550091638.png"
            alt="miHoYo_Ricky" class="logo-bigger">
        </div>
        <div class="footer-info" v-if="footerRes">
          <div class="footer-link">
            <div class="footer-protocol">
              <a :href="item.link" target="_blank" v-for="(item) in footerRes.protocol">{{ item.name }}</a>
            </div>
          </div>
          <div class="footer-advice" v-html="footerRes.footer.advice"></div>
          <div class="footer-filing" v-html="footerRes.footer.filing"></div>
          <div class="footer-tip" v-html="footerRes.footer.tip"></div>
          <div class="guanai-phone" v-html="footerRes.footer['guanai-phone']"></div>
          <span class="mihoyo-copyright" v-html="footerRes.footer.copyright"></span>
          <span class="complaint-phone" v-html="footerRes.footer.complaint" style="margin-left:20px"></span>
          <div class="footer-icon">
            <a v-for="(item, index) in footerRes.footer.icons" target="_blank" rel="nofollow" :href="item.href"
              :key="index">
              <img :src="item.img" alt>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  props: {
    footerRes: Object
  }
}
</script>

<style lang="less" scoped>
:deep(.mihoyo-cn-footer) {
  a {
    color: #999;
    font-size: 14px;
    text-decoration: none;
  }

  a:hover {
    color: #ccc;
    text-decoration: underline;
  }
}

.mihoyo-cn-footer {
  background: black;
  color: #999;
  padding: 30px 0 20px;
  font-size: 14px;
  overflow: auto;

  .footer-content {
    display: flex;
    width: 1280px;
    margin: 0 auto;
    height: 293px; // 标记
  }

  .footer-logo {
    min-height: 94px;
    min-width: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    // flex-direction: column;
    box-sizing: border-box;

    .logo-bigger {
      width: 200px;
    }
  }

  .footer-info {
    color: #aaa;
    margin-left: 60px;
    line-height: 24px;

    .footer-link {
      margin-bottom: 28px;

      .footer-protocol a {
        color: #fff;
        display: inline-block;
        margin: 0 10px 0 0;
        font-size: 14px;

        &:first-child {
          margin-left: 0;
        }

        &::after {
          content: "| ";
          margin-left: 8px;
        }

        &:last-child::after {
          content: "";
        }
      }
    }
  }

  .footer-icon {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 10px 0;
    flex-wrap: wrap;
    width: 800px;

    a {
      display: block;
      width: 116px;
      height: 46px;
      margin-right: 15px;
      margin-bottom: 10px;
    }
  }
}
</style>