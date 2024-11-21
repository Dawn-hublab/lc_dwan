<template>
	<view class="main app-navbar">
		<view class="container">
			<view class="top-box">
				<view class="top-box-left">
					<image @click="$toPage('/pages/lines/lines')" src="@/static/img/lc/login/luyouqi.png"></image>
				</view>
				<view class="top-box-right" @click="open">
					<image class="img1" src="@/static/img/lc/login/diqiu.png"></image>
					<text>{{ languageList[locale] }}</text>
					<image class="img2" src="@/static/img/lc/login/xila.png"></image>
				</view>
			</view>
			<login-template :title="$t('login.ZhuCe')">
				<view class="form-box">
					<!-- 登录密码  -->
					<view class="form-text">{{ $t('login.DengLuMiMa') }}</view>
					<view class="item">
						<input class="input" :type="showPwd?'password':'text'" v-model="form['04']" tabindex="1"
							:placeholder="$t('login.QingShuRuMiMa')" :adjust-position="false" />
						<image class="image-icon" v-if="showPwd" @click="showPwd=!showPwd"
							src="@/static/img/lc/login/kejian.png"></image>
						<image class="image-icon" v-else @click="showPwd=!showPwd"
							src="@/static/img/lc/login/kejian2.png">
						</image>
					</view>
					<!-- 交易密码  -->
					<view class="form-text">{{ $t('login.jymm') }}</view>
					<view class="item">
						<input class="input" :type="showPwd2?'password':'text'" v-model="form['05']" tabindex="1"
							:placeholder="$t('login.srjymm')" :adjust-position="false" />
						<image class="image-icon" v-if="showPwd2" @click="showPwd2=!showPwd2"
							src="@/static/img/lc/login/kejian.png"></image>
						<image class="image-icon" v-else @click="showPwd2=!showPwd2"
							src="@/static/img/lc/login/kejian2.png"></image>
					</view>
					<!-- 邀请码  -->
					<view class="form-text">{{ $t('login.yqm') }}</view>
					<view class="item">
						<input class="input" :type="'text'" :placeholder="$t('login.sryqm')" tabindex="0"
							v-model="form['06']" :adjust-position="false" />
					</view>
					<!-- 登录按钮模块 -->
					<button class="login-btn" :class="{'get-ok-Login': !allowLogin}"
						@click="$noMultipleClicks(submit1)">
						{{ $t('login.ZhuCe') }}
					</button>
					<navigator class="register-to" url="/pages/general/login/login" open-type="navigate">
						<span>{{ $t('login.DengLu') }}</span>
					</navigator>
				</view>
			</login-template>
		</view>
		<view class="ke-fu" @click="$openkf()">
			<text>{{$t('msg.lxkf')}}</text>
		</view>
		<view class="radio-box">
			{{ $t('msg.zcty') }}<text @click="$toPage('/pages/user/agreement-fw')">《{{ $t('login.FuWuXieYi') }}》</text>
			{{ $t('login.He') }}<text @click="$toPage('/pages/user/agreement-ys')">《{{ $t('login.YinSiXieYi') }}》</text>
		</view>
		<u-loading-page :loading="loading" :loadingText="$t('msg.jzz')" bg-color="transparent" loading-mode="spinner"
			class="loading"></u-loading-page>
		<uni-popup ref="popup">
			<view class="pop-content">
				<image class="close" @click="close" src="@/static/img/user/guan.png"></image>
				<view class="title">{{$t('index.YuYanSheZhi')}}</view>
				<view class="select-item" @click="select(index)" :class="locale == index ? 'active' : ''"
					v-for="(item,index) in languageList" :key="index">
					{{item}}
					<image v-show="locale == index" src="@/static/img/user/gou.png"></image>
				</view>
			</view>
		</uni-popup>
	</view>
