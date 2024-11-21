import Vue from "vue"
import Vuex from "vuex"
import { meiqia } from '@/static/config.js'

// let mqModule
// /* #ifndef H5 */
// mqModule = uni.requireNativePlugin("MeiQia-ChatPlugin");
// /* #endif */ 


Vue.use(Vuex)

const modules = {}
importAll(require.context("./modules/", true, /\.js$/))

function importAll (r) {
	r.keys()
		.forEach(key => {
			modules[key.slice(key.lastIndexOf("/") + 1, key.lastIndexOf("."))] = r(key).default
		})
}

const store = new Vuex.Store({
	modules
})

export default store
// export {
// 	mqModule
// }