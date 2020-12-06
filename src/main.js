// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import router from './router'
import store from './store'

import './plugins/element'
import './style/normalize.css'
import 'element-ui/lib/theme-chalk/index.css';




Vue.config.productionTip = false
/*作用是阻止vue 在启动时生成生产提示。*/

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
