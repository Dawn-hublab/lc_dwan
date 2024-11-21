import {
	is_encrypt,
	version_conf,
	is_test,
	test_url
} from '@/static/config.js'
let lang = {
	'vie': 'vi',
	'en': 'en',
	'in': 'id',
	'th': 'th',
	'jp': 'ja',
	'zht': 'zh_TW',
	'zh': 'zh_CN',
	'kor': 'kr',
	'fra': 'fr',
	'de': 'de'
}
// 公共的请求
let request = async function(options) {
	let baseurl = is_test ? test_url : uni.getStorageSync("currentLine")
	// const apiUrl = `${baseurl}${options.url}`

	options.url = `${baseurl}${options.url}`
	try {
		// #ifdef APP-PLUS
		let version = plus.runtime.version
		// #endif
		// #ifdef H5
		let version = version_conf
		// #endif
		options.header = {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': uni.getStorageSync('token'),
			'token_bak': uni.getStorageSync('token'),
			'language': lang[uni.getStorageSync('lang_c')] ? lang[uni.getStorageSync(
				'lang_c')] : 'zh_CN',
			'version': 'v' + version,
		};
	} catch (err) {
		console.log(err)
	}
	return uni.request(options);
}
let getTtxcPromise = function() {
	return new Promise(function(resolve, reject) {
		ttxcModule && ttxcModule.checkVpn({
				'innerAddress': config.vpnInnerAddress
			},
			({
				code,
				changeIP,
				innerAddress
			}) => {

				if (code === "error") {
					reject()
				} else if (changeIP) {
					//替换ip
					resolve(innerAddress)
				} else {
					resolve()
				}
			})
	})
}

