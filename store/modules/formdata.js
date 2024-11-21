import store from "@/store"
import { getLocal, setLocal, removeLocal } from "@/utils/common"

const state = () => ({
	rechargeData: {
		type: null,
		"01": null,
		"02": null,
		remark: null,
		"03": null,
	},
	withdrawData: {
		type: null,
		"01": null,
		"02": null,
		"03": null,
		remark: null,
	},
	orderData: {
		id: null,
		"01": null,
		image: null,
		"02": null,
		signature_full_path: null,
	}
})

const getters = {
	rechargeData: state => state.rechargeData,
	withdrawData: state => state.withdrawData,
	orderData: state => state.orderData,
}

const mutations = {
	recharge(state, rechargeData) {
		state.rechargeData = rechargeData || {}
		setLocal("rechargeData", rechargeData)
	},
	removeRecharge(state) {
		state.rechargeData = {}
		removeLocal("rechargeData")
	},
	withdraw(state, withdrawData) {
		state.withdrawData = withdrawData || {}
		setLocal("withdrawData", withdrawData)
	},
	removeWithdraw(state) {
		state.withdrawData = {}
		removeLocal("withdrawData")
	},
	order(state, orderData) {
		state.orderData = orderData || {}
		setLocal("orderData", orderData)
	},
	removeOrder(state) {
		state.orderData = {}
		removeLocal("orderData")
	}
}

const actions = {
	initRecharge({ commit }) {
		const storedData = getLocal("rechargeData");
		if (storedData) {
			commit('recharge', storedData);
		}
	},
	initWithdraw({ commit }) {
		const storedData = getLocal("withdrawData");
		if (storedData) {
			commit('withdraw', storedData);
		}
	},
	initOrder({ commit }) {
		const storedData = getLocal("orderData")
		console.log('commit', storedData)
		if (storedData) {
			commit('order', storedData);
		}
	}
}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}