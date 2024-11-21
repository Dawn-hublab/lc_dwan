import store from "@/store"

const state = () => ({
	popupConfig: {
		type: 'confirm', // 弹窗类型
		showCancel: false, // 是否显示取消按钮
		confirmText: '确定', // 确定按钮文字
		cancelText: '取消', // 取消按钮文字
		title: '', // 标题
		info: '', // 内容文本
		show: false, //是否显示,
		showLogo: false,
		logoType: "error",
		showInfo: false,
		confirm: () => {}
	},
})

const getters = {
	popupConfig: state => state.popupConfig,
}

const mutations = {
	GLOBAL_POPUP_CONFIG(state, payload) {
		if (payload) {
			Object.assign(state.popupConfig, payload)
		}
	},
	setPop(state, popupConfig) {
		state.popupConfig = popupConfig || {}
	},
}

const actions = {
	updatePopupConfig: ({
		commit
	}, payload) => {
		commit('GLOBAL_POPUP_CONFIG', payload)
	},
}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}