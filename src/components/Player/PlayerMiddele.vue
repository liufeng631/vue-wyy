<template>
  <swiper :options="swiperOptions" class="banner" ref="mySwiper">
    <swiper-slide class="cd">
      <div class="cd-warpper" ref="cdWarpper">
        <img :src="currentSong.picUrl" alt="" />
      </div>
      <p>{{ getFirstLyric() }}</p>
    </swiper-slide>
    <swiper-slide class="lyric" ref="lyric">
      <ScrollView ref="scrollView">
        <ul>
          <li
            v-for="(value, key) in currentLyric"
            :key="key"
            :class="{ active: currentLineNum === key }"
          >
            {{ value }}
          </li>
        </ul>
      </ScrollView>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import ScrollView from "../../components/ScrollView";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      swiperOptions: {
        pagination: {
          //使用分页器导航。分页器可使用小圆点样式（默认）、分式样式或进度条样式。
          el: ".swiper-pagination",
          bulletClass: "my-bullet",
          bulletActiveClass: "my-bullet-active",
        },
        //启动动态检查器(OB/观众/观看者)，当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper。
        // 默认false，不开启，可以使用update()方法更新
        observer: true,
        //将observe应用于Swiper的父元素。当Swiper的父元素变化时，例如window.resize，Swiper更新。
        observeParents: true,
        //子slide更新时，swiper是否更新。默认为false不更新。
        observeSlideChildren: true,
      },
      currentLineNum: "0",
    };
  },
  components: {
    Swiper,
    SwiperSlide,
    ScrollView,
  },
  directives: {
    swiper: directive,
  },
  computed: {
    ...mapGetters(["isPlaying", "currentSong", "currentLyric"]),
  },
  watch: {
    isPlaying(newValue, oldValue) {
      if (newValue) {
        this.$refs.cdWarpper.classList.add("active");
      } else {
        this.$refs.cdWarpper.classList.remove("active");
      }
    },
    currentTime(newValue, oldValue) {
      /*
      //高亮歌词同步
      let lineNum = Math.floor(newValue) + "";
      let result = this.currentLyric[lineNum];
      if (result !== undefined && result != "") {
        // 解决歌词样式问题
        this.currentLineNum = lineNum;
        let currentLyricTop = document.querySelector("li.active").offsetTop;
        // console.log(currentLyricTop);
        // 拿到整个歌词界面
        let lyricHeight = this.$refs.lyric.$el.offsetHeight;
        // console.log(lyricHeight);
        if (currentLyricTop > lyricHeight / 2) {
          // console.log("开始滚动");
          this.$refs.scrollView.scrollTo(
            0,
            lyricHeight / 2 - currentLyricTop,
            100
          );
        }
      }
      // console.log(this.currentLineNum);
      //2.歌词到中间滚动
      */
      let lineNum = Math.floor(newValue) + "";
      this.currentLineNum = this.getActiveLineNum(lineNum);
      let currentLyricTop = document.querySelector("li.active").offsetTop;
      // console.log(currentLyricTop);
      // 拿到整个歌词界面
      let lyricHeight = this.$refs.lyric.$el.offsetHeight;
      // console.log(lyricHeight);
      if (currentLyricTop > lyricHeight / 2) {
        // console.log("开始滚动");
        this.$refs.scrollView.scrollTo(
          0,
          lyricHeight / 2 - currentLyricTop,
          100
        );
      } else {
        this.$refs.scrollView.scrollTo(0, 0, 100);
      }
    },
    currentLyric(newValue, oldValue) {
      for (let key in newValue) {
        this.currentLineNum = key;
        return;
      }
    },
  },
  methods: {
    getFirstLyric() {
      for (let key in this.currentLyric) {
        // console.log(this.currentLyric[key]);
        return this.currentLyric[key];
      }
    },
    getActiveLineNum(lineNum) {
      if (lineNum < 0) {
        return;
      }
      let result = this.currentLyric[lineNum + ""];
      if (result === undefined || result === "") {
        lineNum--;
        return this.getActiveLineNum(lineNum);
      } else {
        return lineNum + "";
      }
    },
  },
  props: {
    currentTime: {
      type: Number,
      default: 0,
      required: true,
    },
  },
};
</script>
<style scoped lang="scss">
@import "../../assets/css/variable";
@import "../../assets/css/mixin";
.banner {
  position: fixed;
  top: 150px;
  bottom: 250px;
  left: 0;
  right: 0;
  .cd {
    .cd-warpper {
      margin: 0 auto;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      border: 30px solid #fff;
      overflow: hidden;
      animation: sport 5s linear infinite;
      animation-play-state: paused;
      &.active {
        animation-play-state: running;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    p {
      text-align: center;
      @include font_size($font_medium);
      @include font_color();
      margin-top: 50px;
      color: #fff;
    }
  }
  .lyric {
    li {
      text-align: center;
      @include font_size($font_medium);
      @include font_color();
      margin: 15px 0;
      &:last-of-type {
        padding-bottom: 50%;
      }
      &.active {
        color: #fff;
      }
    }
  }
}
@keyframes sport {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
<style lang="scss">
@import "../../assets/css/variable";
@import "../../assets/css/mixin";
.my-bullet {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background: #fff;
  margin: 0 20px;
}
.my-bullet-active {
  width: 60px;
  @include bg_color();
}
</style>