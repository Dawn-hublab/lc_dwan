<template>
	<view class="content">
		<!-- head -->
		<view class="top-head">
			<view class="app-navbar" style="height:30rpx;"></view>
			<view class="top-head-wrap">
				<view class="address" @click="$toPage('')">
					<image class="icon-1" src="@/static/img/lines.png"></image>
				</view>
				<view @click="goSearch" class="search_box">
					<image src="@/static/img/index/search.png" mode="widthFix"></image>
					<text>{{$t('msg.qsrcpmc')}}</text>
				</view>
				<view class="server" @click="goNext('sign')">
					<image class="icon-2" src="@/static/img/index/qiandao.png"></image>
					<view class="text">{{ $t('index.QianDao') }}</view>
				</view>
			</view>
			<!-- <view class="get-inko" style="position: relative; z-index: 2;" @click="$toPage('/pages/newComer/newComer')"
				v-if="canBuy == 1">
				<view class="get-btn">{{ $t('index.LiJiLingQu') }} ></view>
			</view> -->
		</view>
		<!--  -->
		<!-- <view style="background:#ccc;width:100%;min-height:50rpx;">
			<view style="color:#fff;font-size:40rpx;">{{test_line}}</view>
		</view> -->
		<view class="tab-box">
			<view class="tab-item" @click="$toPage('')">
				<image src="@/static/img/index/item1.png"></image>
				<text>{{ $t('index.HuiYuanZhongXin') }}</text>
			</view>
			<view class="tab-item" @click="$toPage('')">
				<view class="has_new_msg" v-if="unreadMsg > 0"></view>
				<image src="@/static/img/index/item2.png"></image>
				<text>{{ $t('index.XiaoXiZhongXin') }}</text>
			</view>
			<view class="tab-item" @click="$toPage('')">
				<image src="@/static/img/index/item3.png"></image>
				<text>{{ $t('index.TuanDuiZhuanQu') }}</text>
			</view>
			<view class="tab-item" @click="$toPage('')">
				<image src="@/static/img/index/item4.png"></image>
				<text>{{ $t('index.JiFenShangCheng') }}</text>
			</view>
			<view class="tab-item" @click="$toPage('/pages/user/friend')">
				<image src="@/static/img/index/item5.png"></image>
				<text>{{ $t('index.YaoQingHaoYou') }}</text>
			</view>
		</view>
		<!-- 轮播图 -->
		<view class="uni-margin-wrap">
			<swiper class="swiper-top" circular :indicator-dots="indicatorDots" :autoplay="autoplay"
				:interval="interval" :duration="duration">
				<swiper-item v-for="(item, index) in banner" :key='index'>
					<image class="swiper-img" :src="item" lazy-load></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- tips -->
		<view class="tips" @click="open" v-if="noteContent">
			<view class="t-l">
				<image class="tips-img" src="@/static/img/index/tips.png"></image>
			</view>
			<view class="t-r">
				<rich-text class="scrolling-text" :nodes="noteContent"></rich-text>
			</view>
		</view>
		<!-- 理财 -->
		<view class="li-cai">
			<view class="li-top">
				<image src="@/static/img/index/mishu.png"></image>
				<view class="left">
					<view class="text1">
						{{ $t('msg.zsnz') }}{{title}}{{$t('msg._de')}}{{$t('msg._d')}}{{lc_day}}{{$t('index.Tian')}}
					</view>
					<view class="text2" @click="$toPage('')">
						{{$t('index.You')}}{{unreadMsg}}{{$t('index.TiaoTiXingXuYaoGuanZhu')}}！
					</view>
				</view>
				<view class="all" @click="$toPage('')">{{$t('index.ChaKanQuanBu')}}
				</view>
			</view>
			<view class="bt-box">
				<view class="bt-time">
					<view class="na-ba">
						<image src="@/static/img/index/naba.png"></image>
						{{$t('index.TouZiSuDi')}}
					</view>
					<!-- <view class="tiem">2024-04-25 20:48</view> -->
				</view>
				<view class="text" v-if="dataMao.length>0">
					<swiper class="sudi_data" :autoplay="autoplay" :interval="3000" vertical circular>
						<swiper-item v-for="(item,index) in dataMao" :key="index">
							<view class="swiper-item uni-bg-red">{{item}}</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<!-- 精选 -->
		<view class="tile-ti">
			{{$t('index.JingXuanLiCai')}}
		</view>
		<view class="select-tool">
			<view class="count-box" @click="$toPage('')">
				<view class="count-item">
					<view class="t-1">{{$t('index.ZongZiChan')}}</view>
					<view class="t-2">{{totalZc}}</view>
				</view>
				<view class="count-item" style="margin-left: 100rpx;;">
					<view class="t-1">{{$t('index.ZuiXinShouYi')}}</view>
					<view class="t-2">{{NewSy}}</view>
				</view>
				<view class="count-item">
					<image src="@/static/img/index/more.png"></image>
				</view>
			</view>
			<view class="wen-jian" v-if="recommendProd.length > 0">
				<swiper class="wen-swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay"
					:interval="interval" :duration="duration">
					<swiper-item v-for="(item,index) in recommendProd" :key="index">
						<view class="s-item" @click="$toPage('')">
							<view class="top">
								<image src="@/static/img/index/hot.png"></image>
								{{$t('index.DuanQiWenJianLiCai')}}
							</view>
							<view class="p1">{{item.title}}C</view>
							<view class="sy-box">
								<view class="sy-item">
									<view class="t-1" style="color: red;">{{item['03']}}%</view>
									<view class="t-2">{{$t('index.NianShouYiLv')}}</view>
								</view>
								<view class="sy-item">
									<view class="t-1">{{item.cycle}}{{item.cycle_unit}}</view>
									<view class="t-2">{{$t('index.SuoDingZhouQi')}}</view>
								</view>
								<view class="sy-item">
									<view class="sy-btn">{{$t('index.LiJiGouMai')}}</view>
								</view>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<!-- 研读 -->
		<view v-if="yandu.length > 0">
			<view class="tile-ti">
				{{$t('index.ShiChangYanDu')}}
			</view>
			<view class="read-box">
				<view class="read-item" v-for="(item,index) in yandu" :key="index"
					@click="$toPage('')">
					<view class="l">{{index+1}}</view>
					<view class="r text-ellipsis">{{item.title}}</view>
				</view>
			</view>
		</view>

		<!-- 品牌 -->
		<view v-if="gushi.length > 0">
			<view class="tile-ti">
				{{$t('index.PinPaiGuShi')}}
				<!-- <image src="@/static/img/index/text2.png"></image> -->
			</view>
			<view class="pin-top" @click="$toPage('')">
				<!-- <image src="@/static/img/update/video.png"></image> -->
			</view>
			<view class="pin-box">
				<view class="pin-item" v-for="(item,index) in gushi" :key="index"
					@click="$toPage('')">
					<view class="p">{{item.title}}</view>
					<image :src="item.image ? item.image : '/static/img/index/ri.png'" lazy-load></image>
				</view>
			</view>
		</view>

		<!-- <image style="width:250rpx;display:block;margin:20rpx auto" src="@/static/img/update/lc4.png" mode="widthFix"> -->
		<image style="width:250rpx;display:block;margin:20rpx auto" src="" mode="widthFix">
		</image>
		<!-- 弹窗 -->
		<!-- <u-loading-page :loading="loading" :loadingText="$t('msg.jzz')" bg-color="transparent"
			loading-mode="spinner"></u-loading-page> -->
		<uni-popup ref="popup" type="dialog">
			<view class="pop-bg" @click="close">
				<image @click="close" class="cancel" src="@/static/img/index/x.png"></image>
				<view class="t-0">{{$t('index.GongGaoTongZhi')}}</view>
				<scroll-view class="scroll-view" scroll-y="true">
					<rich-text class="t-2" :nodes="noteContent"></rich-text>
				</scroll-view>
			</view>
		</uni-popup>
		<!-- <update-app :data="updateObj" :type="type" :show="showUpdate" @cancel="cancelUpdate"
			v-if="type == 3 || (type == 2 && updateData.update_now)"></update-app> -->
		<!-- 底部导航栏 -->
		<tab-bar current="0"></tab-bar>
		<!-- <u-toast ref="uToast"></u-toast> -->
	</view>

