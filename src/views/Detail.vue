<template>
  <div class="detail">
    <SubHeader :title="playList.name"></SubHeader>
    <DetailTop :path="playList.coverImgUrl" ref="top"></DetailTop>
    <div class="bottom">
      <ScrollView ref="scrollview">
        <DetailBottom :playlist="playList.tracks"></DetailBottom>
      </ScrollView>
    </div>
  </div>
</template>

<script>
import {
  getPlayList,
  getAlbumItem,
  getArtistsSongs,
  getTopList,
} from "../api/index";
import SubHeader from "../components/Detail/DetailHeader";
import DetailTop from "../components/Detail/DetailTop";
import DetailBottom from "../components/Detail/DetailBottom";
import ScrollView from "../components/ScrollView";
import MetaInfo from "../../vue-meta-info";
export default {
  metaInfo: MetaInfo.detail,
  components: {
    SubHeader,
    DetailTop,
    DetailBottom,
    ScrollView,
  },
  data() {
    return {
      playList: {},
    };
  },
  created() {
    if (this.$route.params.type === "personalized") {
      getPlayList({ id: this.$route.params.id })
        .then((data) => {
          // console.log(this.$route);
          // console.log(this.$route.params.id);
          // console.log(data);
          this.playList = data.playlist;
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (this.$route.params.type === "album") {
      getAlbumItem({ id: this.$route.params.id })
        .then((data) => {
          //   console.log(data);

          this.playList = {
            name: data.album.name,
            coverImgUrl: data.album.picUrl,
            tracks: data.songs,
          };
          //   console.log(this.playList);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (this.$route.params.type === "singer") {
      getArtistsSongs({ id: this.$route.params.id })
        .then((data) => {
          //   console.log(data);

          this.playList = {
            name: data.artist.name,
            coverImgUrl: data.artist.picUrl,
            tracks: data.hotSongs,
          };
          //   console.log(this.playList);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (this.$route.params.type === "rank") {
      getTopList({ idx: this.$route.params.id })
        .then((data) => {
          this.playlist = {
            name: data.playlist.name,
            coverImgUrl: data.playlist.creator.backgroundUrl,
            tracks: data.playlist.tracks,
          };
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  mounted() {
    let defaultHeight = this.$refs.top.$el.offsetHeight;
    // console.log(defaultHeight);
    this.$refs.scrollview.scrolling((offsetY) => {
      //   console.log(offsetY);

      if (offsetY < 0) {
        //   这样设置在安卓如丝般的顺滑  但是在苹果系统中不行 高斯模糊效果非常消耗性能的，不推荐在移动端中使用 太卡了
        // 如果非要在移动端使用 那么建议只设置一次
        // let scale = (10 * Math.abs(offsetY)) / defaultHeight;
        // this.$refs.top.$el.style.filter = `blur(${scale}px)`;
        let scale = Math.abs(offsetY) / defaultHeight;
        this.$refs.top.changeMask(scale);
        // console.log(this.$refs.top.changeMask);
      } else {
        let scale = 1 + offsetY / defaultHeight;
        this.$refs.top.$el.style.transform = `scale(${scale})`;
      }
    });
  },
};
</script>
<style scoped lang="scss">
@import "../assets/css/mixin";
@import "../assets/css/variable";
.detail {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  //   background: pink;
  @include bg_sub_color();
  .bottom {
    position: fixed;
    top: 500px;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>