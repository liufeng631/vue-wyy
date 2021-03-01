<template>
  <ul class="song-list">
    <li
      v-for="value in songs"
      :key="value.id"
      class="item"
      @click="selectMusic(value.id)"
    >
      <img v-lazy="value.picUrl" alt="" />
      <div>
        <h3>{{ value.name }}</h3>
        <p>{{ value.singer }}</p>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    songs: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  methods: {
    ...mapActions(["setFullScreen", "setSongDetail"]),
    selectMusic(id) {
      this.setFullScreen(true);
      this.setSongDetail([id]);
    },
  },
};
</script>
<style scoped lang="scss">
@import "../assets/css/mixin";
@import "../assets/css/variable";
.song-list {
  width: 100%;

  .item {
    width: 100%;
    height: 200px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    margin-bottom: 15px;
    border-bottom: 1px solid #ccc;
    img {
      width: 120px;
      height: 120px;
      border-radius: 20px;
      margin-right: 25px;
    }
    div {
      h3 {
        @include font_size($font_large);
        @include font_color();
      }
      p {
        @include font_size($font_medium);
        @include font_color();
        opacity: 0.6;
        margin-top: 20px;
      }
    }
  }
}
</style>