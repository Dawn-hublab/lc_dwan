import Compressor from 'compressorjs';
import {
	Get,
	// post
} from '@/utils/request.js'
import {
	blobToBase64
} from '@/utils/common.js'
import i18n from '@/main.js'

// const siteConfig = async data => {
// 	const response = await get('siteConfig', data);
// 	return response;
// }
// const _01 = () => {
// 	return get('01')
// }
// const _02 = (data) => {
// 	return get('02', data)
// }
// const _03 = (data) => {
// 	return post('03', data)
// }
// const _04 = (data) => {
// 	return post('04', data)
// }
// const _05 = (data) => {
// 	return post('05', data)
// }
// const _06 = (data) => {
// 	return post('06', data)
// }
// const _07 = (data) => {
// 	return post('07', data)
// }
// const _08 = (data) => {
// 	return get('08', data)
// }
// const resetPassword = (data) => {
// 	return post('resetPassword', data)
// }
// const _09 = (data) => {
// 	return post('09', data)
// }
// const _10 = (data) => {
// 	return post('10', data)
// }
// const _11 = (data) => {
// 	return post('11', data)
// }

// const _12 = () => {
// 	return get('12')
// }

// const _13 = (data) => {
// 	return post('13', data)
// }

// // 首页
// // 公告notice
// const _14 = () => {
// 	return get('14')
// }
const _15 = () => {
	return Get('15')
}
// const _16 = () => {
// 	return get('16')
// }
// const _17 = () => {
// 	return get('17')
// }
// const _18 = (data) => {
// 	return get('18', data)
// }
// // 风险评估
// const _19 = () => {
// 	return get('19')
// }
// const _20 = (data) => {
// 	return post('20', data)
// }
// // 答题
// const _21 = async () => {
// 	return await get('21')
// }
// const _22 = () => {
// 	return get('22')
// }
// const _23 = (data) => {
// 	return get('23', data)
// }
// // 消息相关
// const _24 = () => {
// 	return get('24')
// }
// const _25 = () => {
// 	return get('25')
// }
// const _26 = (data) => {
// 	return get('26', data)
// }
// // 签到
// const _27 = () => {
// 	return get('27')
// }
// const _28 = () => {
// 	return get('28')
// }
// const _29 = () => {
// 	return post('29')
// }
// const _30 = (data) => {
// 	return get('30', data)
// }
// // 帮助中心 
// const _31 = (data) => {
// 	return get('31', data)
// }
// // 财富热点 文章
// const _32 = () => {
// 	return get('32')
// }
// const _33 = (data) => {
// 	return get('33', data)
// }
// const _34 = (data) => {
// 	return get('34', data)
// }
// const _35 = (data) => {
// 	return get('35', data)
// }
// // 产品
// const _36 = () => {
// 	return get('36')
// }
// const _37 = (data) => {
// 	return get('37', data)
// }
// const _38 = (data) => {
// 	return get('38', data)
// }
// const _39 = (data) => {
// 	return get('39', data)
// }
// const _40 = (data) => {
// 	return get('40', data)
// }
// const _41 = (data) => {
// 	return get('41', data)
// }
// const _42 = (data) => {
// 	return post('42', data)
// }
// // 获取合同
// const _43 = (data) => {
// 	return get('43', data)
// }

// const _44 = () => {
// 	return get('44')
// }
// const _45 = (data) => {
// 	return get('45', data)
// }
// const _46 = (data) => {
// 	return get('46', data)
// }
// // 合同
// const orderContract = (data) => {
// 	return get('orderContract', data)
// }

// // const product = (data) => { return get('product', data) }
// const _47 = async data => {
// 	const response = await get('47', data);
// 	return response;
// }
// // 现金宝相关
// const _48 = (data) => {
// 	return get('48', data)
// }
// const _49 = (data) => {
// 	return get('49', data)
// }
// const _50 = (data) => {
// 	return post('50', data)
// }


// const _51 = (data) => {
// 	return post('51', data)
// }
// const _52 = (data) => {
// 	return post('52', data)
// }
// const _53 = () => {
// 	return get('53')
// }
// const addrEdit = (data) => {
// 	return post('addrEdit', data)
// }
// const addrAdd = (data) => {
// 	return post('addrAdd', data)
// }
// const _55 = () => {
// 	return get('55')
// }
// const _56 = (data) => {
// 	return get('56', data)
// }
// const _57 = (data) => {
// 	return get('57', data)
// }
// // 出款账户
// const _58 = (data) => {
// 	return get('58', data)
// }
// // 充值
// const _59 = (data) => {
// 	return post('59', data)
// }
// const _60 = (data) => {
// 	return get('60', data)
// }
// // 提现
// const _61 = (data) => {
// 	return post('61', data)
// }
// const _62 = (data) => {
// 	return get('62', data)
// }
// // 转账
// const _63 = (data) => {
// 	return get('63', data)
// }
// const _64 = (data) => {
// 	return post('64', data)
// }

// // 充提详情
// const _65 = (data) => {
// 	return get('65', data)
// }
// const _66 = (data) => {
// 	return get('66', data)
// }

// // 实名认证
// const _67 = (data) => {
// 	return post('67', data)
// }

