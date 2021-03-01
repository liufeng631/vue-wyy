<template>
  <div id="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import IScroll from "iscroll/build/iscroll-probe";

export default {
  mounted() {
    this.iscroll = new IScroll(this.$refs.wrapper, {
      mouseWheel: true,
      scrollbars: false, //不需要显示滚动条
      probeType: 3,
      //   解决拖拽卡顿问题
      scrollX: false,
      scrollY: true,
      disablePointer: true,
      disableTouch: false,
      disaableMouse: true,
    });
    // 数据是从网络上获取的 要从新计算高度
    // setTimeout(() => {
    //   this.iscroll.refresh();
    // }, 1000);
    // 1.创建观察者对象
    //MutationObserver构造函数只要监听到了指定内容发生了变化，就会执行传入的回调函数
    //mutationList：发生变化的数组
    //observer观察者对象
    let observer = new MutationObserver((mutationList, observer) => {
      this.iscroll.refresh();
    });
    // 2.告诉观察者对象 我们需要观察什么内容
    let config = {
      childList: true, //观察目标子节点的变化，添加或者删除
      subtree: true, //默认为false，设置为true可以观察后代节点
      attributeFilter: ["height", "offsetHeight"],
    };
    //3.告诉观察者对象，我们需要观察谁，需要观察什么内容
    //第一个参数：告诉观察者都西昂我们需要观察谁  第二个参数：告诉观察者我们需要什么内容
    observer.observe(this.$refs.wrapper, config);
  },
  methods: {
    scrolling(fn) {
      this.iscroll.on("scroll", function () {
        fn(this.y);
      });
    },
    refresh() {
      setTimeout(() => {
        this.iscroll.refresh();
      }, 200);
    },
    scrollTo(x, y, time) {
      this.iscroll.scrollTo(x, y, time);
    },
  },
};
</script>
<style scoped lang="scss">
#wrapper {
  width: 100%;
  height: 100%;
}
</style>