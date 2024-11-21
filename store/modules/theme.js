import store from "@/store"
import { getLocal, setLocal, removeLocal } from "@/utils/common"

const state = () => ({
	theme: "light"
})

const getters = {
	themeType(state) {
		return state.theme
	}
}

const mutations = {
	setTheme(state, theme) {
		state.theme = theme || "light"
		setLocal("theme", theme)
	},
}

const actions = {
	// handle({ commit }) {
	// 	const storedData = getLocal("rechargeData");
	// 	if (storedData) {
	// 		commit('recharge', storedData);
	// 	}
	// },
}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}