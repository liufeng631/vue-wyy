<template>
  <div class="player-bottom">
    <div class="bottom-progress">
      <span ref="eleCurrentTime">00:00</span>
      <div class="progress-bar" @click="progressClick" ref="progressBar">
        <div class="progress-line" ref="progressLine">
          <div class="progress-dot"></div>
        </div>
      </div>
      <span ref="eleTotalTime">00:00</span>
    </div>
    <div class="bottom-controll">
      <div class="mode loop" @click="mode" ref="mode"></div>
      <div class="prev" @click="prev"></div>
      <div class="play" @click="play" ref="play"></div>
      <div class="next" @click="next"></div>
      <div
        class="favorite"
        @click="favorite"
        :class="{ active: isFavorite(currentSong) }"
      ></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import modeTypes from "../../store/modeType";
export default {
  methods: {
    ...mapActions([
      "setPlaying",
      "setModeType",
      "setCurrentIndex",
      "setCurrentTime",
      "setFavoriteSong",
    ]),
    play() {
      this.setPlaying(!this.isPlaying);
    },
    prev() {
      this.setCurrentIndex(this.currentIndex - 1);
    },
    next() {
      this.setCurrentIndex(this.currentIndex + 1);
    },
    mode() {
      if (this.modeType === modeTypes.loop) {
        this.setModeType(modeTypes.one);
      } else if (this.modeType === modeTypes.one) {
        this.setModeType(modeTypes.random);
      } else if (this.modeType === modeTypes.random) {
        this.setModeType(modeTypes.loop);
      }
    },
    favorite() {
      this.setFavoriteSong(this.currentSong);
    },
    isFavorite(song) {
      let result = this.favoriteList.find(function (currentValue) {
        return currentValue.id === song.id;
      });
      return result !== undefined;
    },
    progressClick(e) {
      // 1.计算进度条的位置
      // 拿到进度条距离左边的位置
      // let normalLeft = e.target.offsetLeft;
      let normalLeft = this.$refs.progressBar.offsetLeft;
      // 拿到距离左边的位置
      let eventLeft = e.pageX;
      let clickLeft = eventLeft - normalLeft;
      // 拿到进度条的宽度
      // let progressWidth = e.target.offsetWidth;
      let progressWidth = this.$refs.progressBar.offsetWidth;
      let value = clickLeft / progressWidth;
      this.$refs.progressLine.style.width = value * 100 + "%";
      // 2.计算当前应该从什么位置开始播放
      let currentTime = this.totalTime * value;
      // console.log(currentTime);
      this.setCurrentTime(currentTime);
    },
    formartTime(time) {
      // 2.得到两个时间之间的差值(秒)
      let differSecond = time;
      // 3.利用相差的总秒数 / 每一天的秒数 = 相差的天数
      let day = Math.floor(differSecond / (60 * 60 * 24));
      day = day >= 10 ? day : "0" + day;
      // 4.利用相差的总秒数 / 小时 % 24;
      let hour = Math.floor((differSecond / (60 * 60)) % 24);
      hour = hour >= 10 ? hour : "0" + hour;
      // 5.利用相差的总秒数 / 分钟 % 60;
      let minute = Math.floor((differSecond / 60) % 60);
      minute = minute >= 10 ? minute : "0" + minute;
      // 6.利用相差的总秒数 % 秒数
      let second = Math.floor(differSecond % 60);
      second = second >= 10 ? second : "0" + second;
      return {
        day: day,
        hour: hour,
        minute: minute,
        second: second,
      };
    },
  },
  computed: {
    ...mapGetters([
      "isPlaying",
      "modeType",
      "currentIndex",
      "currentSong",
      "favoriteList",
    ]),
  },
  watch: {
    isPlaying(newValue, oldValue) {
      if (newValue) {
        //重点
        this.$refs.play.classList.add("active");
      } else {
        //重点
        this.$refs.play.classList.remove("active");
      }
    },
    modeType(newValue, oldValue) {
      if (newValue === modeTypes.loop) {
        this.$refs.mode.classList.remove("random");
        this.$refs.mode.classList.add("loop");
      } else if (newValue === modeTypes.one) {
        this.$refs.mode.classList.remove("loop");
        this.$refs.mode.classList.add("one");
      } else if (newValue === modeTypes.random) {
        this.$refs.mode.classList.remove("one");
        this.$refs.mode.classList.add("random");
      }
    },
    totalTime(newValue, oldValue) {
      let time = this.formartTime(newValue);
      this.$refs.eleTotalTime.innerHTML = time.minute + ":" + time.second;
    },
    currentTime(newValue, oldValue) {
      // 格式化当前歌曲播放的时间

      let time = this.formartTime(newValue);
      this.$refs.eleCurrentTime.innerHTML = time.minute + ":" + time.second;
      //2根据当前播放的时间计算进度比例
      let value = (newValue / this.totalTime) * 100;
      this.$refs.progressLine.style.width = value + "%";
    },
  },
  props: {
    totalTime: {
      type: Number,
      default: 0,
      required: true,
    },
    currentTime: {
      type: Number,
      default: 0,
      required: true,
    },
  },
};
</script>
<style scoped lang="scss">
@import "../../assets/css/mixin";
@import "../../assets/css/variable";
.player-bottom {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  .bottom-progress {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-items: center;
    span {
      @include font_size($font_medium);
      @include font_color();
    }
    .progress-bar {
      width: 100%;
      height: 10px;
      margin: 0 10px;
      background: #fff;
      .progress-line {
        width: 0%;
        height: 100%;
        background: #ccc;
        position: relative;
        .progress-dot {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #fff;

          position: absolute;
          top: 50%;
          left: 100%;
          transform: translateY(-50%);
        }
      }
    }
  }
  .bottom-controll {
    width: 80%;
    margin: 0 auto;
    padding: 50px 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
      width: 84px;
      height: 84px;
    }
    .mode {
      @include bg_img("../../assets/images/loop");
      &.loop {
        @include bg_img("../../assets/images/loop");
      }
      &.one {
        @include bg_img("../../assets/images/one");
      }
      &.random {
        @include bg_img("../../assets/images/shuffle");
      }
    }
    .prev {
      @include bg_img("../../assets/images/prev");
    }
    .play {
      @include bg_img("../../assets/images/play");
      &.active {
        @include bg_img("../../assets/images/pause");
      }
    }
    .next {
      @include bg_img("../../assets/images/next");
    }
    .favorite {
      @include bg_img("../../assets/images/un_favorite");
      &.active {
        @include bg_img("../../assets/images/favorite");
      }
    }
  }
}
</style>