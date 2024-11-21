export default {
	/* 手机号脱敏格式过滤器 */
	phoneCut(value) {
		if (typeof value === 'string') { // 参数为字符串类型
			let ruten = value.substring(3, 7) // 提取字符串下标之间的字符。
			return value.replace(ruten, '****') // 字符串中用字符替换另外字符，或替换一个与正则表达式匹配的子串。
		}
	},
	/* 邮箱脱敏格式过滤器 */
	emilCut(value) {
		if (typeof value === 'string') { // 参数为字符串类型
			let strings = value.split('@')
			// console.log(strings, 'str')
			let str = strings[0].substring(1, strings[0].length - 1)
			// let result = strings[0].replace(str, '*******') + strings[1]
			return strings[0].replace(str, '*******') + '@' + strings[1]
		}
	},
	/* 将字符串中指定位置的文本替换 */
	replacepos(val, start, end, txt) {
		return val.substring(0, start) + txt + val.substring(end)
	},
	/* 订单状态 */
	orderState(val) {
		// 0待支付 1已支付 2用户取消 3超时未就诊 4门店已下单 5工厂制作中 6已发货 7已到店 8就诊完成 9已评价
		let strs = ['待支付', '已支付', '用户取消', '超时未就诊', '门店已下单', '工厂制作中', '已发货', '已到店', '就诊完成', '已评价']

		return strs[Number(val)]
	},
	// 钱处理
	priceDecimal: function(val, fixed) {
		val = Number(val) || 0
		return fixed ? (val / 100).toFixed(2) : val / 100
	},
	// 下拉加载提示文本
	loadingText: function(val) {
		return val[1] ? '没有更多了' : (val[0] ? '加载中...' : '上拉即可加载')
	}
}