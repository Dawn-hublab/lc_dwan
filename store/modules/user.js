import {
	setLocal
} from "@/utils/common"
// import { getToken, removeToken } from "@/utils/auth"
import {
	_78,
	_03,
	loginOut,
	_25
} from "@/api/index.js"
// import { get as getSite } from "@/api/site"
// import { userStatic } from "@/api/data"
// import router, { resetRouter } from "@/router"
import store from "@/store"

const state = () => ({
	// token: getToken(),
	user: {},
	unread: 0,
	has_newcomer_qualifications: 1,
	signInStatus: 0,
	address: {}
	// roles: [],
	// site: {},
	// isAdmin: false, // ["admin", "super"]
	// staticData: {
	//     product_1_own: 0,
	//     product_2_own: 0,
	//     project_own: 0,
	//     project_member: 0,
	//     task_working: 0
	// },
})

const getters = {

}

const mutations = {
	setToken(state, token) {
		state.token = token
		setLocal("token", state.token)
	},
	setUser(state, user) {
		state.user = user || {}
		setLocal("user", state.user)
	},
	setAddress(state, address) {
		state.address = address || {}
		setLocal("address", state.address)
	},
	setHasNewcomerQualifications(state, qualifications) {
		state.has_newcomer_qualifications = qualifications || 1
		setLocal("has_newcomer_qualifications", state.has_newcomer_qualifications)
	},
	setUnread(state, unread) {
		state.unread = unread || 0
		setLocal("unread", unread)
	},
	setSignInStatus(state, status) {
		state.signInStatus = status || 0
	}
}

const actions = {
	login({
		commit,
		dispatch
	}, userInfo) {
		const {
			account_identifier,
			password
		} = userInfo
		return new Promise((resolve, reject) => {
			uni.getSystemInfo({
				success: function(info) {
					if (!uni.getStorageSync('systemInfo')) {
						let data = [info.deviceModel, info.brand, info.system, info.uniPlatform]
							.join(
								'-')
						uni.setStorageSync('systemInfo', data)
					}
					_03({
						"01": account_identifier.trim(),
						"02": password,
						"03": uni.getStorageSync('systemInfo')
					}).then(res => {
						uni.setStorageSync("startPage", true)
						commit("setToken", res.data.token)
						_78({
							keys: "pure_email,id,account,pure_name"
						}).then(res => {
							commit("setUser", res.data)
						})
						dispatch("getUnreadNum")
						resolve(res.data)
					}).catch(err => {
						console.log(err)
						reject(err)
					})
				}
			});
		})
	},
	loginOut({
		commit
	}) {
		return new Promise((resolve, reject) => {
			loginOut().then(() => {
				handler()
				resolve()
			}).catch(err => reject(err))
		})

		function handler() {
			removeToken()
			commit("setToken", null)
			commit("setUser", null)
		}
	},
	resetToken({
		commit
	}) {
		return new Promise(resolve => {
			commit("setToken", "")
			removeToken()
			resolve()
		})
	},
	getUnreadNum({
		commit
	}) {
		return new Promise((resolve, reject) => {
			_25().then(res => {
				commit("setUnread", res.data)
				resolve(res.data)
			}).catch(err => reject(err))
		})
	},
}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}