<template>
	<view class="main app-navbar">
		<view class="container">
			<view class="top-box">
				<view class="top-box-left">
					<image @click="$toPage('/pages/lines/lines')" src="@/static/img/lc/login/luyouqi.png" lazy-load>
					</image>
				</view>
				<view class="top-box-right" @click="open">
					<image class="img1" src="@/static/img/lc/login/diqiu.png" lazy-load></image>
					<text>{{ languageList[locale] }}</text>
					<image class="img2" src="@/static/img/lc/login/xila.png" lazy-load></image>
				</view>
			</view>
			<login-template :title="$t('login.DengLu')">
				<view class="form-box">
					<!-- 手机号  -->
					<view class="form-text">{{ $t('login.YongHuMing') }}</view>
					<view class="item">
						<input class="input" :type="'text'" :placeholder="$t('login.QingShuRuYongHuMing')" tabindex="0"
							v-model="form.account_identifier" />
					</view>
					<!-- 密码  -->
					<view class="form-text">{{ $t('login.DengLuMiMa') }}</view>
					<view class="item">
						<input class="input" :type="showPwd?'password':'text'" v-model="form.password" tabindex="1"
							:placeholder="$t('login.QingShuRuMiMa')" :adjust-position="false" />
						<image class="image-icon" v-if="showPwd" @click="showPwd=!showPwd"
							src="@/static/img/lc/login/kejian.png" lazy-load></image>
						<image class="image-icon" v-else @click="showPwd=!showPwd"
							src="@/static/img/lc/login/kejian2.png" lazy-load>
						</image>
					</view>
					<view class="login-options">
						<text
							@click="$toPage('/pages/general/remember-pwd/remember-pwd')">{{ $t('login.WangJiMiMa') }}</text>
					</view>
					<!-- 登录按钮模块 -->
					<button class="login-btn btn-active" :disabled="disabled" :class="{'get-ok-Login': !allowLogin}"
						@click="$noMultipleClicks(login)">
						{{ $t('login.DengLu') }}
					</button>
					<navigator class="register-to" url="/pages/general/register/register" open-type="navigate">
						<span>{{ $t('login.ZhuCe') }}</span>
					</navigator>
				</view>

			</login-template>
		</view>
		<view class="ke-fu" @click="$openkf()">
			<text>{{$t('msg.lxkf')}}</text>
		</view>
		<u-toast ref="uToast"></u-toast>
		<u-loading-page :loading="loading" :loadingText="$t('msg.jzz')" bg-color="transparent" loading-mode="spinner"
			class="loading"></u-loading-page>
		<!-- 弹出层 -->
		<uni-popup ref="popup">
			<view class="pop-content">
				<image class="close" @click="close" src="@/static/img/user/guan.png"></image>
				<view class="title">{{$t('index.YuYanSheZhi')}}</view>
				<view class="select-item" @click="select(index)" :class="locale == index ? 'active' : ''"
					v-for="(item,index) in languageList" :key="index">
					{{item}}
					<image v-show="locale == index" src="@/static/img/user/gou.png" lazy-load></image>
				</view>
			</view>
		</uni-popup>
	</view>
</template>
<script>
	import LoginTemplate from '@/components/login-template/login-template.vue'
	import {
		noMultipleClicks
	} from '@/utils/common.js'
	import {
		mapActions
	} from 'pinia';
	import {
		useUser
	} from "@/store/useUser.js"
	export default {
		name: 'login',
		// mixins: [mixin],
		data() {
			return {
				type: 1,
				isRadio: 1,
				noClick: true,
				// checked: false,
				showPwd: true, // 是否显示密码
				form: {
					account_identifier: '',
					password: ''
				},
				locale: uni.getStorageSync('lang_c') ? uni.getStorageSync('lang_c') : 'zh',
				languageList: {
					'zh': '简体中文',
					'zht': '繁體中文',
					// 'en': 'English'
				},
				loading: false,
				disabled: false,
				deviceModel: ''
			}
		},
		components: {
			LoginTemplate
		},
		computed: {
			// 是否满足登录条件
			allowLogin: function() {
				return this.form.account_identifier && this.form.password // && this.checked
			}
		},
		// 在页面的onLoad生命周期函数中监听触摸事件
		onShow() {
			uni.setStorageSync('login_page', true)
		},
		onBackPress() {
			uni.setStorageSync('login_page', false)
			uni.switchTab({
				url: '/pages/index/index',
			})
			return true
		},
		onHide() {
			uni.setStorageSync('login_page', false)
			uni.switchTab({
				url: '/pages/index/index',
			})
		},
		onUnload() {
			uni.setStorageSync('login_page', false)
			uni.switchTab({
				url: '/pages/index/index',
			})
		},
		methods: {
			...mapActions(useUser, ['loginHandle']),
			$noMultipleClicks: noMultipleClicks,
			$toPage(page) {
				uni.navigateTo({
					url: page
				})
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
			login() {
				if (!this.form.account_identifier) {
					this.$refs.uToast.show({
						type: 'default',
						icon: false,
						message: this.$t('msg.qsryxoryhm'),
					})
					return
				}
				if (!this.form.password) {
					this.$refs.uToast.show({
						type: 'default',
						icon: false,
						message: this.$t('msg.qsrmm'),
					})
					return
				}
				if (!this.allowLogin) return;
				this.disabled = true
				this.loading = true
				this.loginHandle(this.form).then(res => {
					uni.switchTab({
						url: '/pages/index/index'
					})
				}).finally(() => {
					this.loading = false
					this.disabled = false
				})
				// return this.$store.dispatch("user/login", this.form)
				// 	.then(res => {
				// 		uni.switchTab({
				// 			url: '/pages/index/index'
				// 		})
				// 	}).finally(() => {
				// 		this.loading = false
				// 		this.disabled = false
				// 	})
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
		background: #1B1A22;
		border-radius: 61rpx 61rpx 0rpx 0rpx;
		position: relative;
		padding-bottom: 20rpx;


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
		position: absolute;
		width: 120rpx;
		height: 120rpx;
		right: 30rpx;
		bottom: 258rpx;
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
				width: 34rpx;
				height: 34rpx;
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
		width: 750rpx;
		min-height: 100vh;
		box-sizing: border-box;
		background-color: #000000;
	}

	.container {
		min-height: 100vh;
		position: relative;
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
			background: #F8F8F8;
			border-radius: 46rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.image-icon {
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
			font-size: 28rpx;
			text-align: center;
			color: #333;

			span {
				color: #B98A1C;
			}
		}
	}
</style>