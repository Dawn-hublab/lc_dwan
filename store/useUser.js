import {
	defineStore
} from 'pinia'
import {
	_78,
	_03,
	// loginOut,
	_25
} from "@/api/general.js"
import {
	setLocal
} from "@/utils/common"

export const useUser = defineStore('user', {
	state: () => ({
		user: {},
		unread: 0,
		has_newcomer_qualifications: 1,
		signInStatus: 0,
		address: {},
		token: ''
	}),
	getters: {
		doubleCount: (state) => state.count * 2
	},
	actions: {
		setUser(state, user) {
			this.user = user || {}
			setLocal("user", state.user)
		},
		setToken(token) {
			this.token = token
			setLocal("token", state.token)
		},
		setUnread(unread) {
			this.unread = unread || 0
			setLocal("unread", unread)
		},
		getUnreadNum() {
			return new Promise((resolve, reject) => {
				_25().then(res => {
					this.setUnread(res.data)
					resolve(res.data)
				}).catch(err => reject(err))
			})
		},
		loginHandle(userInfo) {
			const {
				account_identifier,
				password
			} = userInfo
			return new Promise((resolve, reject) => {
				uni.getSystemInfo({
					success: function(info) {
						if (!uni.getStorageSync('systemInfo')) {
							let data = [info.deviceModel, info.brand, info.system, info
									.uniPlatform
								]
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
							this.setToken(res.data.token)
							_78({
								keys: "05,06,07,16,10,11,15,pure_email,id,account,pure_name"
							}).then(res => {
								this.setUser(res.data)
							})
							this.getUnreadNum()
							resolve(res.data)
						}).catch(err => {
							console.log(err)
							reject(err)
						})
					}
				});
			})
		},
	}
})