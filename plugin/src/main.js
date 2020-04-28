// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Plugin from './plugin'
import VueJsBridge from 'vue-webview-js-bridge'

Vue.config.productionTip = false

Vue.prototype.$plugin = Plugin

Vue.use(VueJsBridge, {
  debug: true,
  nativeHandlerName: 'hone',
  mock: true,
  mockHandler (payload, next) {
  
    // mock by payload
    // call next(data) to mock data
  }
  // ...
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
