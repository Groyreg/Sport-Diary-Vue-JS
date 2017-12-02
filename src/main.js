import Vue from 'vue'
import router from './router'
import store from './store/index.js'

import Hello from './components/Hello.vue'
import './css/mainstyle.css'
import './css/button-style.css'
import './js/func.js'

import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ru-RU'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueAuth from '@websanova/vue-auth'

import lodash from 'lodash'
import VueLodash from 'vue-lodash'

// import VueI18n from 'vue-i18n'
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'

Vue.use(VueMoment, {moment})

Vue.use(VueLodash, lodash)

Vue.router = router
Vue.use(ElementUI, { locale })
Vue.use(VueAxios, axios);
//'http://cert-dev.ripcm.com:8080/sport-diary-api/user/'
// 'http://localhost:8090/api/'
// Vue.axios.defaults.baseURL = 'https://api-demo.websanova.com/api/v1';
// Vue.axios.defaults.baseURL = 'http://localhost:8090/api/';
Vue.axios.defaults.baseURL = 'http://cert-dev.ripcm.com:8080/sport-diary-api/api/';
Vue.use(VueAuth, {
	auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
	http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
	router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  parseUserData: function (data) {
    console.log(data);
    store.dispatch('diary/SET_CURRENT_USER', data);
    store.dispatch('diary/LOAD_DIARY');
    store.dispatch('static/LOAD_GENES');
    store.dispatch('static/LOAD_GENOTYPES');
    store.dispatch('static/LOAD_SNPS');
    store.dispatch('static/LOAD_EXERCISES');
    store.dispatch('static/LOAD_MEASUREMENTS');
    store.dispatch('static/LOAD_WELLBEINGS');
    store.dispatch('static/LOAD_FOOD_GROUPS');
    store.dispatch('diary/LOAD_ACTIVITY_TYPES');
    store.dispatch('program/LOAD_PROGRAM');
    return data;
  }
});
Vue.config.productionTip = false;

var header  = new Vue({
	el: '#header',
	router,
	store,
	template: '<Hello/>',
	components: { Hello }
})

var content = new Vue ({
	el: '#content',
	router,
	store
});
