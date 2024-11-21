import uniCopy from '@/js_sdk/xb-copy/uni-copy.js'



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
				title: '复制成功',
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

const getUpdateStatus = () => {
    return 1; // 0无更新；1可选更新；2强制更新
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
    getUpdateStatus
}