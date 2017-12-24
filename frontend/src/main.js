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
Vue.use(wysiwyg, {
    hideModules: { "hyperlink": true,"image":true}
    })
Vue.use(Notifications)
Vue.component('v-select', vSelect)
VeeValidate.Validator.addLocale(bahasa)
Vue.use(VueRouter);
Vue.use(VueSession);
Vue.use(VeeValidate, {locale: 'id',delay:"1000"});

window.lcs = store
window.ajx = axios
window.bus = Bus
window._ = lodash
// We create te router instance here.
const router = new VueRouter({
  routes: routes
});
new Vue({ // eslint-disable-line no-new
  el: '#app',
  router,
  render: (h) => h(App)
})
