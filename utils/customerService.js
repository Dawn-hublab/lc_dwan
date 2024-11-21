// #ifdef APP-PLUS
const mqModule = uni.requireNativePlugin("MeiQia-ChatPlugin")
// #endif

export function kf(id) {
	(function(a, b, c, d, e, j, s) {
		a[d] = a[d] || function() {
			(a[d].a = a[d].a || []).push(arguments)
		};
		j = b.createElement(c),
			s = b.getElementsByTagName(c)[0];
		j.async = true;
		j.charset = 'UTF-8';
		j.src = 'https://static.meiqia.com/widget/loader.js';
		s.parentNode.insertBefore(j, s);
	})(window, document, 'script', '_MEIQIA');
	if (uni.getStorageSync('meiqia')) {
		id = uni.getStorageSync('meiqia')
	}
	_MEIQIA('entId', id);
	_MEIQIA('withoutBtn');
}
export function openkf() {
	let user = uni.getStorageSync('user')
	// #ifdef H5
	if (user['02']) {
		_MEIQIA("metadata", {
			name: `用户名：${user['02']},邮箱：${user['06']},净资产：${user['11']}`,
			language: 'ch'
		});
		_MEIQIA('clientId', user.id);
	} else {
		uni.getSystemInfo({
			success: function(info) {
				_MEIQIA("metadata", {
					name: '游客-' + info.osName,
					language: 'ch'
				});
			},
			fail() {
				_MEIQIA("metadata", {
					name: '游客',
					language: uni.getStorageSync('lang_c') ? uni.getStorageSync('lang_c') : 'ch'
				});
			}
		});
	}
	_MEIQIA('showPanel');
	// #endif

	// #ifdef APP-PLUS
	mqModule.initChatViewManger();
	mqModule.showMeiQiaChatView();
	if (user['02']) {
		mqModule.setClientInfo({
			clientInfo: {
				name: `用户名：${user['02']},邮箱：${user['06']},净资产：${user['11']}`,
				comment: user.id,
			},
			override: true
		});
	} else {
		uni.getSystemInfo({
			success: function(info) {
				mqModule.setClientInfo({
					clientInfo: {
						name: '游客' + '-' + info.osName,
						comment: '游客',
					},
					override: true
				});
			},
			fail() {
				mqModule.setClientInfo({
					clientInfo: {
						name: '游客',
						comment: '游客',
					},
					override: true
				});
			}
		});
	}
	mqModule.showMeiQiaChatView();
	// #endif
}