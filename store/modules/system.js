import {
	getLocal,
	setLocal
} from "@/utils/common"

const state = () => ({
	updateData: {
		force: false,
		update_now: true
	}
})

const getters = {
	updateData: state => state.updateData,
}

const mutations = {
	update(state, updateData) {
		state.updateData = updateData || {}
		setLocal("updateData", updateData)
	}
}

const actions = {
	initRecharge({
		commit
	}) {
		const storedData = getLocal("updateData");
		if (storedData) {
			commit('update', updateData);
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