<template>
  <swiper
    :options="swiperOptions"
    class="banner"
    ref="mySwiper"
    v-if="banners.length > 0"
  >
    <swiper-slide v-for="value in banners" :key="value.bannerId" class="item">
      <a :href="value.url"> <img v-lazy="value.pic" alt="" /></a
    ></swiper-slide>

    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
// 在这里温馨提示 我试了半天  默认下载的swiper是6以上的  分页器显示不出来 npm install swiper@5.4.5 --save 就可以显示
import "swiper/css/swiper.css";
export default {
  data() {
    return {
      swiperOptions: {
        loop: true, // 循环模式选项

        autoplay: {
          delay: 1000, //自动切换的时间间隔，单位ms
          stopOnLastSlide: false, //如果设置为true，当切换到最后一个slide时停止自动切换。（loop模式下无效）
          disableOnInteraction: true,
          //用户操作swiper之后，是否禁止autoplay。默认为true：停止。
          // 如果设置为false，用户操作swiper之后自动切换不会停止，每次都会重新启动autoplay。
          // 操作包括触碰(touch)，拖动，点击pagination等。
        },
        pagination: {
          //使用分页器导航。分页器可使用小圆点样式（默认）、分式样式或进度条样式。
          el: ".swiper-pagination",
        },
        //启动动态检查器(OB/观众/观看者)，当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper。
        // 默认false，不开启，可以使用update()方法更新
        observer: true,
        //将observe应用于Swiper的父元素。当Swiper的父元素变化时，例如window.resize，Swiper更新。
        observeParents: true,
        //子slide更新时，swiper是否更新。默认为false不更新。
        observeSlideChildren: true,
      },
    };
  },

  props: {
    banners: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  directives: {
    swiper: directive,
  },
};
</script>
<style scoped lang="scss">
.banner {
  .item {
    img {
      width: 100%;
      height: 300px;
    }
  }
}
</style>
<style lang="scss">
@import "../../assets/css/variable";
@import "../../assets/css/mixin";
.swiper-pagination-bullet {
  width: 16px;
  height: 16px;
  background: #ccc;
  opacity: 1;
}
.swiper-pagination-bullet-active {
  @include bg_color();
}
</style>