</template>
<script>
	import {
		title
	} from '@/static/config.js'
	import {
		_86,
		_07
	} from '@/api/general.js'
	import {
		mapActions
	} from 'pinia';
	import LoginTemplate from '@/components/login-template/login-template.vue'
	import {
		useUser
	} from "@/store/useUser.js"
	import {
		noMultipleClicks
	} from '@/utils/common.js'
	export default {
		name: 'register',
		components: {
			LoginTemplate
		},
		data() {
			return {
				type: 1,
				isRadio: 2,
				noClick: true,
				showPwd: true,
				showPwd2: true,
				loading: false,
				form: {
					"04": null,
					"05": null,
					"06": uni.getStorageSync('invite_code'),
					"07": uni.getStorageSync('systemInfo')
				},
				xieyi: null,
				locale: uni.getStorageSync('lang_c') ? uni.getStorageSync('lang_c') : 'zh',
				languageList: {
					'zh': '简体中文',
					'zht': '繁體中文',
					// 'en': 'English'
				}
			}
		},
		computed: {
			// 是否满足登录条件
			allowLogin: function() {
				return this.form['04'] && this.form['05'] && this.form['06'] // && this.checked
			}
		},
		onLoad() {
			let form1 = uni.getStorageSync('register_info')
			if (form1 && form1['01'] && form1['02'] && form1['03']) {
				uni.navigateTo('/pages/general/register/register')
				return
			}
		},
		onShow() {
			// #ifdef H5
			document.title = title
			var link = document.createElement('link');
			link.type = 'image/x-icon';
			link.rel = 'shortcut icon';
			document.head.appendChild(link);

			var linkApple = document.createElement('link');
			linkApple.type = 'image/x-icon';
			linkApple.rel = 'apple-touch-icon';
			document.head.appendChild(linkApple);
			// #endif
			let _this = this
			uni.getClipboardData({
				success: function(res) {
					if (res.data.includes("invite_code")) {
						_this.form["06"] = getUrlParam(res.data, "invite_code")
					}
				},
				fail: function(err) {
					console.error('Error getting clipboard data: ', err);
				}
			});
		},
		methods: {
			...mapActions(useUser, ['setToken']),
			$noMultipleClicks: noMultipleClicks,
			// ...mapActions({
			// 	getHasNewcomerQualifications: "user/getHasNewcomerQualifications"
			// }),
			openXieyi(title) {
				uni.showLoading({
					title: 'loading'
				})
				_86({
					title: title
				}).then(res => {
					this.xieyi = res.data
					this.$refs.xieyi.open()
				}).finally(() => uni.hideLoading())
			},
			closeXy() {
				this.$refs.xieyi.close()
			},
			select(locale) {
				this.locale = locale
				this.$i18n.locale = locale;
				uni.setStorageSync('lang_c', locale)
			},
			close() {
				this.$refs.popup.close()
			},
			open() {
				this.$refs.popup.open('bottom')
			},
			validateForm() {
				// 登录密码校验
				if (!this.form['04']) {
					uni.showToast({
						title: this.$t('login.srjymm'),
						duration: 2000,
						icon: 'error'
					})
					return false
				}
				// 交易密码校验（必填且6位数字）
				const passwordPattern = /^\d{6}$/;
				if (!this.form['05']) {
					uni.showToast({
						title: this.$t('login.QingShuRuMiMa'),
						duration: 2000,
						icon: 'error'
					})
					return false
				} else if (!passwordPattern.test(this.form['05'])) {
					uni.showToast({
						title: this.$t('login.MiMaBuZhengQue'),
						duration: 2000,
						icon: 'error'
					})
					return false
				}

				// 邀请码校验（必填）
				if (!this.form['06']) {
					uni.showToast({
						title: this.$t('login.sryqm'),
						duration: 2000,
						icon: 'error'
					})
					return false
				}
				return true;
			},
			submit1() {
				if (this.validateForm()) {
					this.loading = true
					let form1 = uni.getStorageSync('register_info')
					let params = {
						...form1,
						...this.form,
						'07': '',
					}
					let _this = this
					uni.getSystemInfo({
						success: function(info) {
							if (!uni.getStorageSync('systemInfo')) {
								let data = [info.deviceModel, info.brand, info.system, info.uniPlatform]
									.join(
										'-')
								uni.setStorageSync('systemInfo', data)
							}
							params['07'] = uni.getStorageSync('systemInfo')
							_07(params).then(res => {
								_this.setToken(res.data.token)
								// _this.getHasNewcomerQualifications()
								uni.removeStorageSync('register_info')
								uni.switchTab({
									url: '/pages/index/index'
								})
							}).finally(() => {
								this.loading = false
							})
						}
					});
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	input:-webkit-autofill {
		-webkit-box-shadow: 0 0 0px 1000px #F7F7F7 inset;
	}

	.pop-content {
		width: 750rpx;
		padding-bottom: 20rpx;
		background: #1B1A22;
		border-radius: 61rpx 61rpx 0rpx 0rpx;
		position: relative;

		.select-item {
			position: relative;
			width: 691rpx;
			margin: 0 auto;
			height: 88rpx;
			line-height: 88rpx;
			background: #25242A;
			text-indent: 32rpx;
			border-radius: 15rpx;
			font-family: PingFangSC, PingFang SC;
			font-weight: 400;
			font-size: 27rpx;
			color: #999999;

			image {
				position: absolute;
				right: 32rpx;
				top: 25rpx;
				width: 48rpx;
				height: 38rpx;
			}
		}

		.active {
			border: 2rpx solid #FCE7B7;
			color: #FCE7B7;
		}

		.title {
			font-family: PingFangSC, PingFang SC;
			font-weight: 500;
			font-size: 31rpx;
			color: #FFFFFF;
			text-align: center;
			padding: 45rpx;
		}

		.close {
			position: absolute;
			right: 50rpx;
			top: 50rpx;
			width: 35rpx;
			height: 35rpx;
		}
	}

	.ke-fu {
		position: fixed;
		width: 120rpx;
		height: 120rpx;
		right: 30rpx;
		bottom: 158rpx;
		z-index: 99;
		background-image: url('/static/img/lc/login/kefu.png');
		background-repeat: no-repeat;
		background-size: 100%;
		box-sizing: border-box;
		padding-top: 86rpx;

		text {
			display: block;
			text-align: center;
			font-size: 24rpx;
			color: #fff;
		}
	}

	.radio-box {
		display: flex;
		color: #666666;
		font-size: 24rpx;
		padding-left: 50rpx;
		padding-top: 52rpx;
		padding-bottom: 50rpx;
		box-sizing: border-box;

		image {
			width: 32rpx;
			height: 32rpx;
			margin-right: 20rpx;
		}

		text {
			color: #FCE7B7;
		}
	}

	.top-box {
		display: flex;
		justify-content: space-between;
		padding-top: 20rpx;

		.top-box-left {
			image {
				width: 48rpx;
				height: 48rpx;
			}
		}

		.top-box-right {
			display: flex;
			width: 200rpx;
			height: 46rpx;
			line-height: 46rpx;
			border-radius: 22rpx;
			background: #FCE7B7;

			.img1 {
				width: 36rpx;
				height: 36rpx;
				margin-left: 10rpx;
				margin-top: 6rpx;
			}

			text {
				margin-left: 10rpx;
				font-family: PingFangSC;
				font-size: 24rpx;
				color: #B98A1C;
			}

			.img2 {
				width: 20rpx;
				height: 13rpx;
				margin-left: 4rpx;
				margin-top: 18rpx;
			}
		}
	}

	.main {
		position: relative;
		width: 100vw;
		height: 100vw;
		box-sizing: border-box;
		background-color: #000000;
	}

	.container {
		height: 100vw;
		padding: 0 30rpx;
	}

	.form-box {
		margin-top: 58rpx;

		.form-text {
			font-family: PingFangSC;
			font-size: 28rpx;
			color: #333;
			width: 80%;
			font-weight: bold;
			margin-left: 10%;
			padding: 10rpx 20rpx;
		}

		.item {
			margin-bottom: 30rpx;
			width: 80%;
			margin-left: 10%;
			height: 92rpx;
			background: #F7F7F7;
			border-radius: 46rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.image-icon {
				margin-right: 20rpx;
				width: 42rpx;
				height: 22rpx;
				display: inline-block;
				margin-right: 20rpx;
			}

			.input {
				border: 0;
				margin-left: 30rpx;
				flex: 1;
				color: #666666;
				background-color: transparent;
				height: 80rpx;
				line-height: 80rpx;
				overflow: hidden;
				outline: none;
			}

			.input::placeholder {
				font-size: 28rpx;
				color: #cccccc;
			}

			.code-button {
				margin-right: 40rpx;
				height: 50rpx;
				font-size: 28rpx;
				line-height: 50rpx;
				color: #ED3735;
			}
		}

		.agreement {
			display: flex;
			font-size: 24rpx;
			align-items: center;
			// align-content: center;
			justify-content: center;
			margin-top: 22rpx;
		}

		.login-btn {
			display: block;
			height: 90rpx;
			width: 80%;
			margin-left: 10%;
			margin-top: 40rpx;
			border-radius: 46rpx;
			background: #FCE7B7;
			font-family: PingFangSC;
			font-size: 32rpx;
			color: #1B1A22;
			line-height: 90rpx;
			text-align: center;

			span {
				padding: 0 15rpx;
			}
		}

		.login-options {
			margin-top: 40rpx;
			padding: 0 50rpx;
			text-align: right;
			font-family: PingFangSC;
			font-size: 28rpx;
			color: #B98A1C;

			a {
				color: #B98A1C;
			}
		}

		.get-ok-Login {
			opacity: 0.5;
		}

		.register-to {
			margin-top: 30rpx;
			padding-bottom: 60rpx;
			font-size: 28rpx;
			text-align: center;
			color: #333;

			span {
				color: #B98A1C;
			}
		}
	}
</style>