// import i18n from "../main.js";
import uniCopy from '@/js_sdk/xb-copy/uni-copy.js'
import {
	is_test,
	test_url,
	jsonUrl,
	line_urls,
} from '@/static/config.js'


const setLocal = function(key, val) {
	uni.setStorageSync(key, val)
}
const getLocal = function(key) {
	return uni.getStorageSync(key);
}
const removeLocal = function(key) {
	return uni.removeStorageSync(key);
}
// 清除系统缓存
const clearSystemCache = () => {
	removeLocal('user')
	removeLocal('unread')
}

const getUrlParam = (url, param) => {
	var reg = new RegExp('(^|&)' + param + '=([^&]*)(&|$)');
	var result = url.substr(url.indexOf('?') + 1).match(reg);
	return result ? decodeURIComponent(result[2]) : null;
}

const noMultipleClicks = function(methods, info) {
	let that = this
	if (that.noClick) {
		// 第一次点击
		that.noClick = false
		if (info && info !== '') {
			methods(info)
		} else {
			methods()
		}
		setTimeout(() => {
			that.noClick = true
		}, 2000)
	} else {

	}
}
const blobToBase64 = (blob) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(blob);
		reader.onload = () => resolve(reader.result);
		reader.onerror = error => reject(error);
	});
}
const copy = (data) => {
	uniCopy({
		content: data,
		success: (res) => {
			uni.showToast({
				title: i18n.t("msg.fzcg"),
				icon: 'none'
			})
		},
		error: (e) => {
			uni.showToast({
				title: e,
				icon: 'none',
				duration: 3000,
			})
		}
	})
}

const toPage = (page) => {
	uni.navigateTo({
		url: page
	})
	uni.switchTab({
		url: page
	})
}

const daysFromToday = function(dateString) {
	// 将字符串转换为日期对象
	const date = new Date(dateString);

	// 获取当前日期
	const today = new Date();

	// 计算两个日期之间的差异（以毫秒为单位）
	const timeDiff = today - date;

	// 将差异转换为天数
	const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

	// 确保天数差异是有效数字
	return isNaN(daysDiff) ? 0 : daysDiff;;
}



const setCache = function(key, value, expireSeconds) {
	const currentTime = Date.now();
	const expireTime = currentTime + expireSeconds * 1000; // 转换为毫秒
	uni.setStorage({
		key: key,
		data: {
			value: value,
			expireTime: expireTime
		},
		success: function() {
			console.log('缓存设置成功');
		}
	});
}

// 获取缓存
const getCache = function(key) {
	const res = uni.getStorageSync(key);
	if (res && res.expireTime > Date.now()) {
		return res.value;
	} else {
		uni.removeStorage({
			key: key,
			success: function() {
				console.log('缓存已过期，已移除');
			}
		});
		return null; // 缓存过期，返回null
	}
}


const requestUrl = function(url) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: url + '25',
			success: (res) => {
				if (res.statusCode == 200) {
					resolve(url); // 返回成功的 URL
				} else {
					reject(new Error(`Failed to fetch from ${url}`));
				}
			},
			fail: (err) => {
				reject(err);
			}
		});
	});
}


const measureSpeed = function(api) {
	const startTime = new Date().getTime();
	return new Promise((resolve, reject) => {
		uni.request({
			url: api,
			complete: () => {
				const endTime = new Date().getTime();
				resolve(endTime - startTime); // 解析为响应时间
			}
		});
	});
}

const fetLocalLines = function() {
	Promise.race(line_urls.map(url => requestUrl(url)))
		.then((firstSuccessfulUrl) => {
			// 第一个成功返回数据的 URL
			console.log("First successful URL:", firstSuccessfulUrl);
			uni.setStorageSync('currentLine', firstSuccessfulUrl);
		})
		.catch((err) => {
			console.error("All requests failed or error occurred:", err);
		});
}

