// The following line loads the standalone build of Vue instead of the runtime-only build,
// so you don't have to do: import Vue from 'vue/dist/vue'
// This is done with the browser options. For the config, see package.json
import Vue from 'vue'
import VueSession from 'vue-session'
import VueRouter from 'vue-router'
import App from './App.vue'
import routes from './routes.js'
import VeeValidate, { Validator } from 'vee-validate';
import bahasa from '../node_modules/vee-validate/dist/locale/id.js'
import vSelect from 'vue-select'
import wysiwyg from "vue-wysiwyg";
import Notifications from 'vue-notification'
import store from 'store'
import axios from 'axios'
import lodash from 'lodash'
import { Bus } from './bus.js'
import serialize from 'serialize-javascript'
import vuecookies from 'vue-cookies'
import msgpack from 'msgpack-lite'
import VueQuillEditor from 'vue-quill-editor'
import fp2 from 'fingerprintjs2'


Vue.use(VueQuillEditor)
Vue.use(wysiwyg, {
    hideModules: { "bold":false,
"headings":true,
"hyperlink":true,
"image":true,
"italic":false,
"list_ordered":false,
"list_unordered":false,
"removeFormat":false,
"table":false
}
})
Vue.use(Notifications)
Vue.component('v-select', vSelect)
VeeValidate.Validator.addLocale(bahasa)
Vue.use(VueRouter);
Vue.use(VueSession);
Vue.use(VeeValidate, {locale: 'id',delay:"1000"});
const cks = {
    setCookies (x,y,z = null){
        z == null ? vuecookies.set(x,serialize(y)) : vuecookies.set(x,serialize(y),z)
    },
    getCookies (x){
        return eval('(' + vuecookies.get(x) + ')')
    },
    clearCookies (x){
        vuecookies.remove(x)
    },
    isCookies (x){
        return vuecookies.isKey(x)
    }
}
const localStorage = {
    setLcs (x,y){
        store.set(x,y)
    },
    getLcs (x){
        return store.get(x)
    },
    clearLcs (){
        store.clearAll()
    },
    removeLcs (x){
        store.remove(x)
    }
}
Vue.prototype.$lcs = localStorage
Vue.prototype.$cks = cks
Vue.prototype.$fp2 = new fp2()
window.bus = Bus
window._ = lodash
Vue.prototype.$ajx = axios
// We create te router instance here.
const router = new VueRouter({
  routes: routes
});
new Vue({ // eslint-disable-line no-new
  el: '#app',
  router,
  render: (h) => h(App)
})
