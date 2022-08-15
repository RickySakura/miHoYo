# 项目介绍
<a name="nJj8G"></a>
## 技术栈
<a name="cZFRl"></a>
#### 前端框架+打包
使用nuxt3 + vue3 ：其中nuxt3集成了vite速度更快，并且提供了SSR渲染。
<a name="RiAFm"></a>
### 前端样式框架
SwiperJS 4~5：提供整页滚动效果，以及轮播图效果。很强！<br />VueScorll：可以设置自定义的滚动条。<br />Less：CSS预编译。
<a name="pJsRE"></a>
### 后端+业务逻辑
NodeJS：不必多说。<br />MongoDB：和Node和前端相形最好的文档型Nosql数据库。



# 项目笔记
<a name="lyk3a"></a>
## 一、首屏Index页面笔记
1.在首屏的div块中现了一个名为 fp-page 的类：![image.png](https://cdn.nlark.com/yuque/0/2022/png/2494810/1658223059275-d36603ab-40fb-41ee-8ec2-6c6bcd15299e.png#clientId=ud074d5ff-09b9-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=57&id=u59f8466d&margin=%5Bobject%20Object%5D&name=image.png&originHeight=55&originWidth=398&originalType=binary&ratio=1&rotation=0&showTitle=false&size=10249&status=done&style=none&taskId=uf59fa303-4e2b-4267-b6a0-e2e8ddeac33&title=&width=409.3999938964844)<br />此处的 fp 代表 first paint ，首次绘制，是衡量用户体验的指标之一。fp-page就代表首次绘制的页面。没有什么特殊的，只是告知开发者哪一个页面首先绘制。

2.优化图片加载<br />将一些相对较小的图片，可以直接存在项目的img目录里，一起打包在发布包中，作为优先载入，其他的大图就还是使用CDN或者静态资源服务器提供。<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/2494810/1658232478127-e1451234-3b23-4420-93e0-44432566bb06.png#clientId=u5904db61-1f86-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=281&id=ua605fb09&margin=%5Bobject%20Object%5D&name=image.png&originHeight=384&originWidth=292&originalType=binary&ratio=1&rotation=0&showTitle=false&size=18582&status=done&style=none&taskId=ua35a8e5a-50f8-4a79-a5ea-74cc8a93fe1&title=&width=213.60000610351562)一些占比较小的图片

<a name="tTGg9"></a>
## 二、页面状态管理
在nuxt3中，我们使用自带的useState()方法管理页面状态，主要为当前页面是哪一页的状态，state的状态可以在window.__NUXT__.state中查看。<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/2494810/1659410691162-644efeda-551a-422c-94bb-2e3ff35a8133.png#clientId=uacca9755-0bf2-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=104&id=u23ebb261&margin=%5Bobject%20Object%5D&name=image.png&originHeight=117&originWidth=234&originalType=binary&ratio=1&rotation=0&showTitle=false&size=6443&status=done&style=none&taskId=ue170c844-6402-40b5-a913-15eff963211&title=&width=207.1999969482422)
<a name="MulQi"></a>
## 三，About页面css换页动画需求
就是从上一页进入about页面时，元素从下往上移动一段距离到指定位置，当从下一页进入about页面时，元素从上往下移动一段距离，通过**swiper-slide-next，swiper-slide-prev和swiper-slide-active**类根据页面状态进行位置切换，然后通过transition过渡，实现动画效果。
```less
.swiper-slide {
  transition: transform 500ms ease-out;  // 设置过渡效果
}

.swiper-slide-active {
  // 滑动到当前页面后的移动终点位置
  .home-about-cates,
  .home-about-container {
    transform: translateY(0);
  }
}

.swiper-slide-prev {
  // 元素在上一页时所处的位置
  .home-about-cates {
    transform: translateY(-1rem);
  }
  
  .home-about-container {
    transform: translateY(-1.5rem);
  }
}

.swiper-slide-next {
  // 元素在下一页时所处的位置
  .home-about-cates {
    transform: translateY(1.5rem);
  }
  
  .home-about-container {
    transform: translateY(2rem);
  }
}
```
这个需求不仅仅是在about页面用到，其他页面和小组件也有，是很常用的方法，需要牢记。
<a name="Otl5r"></a>
## Nuxt3使用笔记
1.**public目录**下的文件会被一起打包进.output/_nuxt中，也就是可以直接在生产环境中使用，而assets中的文件则不会被一起打包，不能直接在生产环境使用。所以，**包括字体，图片，音频等需要由浏览器自动下载的文件，最好就放在 public/ 目录下！**<br />2.通过调用useFetch()方法获取的数据，在页面加载后可以在devtools中的，window.__NUXT__.data 中看到：<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/2494810/1659408296710-af02c338-bbbf-467c-a28b-5a97cdada984.png#clientId=uacca9755-0bf2-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=194&id=uee98b326&margin=%5Bobject%20Object%5D&name=image.png&originHeight=242&originWidth=701&originalType=binary&ratio=1&rotation=0&showTitle=false&size=19572&status=done&style=none&taskId=u41cc49bf-938f-443c-8618-6a43757c267&title=&width=560.8)


# 使用SwiperJS中遇到的问题
<a name="U5PWc"></a>
### 1.在vue项目中使用高版本swiper，出现鼠标滚动或者自动播放功能失效问题
这个问题可能是swiper版本过高导致的，我在nuxt项目中使用**swiper6/7/8**的时候都遇到了这个问题，鼠标滚动失效并且很多功能都用不了，初步猜测是因为高版本中的一些样式或逻辑规范和vue产生了冲突，或者就是其本身有问题。
<a name="gxGoS"></a>
#### 解决方法
降低版本到swiper4~5之间，即可解决问题。将package.json中的swiper版本改为4.5.0，然后重新npm install一下。

<a name="idC5z"></a>
### 2.第一条slide频闪
刷新浏览器的时候由于swiper是在dom渲染完成后才修改的，所以第一个slide始终会闪现一下，这种时候可以用老方法遮罩。但是我在nuxt中发现了一个很奇妙的方法。只需要在当前布局文件中添加任意一个项目中不存在的的组件标签即可：
```vue
<template>
  <!--注意以下这个组件nux是不存在的--> 
  <nux />
  <div class="home">
    <!-- <div style="width: 100%;height: 100%;background-color: white;z-index: 999;" v-if="isReady"></div> -->
    <div class="swiper-container">
      <!-- 第二层一个包裹块 -->
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <slot></slot>
        </div>
        <div class="swiper-slide">
          <slot name="product"></slot>
        </div>
        <div class="swiper-slide">
          <slot name="news"></slot>
        </div>
      </div>
    </div>
    <!-- <div class="swiper-pagination"></div> -->
  </div> 
</template>
```
这样就不会频闪，而且静态资源的DOM也不会发生突发性位移了。原因不明，初步推断是因为无法识别这个组件，Nuxt并没有做全部更新，而是部分更新所以DOM没有刷新，也就不会频闪。但是这样的坏处是会报非常多的警告：<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/2494810/1651839165227-a213fea3-c5b2-4e0f-85fe-1f46cd25080f.png#clientId=u9827d9c8-3c3d-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=564&id=u63ce2a21&margin=%5Bobject%20Object%5D&name=image.png&originHeight=705&originWidth=812&originalType=binary&ratio=1&rotation=0&showTitle=false&size=71948&status=done&style=none&taskId=u77bd6135-7e65-4a66-bb54-7aea6c69529&title=&width=649.6)<br />这时就可以用掩耳盗铃的方法，将console 的warn方法重写掉让他没法报警告。这是很取巧的方法，而且原理不明，谨慎使用。
```javascript
console.warn = ()=>{}
```

# 项目中遇到的问题
<a name="PKA3E"></a>
## 1.null和undefined的判断问题
在不使用严格等号 === 的时候，即双等号 ==的时候，null==undefined为true，而用三等号===时则是false。他们的值相同但是类型不同。<br />null可以和数字类型运算，运算中null相当于0，结果被隐式转换为数字， 但undefined不可以和数字类型进行运算，其结果为 NaN。<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/2494810/1651834635090-d040262c-269e-431f-88fd-d6c89ef5b1fe.png#clientId=u4d2662e0-ad50-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=107&id=u157069fb&margin=%5Bobject%20Object%5D&name=image.png&originHeight=106&originWidth=187&originalType=binary&ratio=1&rotation=0&showTitle=false&size=2866&status=done&style=none&taskId=uec3262f7-8c7d-4000-8f7c-a6e1e7e288a&title=&width=189.60000610351562)<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/2494810/1651834761103-e34d46c6-1b85-4266-b5d3-0748ed4fc477.png#clientId=u4d2662e0-ad50-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=152&id=u7f6e6cc8&margin=%5Bobject%20Object%5D&name=image.png&originHeight=160&originWidth=148&originalType=binary&ratio=1&rotation=0&showTitle=false&size=2791&status=done&style=none&taskId=uc89b6522-1b89-440d-948c-567c51a02ef&title=&width=140.4000015258789)
<a name="O2UZc"></a>
### 问题发生点
判断一个对象的属性是否存在：<br />错误部分：
```javascript
let { query } = this.$route
if (query.page === null) {
  this.mySwiper.slideTo(0, 0);
}
```
报错，即使query.page不存在，其返回值也不是null，而是undefined，在===中null是不等于undefined的所以错误。解决方法可以将===改为==，或者将null改为undefined，也可以用对象自身的hasOwnProperty方法，或者in判断符。具体可以看这个：<br />修改后：
```javascript
let { query } = this.$route
if (query.page === undefined) {
  this.mySwiper.slideTo(0, 0);
}
```
<a name="pImAc"></a>
## 2.flex布局中的flex-shrink属性（flex子元素属性）
   ** flex-shrink是flex子元素的属性**，不是容器的属性。 用来设置，**当父元素的宽度小于所有子元素的宽度的和时（即子元素会超出父元素），子元素如何缩小自己的宽度的**。 **flex-shrink的默认值为1**，当父元素的宽度小于所有子元素的宽度的和时，子元素的宽度会减小。值越大，减小的越厉害。**如果值为0，表示不减小。**<br />    在横向使用swiper的时候，如果将wrapper设置为 display:flex 时子slide将会平分整个宽度，也就是说每个slide的宽度都会被缩小，以在一整行放下。但是我们想一个 slide 独占一整个页面宽度，然后滑动后是下一个slide，这种时候就涉及到了flex-shrink属性。**通过给子元素slide-wrapper类设置flex-shrink的值为0，则表示不缩小 flex 元素的宽度/高度。这样就能让一个swiper-slide拥有给定的宽度了。**
<a name="hP7Um"></a>
### 问题部分
```css
.swiper-wrapper {
  position: relative;
  width: 100%;
  z-index: 1;
  display: flex;
  transition-property: transform, -webkit-transform;
  box-sizing: content-box;
}

.swiper-slide {
  width: 100%;
  position: relative;
  transition-property: transform, -webkit-transform;
}
```
![image.png](https://cdn.nlark.com/yuque/0/2022/png/2494810/1652004564856-46de059e-eb13-41d6-854a-94d27c0bfad5.png#clientId=u2bd0d61c-4f71-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=550&id=ufd1eff37&margin=%5Bobject%20Object%5D&name=image.png&originHeight=688&originWidth=1182&originalType=binary&ratio=1&rotation=0&showTitle=false&size=189973&status=done&style=none&taskId=u42329621-ca38-4894-b94c-4c094ae53e0&title=&width=945.6)<br />所有元素都挤在一行，非常的灾难。
<a name="kZaJw"></a>
### 解决
```css
.swiper-slide {
  flex-shrink: 0;
  width: 100%;
  position: relative;
  transition-property: transform, -webkit-transform;
}
```
![image.png](https://cdn.nlark.com/yuque/0/2022/png/2494810/1652004610116-a7576ac1-6aa3-491f-ba83-7f31dab8dad9.png#clientId=u2bd0d61c-4f71-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=746&id=u62ae21f4&margin=%5Bobject%20Object%5D&name=image.png&originHeight=932&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=185779&status=done&style=none&taskId=u98957680-92b2-4c64-b4aa-56edb0703cb&title=&width=1536)<br />所有元素都按照既定的宽度，占据这个页面了，不会挤在一起。

<a name="ptOKX"></a>
## 3.子组件使用<script setup>时，父组件如何访问子组件的内部方法
在vue2中，我们可以通过给子组件设置 ref 然后 this.$refs.name 的方式获取子组件实例，然后通过其调用内部方法：<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/2494810/1652175964079-2aceb21a-537e-487e-83e7-ee678c529220.png#clientId=ub4120ea9-ba80-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=186&id=u8a9f3895&margin=%5Bobject%20Object%5D&name=image.png&originHeight=232&originWidth=391&originalType=binary&ratio=1&rotation=0&showTitle=false&size=13467&status=done&style=none&taskId=u6c69fcea-d60e-4198-8a45-727307bb1e0&title=&width=312.8)<br />但是vue3的 setup 语法糖中**内部变量对外是默认关闭的**，也就是子组件不对外导出任何变量，如果直接获取子组件实例会发现，其内部没有提供任何方法：<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/2494810/1652175946111-06229399-50a0-4789-8087-1b35819fd71d.png#clientId=ub4120ea9-ba80-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=133&id=ua6a93b14&margin=%5Bobject%20Object%5D&name=image.png&originHeight=166&originWidth=286&originalType=binary&ratio=1&rotation=0&showTitle=false&size=8497&status=done&style=none&taskId=u585ba070-795d-4652-860a-9b21582b6a3&title=&width=228.8)
<a name="ju945"></a>
### 解决方法
使用 vue3提供的 defineExpose() 编译器宏，手动导出需要的变量或者方法：
```vue
// 子组件代码
<script setup>
  const foo = () => {
    console.log("foo");
  }
  // 子组件内设置对外公开的变量
  defineExpose({
    foo
  });
</script>
```
父组件内调用：
```javascript
// 调用子组件方法 vue2写法
this.$refs.childRef.foo();  // foo()

// vue3写法
const childRef = ref(null);
childRef.value.foo();
```
<a name="i7BTT"></a>
## 4.script setup中props的设置与获取
可以使用 defineProps 编译器宏，用一个变量接收，然后通过这个变量获取props中的值：
```vue
<script setup>
  const props = defineProps({
    delay: {
      type: Number,
      default: 3420
    }
  })
  onMounted(() => {
    console.log(props.delay) // 3420
  })
</script>
```
<a name="AG7PJ"></a>
## 5.设置swiper的自动播放(autoplay)和延迟后下一次切换比上一次更久时间的问题
在设置了siwper的自动播放中的delay延迟时间后，本应该按照既定时间切换到下一张的时候可以明显的感觉到间隔时间比上一次切换更长了，也就是说越来越卡了。
<a name="vblxd"></a>
### 分析：
个人觉得，swiper实现自动播放功能的原理可能还是setTimeout或者setInterval，但是这两者一旦设置过多就是会造成越来越卡的现象，尤其是如果一次创建了很多setTimeout任务后，延迟尤为明显。使用setInterval也有问题。所以建议要不就手动实现自动播放，不要使用autoplay，要不就都使用autoplay，个人选择前者。
<a name="wUqcA"></a>
### 解决方法：通过递归设置setTimeout手动实现autoplay
每隔一段时间就调用一次 swiper.slideNext()方法，并重新调用一次自身，创建新的定时器。
```vue
<script setup>
  function autoplay() {
    timeOut = setTimeout(() => {
      if (swiper.isEnd) {
        // 如果是结尾 就回到开头
        swiper.slideTo(0);
      } else {
        swiper.slideNext()
      }
      autoplay()
    }, props.delay)
  }
  
  onMounted(() => {
    swiper = new Swiper('.home-product-swiper', {});
    autoplay()； //调用一下
  })
</script>
```
<a name="bNg0y"></a>
## 6.设置绝对定位(position:absolute)后元素消失问题
一、可能是父级没有获得宽/高的原因，导致设置绝对定位后无法找到位置，元素消失。这种情况需要检查祖辈元素，找到设置了相对定位的元素看看其是否有具体的宽高，如果没有，设置即可。

![image.png](https://cdn.nlark.com/yuque/0/2022/png/2494810/1652187862657-b1c90ffa-13fe-436e-89b4-bc3036db2c86.png#clientId=ub4120ea9-ba80-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=192&id=u03adcf6e&margin=%5Bobject%20Object%5D&name=image.png&originHeight=240&originWidth=636&originalType=binary&ratio=1&rotation=0&showTitle=false&size=21529&status=done&style=none&taskId=u0df4a0e3-f300-456c-ba67-a141079e9b5&title=&width=508.8)

<a name="JAwIL"></a>
## 7.swiper设置切换效果(effect)为fade时，没有过渡问题
官网的例子就是一坨shit，就写一个简单的代码，tm细节一点没说，吐了。<br />[https://www.swiper.com.cn/api/effects/194.html](https://www.swiper.com.cn/api/effects/194.html)<br />使用fade，渐入渐出效果，可以在slide变换的时候实现前一个淡出后一个淡入的效果，也就是米哈游官网的样子。但是其中有一个细节官网一点没说。
<a name="N9tSK"></a>
### fade的原理
首先，它是通过让swiper-slide的不透明度在0和1之间切换实现的，也就是说让下一张的透明度变成1，上一张变成0，但是**如果你没有设置css过渡效果（即transition），则其变化会非常生硬，并且这个属性swiper并不会!!自动添加，需要手动给swiper-slide类添加transition-property: opacity。**也就是说，仅仅写了以下代码是不够的！！！
```javascript
var mySwiper = new Swiper('.swiper',{
  effect : 'fade',
  fadeEffect: {
    crossFade: true,
  }
})
```
<a name="lK7xl"></a>
### 问题展示
[![localhost_3000__page=product 和另外 13 个页面 - 个人 - Microsoft Edge 2022-05-11 15-41-50.mp4 (88.06MB)](https://gw.alipayobjects.com/mdn/prod_resou/afts/img/A*NNs6TKOR3isAAAAAAAAAAABkARQnAQ)]()可以看到，变化没有过渡，十分生硬
<a name="gIOsU"></a>
### 问题解决
很简单，只需要给 .swiper-slide 添加过渡属性即可。使用transition或者transition-property都可。
```css
.swiper-slide {
  transition-property: opacity;
}
```
添加之后：
[![localhost_3000__page=product 和另外 13 个页面 - 个人 - Microsoft Edge 2022-05-11 15-44-04.mp4 (120.56MB)](https://gw.alipayobjects.com/mdn/prod_resou/afts/img/A*NNs6TKOR3isAAAAAAAAAAABkARQnAQ)]()<a name="XmFIJ"></a>
## 8.在VSCode中，为自己的JS方法添加悬停参数提示
![image.png](https://cdn.nlark.com/yuque/0/2022/png/2494810/1652603755172-4d42a6c0-1368-4ba7-b479-f43968a0c7b2.png#clientId=u96ce4021-f528-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=117&id=u90270bda&margin=%5Bobject%20Object%5D&name=image.png&originHeight=146&originWidth=565&originalType=binary&ratio=1&rotation=0&showTitle=false&size=16748&status=done&style=none&taskId=u3809603d-766c-414c-9fa0-1bdd4ad0299&title=&width=452)<br />一般写完方法后，我们悬停方法可以看到一些参数、返回值的介绍，在VSCode中如果需要为自己的方法/函数添加悬停的内容，**可以在方法名上面输入 /**/   编辑器会自动生成注释内容，注释的内容即为悬停时的介绍内容。**<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/2494810/1652604037039-b001bc4d-c500-4924-803a-427ae1e6dacb.png#clientId=u96ce4021-f528-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=135&id=u047d7984&margin=%5Bobject%20Object%5D&name=image.png&originHeight=150&originWidth=567&originalType=binary&ratio=1&rotation=0&showTitle=false&size=13055&status=done&style=none&taskId=u383b8975-64d0-47a7-984b-a57502ff799&title=&width=509.6000061035156)<br />悬停效果：<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/2494810/1652604052807-acd08ffc-7e4f-48b1-aaef-58e4ba2b9242.png#clientId=u96ce4021-f528-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=109&id=u21ae2f84&margin=%5Bobject%20Object%5D&name=image.png&originHeight=127&originWidth=596&originalType=binary&ratio=1&rotation=0&showTitle=false&size=15200&status=done&style=none&taskId=ufc5ec694-3a69-4b2d-bf28-3269835bfe5&title=&width=510.8000183105469)<br />其中，所有的注释参数都需要以@开头，有固定的几个可选选项：<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/2494810/1652604320478-58444f9b-7211-4d83-ac7e-d9371119d5b9.png#clientId=u96ce4021-f528-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=260&id=uec414b2b&margin=%5Bobject%20Object%5D&name=image.png&originHeight=325&originWidth=569&originalType=binary&ratio=1&rotation=0&showTitle=false&size=19696&status=done&style=none&taskId=u48812071-1ad7-4063-8178-44db3052bc1&title=&width=455.2)<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/2494810/1652604338978-b658b30b-b712-4dd7-8026-b4367112cbbf.png#clientId=u96ce4021-f528-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=269&id=ubb961ae9&margin=%5Bobject%20Object%5D&name=image.png&originHeight=336&originWidth=268&originalType=binary&ratio=1&rotation=0&showTitle=false&size=14857&status=done&style=none&taskId=u3ae30119-b8f3-4313-82cd-d742da86d86&title=&width=214.4)![image.png](https://cdn.nlark.com/yuque/0/2022/png/2494810/1652604361395-d248ef5b-12ea-4292-a621-7717d34a5b0c.png#clientId=u96ce4021-f528-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=257&id=u6514c170&margin=%5Bobject%20Object%5D&name=image.png&originHeight=321&originWidth=201&originalType=binary&ratio=1&rotation=0&showTitle=false&size=11708&status=done&style=none&taskId=ubba82cdd-c336-4a26-b734-d7c6c883d1d&title=&width=160.8)<br />等等很多，**主要用的只有 param 和 return 即可。**<br />**参数@prarm 后的大括号 { } 表示需要参数的类型。**<br />还可以自定义参数的表达，只需要在 @ 后添加任意文字即可。<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/2494810/1652604424379-ff8d4329-2f68-47ed-b67a-50dc6c2d2da1.png#clientId=u96ce4021-f528-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=151&id=u1790a125&margin=%5Bobject%20Object%5D&name=image.png&originHeight=189&originWidth=659&originalType=binary&ratio=1&rotation=0&showTitle=false&size=30827&status=done&style=none&taskId=u93838912-c074-494f-b020-b3751a48cc8&title=&width=527.2)<br />或者在第一行介绍函数：<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/2494810/1652604734259-2fc115ac-0a18-4e67-95f4-56b924a065e8.png#clientId=u96ce4021-f528-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=101&id=u22e40446&margin=%5Bobject%20Object%5D&name=image.png&originHeight=126&originWidth=618&originalType=binary&ratio=1&rotation=0&showTitle=false&size=16863&status=done&style=none&taskId=u2b7af51f-8149-4ebe-9fd4-3cc6ff9742e&title=&width=494.4)
<a name="bmpSD"></a>
## 9.为nuxt生成的网站添加头部信息<head>
所有的关于html的设置都可以在 nuxt.config.js 文件中配置，包括head中的meta，link，script等，还包括开发环境，自动导入等等配置。其配置将作用与整个项目。<br />所有配置项可以在这里浏览：
<a name="vDPIA"></a>
#### 举个例子：添加网站图标
```javascript
import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        // <meta name="viewport" content="width=device-width, initial-scale=1">
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        // 下句等同于：<link rel="icon" href="https://www.mihoyo.com/favicon.ico">
        { rel: 'icon', href: 'https://www.mihoyo.com/favicon.ico' }
      ],
    }
  }
})

```
<a name="dEzDY"></a>
## 10.CSS gradient函数和background-clip属性使用渐变色和遮罩效果
<a name="BWxNa"></a>
### 米哈游官网示例
```css
.anim {
  background-image: linear-gradient(-135deg, #3778e5, #e98bc0, #3778e5, #e98bc0, #3778e5);
  background-clip: text;  //  从前景内容的形状（比如文字）作为裁剪区域向外裁剪，如此即可实现使用背景作为填充色之类的遮罩效果。
  }
```
![image.png](https://cdn.nlark.com/yuque/0/2022/png/2494810/1652697173508-028b8ceb-15c5-4435-9c33-c9c865335d3b.png#clientId=u96ce4021-f528-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=87&id=u289430ab&margin=%5Bobject%20Object%5D&name=image.png&originHeight=52&originWidth=185&originalType=binary&ratio=1&rotation=0&showTitle=false&size=5085&status=done&style=none&taskId=ufc71cdef-fe8f-4886-b70d-99048e3ed05&title=&width=309)

background-image属性除了可以接受一个url地址或者文件地址外，还可以创建渐变色（gradient）来确定图像。<br />css中有多个gradient函数，根据参考手册了解用法。<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/2494810/1652697053887-57467bfd-db47-4327-981d-1d6646582447.png#clientId=u96ce4021-f528-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=245&id=ube604e9f&margin=%5Bobject%20Object%5D&name=image.png&originHeight=306&originWidth=919&originalType=binary&ratio=1&rotation=0&showTitle=false&size=26915&status=done&style=none&taskId=u51ad41b1-ba11-4189-8244-cded3ca209c&title=&width=735.2)
<a name="TNJco"></a>
### 1.linear-gradient 线性渐变
<a name="DwBpQ"></a>
#### 语法：
**<linear-gradient>** = linear-gradient([ [ [<angle>](../angle/angle.htm) | to [<side-or-corner>](#side-or-corner) ] ,]? [<color-stop>](#color-stop)[, [<color-stop>](#color-stop)]+)<br />**<side-or-corner>** = [left | right] || [top | bottom]<br />**<color-stop>** = [<color>](../color/color.htm) [ [<length>](../length/length.htm) | [<percentage>](../numeric/percentage.htm) ]?
<a name="pFTDg"></a>
#### 取值：
**下述值用来表示渐变的方向，可以使用角度或者关键字来设置：**<br />[<angle>](../angle/index.htm)： <br />用角度值指定渐变的方向（或角度）。 <br />to left： <br />设置渐变为从右到左。相当于: 270deg <br />to right： <br />设置渐变从左到右。相当于: 90deg <br />to top： <br />设置渐变从下到上。相当于: 0deg <br />to bottom： <br />设置渐变从上到下。相当于: 180deg。这是默认值，等同于留空不写。<br />**<color-stop> 用于指定渐变的起止颜色：**<br />[<color>](../color/color.htm)： <br />指定颜色。 <br />[<length>](../length/length.htm)： <br />用长度值指定起止色位置。不允许负值 <br />[<percentage>](../numeric/percentage.htm)： <br />用百分比指定起止色位置。 
<a name="zlD34"></a>
#### 示例
![image.png](https://cdn.nlark.com/yuque/0/2022/png/2494810/1652697147010-e689ea94-9681-426c-a053-1d9f3753393c.png#clientId=u96ce4021-f528-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=271&id=u8512499b&margin=%5Bobject%20Object%5D&name=image.png&originHeight=226&originWidth=579&originalType=binary&ratio=1&rotation=0&showTitle=false&size=13960&status=done&style=none&taskId=uae9c7434-651f-440d-bba6-de7a42d3e60&title=&width=694.2000122070312)
<a name="NuJ5x"></a>
### 2.background-clip 背景裁剪
<a name="RCmOl"></a>
#### 取值：
**border-box： **<br />从border区域（含border）开始向外裁剪背景。 <br />**padding-box： **<br />从padding区域（含padding）开始向外裁剪背景。 <br />**content-box： **<br />从content区域开始向外裁剪背景。 <br />**text**： <br />从前景内容的形状（比如文字）作为裁剪区域向外裁剪，如此即可实现使用背景作为填充色之类的遮罩效果。[遮罩效果](http://demo.doyoe.com/css3/background-clip/mask-text2.htm)See with Webkit

<a name="ZIE7E"></a>
## 11.JS实现a标签 _blank 的效果（跳转页面并打开一个新窗口）
很简单，只需要使用 window.open() 方法即可，有两个参数，第一个参数指定 url ，第二参数指定打开的位置，参数和 a 标签的 target 属性一样，如果要打开新页面就是 _blank 
```javascript
window.opne("https://www.baidu.com","_blank");
// 等效于 <a href="https://www.baidu.com" target="_blank"></a>
```
<a name="GDwAo"></a>
## 12.异步加载slide块时，swiper卡死问题
<a name="uULXs"></a>
### 原因：
swiper在初始化的时候就在swiper-[wrapper](https://so.csdn.net/so/search?q=wrapper&spm=1001.2101.3001.7020)下生成了已确定的swiper-slide的个数，（而异步加载会动态的决定swiper-slide的个数），如果数据不是初始化的时候就确定的，是异步获取的，就会导致无法滑动。<br />即在swiper初始化后如果直接动态修改 swiper-slide 的个数就会导致swiper卡死。
[![米哈游-TECH OTAKUS SAVE THE WORLD 和另外 18 个页面 - 个人 - Microsoft Edge 2022-05-17 01-29-49.mp4 (74.06MB)](https://gw.alipayobjects.com/mdn/prod_resou/afts/img/A*NNs6TKOR3isAAAAAAAAAAABkARQnAQ)]()<a name="Y6Vda"></a>
### 解决方法：
<a name="smYdX"></a>
#### 1. 获取数据，并渲染完所有swiper-slide后再对swiper进行初始化
以下，以jquery为例：
```javascript
var reportHtml = '';
$.ajax({
    type: "get",
    url: url,
    dataType: "json",
    success:function(data){
        $("#reportList").empty();
        for(var i=0;i<data.data.length;i++){
            reportHtml+='<div class="swiper-slide">'
                +'<img src="' + data.data[i].img + '">'
            +'</div>';
        }
        $("#reportList").append(reportHtml);
      //在为所有swiper-slide添加完毕后，在new 初始化swiper
        var swiper = new Swiper('.swiper-container', {
            slidesPerView : 3
        });
    }
});
```
<a name="XLP9T"></a>
#### 2. 添加观察参数，自动更新（推荐，一键解决）
添加 **observer、observeParents**<br />在 Swiper 的上启用**动态检查器(Mutation Observer)**，如果你更改swiper 的样式（隐藏/显示）或修改其子元素（添加/删除幻灯片），**Swiper 会更新（重新初始化）并触发 observerUpdate 事件。**<br />默认 false ，不开启动态检查器，此时可以使用** **[**update()**](https://www.swiper.com.cn/api/methods/257.html)** **方法手动更新。<br />注意：隐藏swiper 和删除slide 会触发两次事件，因为slide 不是swiper 真正的一级子元素。
```javascript
var mySwiper = new Swiper ('.swiper-container', {
    observer:true, // 修改swiper自己或子元素时，自动初始化swiper
    observeParents:true, // 修改swiper的父元素时，自动初始化swiper
    loop: true, // 循环模式选项
})
```
[![米哈游-TECH OTAKUS SAVE THE WORLD 和另外 18 个页面 - 个人 - Microsoft Edge 2022-05-17 01-30-17.mp4 (135.28MB)](https://gw.alipayobjects.com/mdn/prod_resou/afts/img/A*NNs6TKOR3isAAAAAAAAAAABkARQnAQ)]()<a name="FG0bS"></a>
## 13.background属性的复合写法
background的复合写法从左到右可以依次为：<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/2494810/1652758580575-e6be8622-bbde-4cd6-8900-e038c63bcc59.png#clientId=u3fe76990-bc4a-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=223&id=u108c5681&margin=%5Bobject%20Object%5D&name=image.png&originHeight=234&originWidth=606&originalType=binary&ratio=1&rotation=0&showTitle=false&size=23161&status=done&style=none&taskId=ub45cf209-6a58-4e88-998f-84661907e19&title=&width=578.8000183105469)<br />注意点：其中 size 在 position 后面写的时候要加一个斜杠 /  类似：
```css
background: url(test1.jpg) no-repeat 10px 20px/50px 60px
```
其中 10px 20px的斜杠后 / 的 50px 60px 即为background-size属性
<a name="DbCDc"></a>
### 实例
<a name="U1wl0"></a>
#### 缩写写法：
```css
background: url(test1.jpg) no-repeat scroll 10px 20px/50px 60px content-box padding-box,
	   url(test2.jpg) no-repeat scroll 10px 20px/70px 90px content-box padding-box,
	   url(test3.jpg) no-repeat scroll 10px 20px/110px 130px content-box padding-box #aaa;
```
<a name="my4Mg"></a>
#### 拆分写法：
```css
background-image: url(test1.jpg), url(test2.jpg), url(test3.jpg);
background-repeat: no-repeat, no-repeat, no-repeat;
background-attachment: scroll, scroll, scroll;
background-position: 10px 20px, 10px 20px, 10px 20px;
background-size: 50px 60px, 70px 90px, 110px 130px;
background-origin: content-box, content-box, content-box;
background-clip: padding-box, padding-box, padding-box;
background-color: #aaa;
```
<a name="VVOO4"></a>
## 14.绝对定位的位置会受父元素的宽高影响
一个有意思的现象，即使你看到相对定位的父元素顶部已经占满了页面，但是子元素用绝对定位设置 top 时，有时会不在我们预想的位置上，特别如果父元素设置了overflow:hidden。分析原因可能是 相对定位的父元素其超出浏览器可视窗口的部分虽然不可见，但是子元素仍然是以超出部分的边界来定位的，**高度/宽度增加或减少后都会影响父元素四边界的位置，进而导致与我们预想的绝对定位的位置不匹配，此时就要考虑父元素的宽高问题了。**
```css
.father {
  position: relative;
  width: 1000px; // 如果父元素的宽高不同，则子元素的定位位置可能也不同
  height: 1000px;
  overflow: hideen;
}

.child {
  position: absolute;
  top: 0;
  right: 0
}
```
<a name="XKVXO"></a>
### 简单示意图：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/2494810/1652767818085-a0b63436-27a6-4f96-bf60-6ef0e0e47962.png#clientId=u3fe76990-bc4a-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=613&id=u55505d6d&margin=%5Bobject%20Object%5D&name=image.png&originHeight=766&originWidth=1005&originalType=binary&ratio=1&rotation=0&showTitle=false&size=49536&status=done&style=none&taskId=u4ba39ea4-0f21-4738-a368-185da7382e9&title=&width=804)
<a name="Wq9bP"></a>
## 15.Nuxt3中监听路由变化
在Nuxt2/Nuxt3中可以直接通过 vue 的 watch 方法监听路由的 query 变化：
```vue
<script setup>
  const route = useRoute()
  const { data, refresh } = await useFetch('/api/user')
  watch(() => route.query, () => refresh())
</script>
```
```vue
也可以简写成：
<script setup>
  watch(() => useRoute().query, (newRoute, oldRoute) => {
    console.log(newRoute);
    console.log(oldRoute);
  })
</script>
```
但是！官网说Nuxt3中不支持这个方法，但是实际还是可以的，不知道为什么。<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/2494810/1652775681148-7051ab5a-09c8-4313-a47c-f4048906bf7c.png#clientId=u3fe76990-bc4a-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=309&id=u476fd937&margin=%5Bobject%20Object%5D&name=image.png&originHeight=386&originWidth=930&originalType=binary&ratio=1&rotation=0&showTitle=false&size=47101&status=done&style=none&taskId=ud8ed8025-5018-404e-9295-40b70d84d57&title=&width=744)<br />翻译：Nuxt 3 不支持此功能。作为代替，您可以直接使用 watcher 来触发重新获取数据。
<a name="RjXv5"></a>
## 16.CSS触发动画重新播放(很有意思的功能实现)
在css中通过类给元素添加动画，如果动画播放结束了，可以通过删除这个动画类名，然后重新给予类名的方式来刷新动画，**在vue中可以通过三元运算符或者 if 判断来为元素删除并重新添加类名，这样动画就会重新播放了。**
```vue
<template>
<img :src="item.bannerimg" alt="miHoYo_imitate" class="mibanner-game"
     :class="index == activeIndex ? 'animate' : ''" :style="style">
</template>

<script setup>
  // wathc监听路由的变化，在离开当前页面后轮播图不再播放，当回到该页面后重新播放并重新加载动画类，让动画也重新播放
  watch(() => useRoute().query, newRoute => {
    if (newRoute.page != 'product') {
      activeIndex.value = -1  // activeIndex的值控制动画是否加载，只需要变化这个值即可重新加载动画。
      pause(true)
    } else {
      activeIndex.value = swiper.activeIndex // activeIndex的值控制动画是否加载，只需要变化这个值即可重新加载动画。
      pause(false)
    }
  })
</script>
```
<a name="ve3t0"></a>
## 17.CSS用border边框实现小三角形
话说这个之前好像做过吧：
```css
b {
  width: 0;
  height: 0;
  margin-left: .14rem;
  border: .1rem solid transparent;
  border-left: .16rem solid #3d424d;
  transition: all 500ms;
  position: relative;
  z-index: 1;
  }
```
因为CSS中边框的交界处就是用三角形衔接的，所以只要元素的宽高都为0，就是一等腰三角形啦。
<a name="mPQoi"></a>
## 18.CSS让元素在切换时动起来，通过添加动态类名实现
如果我们希望子元素在某一时刻按照一定规则过渡动画，那么可以通过先设定一个预设类名，在该类名下设定子元素的最终样式，然后再给子元素单独设定一个起始样式和过渡规则（transition），之后只需要给父类添加这个预设的类名，这样子元素自然会获得该类下的样式，进而改变当前样式，并且由于设置了过渡，那么子元素就会动起来了，其实有点像手动实现css动画的效果，其实用animation实现也是可以的。
<a name="pXpDk"></a>
#### 举个例子：
我们预先设定一个 .animated 类，在该类下 .foo .bar 有着最终的样式：
```css
.animated .foo {
  width: 1000px;
  height: 1000px;
}

.animated .bar {
  color: red;
}
```
并且还要给他们设定原始的样式和过渡规则：
```css
.foo {
  width: 500px;
  height: 500px;
  transition: all 300ms
}
.bar {
  color: green;
  transition: color 300ms;
}
```
他们有着共同的父元素 .father 
```html
<div class="father">
  <div class="foo"></div>
  <div class="bar"></div>
</div>
```
此时由于 animated 类不存在，所以子元素不会产生变化，所以我们只需要给父元素动态添加 animated 类，即可影响所有的子元素，使他们进行过渡动画。
```vue
<div class="father" :class="show==true?:'animated':''">
  <div class="foo"></div>
  <div class="bar"></div>
</div>
```
这里我们让 show 这个变量管理是否添加animated类，只要将show的值变为true，那么所有的子元素就会动起来了。并且我们还可以给子类设置不同的过渡延迟，这样会更有层次感：
```css
.foo {
  width: 500px;
  height: 500px;
  transition: all 300ms;
  transition-delay: 300ms;
}
.bar {
  color: green;
  transition: color 300ms;
  transition-delay: 500ms;

}
```
此时添加 animated 类后 .foo 块先动， .bar 后动。
<a name="zy3QL"></a>
#### 米哈游官网右侧的游戏信息就是用这样的原理做到的。
[![米哈游-TECH OTAKUS SAVE THE WORLD 和另外 18 个页面 - 个人 - Microsoft Edge 2022-05-17 01-30-17.mp4 (135.28MB)](https://gw.alipayobjects.com/mdn/prod_resou/afts/img/A*NNs6TKOR3isAAAAAAAAAAABkARQnAQ)]()![微信截图_20220516195534.png](https://cdn.nlark.com/yuque/0/2022/png/2494810/1652805386996-905c2282-d828-40c1-8a4a-345c39949fe8.png#clientId=u3fe76990-bc4a-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=u326336cf&margin=%5Bobject%20Object%5D&name=%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20220516195534.png&originHeight=623&originWidth=753&originalType=binary&ratio=1&rotation=0&showTitle=false&size=48924&status=done&style=none&taskId=u673e2762-7529-4da0-9c7b-1f34e8d3cce&title=)
<a name="XXCrG"></a>
## 19.接上，给swiper-slide块动态添加类名时，swiper-slide-active无法被添加问题
swiper中会给当前正在活动的块自动添加一个 .swiper-slide-active 类，但如果我们像18中那样给 slide 动态添加类名，则有可能导致 swiper-slide-active 的自动添加被卡住，也就是说无法正常添加这个类，进而导致整个页面上一些部分无法启效果，比如 hover 等。<br />初步分析应该，添加 animated类之后，页面上的元素正在播放，此时css不会继续添加类，而是会等到动画结束后才添加，但是由于动画结束后刚好到了siwper自动滑动的时间，就导致滑动到下一个块后，仍是先播放动画再添加 swiper-slide-active 类，恶性循环，导致类名一直无法添加。
```html
<div class="swiper-slide" v-for="(item, index) in datasets" :class="index == activeIndex ? 'animated' : ''">
        <div class="minbanner">
```
![image.png](https://cdn.nlark.com/yuque/0/2022/png/2494810/1652844028564-f68e48f2-5683-4a4e-b5e8-080abc91eab4.png#clientId=ubd61df46-2531-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=182&id=ue03a6720&margin=%5Bobject%20Object%5D&name=image.png&originHeight=227&originWidth=502&originalType=binary&ratio=1&rotation=0&showTitle=false&size=25412&status=done&style=none&taskId=u8dd8d601-a714-49c3-8584-6dfd87fa7c5&title=&width=401.6)<br />可以看到 本应该处于 .swiper-slide-active 的块此时并没有这个类，只有animated。<br />此时需要手动点击导航，才能让他重新获取这个类。<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/2494810/1652844090190-53666bfa-8a06-4a42-abdc-82afb31313cd.png#clientId=ubd61df46-2531-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=180&id=u131d5a48&margin=%5Bobject%20Object%5D&name=image.png&originHeight=225&originWidth=492&originalType=binary&ratio=1&rotation=0&showTitle=false&size=26370&status=done&style=none&taskId=u34c6e56d-89ba-426f-8179-17c5f033bc5&title=&width=393.6)<br />说明 .swiper-slide-active 类的添加，被 .animated 类卡住了。
<a name="jTDts"></a>
### 解决方法
1.不要动态给swiper-slide添加类名，**给其子块**，比如随便一个div添加animated。<br />2.将animate的动画时间缩短，缩短到比轮播图自动播放的时间间隔更短，或许能解决问题。
```html
<div class="swiper-slide" v-for="(item, index) in datasets">
  <div class="minbanner" :class="index == activeIndex ? 'animated' : ''">
    <!--任意内容-->
  </div>
</div>
```
![image.png](https://cdn.nlark.com/yuque/0/2022/png/2494810/1652844387812-cc42c510-eff0-4d92-aaf9-ab2651a86d4b.png#clientId=ubd61df46-2531-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=150&id=u5fc8fe01&margin=%5Bobject%20Object%5D&name=image.png&originHeight=187&originWidth=497&originalType=binary&ratio=1&rotation=0&showTitle=false&size=18277&status=done&style=none&taskId=u0ff97494-785f-416d-8f13-ce3cb863145&title=&width=397.6)<br />这样 swiper-slide 就能正确获取 swiper-slide-active 类，并且子元素也能通过animate带来做一些动画过渡效果了。

<a name="XZ0GH"></a>
### 20.transform：translate或许有塌陷问题
![image.png](https://cdn.nlark.com/yuque/0/2022/png/2494810/1659534617222-acdd85c5-b9f5-4c87-b8c9-843672599f3b.png#clientId=u94bc53a4-5733-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=143&id=u5b9e0133&margin=%5Bobject%20Object%5D&name=image.png&originHeight=179&originWidth=556&originalType=binary&ratio=1&rotation=0&showTitle=false&size=12853&status=done&style=none&taskId=u439b4ad4-d78f-4852-8f87-b7355f23989&title=&width=444.8) 图一<br />前提：容器高度为0.9rem。三个子元素高度都为0.3rem。测试时，发现设置其中一个子元素的背景色后，在继续用transfrom:translateY进行Y轴移动时子元素发生塌陷。<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/2494810/1659534718302-d8bca654-aa43-4d43-990d-ec500516755e.png#clientId=u94bc53a4-5733-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=99&id=uddebde26&margin=%5Bobject%20Object%5D&name=image.png&originHeight=124&originWidth=467&originalType=binary&ratio=1&rotation=0&showTitle=false&size=9653&status=done&style=none&taskId=u12baecbd-878a-4837-a11f-46aa4160542&title=&width=373.6)<br />可以看到。左侧的子元素高度变窄了。<br />在完善代码后，在点击后取消translate操作后，高度恢复正常，如图一所示。<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/2494810/1659534789777-77c575aa-43bc-453f-912b-1f6a2b8ca17c.png#clientId=u94bc53a4-5733-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=126&id=u674fd0c7&margin=%5Bobject%20Object%5D&name=image.png&originHeight=158&originWidth=568&originalType=binary&ratio=1&rotation=0&showTitle=false&size=11850&status=done&style=none&taskId=ua98b4f00-4a7c-40ec-957a-22c710f146a&title=&width=454.4)<br />初步判断可能的原因是块级元素span的行高和高度在active状态下与原高度.3rem之间还有一些差距，所以导致塌陷问题。

<a name="WeXDH"></a>
### 21.Uncaught SyntaxError: Duplicate export of 'definePageMeta'
这个问题困扰我很久了，每次都只能重启项目才会恢复。

<a name="Kv2SZ"></a>
### 22.mounted/onMounted方法中无法获取dom元素问题
原因：在vue 的mounted生命周期中，页面上的DOM元素可能没有完全渲染完毕，所以同步任务document.querySelector()可能获取不到DOM元素。<br />**注意：该现象也会出现在created中，解决方法相同。**<br />**注意：以下方法不要直接写在scirpt setup下，因为底下的东西最后都会被编译小时，无法获取dom元素，最好写在onMounted中。**<br />解决办法：

1. 使用setTImeout，setTimeout为宏任务，会在vue的renderer执行完毕后再执行，此时一定能获得dom元素
1. 使用vue提供的 nextTick() 方法，该方法传入一个回调函数，该函数会被添加到下一次事件循环中。当当前任务队列全部执行完毕后执行该回调函数，此时上一队列任务全部完成即DOM元素也一定渲染完成。所以也一定能获取dom元素。（在vue2中使用this.$nextTick()，在vue3中script setup可以直接使用 nextTick() ）

以下，只以Vue3作为例子：
```vue
<script setup>
  onMounted(){
    setTimeout(()=>{
      document.getElementById("demo")
    },1)
  }
</script>
```
```vue
<script setup>
  onMounted(){
    nextTick(()=>{
      document.getElementById("demo")
    })
  }
</script>
```