const fetchApiLines = async function() {
	// 定义华为云 OBS JSON 文件的 URL
	try {
		let res = getCache('line_datas')
		let result = getCache('line_datas')
		// 使用 Promise 包装异步请求
		if (!result) {
			res = await uni.request({
				url: jsonUrl,
				method: 'GET',
			})
			result = res
		}
		if (Array.isArray(res)) {
			let temp = res.filter(item => item != null)
			result = temp[0]
		}
		// 检查请求是否成功
		if (result.statusCode !== 200) {
			console.error('Request failed with status code:', res.statusCode);
			return;
		}
		// 解析返回的 JSON 数据
		let apiLines = result.data.list.map(item => ({
			title: item.name,
			routes: item.routes.map(item => ({
				url: item,
				ms: 0
			}))
		}));
		// 为每个API线路单独计算响应时间
		apiLines.forEach((item, index) => {
			item.routes.forEach((itemB, indexB) => {
				measureSpeed(itemB.url).then(ms => {
					apiLines[index].routes[indexB].ms = ms
				})
			})
		});
		const index = Math.floor(Math.random() * result.data.list[0].routes.length)
		const routes = result.data.list[0].routes
		const line = routes[index]
		setCache('line_datas', result, 7200)
		uni.setStorageSync("currentLine", is_test ? test_url : line)
		let listData = apiLines[0]['routes']
		setTimeout(() => {
			const minMsItem = listData.reduce((min, current) => current.ms < min.ms ? current :
				min, listData[0]);
			uni.setStorageSync("currentLine", is_test ? test_url : minMsItem.url)
		}, 3000)
	} catch (err) {
		// 请求失败时的处理逻辑
		uni.hideLoading()
		console.error('Request failed:', err);
	}
}


// utils/networkCheck.js
const checkNetworkAvailability = function(interval = 500, timeout = 20000) {
	const urls = ['https://www.baidu.com', 'https://www.qq.com', 'https://www.douyin.com']
	return new Promise((resolve, reject) => {
		let hasNetwork = false;
		const requestInterval = setInterval(() => {
			const url = urls[Math.floor(Math.random() * urls.length)];
			uni.request({
				url: url,
				method: 'GET',
				success: async () => {
					hasNetwork = true;
					clearInterval(requestInterval);
					fetLocalLines()
					await fetchApiLines()
					resolve(true); // 传递结果到调用者
				},
				fail: () => {
					hasNetwork = false;
				}
			});
		}, interval);
		setTimeout(() => {
			clearInterval(requestInterval);
			if (!hasNetwork) {
				uni.showToast({
					title: i18n.t("msg.zwwl"),
					icon: 'error',
					duration: 2000,
					complete() {
						if (!uni.getStorageSync('none_page')) {
							uni.redirectTo({
								url: '/pages/none/none'
							})
						}
					}
				})
				reject(new Error(i18n.t("msg.wlcs"))); // 传递失败信息到调用者
			}
		}, timeout);
	});
}

const checkNetwork = function() {
	const urls = ['https://www.baidu.com', 'https://www.qq.com', 'https://www.douyin.com'];

	// 创建一个请求函数
	const requestUrl = (url) => {
		return new Promise((resolve, reject) => {
			uni.request({
				url: url,
				method: 'GET',
				success: () => {
					resolve(url); // 请求成功，返回 URL
				},
				fail: () => {
					reject(url); // 请求失败，返回 URL
				}
			});
		});
	};

	// 并行请求所有 URL
	const requests = urls.map(url => requestUrl(url));

	return Promise.allSettled(requests) // 等待所有请求完成
		.then(results => {
			const successfulRequests = results.filter(result => result.status === 'fulfilled');
			if (successfulRequests.length > 0) {
				// 至少有一个请求成功
				fetLocalLines();
				return true; // 网络可用
			} else {
				// 所有请求都失败
				return false; // 网络不可用
			}
		})
		.catch(error => {
			console.error('发生错误:', error);
			return false; // 网络检查发生错误，返回网络不可用
		});
}
const getUpdateStatus = () => {
    return 1; // 0无更新；1可选更新；2强制更新
}

const pushPathToStorage = (route) => {
  let paths = uni.getStorageSync('paths')
  if(!paths || paths.length === 0) {
      uni.setStorageSync('paths', [route])
  }else if(paths.length === 1){
      if(paths[0] === route) return
      paths.push(route)
      uni.setStorageSync('paths', paths)
  }else {
      if(paths[1] === route) return
      paths[0] = paths[1]
      paths[1] = route
      uni.setStorageSync('paths', paths)
  }

}

export {
	setLocal,
	getLocal,
	removeLocal,
	clearSystemCache,
	getUrlParam,
	noMultipleClicks,
	blobToBase64,
	copy,
	toPage,
	daysFromToday,
	setCache,
	getCache,
	requestUrl,
	measureSpeed,
	fetLocalLines,
	fetchApiLines,
	checkNetworkAvailability,
	checkNetwork,
	getUpdateStatus,
  pushPathToStorage
}