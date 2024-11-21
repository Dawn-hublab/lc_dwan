// uni.request() 方法封装
import Vue from 'vue'

const baseURL = 'http://form.yaobangbang.top'

// 响应状态码
export const CTS = {
  SUCCESS: 200, // 请求成功
  DATA_ERROR: 202, // 数据异常（可界面提示）
  API_ERROR: 404, // 接口异常
  PARAMS_ERROR: 499, // 参数异常
  SERVER_ERROR: 500, // 服务器程序错误
}

// api异常提示
function apiWarning(state) {
	// console.log(state)
	let msg = null
	switch (state) {
		case 401:
			msg = '非法访问'
			break;
		case 401:
			msg = '没有权限'
			break;
		case 401:
			msg = '非法访问'
			break;
		default:
			msg = '系统异常'
	}
	uni.showToast({
		title: msg
	})
}


function apiGet(url, data = {}, options = {}) {
	if (!/^\//.test(url)) url = '/' + url
	options.header = options.header || {
		'Content-Type': 'application/json'
	}

	let token = uni.getStorageSync('token')
	if (token) {
		options.header['Access-Token-User'] = token
	}

	data.nick = 123

	return new Promise((resolve, reject) => {
		uni.request({
			url: baseURL + url,
			method: 'GET',
			header: options.header,
			data: data, //参数
			success: (res) => {
				if (res.data) {
					// if (res.data.status !== 200) {
					// 	apiWarning(res.data.status)
					// }
					resolve(res.data)
				} else {
					reject(res)
				}
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}

function apiPost(url, data = {}, options = {}) {
	if (!/^\//.test(url)) url = '/' + url
	options.header = options.header || {
		'Accept': 'application/dentist.app.v1+json',
		'Content-Type': 'application/json'
	}

	let token = uni.getStorageSync('token')
	if (token) {
		options.header['Access-Token-User'] = token
	}

	data.nick = 123

	return new Promise((resolve, reject) => {
		uni.request({
			url: baseURL + url,
			method: 'POST',
			header: options.header,
			data: data, //参数
			success: (res) => {
				console.log(res);
				if (res.data) {
					// if (res.data.status !== 200) {
					// 	apiWarning(res.data.status)
					// }
					resolve(res.data)
				} else {
					reject(res)
				}
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}

Vue.CTS = Vue.prototype.CTS = CTS
Vue.apiGet = Vue.prototype.apiGet = apiGet
Vue.apiPost = Vue.prototype.apiPost = apiPost

module.exports = {
	baseURL,
	CTS,
	apiGet,
	apiPost
}
