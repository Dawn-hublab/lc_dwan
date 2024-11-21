<template>
	<view class="main app-navbar">
		<view class="container">
			<view class="top-box">
				<view class="top-box-left" @click="goBack">
					<image src="@/static/img/lc/login/back.png"></image>
				</view>
			</view>
			<login-template :title="$t('login.XinMiMa')">
				<view class="form-box">
					<!-- 新密码  -->
					<view class="form-text">{{ $t('login.XinMiMa') }}</view>
					<view class="item">
						<input class="input" :type="'text'" :placeholder="$t('login.QingShuRuXinMiMa')" tabindex="0"
							v-model="form['04']" :adjust-position="false" />
					</view>
					<!-- 邮箱  -->
					<view class="form-text">{{ $t('login.QueRen') }}</view>
					<view class="item">
						<input class="input" :type="'text'" :placeholder="$t('login.QueRenXinMiMa')" tabindex="0"
							v-model="form['05']" :adjust-position="false" />
					</view>
					<!-- 登录按钮模块 -->
					<view class="login-btn btn-active" :class="{'get-ok-Login': allowLogin}"
						@click="$noMultipleClicks(submit1)">
						{{ $t('login.YanZheng') }}
					</view>
				</view>
			</login-template>
		</view>
	</view>
</template>
<script>
	// import {
	// 	_11
	// } from '@/api/index.js'
	import LoginTemplate from '@/components/login-template/login-template.vue'

	export default {
		name: 'register',
		// mixins: [mixin],
		data() {
			return {
				noClick: true,
				form: {
					"04": null,
					"05": null
				}
				// checked: false,
			}
		},
		components: {
			LoginTemplate
		},
		computed: {
			// 是否满足登录条件
			allowLogin: function() {
				return !this.form['04'] && !this.form['05']
			}
		},
		methods: {
			submit1() {
				uni.showLoading({
					title: "loading"
				})
				let form1 = uni.getStorageSync('remeber-pwd')
				_11({
					...form1,
					...this.form
				}).then(res => {
					uni.showToast({
						title: this.$t('msg.mmyxgqwdl'),
						complete() {
							uni.redirectTo({
								url: '/pages/general/login/login'
							})
						}
					})
				}).finally(() => {
					uni.hideLoading()
				})
			},
			goBack() {
				let canNavBack = getCurrentPages()
				if (canNavBack && canNavBack.length > 1) {
					uni.navigateBack()
				} else {
					history.back();
				}
			},
			select(type) {
				this.type = type
				if (type == 1) {
					this.$i18n.locale = 'zh';
				} else {
					this.$i18n.locale = 'zht';
				}
			},
			close() {
				this.$refs.popup.close()
			},
			open() {
				this.$refs.popup.open('bottom')
			},
			// 发送验证码
			sendcode() {
				if (!/^1\d{10}$/.test(this.phone)) {
					this.$toast('请填写11位手机号码')
					return
				}

				if (this.codeText !== '发送验证码' && this.codeText !== '重新发送') {
					return
				}
				this.codeText = '...'

				setTimeout(() => {
					var time = 60
					this.codeText = time + 's'

					let timer = setInterval(() => {
						time--
						this.codeText = time + 's'
						if (time === 0) {
							this.codeText = '重新发送'
							clearInterval(timer)
						}
					}, 1000);
				}, 1000)

				this.apiPost('/api/getSmsCode', {
					userPhone: this.phone, // 手机号码
					type: '1' // 1 注册 2找回密码
				}).then((res) => {
					if (res.code === this.CTS.SUCCESS_CODE) {
						this.code_sign = res.data // 验证码签名

						var time = 60
						this.codeText = time + 's'

						let timer = setInterval(() => {
							time--
							this.codeText = time + 's'
							if (time === 0) {
								this.codeText = '重新发送'
								clearInterval(timer)
							}
						}, 1000);
					} else {
						this.codeText = '重新发送'
					}
					this.$toast(res.message)
				}).catch((err) => {
					this.codeText = '重新发送'
					this.$toast('验证码发送失败，稍后再试')
				})
			},
		}
	};
</script>

<style lang="scss" scoped>
	input:-webkit-autofill {
		-webkit-box-shadow: 0 0 0px 1000px #F7F7F7 inset;
	}

	.pd100 {
		padding-bottom: 100px;
	}

	.pop-content {
		width: 750rpx;
		height: 466rpx;
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

	.radio-box {
		display: flex;
		color: #666666;
		font-size: 24rpx;
		padding-left: 50rpx;
		padding-top: 52rpx;

		image {
			width: 32rpx;
			height: 32rpx;
			margin-right: 20rpx;
		}

		text {
			color: #FCE7B7;
		}
	}

	.ya-zi {
		margin-top: 65rpx;

		image {
			width: 162rpx;
		}
	}

	.top-box {
		display: flex;
		justify-content: space-between;
		padding-top: 20rpx;

		.top-box-left {
			image {
				width: 26rpx;
				height: 42rpx;
			}
		}

		.top-box-right {
			display: flex;
			width: 152rpx;
			height: 48rpx;
			line-height: 48rpx;
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
		height: 100vh;
		box-sizing: border-box;
		background-color: #000000;
	}

	.scroll {
		position: relative;
		width: 100%;
		height: 100%;
		z-index: 9;
	}

	.container {
		height: 100vh;
		padding: 0 30rpx;
	}

	.header {
		.go-back {
			margin-top: 60rpx;
			font-family: PingFangSC;
			font-size: 56rpx;
			line-height: 40rpx;
			color: #FFF;
			font-weight: normal;
			z-index: 11;
		}
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