/* export default request; */
export let Get = function(opts) {
	let promise = new Promise(function(resolve, reject) {
		request({
			url: opts.url,
			method: 'get',
			success(request) {
				// console.log('login_page', uni.getStorageSync('login_page'))
				if (request.statusCode === 200) {
					if (is_encrypt)
						request.data = decrypted(unzip(request.data))
					if (request.data.code === 200) {
						resolve(request.data)
					} else if (request.data.code === 618) {
						uni.switchTab({
							url: "/pages/index/index"
						})
						store.commit("system/update", {
							force: true,
							update_now: true
						})
					} else if (request.data.code === 1001) {
						let is_index = uni.getStorageSync('is_index')
						if (!is_index) {
							let token = uni.getStorageSync('token')
							// #ifdef APP-PLUS
							uni.showToast({
								title: token ? i18n.t('msg.dlztsx') : i18n.t(
									'msg.qxdl'),
								icon: 'none'
							})
							if (!uni.getStorageSync('login_page')) {
								uni.navigateTo({
									url: '/pages/general/login/login',
								}, 800)
							}
							// #endif

							// #ifdef H5
							try {
								Vue.prototype.$prompt.show({
									title: i18n.t('msg.qxdl'),
									info: i18n.t('msg.dlztsx'),
									showLogo: false,
									confirm: () => {
										uni.removeStorageSync('token')
										uni.removeStorageSync('user')
										uni.navigateTo({
											url: '/pages/general/login/login',
										}, 800)
									},
									cancel: () => {
										uni.switchTab({
											url: '/pages/index/index',
										}, 800)
									}
								})
							} catch (e) {
								//TODO handle the exception
								console.log(e)
							}
							// #endif
						}
						reject(false)
					} else if (request.data.code === 1002) {
						// #ifdef APP-PLUS
						uni.showToast({
							title: '您的账号在其他地方登录',
							icon: 'none'
						})
						setTimeout(() => {
							if (!uni.getStorageSync('login_page')) {
								uni.navigateTo({
									url: '/pages/general/login/login',
								}, 800)
							}
						}, 1000)
						// #endif

						// #ifdef H5
						try {
							Vue.prototype.$prompt.show({
								title: '您的账号在其他地方登录',
								showLogo: false,
								confirm: () => {
									uni.removeStorageSync('token')
									uni.removeStorageSync('user')
									uni.navigateTo({
										url: '/pages/general/login/login',
									}, 800)
								},
								cancel: () => {
									uni.switchTab({
										url: '/pages/index/index',
									}, 800)
								}
							})
						} catch (e) {
							//TODO handle the exception
							console.log(e)
						}
						// #endif
						reject(false)
					} else {
						// if (tip) {
						uni.showToast({
							title: request.data.message,
							icon: 'none'
						})
						// }
						reject(request.data)
					}
				} else {
					uni.showToast({
						title: i18n.t('msg.xtcw'),
						icon: 'none'
					})
					reject(false)
				}
			},
			fail(res) {
				console.log(res)
				reject(res)
			}
		});
	})
	return promise;
};
export let Post = function(opts) {
	let promise = new Promise(function(resolve, reject) {

		request({
			url: opts.url,
			method: 'post',
			data: opts.data,
			success(request) {
				// console.log('login_page', uni.getStorageSync('login_page'))
				if (request.statusCode === 200) {
					if (is_encrypt)
						request.data = decrypted(unzip(request.data))
					if (request.data.code === 200) {
						resolve(request.data)
					} else if (request.data.code === 618) {
						uni.switchTab({
							url: "/pages/index/index"
						})
						store.commit("system/update", {
							force: true,
							update_now: true
						})
					} else if (request.data.code === 1001) {
						let is_index = uni.getStorageSync('is_index')
						if (!is_index) {
							let token = uni.getStorageSync('token')
							// #ifdef APP-PLUS
							uni.showToast({
								title: token ? i18n.t('msg.dlztsx') : i18n.t(
									'msg.qxdl'),
								icon: 'none'
							})
							if (!uni.getStorageSync('login_page')) {
								uni.navigateTo({
									url: '/pages/general/login/login',
								}, 800)
							}
							// #endif

							// #ifdef H5
							try {
								Vue.prototype.$prompt.show({
									title: i18n.t('msg.qxdl'),
									info: i18n.t('msg.dlztsx'),
									showLogo: false,
									confirm: () => {
										uni.removeStorageSync('token')
										uni.removeStorageSync('user')
										uni.navigateTo({
											url: '/pages/general/login/login',
										}, 800)
									},
									cancel: () => {
										uni.switchTab({
											url: '/pages/index/index',
										}, 800)
									}
								})
							} catch (e) {
								//TODO handle the exception
								console.log(e)
							}
							// #endif
						}
						reject(false)
					} else if (request.data.code === 1002) {
						// #ifdef APP-PLUS
						uni.showToast({
							title: '您的账号在其他地方登录',
							icon: 'none'
						})
						setTimeout(() => {
							if (!uni.getStorageSync('login_page')) {
								uni.navigateTo({
									url: '/pages/general/login/login',
								}, 800)
							}
						}, 1000)
						// #endif

						// #ifdef H5
						try {
							Vue.prototype.$prompt.show({
								title: '您的账号在其他地方登录',
								showLogo: false,
								confirm: () => {
									uni.removeStorageSync('token')
									uni.removeStorageSync('user')
									uni.navigateTo({
										url: '/pages/general/login/login',
									}, 800)
								},
								cancel: () => {
									uni.switchTab({
										url: '/pages/index/index',
									}, 800)
								}
							})
						} catch (e) {
							//TODO handle the exception
							console.log(e)
						}
						// #endif
						reject(false)
					} else {
						// if (tip) {
						uni.showToast({
							title: request.data.message,
							icon: 'none'
						})
						// }
						reject(request.data)
					}
				} else {
					uni.showToast({
						title: i18n.t('msg.xtcw'),
						icon: 'none'
					})
					reject(false)
				}
			},
			fail(res) {
				reject(res)
			}
		});
	})
	return promise;
};