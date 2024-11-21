<template>
	<view class="main app-navbar">
		<swiper class="card-swiper" :circular="true" :autoplay="autoplay" :duration="500" :interval="3000"
			:current="current" @change="changEvent">
			<swiper-item>
				<view class="container clear-margin-overlap">
					<view class="top-box">
						<view class="top-box-left">
						</view>
						<view class="top-box-right" @click="goOut">
							<text>{{ countdownText }}</text>
						</view>
					</view>
					<view class="header">
						<view class="text1">{{ $t('login.ShiNianChenDianGengDongLiCai') }}</view>
						<view class="text2">{{ $t('login.FuWuChao1000WanYongHuRongZiChao20YiYuan') }}</view>
					</view>
					<view class="ya-zi">
						<image class="img2" mode="widthFix" src="@/static/img/lc/login/guide1.png"></image>
					</view>
					<view class="process_next">
						<view class="process">
							<div class="bg"></div>
							<div class="hav1"></div>
						</view>
						<view class="btn-next" @click="goNext(0)">
							<image class="img" src="@/static/img/lc/login/next.png"></image>
						</view>
					</view>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="container clear-margin-overlap">
					<view class="top-box">
						<view class="top-box-left">
						</view>
						<view class="top-box-right" @click="goOut">
							<text>{{ countdownText }}</text>
						</view>
					</view>
					<view class="header">
						<view class="text1">{{ $t('login.JiLvTouZiZeShiErDong') }}</view>
						<view class="text2">{{ $t('login.ZhuanYeTuanDuiTieXinTouZiFuWuWenZhongQiuSheng') }}</view>
					</view>
					<view class="ya-zi">
						<image class="img2" mode="widthFix" src="@/static/img/lc/login/guide2.png">
						</image>
					</view>
					<view class="process_next">
						<view class="process">
							<div class="bg"></div>
							<div class="hav2"></div>
						</view>
						<view class="btn-next" @click="goNext(1)">
							<image class="img" src="@/static/img/lc/login/next.png"></image>
						</view>
					</view>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="container clear-margin-overlap">
					<view class="top-box">
						<view class="top-box-left">
						</view>
						<view class="top-box-right" @click="goOut">
							<text>{{ countdownText }}</text>
						</view>
					</view>
					<view class="header">
						<view class="text1">{{ $t('login.YanXuanZiChanShouYiWenJian') }}</view>
						<view class="text2">{{ $t('login.ZhuanYeTouYanTuanDuiZiChanQianLiTaoYi') }}</view>
					</view>
					<view class="ya-zi">
						<image class="img2" mode="widthFix" src="@/static/img/lc/login/guide3.png">
						</image>
					</view>
					<view class="process_next">
						<view class="process">
							<div class="bg"></div>
							<div class="hav3"></div>
						</view>
						<view class="btn-next-3" @click="goNext(2)">
							{{ $t('login.ljty') }}
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
		<u-loading-page :loading="loading" :loadingText="$t('msg.jzz')" bg-color="transparent"
			loading-mode="spinner"></u-loading-page>
	</view>
</template>
<script>
	import {
		fetLocalLines,
		fetchApiLines,
		checkNetwork
	} from '@/utils/common.js'

	export default {
		name: 'login',
		data() {
			return {
				autoplay: false,
				current: 0, // 表示第几页
				countdown: 5, // 倒计时初始值
				countdownText: '', // 显示的倒计时文本
				countdownInterval: null, // 定时器引用
				showSkipButton: false, // 是否显示“跳过”按钮
				loading: false
			}
		},
		async onShow() {
			this.startCountdown()
		},
		async onHide() {
			await this.fetchLines()
		},
		async onUnload() {
			await this.fetchLines()
		},
		methods: {
			async fetchLines() {
				let currentLine = uni.getStorageSync('currentLine')
				if (!currentLine) {
					fetLocalLines()
					await fetchApiLines()
				}
			},
			changEvent(e) {
				if (this.current == 2) {
					this.autoplay = false
				} else {
					this.current = e.detail.current;
				}
			},
			goNext(type) {
				if (type == 2) {
					setTimeout(() => {
						this.goOut()
					}, this.contdown * 1000)
				} else {
					this.current = type + 1
				}
			},
			async goOut() {
				if (this.countdown <= 0) {
					// #ifdef APP-PLUS
					this.loading = true
					if (await checkNetwork()) {
						this.loading = false
						uni.switchTab({
							url: "/pages/index/index"
						})
					} else {
						this.loading = false
						uni.redirectTo({
							url: '/pages/none/none'
						})
					}
					// #endif
					// #ifdef H5
					uni.switchTab({
						url: "/pages/index/index"
					})
					// #endif
				}
			},
			async startCountdown() {
				// #ifdef APP-PLUS
				if (await checkNetwork()) {
					uni.setStorageSync("startPage", true)
					await this.fetchLines()
					this.countdownText = `${this.countdown}s`
					this.countdownInterval = setInterval(() => {
						this.countdown -= 1
						this.countdownText = `${this.countdown}s`
						if (this.countdown <= 0) {
							clearInterval(this.countdownInterval)
							this.showSkipButton = true
							this.countdownText = this.$t('login.TiaoGuo')
						}
					}, 1000)
				} else {
					this.countdown = 0
					this.countdownText = this.$t('login.TiaoGuo')
				}
				// #endif
				// #ifdef H5
				uni.setStorageSync("startPage", true)
				this.countdown = 0
				this.countdownText = this.$t('login.TiaoGuo')
				// #endif
			}
		}
	};
