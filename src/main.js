import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import './config/http'
import './utils/fontSize'
import ua from './utils/userAgent'

// 解决ios click 300ms延迟
import fastclick from 'fastclick'
fastclick.prototype.onTouchEnd = function (event) {
  if (event.target.hasAttribute('type') && event.target.getAttribute('type') === 'text') {
    event.preventDefault()
    event.target.focus()
    return false
  }
}
fastclick.prototype.focus = function (targetElement) {
  var length
  // Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
  // deviceIsIOS &&
  if (ua.device() === 'ios' && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
    length = targetElement.value.length
    targetElement.focus()
    targetElement.setSelectionRange(length, length)
  } else {
    targetElement.focus()
  }
}
fastclick.attach(document.body)

import 'vant/lib/index.css'
import { Popup } from 'vant'
Vue.use(Popup)

axios.defaults.baseURL = 'https://v1.hitokoto.cn'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
