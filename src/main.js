// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store'

import './style/normalize.css'


// 设置反向代理，前端请求默认发送到 http://localhost:8443/api
// var axios=require('axios')
// axios.defaults.baseURL='http://localhost:8443/api'
// Vue.prototype.$axios = axios
Vue.config.productionTip = false
/*作用是阻止vue 在启动时生成生产提示。*/

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h=>h(App),

  // router,                /*router 代表该对象包含 Vue Router，并使用项目中的路由*/
  components: { App },

  router,
  store,

  /*components 表示该对象包含的 Vue 组件，*/
  template: '<App/>'     /*template 是用一个字符串模板作为 Vue 实例的标识使用，类似于定义一个 html 标签*/
})
