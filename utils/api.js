/* 全局公共方法，将直接追加到Vue.prototype中，所有方法以 hs 开头，也可以使用 import 引入 */
import Vue from 'vue'
import {
	CTS,
	baseURL,
	apiGet,
	apiPost
} from './http.js'

/**
 * 获取、更新用户信息
 * */
export function updateUserInfo() {
	apiPost('/api/user/getUserInfo').then(res => {
		if (res.code === CTS.SUCCESS) {
			const app = getApp()

			uni.setStorageSync('userinfo', res.data)
			app.globalData.userinfo = res.data
		} else {
			uni.removeStorageSync('token')
			uni.navigateTo({
				url: "/pages/general/login/login"
			})
		}
	}).catch(err => {
		setTimeout(() => {
			updateUserInfo()
		}, 3000)
	})
}

module.exports = {
	updateUserInfo,
}
