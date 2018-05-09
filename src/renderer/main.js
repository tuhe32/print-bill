import Vue from 'vue'
import axios from 'axios'
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import baseUtil from "@/utils/baseUtil";
import globalConfig from "@/config/global_config";
import db from './utils/datastore'
import formatUtil from "@/utils/formatUtil";

import App from './App'
import router from './router'
import store from './store'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.prototype.baseUtil = baseUtil;
Vue.prototype.fmUtil = formatUtil;
Vue.prototype.baseUrl = globalConfig.base_url;
Vue.prototype.baseWebUrl = globalConfig.base_web_url;
Vue.prototype.$db = db

Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
