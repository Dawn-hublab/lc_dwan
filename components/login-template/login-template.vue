<template>
	<view>
		<view class="welcome">Welcome</view>
		<view class="title">{{title}}</view>
		<view class="content">
			<image src="@/static/img/user/login.png" mode="widthFix"></image>
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name: "login-template",
		props: {
			title: {
				type: String,
				default: ''
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.welcome {
		height: 76rpx;
		font-family: PingFangSC, PingFang SC;
		font-weight: 600;
		font-size: 53rpx;
		color: #FFFFFF;
		line-height: 76rpx;
		margin-top: 100rpx;
		text-align: left;
		font-style: normal;
	}

	.title {
		height: 76rpx;
		font-family: PingFangSC, PingFang SC;
		font-weight: 600;
		font-size: 53rpx;
		color: #FFFFFF;
		line-height: 76rpx;
		text-align: left;
		font-style: normal;
		margin: 30rpx 0 50rpx 0;
	}

	.content {
		width: 690rpx;
		min-height: 200rpx;
		padding: 40rpx 0;
		background: #fff;
		border-radius: 20rpx;
		position: relative;

		image {
			width: 267rpx;
			height: 267rpx;
			position: absolute;
			right: 0;
			top: -200rpx;
		}
	}
</style>