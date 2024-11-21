<template>
	<view class="main app-navbar">
		<view class="container">
			<view class="top-box">
				<view class="top-box-left">
					<image @click="$toPage('/pages/lines/lines')" src="@/static/img/lc/login/luyouqi.png"></image>
				</view>
				<view class="top-box-right" @click="open()">
					<image class="img1" src="@/static/img/lc/login/diqiu.png"></image>
					<text>{{ languageList[locale] }}</text>
					<image class="img2" src="@/static/img/lc/login/xila.png"></image>
				</view>
			</view>
			<login-template :title="$t('login.ZhuCe')">
				<view class="form-box">
					<!-- 用户名  -->
					<view class="form-text">{{ $t('login.YongHuMing') }}</view>
					<view class="item">
						<input class="input" :type="'text'" :placeholder="$t('login.QingShuRuYongHuMing')" tabindex="0"
							v-model="form['01']" :adjust-position="false" />
					</view>
					<!-- 邮箱  -->
					<view class="form-text">{{ $t('login.YouXiang') }}</view>
					<view class="item">
						<input class="input" :type="'text'" :placeholder="$t('login.QingShuRuYouXiang')" tabindex="0"
							v-model=" form['02']" :adjust-position="false" />
					</view>
					<!-- 验证码  -->
					<view class="form-text">{{ $t('login.YanZhengMa') }}</view>
					<view class="item">
						<input class="input" :type="'text'" tabindex="2" :placeholder="$t('login.QingShuRuYanZhengMa')"
							v-model="form['03']" :adjust-position="false">
						<button class="code-button" :disabled="disabled_get" @click="sendcode">{{codeText}}</button>
					</view>
					<!-- 登录按钮模块 -->
					<view class="login-btn btn-active" :class="{'get-ok-Login': !allowLogin}"
						@click="$noMultipleClicks(submit0)">
						{{ $t('login.XiaYiBu') }}
					</view>
					<navigator class="register-to" url="/pages/general/login/login" open-type="navigate">
						<span>{{ $t('login.DengLu') }}</span>
					</navigator>
				</view>
			</login-template>

		</view>
		<view class="ke-fu" @click="$openkf()">
			<text>{{$t('msg.lxkf')}}</text>
		</view>
		<u-toast ref="uToast"></u-toast>
		<!-- 弹出层 -->
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
		_04,
		_06
	} from '@/api/general.js'
	import { i18n } from '../../../main.js'
	import LoginTemplate from '@/components/login-template/login-template.vue'
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
				isRadio: 1,
				noClick: true,
				form: {
					"01": null,
					"02": null,
					"03": null
				},
				disabled_get: true,
				codeText: i18n.global.t('msg.hqyzm'),
				locale: uni.getStorageSync('lang_c') ? uni.getStorageSync('lang_c') : 'zh',
				languageList: {
					'zh': '简体中文',
					'zht': '繁體中文',
					// 'en': 'English'
				},
				
			}
		},
		watch: {
			"form.02": {
				handler(val) {
					const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
					if (emailRegex.test(val)) {
						this.disabled_get = false
					} else {
						this.disabled_get = true
					}
				}
			}
		},
		computed: {
			// 是否满足登录条件
			allowLogin: function() {
				return this.form['01'] && this.form['02'] && this.form['03'] // && this.checked
			}
		},
		methods: {
			$noMultipleClicks: noMultipleClicks,
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
			// 发送验证码
			sendcode() {
				if (this.codeText !== i18n.global.t('msg.hqyzm') && this.codeText !== i18n.global.t('msg.cxfs')) {
					return
				}
				setTimeout(() => {
					var time = 60
					this.codeText = time + `s${i18n.global.t('msg.hcxfs')}`

					let timer = setInterval(() => {
						time--
						this.codeText = time + `s${i18n.global.t('msg.hcxfs')}`
						if (time === 0) {
							this.codeText = i18n.global.t('msg.cxfs')
							clearInterval(timer)
						}
					}, 1000);
				}, 1000)
				_04({
					"01": this.form["02"]
				}).then(() => {
					uni.showToast({
						title: i18n.global.t('msg.yzmyfs')
					})
				})
			},
			validateForm() {
				// 用户名校验
				if (!this.form['01']) {
					uni.showToast({
						title: i18n.global.t('login.QingShuRuYongHuMing')
					})
					return false
				}

				// 邮箱校验
				const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
				if (!this.form['02']) {
					uni.showToast({
						title: i18n.global.t('login.QingShuRuYouXiang')
					})
					return false
				} else if (!emailPattern.test(this.form['02'])) {
					uni.showToast({
						title: i18n.global.t('login.YouXiangBuZhengQue')
					})
					return false
				}

				// 验证码校验
				if (!this.form['03']) {
					uni.showToast({
						title: i18n.global.t('login.QingShuRuYanZhengMa')
					})
					return false
				}

				this.allowLogin = true;
				return true;
			},
			submit0() {
				if (this.validateForm()) {
					_06(this.form).then(() => {
						uni.setStorageSync('register_info', this.form)
						uni.navigateTo({
							url: "/pages/general/register/register-two"
						})
					}).catch(err => {
						console.log(err)
					})
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
		width: 100vw;
		height: 100vh;
		background-color: #000000;
		padding-bottom: 40rpx;
	}

	.container {
		height: 100vh;
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
				color: #B98A1C;
				border: 0;
			}

			uni-button:after {
				border: 0;
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