// // 财务 
// const _68 = (data) => {
// 	return get('68', data)
// }
// // 收货地址相关 
// const _69 = () => {
// 	return get('69')
// }
// const _70 = (data) => {
// 	return post('70', data)
// }
// const _71 = (data) => {
// 	return post('71', data)
// }
// // 积分商城相关
// const _72 = (data) => {
// 	return get('72', data)
// }
// const _73 = (data) => {
// 	return get('73', data)
// }
// const _74 = (data) => {
// 	return post('74', data)
// }
// const _75 = (data) => {
// 	return get('75', data)
// }
// const _76 = (data) => {
// 	return get('76', data)
// }
// const _77 = () => {
// 	return get('77')
// }
// // 个人信息
// const _78 = (data) => {
// 	return get('78', data)
// }
// // 会员等级
// const _79 = () => {
// 	return get('79')
// }
// const _80 = () => {
// 	return get('80')
// }
// const _81 = () => {
// 	return get('81')
// }
// const _82 = () => {
// 	return get('82')
// }
// const _86 = (data) => {
// 	return get('86', data)
// }
// const _87 = () => {
// 	return get('87')
// }
// const _88 = (data) => {
// 	return get('88', data)
// }
// const _83 = () => {
// 	return new Promise((resolve, reject) => {
// 		uni.chooseImage({
// 			count: 1,
// 			sizeType: ['original', 'compressed'],
// 			sourceType: ['album'],
// 			success: function(res) {
// 				const blobUrl = res.tempFilePaths[0];

// 				uni.showLoading({
// 					title: i18n.t('msg.scz')
// 				});
// 				// 将 Blob URL 转换为 Blob 对象
// 				fetch(blobUrl).then(response => response.blob()).then(blob => {
// 					// 获取文件信息
// 					uni.getFileInfo({
// 						filePath: blobUrl,
// 						success: (fileInfo) => {
// 							if (fileInfo.size > 80 * 1024) { // 如果文件大于100KB
// 								// 使用 Compressor.js 压缩图片
// 								new Compressor(blob, {
// 									quality: 0.5,
// 									convertSize: 819200,
// 									success: (compressedFile) => {
// 										blobToBase64(
// 												compressedFile)
// 											.then(
// 												base64String => {
// 													post('84', {
// 															file: base64String
// 														}).then(
// 															res => {
// 																uni
// 																	.hideLoading();
// 																resolve
// 																	(res
// 																		.data
// 																		);
// 															})
// 														.catch(
// 															err => {
// 																uni
// 																	.hideLoading();
// 																reject
// 																	(
// 																		err
// 																		);
// 															});
// 												}).catch(
// 												error => {
// 													console
// 														.error(
// 															error
// 														);
// 												});
// 									},
// 									error: (err) => {
// 										uni.hideLoading();
// 										console.error(err
// 											.message);
// 										reject(err);
// 									},
// 								});
// 							} else {
// 								// 如果文件小于100KB，直接转换为 Base64
// 								blobToBase64(blob).then(data => {
// 									post('84', {
// 										file: data
// 									}).then(res => {
// 										uni.hideLoading();
// 										resolve(res.data);
// 									}).catch(err => {
// 										uni.hideLoading();
// 										reject(err);
// 									});
// 								});
// 							}
// 						},
// 						fail: (err) => {
// 							uni.hideLoading();
// 							console.error(err.message);
// 							reject(err);
// 						}
// 					});
// 				}).catch(err => {
// 					uni.hideLoading();
// 					console.error(err.message);
// 					reject(err);
// 				});
// 			},
// 			fail: (err) => {
// 				uni.hideLoading();
// 				console.error(err.message);
// 				reject(err);
// 			}
// 		});
// 	});
// };
// const uploadSignature = (data) => {
// 	return new Promise((resolve, reject) => {
// 		post('84', {
// 			file: data
// 		}).then(res => {
// 			// uni.hideLoading();
// 			resolve(res.data);
// 		}).catch(err => {
// 			// uni.hideLoading();
// 			reject(err);
// 		});
// 	})
// }

export {
	// _01,
	// _02,
	// _03,
	// _04,
	// _05,
	// _06,
	// _07,
	// _08,
	// resetPassword,
	// _09,
	// _10,
	// _11,
	// _12,
	// _13,
	// _14,
	_15,
	// _16,
	// _17,
	// _18,
	// _19,
	// _20,
	// _21,
	// _22,
	// _23,
	// _24,
	// _25,
	// _26,
	// _27,
	// _28,
	// _29,
	// _30,
	// _31,
	// _32,
	// _33,
	// _34,
	// _35,
	// _36,
	// _37,
	// _38,
	// _39,
	// _40,
	// _41,
	// _42,
	// _43,
	// _44,
	// _45,
	// _46,
	// orderContract,
	// _47,
	// _48,
	// _49,
	// _50,
	// _51,
	// _52,
	// _53,
	// addrEdit,
	// addrAdd,
	// _55,
	// _56,
	// _57,
	// _58,
	// _59,
	// _60,
	// _61,
	// _62,
	// _63,
	// _64,
	// _65,
	// _66,
	// _67,
	// _68,
	// _69,
	// _70,
	// _71,
	// _72,
	// _73,
	// _74,
	// _75,
	// _76,
	// _77,
	// _78,
	// _79,
	// _80,
	// _81,
	// _82,
	// _83,
	// _86,
	// _87,
	// _88,
	// uploadSignature
}