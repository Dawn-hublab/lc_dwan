const state = {
	updatePopConfig: {
		type: 1, // 弹窗类型（1、提交反馈弹窗 2、modal弹窗 3、自定义弹窗（设为此后其他参数无效））
		showCancel: false, // 是否显示取消按钮
		confirmText: '确定', // 确定按钮文字
		cancelText: '取消', // 取消按钮文字
		closeOpacity: false, // 点击遮罩是否关闭弹窗
		title: '', // 标题
		content: '', // 内容文本
		icon: 1, // 反馈弹窗状态 (1、成功 2、失败 3、正常)
		show: false, //是否显示
	}
};
// 同步操作（用于直接改变数据）
const mutations = {
	GLOBAL_UPDATEPOP_CONFIG(state, payload) {
		if (payload) {
			Object.assign(state.updatePopConfig, payload)
		}
	},
};
// 异步操作 返回值需要用promise回调
const actions = {
	updatePopConfig: ({
		commit
	}, payload) => {
		commit('GLOBAL_UPDATEPOP_CONFIG', payload)
	},
}


const getters = {
	updatePopConfig: state => state.updatePopConfig,
}
export default {
	state,
	mutations,
	actions,
	getters
};