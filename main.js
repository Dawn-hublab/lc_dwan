import App from './App'
import messages from './locale/index'
// 过滤器
import filters from './utils/filters.js'
import { openkf } from '@/utils/customerService.js'
// import store from '@/store/index.js'
import regex from './utils/config.js'
import mixins from './utils/mixins.js'
import TabBar from './components/tabbar.vue'
// 组件
import { noMultipleClicks, setLocal, getLocal, setCache, getCache, removeLocal, clearSystemCache, toPage, copy } from '@/utils/common.js'
import showModal from './components/modal/modal.js'
let i18nConfig = {
    locale: uni.getLocale(),
    messages,
}

// #ifndef VUE3
import Vue from 'vue'
import VueI18n from 'vue-i18n'
// 注册全局过滤器
for (var key in filters) {
    Vue.filter(key, filters[key])
}
Vue.prototype.$openkf = openkf
Vue.prototype.$toPage = toPage
Vue.prototype.$copy = copy
Vue.prototype.$noMultipleClicks = noMultipleClicks
Vue.prototype.$getLocal = getLocal
Vue.prototype.$setLocal = setLocal
Vue.prototype.$getCache = getCache
Vue.prototype.$setCache = setCache
Vue.prototype.$removeLocal = removeLocal
Vue.prototype.$clearSystemCache = clearSystemCache
Vue.prototype.regex = regex
Vue.component('tab-bar', TabBar)
Vue.use(VueI18n)
Vue.use(mixins)
const i18n = new VueI18n(i18nConfig)
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    i18n,
    ...App,
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp, createVNode, render } from 'vue'
import { createI18n } from 'vue-i18n'
import * as Pinia from 'pinia'
export const i18n = createI18n(i18nConfig)
export function createApp() {
    const app = createSSRApp(App)
	app.use(Pinia.createPinia())
    app.component('tab-bar', TabBar)
    app.config.globalProperties.showModal = showModal
    app.use(i18n)
    app.use(mixins)
    return {
        app,
		Pinia
    }
}
// #endif

