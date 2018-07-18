import Vue from 'vue'
import VueCookie from 'vue-cookie'

Vue.use(VueCookie);

var Cookie = {
  set: function (data) {
    Vue.cookie.set(JSON.stringify(data))
  },
  get: function (name) {
    var result = Vue.cookie.get(name)
    if (result == undefined) return undefined
    return JSON.parse(result);
  }
}


export default Cookie
