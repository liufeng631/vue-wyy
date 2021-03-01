import Vue from 'vue'
import VueRouter from 'vue-router'

// 实现vue按需加载
const Recommend = (resolve) => {
  import('../views/Recommend')
    .then((module) => {
      resolve(module)
    })
}
const Singer = (resolve) => {
  import('../views/Singer')
    .then((module) => {
      resolve(module)
    })
}
const Rank = (resolve) => {
  import('../views/Rank')
    .then((module) => {
      resolve(module)
    })
}
const Search = (resolve) => {
  import('../views/Search')
    .then((module) => {
      resolve(module)
    })
}
const Detail = (resolve) => {
  import('../views/Detail')
    .then((module) => {
      resolve(module)
    })
}
const Account = (resolve) => {
  import('../views/Account')
    .then((module) => {
      resolve(module)
    })
}
Vue.use(VueRouter)

const routes = [
  // 重定向路由
  { path: '/', redirect: '/recommend' },
  {
    path: '/recommend', component: Recommend,
    children: [{
      path: 'detail/:id/:type',
      component: Detail,
    }]
  },
  {
    path: '/singer', component: Singer,
    children: [
      {
        path: 'detail/:id/:type',
        component: Detail
      }
    ]
  },
  {
    path: '/rank', component: Rank,
    children: [
      {
        path: 'detail/:id/:type',
        component: Detail
      }
    ]
  },
  { path: '/search', component: Search },
  { path: '/Account', component: Account },
]

const router = new VueRouter({
  // 如果用history模式打包上架后是不能刷新的
  mode: 'history',
  // 但是如果用 安装预渲染插件之后添加的   vue add prerender-spa hash是不能用的 必须是'history'
  // mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