</script>

<style lang="scss" scoped>
	input:-webkit-autofill {
		-webkit-box-shadow: 0 0 0px 1000px #F7F7F7 inset;
	}

	.card-swiper swiper-item .swiper-item {
		width: 100%;
		display: block;
		height: 100%;
		border-radius: 0rpx;
		transform: scale(1);
		transition: all 0.2s ease-in 0s;
		will-change: transform;
		overflow: hidden;
	}

	.btn-next-3 {
		margin: 40rpx auto;
		width: 332rpx;
		height: 86rpx;
		background: #FCE7B7;
		border-radius: 44rpx;
		line-height: 86rpx;
		text-align: center;
		font-family: PingFangSC, PingFang SC;
		font-weight: 400;
		font-size: 31rpx;
		color: #1B1A22;
		margin: 0 auto;
	}

	.process_next {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 130rpx;
		margin: 0 auto;
	}

	.process {
		position: relative;
		width: 122rpx;
		margin: 70rpx auto;

		.bg {
			width: 122rpx;
			height: 8rpx;
			background: #E2E2E2;
			border-radius: 4rpx;
		}

		.hav1 {
			position: absolute;
			top: 0rpx;
			width: 48rpx;
			height: 8rpx;
			background: #B98A1C;
			border-radius: 4rpx;
		}

		.hav2 {
			position: absolute;
			top: 0rpx;
			width: 48rpx;
			height: 8rpx;
			background: #B98A1C;
			border-radius: 4rpx;
			left: 37rpx;
		}

		.hav3 {
			position: absolute;
			top: 0rpx;
			width: 48rpx;
			height: 8rpx;
			background: #B98A1C;
			border-radius: 4rpx;
			right: 0;
		}
	}

	.btn-next {
		margin: 40rpx auto;
		width: 145rpx;
		height: 86rpx;
		line-height: 86rpx;
		text-align: center;
		background: #FCE7B7;
		border-radius: 44rpx;
		margin: 0 auto;

		.img {
			width: 56rpx;
			height: 46rpx;
			margin-top: 20rpx;
		}
	}

	.ya-zi {
		margin: 0 auto;
		display: flex;
		justify-content: center;

		.img2 {
			width: 500rpx;
			margin: 0 auto;
		}
	}

	.top-box {
		display: flex;
		justify-content: space-between;
		padding-top: 20rpx;

		.top-box-left {
			image {
				width: 36rpx;
				height: 36rpx;
			}
		}

		.top-box-right {
			display: flex;
			width: 124rpx;
			height: 56rpx;
			line-height: 56rpx;
			text-align: center;
			border-radius: 28rpx;
			background: #FCE7B7;

			text {
				display: inline-block;
				margin: 0 auto;
				font-family: PingFangSC;
				font-size: 24rpx;
				color: #B98A1C;
			}
		}
	}

	.main {
		position: relative;
		width: 750rpx;
		min-height: 100vh;
		background-color: #000000;
	}

	.card-swiper {
		width: 100vw;
		height: 100vh;
	}

	.scroll {
		position: relative;
		width: 100%;
		height: 100%;
		z-index: 9;
	}

	.container {
		position: relative;
		padding: 0 24rpx;
	}

	.header {
		margin-top: 175rpx;
		margin-bottom: 100rpx;

		.text1 {
			text-align: center;
			font-family: PingFangSC, PingFang SC;
			font-weight: 600;
			font-size: 53rpx;
			color: #FCE7B7;
			line-height: 76rpx;
			font-style: normal;
		}

		.text2 {
			text-align: center;
			font-family: PingFangSC, PingFang SC;
			font-weight: 400;
			font-size: 34rpx;
			color: #999999;
			line-height: 100rpx;
			font-style: normal;
		}

	}
</style>