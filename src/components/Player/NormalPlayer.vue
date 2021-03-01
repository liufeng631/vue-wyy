<template>
  <transition :css="false" @enter="enter" @leave="leave">
    <!-- <div class="normal-player" v-show="this.$store.getters.isFullScreen">this.$store.getters.isFullScreen这样比较冗余 -->
    <div class="normal-player" v-show="this.isFullScreen">
      <div class="player-warpper">
        <PlayerHeader></PlayerHeader>
        <PlayerMiddele :currentTime="currentTime"></PlayerMiddele>
        <PlayerBottom
          :totalTime="totalTime"
          :currentTime="currentTime"
        ></PlayerBottom>
      </div>
      <div class="player-bg">
        <img :src="currentSong.picUrl" alt="" />
      </div>
    </div>
  </transition>
</template>

<script>
import PlayerHeader from "./PlayerHeader";
import PlayerMiddele from "./PlayerMiddele";
import PlayerBottom from "./PlayerBottom";
import { mapGetters, mapActions } from "vuex";
import Velocity from "velocity-animate";
// 这个是他自己封装的动画 我们可以使用
import "velocity-animate/velocity.ui";
export default {
  components: {
    PlayerHeader,
    PlayerMiddele,
    PlayerBottom,
  },
  computed: {
    ...mapGetters(["isFullScreen", "currentSong"]),
  },
  methods: {
    ...mapActions(["getSongLyric"]),
    // 安装velocity-animate  可以在这里面使用
    enter(el, done) {
      Velocity(
        el,
        "transition.shrinkIn",
        {
          duration: 1000,
        },
        function () {
          done();
        }
      );
    },
    leave(el, done) {
      Velocity(
        el,
        "transition.shrinkOut",
        {
          duration: 1000,
        },
        function () {
          done();
        }
      );
    },
  },
  watch: {
    currentSong(newValue, oldValue) {
      // 如果把歌曲全部删除 就让其不执行

      if (newValue.id === undefined) {
        return;
      }
      // console.log(newValue);
      this.getSongLyric(newValue.id);
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
@import "../../assets/css/variable";
@import "../../assets/css/mixin";
.normal-player {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  @include bg_sub_color();
  //   background: pink;
  .player-warpper {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 999;
  }
  .player-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    img {
      height: 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      filter: blur(10px);
    }
  }
}
</style>