</template>
<script>
	// import updateApp from '@/components/update-app/update-app.vue'
	import {
		title
	} from '@/static/config.js'
	// import AgreeIndexDialog from '@/components/agree-dialog/agree-index-dialog.vue'
	// import {
	// 	_15,
	// 	_17,
	// 	_78,
	// 	_25,
	// 	_38,
	// 	_34,
	// 	_86,
	// 	_87,
	// 	_88,
	// 	_02,
	// 	_01
	// } from "@/api/index.js"
	import Home from "@/api/home.js"
	import {
		daysFromToday,
		setCache,
		getCache,
		fetchApiLines
	} from '@/utils/common.js'
	import {
		mapState,
		mapMutations
	} from "vuex"

	// import MaoScroll from '@/components/mao-scroll/mao-scroll.vue'
	export default {
		data() {
			let note_content = getCache('note_content')
			let index_banner = getCache('index_banner')
			let dataMao = getCache('index_dataMao')
			let recommendProd = getCache('index_recommendProd')
			let yandu = getCache('index_yandu')
			let gushi = getCache('index_gushi')
			return {
				title: title,
				token: uni.getStorageSync('token'),
				showLocal: false,
				showNum: 1,
				lineHeight: 26,
				animationScroll: 100,
				animation: 2000,
				dataMao: dataMao ? dataMao : [],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				noteContent: note_content ? note_content : '',
				lc_day: 0,
				params: {
					keys: "01,06,10,12"
				},
				unreadMsg: 0,
				canBuy: 0,
				totalZc: 0,
				NewSy: 0,
				recommendProd: recommendProd ? recommendProd : [],
				yandu: yandu ? yandu : [],
				gushi: gushi ? gushi : [],
				banner: index_banner ? index_banner : [],
				showUpdate: false,
				type: 1,
				updateObj: null,
				loading: false,
				test_line: 'test_line',
				pullFlag: false
			}
		},
		filters: {
			stripHtml(value) {
				if (!value) return '';
				return value.replace(/<[^>]*>/g, '');
			},
		},
		components: {
			// updateApp
			// AgreeIndexDialog,
			// MaoScroll
		},
		computed: {
			...mapState({
				updateData: state => state.system.updateData,
			}),
		},
		async onLoad() {
			this.setTaberItem()
			let _this = this
			uni.getNetworkType({
				success: function(res) {
					if (res.networkType == 'none') {
						_this.$refs.uToast.show({
							type: 'default',
							icon: false,
							message: _this.$t('msg.qsywlqx'),
						})
						setTimeout(() => {
							uni.redirectTo({
								url: '/pages/none/none'
							})
						}, 1000)
					}
				}
			});
			uni.onNetworkStatusChange(function(res) {
				if (!res.isConnected) {
					_this.$refs.uToast.show({
						type: 'default',
						icon: false,
						message: _this.$t('msg.qsywlqx'),
					})
					setTimeout(() => {
						uni.redirectTo({
							url: '/pages/none/none'
						})
					}, 1000)
				}
			});
      // 获取存储的页面状态执行跳转
      const paths = uni.getStorageSync('paths')
      if(paths.length > 0) {
        const target = paths[paths.length - 1]
        paths.pop()
        uni.setStorageSync('paths', paths)
			uni.navigateTo({
			  url: target
			})
       
      }
		},
		async onShow() {
			if (this.banner.length == 0) {
				this.loading = true
				setTimeout(() => {
					this.loading = false
				}, 3000)
			}
			this.loadData()
			let aaa = setInterval(async () => {
				let currentLine = uni.getStorageSync('currentLine')
				if (!currentLine) {
					await fetchApiLines()
				} else {
					clearInterval(aaa)
					this.loadData()
				}
			}, 2000)
			uni.setStorageSync('login_page', false)
			uni.setStorageSync('is_index', true)
			setTimeout(() => {
			    uni.setNavigationBarTitle({
			        title: this.$t('index.ShouYe'),
			    })
			}, 100)
		},
		onHide() {
			uni.removeStorageSync('is_index')
			this.loading = false
		},
		onUnload() {
			this.loading = false
		},
		onPullDownRefresh() {
			if (!this.pullFlag) {
				this.pullFlag = true
				Promise.all([
					this.loadData(),
					this.updateApp()
				]).finally(() => {
					setTimeout(() => {
						uni.stopPullDownRefresh()
						this.pullFlag = false
					}, 2000)
				})
			}
		},
		methods: {
			...mapMutations({
				update: "system/update",
			}),
			setTaberItem() {
			    uni.setTabBarItem({
			        index: 0,
			        text: this.$t('index.home'),
			    })
			    uni.setTabBarItem({
			        index: 1,
			        text: this.$t('index.component'),
			    })
			    uni.setTabBarItem({
			        index: 2,
			        text: this.$t('index.api'),
			    })
			    uni.setTabBarItem({
			        index: 3,
			        text: this.$t('index.schema'),
			    })
			},
			loadData() {
				// this.getBanner()
				this.getNoteContent()
				// this.recommendProduct()
				this.getSudi()
				// this.getYandu()
				// this.getGushi()
				// this.getLcDay()
				// this.setSystemInfo()
				// this.getUnReadMsg()
				// this.updateApp()
			},
			setSystemInfo() {
				uni.getSystemInfo({
					success: function(info) {
						if (!uni.getStorageSync('systemInfo')) {
							let data = [info.deviceModel, info.brand, info.system, info.uniPlatform].join(
								'-')
							uni.setStorageSync('systemInfo', data)
							_88({
								device_info: data
							}).then(res => {
								console.log(res)
							})
						}
					}
				});
			},
			updateApp() {
				_01().then(res => {
					this.type = res.data["01"]
					let updateStatus = uni.getStorageSync('updateData').update_now === undefined ? true : uni
						.getStorageSync('updateData').update_now
					this.updateObj = res.data
					if (this.type > 1 && updateStatus) {
						this.showUpdate = true
					}
					this.update({
						force: this.type == 3 ? true : false,
						update_now: updateStatus
					})
				})
			},
			getBanner() {
				if (this.banner.length == 0) {
					_87().then(res => {
						this.banner = res.data
						if (res.data.length > 0) {
							setCache('index_banner', res.data, 600)
						}
					}).finally(() => this.loading = false)
				}
			},
			getGushi() {
				if (this.gushi.length == 0) {
					_86({
						title: '9'
					}).then(res => {
						this.gushi = res.data
						if (res.data.length > 0) {
							setCache('index_gushi', res.data, 600)
						}
					})
				}
			},
			getYandu() {
				if (this.yandu.length == 0) {
					_86({
						title: '8'
					}).then(res => {
						this.yandu = res.data
						if (res.data.length > 0) {
							setCache('index_yandu', res.data, 600)
						}
					})
				}
			},
			getSudi() {
				// if (this.dataMao.length == 0) {
					Home._17().then(res => {
						
						this.dataMao = res.data
						if (res.data.length > 0) {
							setCache('index_dataMao', res.data, 600)
						}
					})
				// }

			},
			getUnReadMsg() {
				if (uni.getStorageSync('token')) {
					_25().then(res => {
						this.unreadMsg = res.data
					})
				}
			},
			getNoteContent() {
				// if (!this.noteContent) {
					Home._15().then(res => {
						this.noteContent = res.data
						if (res.data) {
							setCache('note_content', res.data, 600)
						}
					})
				// }
			},
			getLcDay() {
				if (uni.getStorageSync('token')) {
					_78(this.params).then(res => {
						this.lc_day = daysFromToday(res.data['created_at'])
						this.canBuy = res.data['01']
						this.totalZc = res.data['12']
						this.NewSy = res.data['10']
					})
				}
			},
			recommendProduct() {
				if (this.recommendProd.length == 0) {
					_38({
						type: 1
					}).then(res => {
						this.recommendProd = res.data
						if (res.data.length > 0) {
							setCache('index_recommendProd', res.data, 600)
						}
					})
				}
			},
			goSearch() {
				uni.navigateTo({
					url: `/pages/index/search`
				});
			},
			goNext(text) {
				uni.navigateTo({
					url: `/pages/index/` + text
				});
			},
			open() {
				this.$refs.popup.open()
			},
			/**
			 * 点击取消按钮触发
			 * @param {Object} done
			 */
			close() {
				// TODO 做一些其他的事情，before-close 为true的情况下，手动执行 close 才会关闭对话框
				// ...
				this.$refs.popup.close()
			},
			cancelUpdate() {
				this.showUpdate = false
			},
			getVideo() {
				if (!uni.getStorageSync('video')) {
					_02({
						keys: "video_link"
					}).then(res => {
						var downloadTask = uni.downloadFile({
							url: res.data,
							success: function(res) {
								if (res.statusCode === 200) {
									uni.saveFile({
										tempFilePath: res.tempFilePath,
										success: function(saveRes) {
											console.log('文件下载成功，保存路径为：' + saveRes
												.savedFilePath);
											uni.setStorageSync('video', saveRes
												.savedFilePath)
										}
									});
								}
							}
						});
						downloadTask.onProgressUpdate((res) => {
							console.log('下载进度' + res.progress);
							console.log('已经下载的数据长度' + res.totalBytesWritten);
							console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
						});
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		position: relative;
		// background-color: #1B1924;
		height: 100%;
		min-height: 100vh;
	}

	.pd50 {
		padding-bottom: 150rpx;
	}

	.pop-bg {
		position: relative;
		width: 491rpx;
		height: auto;
		background-image: url(@/static/img/index/tan.png);
		background-repeat: no-repeat;
		background-size: cover;
		padding: 50rpx;
		border-radius: 40rpx;

		.cancel {
			position: absolute;
			right: 40rpx;
			top: 30rpx;
			width: 26rpx;
			height: 26rpx;
		}

		.t-0 {
			text-align: center;
			font-family: PingFangSC, PingFang SC;
			font-weight: 500;
			font-size: 34rpx;
			color: #7C1702;
		}

		.t-1 {
			margin-top: 30rpx;
			margin-bottom: 10rpx;
			font-family: PingFangSC, PingFang SC;
			font-weight: 400;
			font-size: 27rpx;
			color: #25242A;
		}

		.t-2 {
			width: 491rpx;
			height: 500rpx;
			font-family: PingFangSC, PingFang SC;
			font-weight: 400;
			font-size: 27rpx;
			color: #25242A;
			line-height: 62rpx;
		}
	}

	.b-text1 {
		text-align: center;
		font-family: PingFangSC, PingFang SC;
		font-weight: 600;
		font-size: 31rpx;
		color: #666F81;
		line-height: 42rpx;
	}

	.b-text2 {
		text-align: center;
		font-family: PingFangSC, PingFang SC;
		font-weight: 400;
		font-size: 23rpx;
		color: #666F81;
		padding-bottom: 50rpx;
	}

	.pin-top {
		display: flex;
		position: relative;
		border-radius: 15rpx 15rpx 0 0;
		margin: 23rpx 20rpx 0 20rpx;
		height: 172rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.pin-box {
		background: #25242A;
		border-radius: 0 0 15rpx 15rpx;
		margin: 0 20rpx 23rpx 20rpx;
		padding: 10rpx 14rpx 10rpx 14rpx;

		.pin-item {
			display: flex;
			font-family: PingFangSC, PingFang SC;
			font-weight: 400;
			font-size: 27rpx;
			color: #F1F1F2;
			border-bottom: 2rpx solid #39373E;
			height: 192rpx;
			justify-content: space-between;
			/* 左右两边对齐 */
			align-items: center;

			/* 上下居中 */
			.p {
				width: 380rpx;
			}

			image {
				width: 220rpx;
				height: 133rpx;
			}
		}

		.pin-item:last-child {
			border-bottom: none;
		}
	}

	.read-box {
		background: #25242A;
		border-radius: 15rpx;
		margin: 23rpx 20rpx;
		padding: 10rpx 14rpx;

		.read-item {
			margin: 20rpx 0;
			display: flex;
			font-family: PingFangSC, PingFang SC;
			font-weight: 400;
			font-size: 27rpx;
			color: #F1F1F2;

			.l {
				color: #FCE7B7;
				margin-right: 20rpx;
			}

			.r {}
		}
	}

	.select-tool {
		background: #25242A;
		border-radius: 15rpx;
		margin: 23rpx 20rpx;
		padding: 23rpx 14rpx;

		.wen-jian {
			.wen-swiper {
				::v-deep .uni-swiper-dots {
					.uni-swiper-dot {
						width: 11rpx;
						height: 6rpx;
						background: rgba(182, 191, 202, 0.34);
						border-radius: 3rpx;
					}

					.uni-swiper-dot-active {
						width: 23rpx;
						height: 6rpx;
						background: #FEF3E8;
						border-radius: 3rpx;
					}
				}
			}

			margin-top: 30rpx;

			.s-item {
				width: 683rpx;
				height: 297rpx;
				padding: 19rpx 14rpx;
				background-image: url(@/static/img/index/bg-s.png);
				background-repeat: no-repeat;
				background-size: cover;
				box-sizing: border-box;

				.sy-box {
					display: flex;
					justify-content: space-between;
					color: #B6BFCA;

					.sy-item {
						.sy-btn {
							width: 160rpx;
							height: 69rpx;
							text-align: center;
							line-height: 69rpx;
							background: linear-gradient(90deg, #E7D9B3 0%, #1B1A20 100%);
							border-radius: 36rpx;
							font-family: PingFangSC, PingFang SC;
							font-weight: 400;
							font-size: 27rpx;
							color: #FFFFFF;
						}

						.t-1 {
							font-family: PingFangSC, PingFang SC;
							font-weight: 400;
							font-size: 31rpx;
						}

						.t-2 {
							margin-top: 11rpx;
							font-family: DINAlternate, DINAlternate;
							font-weight: bold;
							font-size: 23rpx;
						}
					}
				}

				.p1 {
					font-family: PingFangSC, PingFang SC;
					font-weight: 500;
					font-size: 27rpx;
					color: #F1F1F2;
					line-height: 38rpx;
					margin: 26rpx 0;
				}

				.top {
					display: flex;
					font-family: PingFangSC, PingFang SC;
					font-weight: 400;
					font-size: 23rpx;
					color: #F1F1F2;

					image {
						width: 30rpx;
						height: 36rpx;
						margin-right: 20rpx;
					}
				}
			}
		}

		.count-box {
			display: flex;
			justify-content: space-between;
			background: linear-gradient(180deg, #302F36 0%, #302F36 100%);
			box-shadow: inset 0rpx -2rpx 0rpx 0rpx #3D3838;
			border-radius: 15rpx;
			padding: 23rpx 14rpx;

			.count-item {
				image {
					width: 30rpx;
					height: 30rpx;
					margin-top: 30rpx;
				}

				.t-1 {
					font-family: PingFangSC, PingFang SC;
					font-weight: 400;
					font-size: 23rpx;
					color: #B6BFCA;
				}

				.t-2 {
					margin-top: 11rpx;
					font-family: DINAlternate, DINAlternate;
					font-weight: bold;
					font-size: 31rpx;
					color: #F1F1F2;
				}
			}
		}
	}

	.tile-ti {
		font-size: 31rpx;
		color: #F1F1F2;
		line-height: 36rpx;
		margin-left: 20rpx;

		image {
			width: 122rpx;
			height: 36rpx;
		}
	}

	.li-cai {
		height: 240rpx;
		position: relative;
		background: #25242A;
		border-radius: 15rpx;
		margin: 23rpx 20rpx;
		padding: 15rpx 14rpx;

		.bt-box {
			position: absolute;
			box-sizing: border-box;
			width: 683rpx;
			background: #302F36;
			border-radius: 15rpx;
			padding: 15rpx 14rpx;
			margin-top: -50rpx;

			.text {
				font-family: PingFangSC, PingFang SC;
				font-weight: 500;
				font-size: 23rpx;
				color: #F1F1F2;
				margin-top: 31rpx;
				margin-bottom: 21rpx;

				.sudi_data {
					width: 100%;
					height: 32rpx;
				}
			}

			.bt-time {
				z-index: 999;
				overflow: hidden;
				display: flex;
				justify-content: space-between;

				.tiem {
					font-family: PingFangSC, PingFang SC;
					font-weight: 400;
					font-size: 21rpx;
					color: #B6BFCA;
				}

				.na-ba {
					width: 196rpx;
					height: 45rpx;
					line-height: 45rpx;
					background-image: url(@/static/img/index/juxin.png);
					background-repeat: no-repeat;
					background-size: cover;
					font-family: PingFangSC, PingFang SC;
					font-weight: 400;
					font-size: 20rpx;
					color: #B98A1C;
					display: flex;
					transform: scale(0.9);

					image {
						width: 45rpx;
						height: 45rpx;
						margin-left: -5rpx;
					}
				}
			}
		}

		.li-top {
			display: flex;
			position: relative;

			image {
				width: 107rpx;
				height: 145rpx;
				display: block;
			}

			.text1 {
				font-family: PingFangSC, PingFang SC;
				font-weight: 500;
				font-size: 27rpx;
				color: #F1F1F2;
			}

			.text2 {
				font-family: PingFangSC, PingFang SC;
				font-weight: 400;
				font-size: 23rpx;
				color: #B6BFCA;
				margin-top: 8rpx;
			}

			.all {
				position: absolute;
				right: 20rpx;
				top: 10rpx;
				font-family: PingFangSC, PingFang SC;
				font-weight: 400;
				font-size: 23rpx;
				color: #999999;
			}
		}
	}

	.tips {
		display: flex;
		background: #25242A;
		border-radius: 15rpx;
		margin: 23rpx 20rpx;
		padding: 15rpx 14rpx;

		.t-l {
			width: 54rpx;
			height: 54rpx;
			overflow: hidden;
			z-index: 20;

			.tips-img {
				width: 53rpx;
				height: 43rpx;
				margin-top: 6rpx;
			}
		}

		.t-r {
			width: 600rpx;
			padding-left: 15rpx;
			font-family: PingFangSC, PingFang SC;
			font-weight: 400;
			font-size: 23rpx;
			color: #F1F1F2;
			line-height: 54rpx;
			overflow: hidden;
			white-space: nowrap;
			position: relative;
		}

		.scrolling-text {
			display: inline-block;
			vertical-align: middle;
			overflow: hidden;
			white-space: nowrap;
			position: absolute;
			animation: scroll-left 20s linear infinite;
		}

		@keyframes scroll-left {
			0% {
				transform: translateX(0);
			}

			100% {
				transform: translateX(-100%);
			}
		}
	}

	@keyframes music {
		0% {
			transform: translate3d(100%, 0, 0);
		}

		100% {
			transform: translate3d(-100%, 0, 0);
		}
	}

	.uni-margin-wrap {
		padding-left: 20rpx;
		padding-right: 20rpx;

		.swiper-top {
			width: 100%;
			height: 174rpx;

			.swiper-img {
				width: 100%;
				height: 174rpx;
			}

			::v-deep uni-swiper-item {
				border-radius: 10rpx;
			}

			::v-deep .uni-swiper-dots {
				.uni-swiper-dot {
					width: 8rpx;
					height: 8rpx;
					background: #FFFFFF;
					opacity: 0.6;
				}

				.uni-swiper-dot-active {
					width: 15rpx;
					height: 8rpx;
					background: #FFFFFF;
					border-radius: 4rpx;
					opacity: 1;
				}
			}
		}
	}

	.content-box {
		width: 750rpx;
		height: 431rpx;
		background-repeat: no-repeat;
		background-size: cover;
		position: relative;
		z-index: 0;
	}

	.tab-box {
		display: flex;
		justify-content: space-between;
		padding: 20rpx;

		.tab-item {
			text-align: center;
			position: relative;
    
			image {
				margin: 0 auto;
				width: 72rpx;
				height: 72rpx;
				display: block;
				margin-bottom: 17rpx;
			}

			text {
				font-family: PingFangSC, PingFang SC;
				font-weight: 400;
				font-size: 23rpx;
				color: #F1F1F2;
			}

			.has_new_msg {
				width: 11rpx;
				height: 11rpx;
				background: #F63843;
				border: 2rpx solid #FFFFFF;
				border-radius: 11rpx;
				position: absolute;
				right: 10rpx;
				top: 0;
				z-index: 10;
			}
		}
	}



	.top-head {
		width: 750rpx;
		height: 442rpx;
		background-image: url(/static/img/index/topBg2.png);
		background-repeat: no-repeat;
		background-size: cover;
		position: relative;
		margin-bottom: 40rpx;

		.top-head-wrap {
			height: 70rpx;
			padding: 0 25rpx 25rpx 25rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.search_box {
				width: 469rpx;
				height: 57rpx;
				background: #FFFFFF;
				border-radius: 29rpx;
				display: flex;
				align-items: center;
				padding-left: 20rpx;

				image {
					width: 34rpx;
				}

				text {
					font-family: PingFangSC, PingFang SC;
					font-weight: 400;
					font-size: 23rpx;
					color: #666666;
					line-height: 32rpx;
					text-align: left;
					font-style: normal;
					margin-left: 10rpx;
				}
			}

		}

		.address {
			position: relative;
			display: flex;
			align-items: center;
			z-index: 9999;

			.icon-1 {
				width: 48rpx;
				height: 48rpx;
			}

			.red-dot {
				position: absolute;
				right: -10rpx;
				top: -10rpx;
				width: 31rpx;
				height: 31rpx;
				background: #F53843;
				border: 2rpx solid #FFFFFF;
				font-family: PingFangSC, PingFang SC;
				font-weight: 400;
				font-size: 19rpx;
				text-align: center;
				line-height: 31rpx;
				border-radius: 50%;
				color: #FFFFFF;
			}
		}

		.search {
			height: 58rpx;
			flex: 0.7 auto;

			.uni-searchbar {
				padding: 0;
			}

			::v-deep .uni-searchbar__box {
				height: 58rpx;
				justify-content: flex-start;
			}

			::v-deep .uni-searchbar__box-icon-search {
				padding: 0 0 0 16rpx;
			}

			image {
				width: 44rpx;
				height: 42rpx;
				top: 13rpx;
			}
		}

		.server {
			position: relative;

			.icon-2 {
				width: 60rpx;
				height: 60rpx;
				margin-top: -20rpx;
				margin-right: 20rpx;
			}

			.text {
				position: absolute;
				top: 30rpx;
				left: -10rpx;
				width: 61rpx;
				height: 23rpx;
				text-align: center;
				line-height: 23rpx;
				background: linear-gradient(90deg, #E7D9B3 0%, #1B1A20 100%);
				border-radius: 15rpx;
				border: 1rpx solid #FFFFFF;
				width: 61rpx;
				font-size: 13rpx;
				height: 23rpx;
				padding: 5rpx 8rpx;
				background: linear-gradient(90deg, #E7D9B3 0%, #1B1A20 100%);
				color: #FFFFFF;
			}
		}

		.get-inko {
			width: 100%;
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0rpx;
			top: 270rpx;
			margin: 0 auto;

			.get-btn {
				margin: 0 auto;
				width: 273rpx;
				height: 80rpx;
				text-align: center;
				line-height: 80rpx;
				font-family: PingFangSC, PingFang SC;
				font-weight: 500;
				font-size: 31rpx;
				color: #FEF3E8;
				background: linear-gradient(90deg, #E7D9B3 0%, #1B1A20 100%);
				border-radius: 40rpx;
				border: 4rpx solid #F8DBB5;
				position: relative;
				z-index: 999;
			}
		}
	}

	.lc40 {
		display: flex;
		flex-direction: column;
		margin: 30rpx 0;

		view {
			color: #666;
			text-align: center;
			letter-spacing: 4rpx;
		}

		view:nth-child(1) {
			font-size: 38rpx;
			font-weight: 600;
			margin-bottom: 20rpx;
		}
	}
</style>