<template>
  <div class="recommend">
    <div class="recommend-warpper">
      <!-- 这里加个div是苹果手机上的问题 -->
      <ScrollView>
        <div>
          <Banner :banners="banners"></Banner>
          <Personalized
            :personalized="personalized"
            :title="'推荐歌单'"
            @select="fatherSelectItem"
            :type="'personalized'"
          ></Personalized>
          <Personalized
            :personalized="album"
            :title="'最新专辑'"
            @select="fatherSelectItem"
            :type="'album'"
          ></Personalized>
          <SongList :songs="songs"></SongList>
        </div>
      </ScrollView>
    </div>

    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { getBanner, getPersonalized, getAlbum, getNewsong } from "../api/index";
// 轮播图
import Banner from "../components/Recommend/Banner";
import Personalized from "../components/Recommend/Personalized";
import SongList from "../components/Recommend/SongList";
import ScrollView from "../components/ScrollView";
import MetaInfo from "../../vue-meta-info";
export default {
  metaInfo: MetaInfo.recommend,
  data() {
    return {
      // 存储轮播图
      banners: [],
      // 存储推荐歌单
      personalized: [],
      //最新专辑
      album: [],
      //最新音乐
      songs: [],
    };
  },
  methods: {
    fatherSelectItem(id, type) {
      this.$router.push({
        path: `/recommend/detail/${id}/${type}`,
      });
    },
  },
  components: {
    Banner,
    Personalized,
    SongList,
    ScrollView,
  },
  created() {
    getBanner()
      .then((data) => {
        // console.log(data);
        this.banners = data.banners;
      })
      .catch(function (error) {
        console.log(error);
      });
    getPersonalized()
      .then((data) => {
        // console.log(data);
        this.personalized = data.result;
      })
      .catch(function (error) {
        console.log(error);
      });
    getAlbum()
      .then((data) => {
        // console.log(data.albums.splice(0, 6));
        this.album = data.albums.splice(0, 6);
      })
      .catch(function (error) {
        console.log(error);
      });
    getNewsong()
      .then((data) => {
        // console.log(data);
        // this.songs = data.result;
        let list = [];
        data.result.forEach((value) => {
          let obj = {};
          obj.id = value.id;
          obj.name = value.name;
          obj.picUrl = value.song.album.picUrl;
          let singer = "";
          for (let i = 0; i < value.song["artists"].length; i++) {
            if (i === 0) {
              singer = value.song["artists"][i].name;
            } else {
              singer += "-" + value.song["artists"][i].name;
            }
          }
          obj.singer = singer;
          list.push(obj);
        });
        this.songs = list;
      })
      .catch(function (err) {
        console.log(err);
      });
  },
};
</script>
<style scoped lang="scss">
.recommend {
  // 是为了iscroll这个插件滚动
  position: fixed;
  top: 184px;
  left: 0;
  right: 0;
  bottom: 0;
  // overflow: hidden;
  .recommend-warpper {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
.v-enter {
  transform: translateX(100%);
}
.v-enter-to {
  transform: translateX(0%);
}
.v-enter-active {
  transition: transform 1s;
}
.v-leave {
  transform: translateX(0%);
}
.v-leave-to {
  transform: translateX(100%);
}
.v-leave-active {
  transition: transform 1s;
}
</style>