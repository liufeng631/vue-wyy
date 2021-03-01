import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
// 图片懒加载
import VueLazyload from 'vue-lazyload'

import Loading from './plugin/loading/index'
// 导入处理seo插件
import MetaInfo from 'vue-meta-info'

Vue.use(MetaInfo)
// 注意点: 如果想通过use的方式来注册组件, 那么必须先将组件封装成插件
Vue.use(Loading, {
  title: '正在加载中...'
})
Vue.use(VueLazyload, {
  // 在找到图片 把:img= 换成v-lazy
  // 设置图片还未加载好的图片
  loading: require('./assets/images/loadding.gif'),

})
// 处理浏览器的默认设置
import './assets/css/base.scss'
fastclick.attach(document.body)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  // 这个是安装预渲染插件之后添加的   vue add prerender-spa
  mounted: () => document.dispatchEvent(new Event("x-app-rendered")),
}).$mount('#app')
