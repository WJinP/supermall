import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import toast from './components/common/toast'
//安装toast插件
Vue.use(toast)
//解决移动端的300ms的延迟
import FastClick from 'fastclick'
FastClick.attach(document.body);
//图片懒加载
import VueLazyload from 'vue-lazyload'
// Vue.use(VueLazyload)
//或者添加VueLazyload 选项
Vue.use(VueLazyload, {
  preLoad: 1.3,
  // error: 'dist/error.png',
  loading: require('./assets/img/common/placeholder.png'),
  attempt: 1
})

Vue.config.productionTip = false

Vue.prototype.$bus=new Vue()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
