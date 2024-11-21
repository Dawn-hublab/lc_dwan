<template>
	<u-popup :show="show" id="popup-box" mode="center" bgColor="transparent" @close="cancel"
		:closeOnClickOverlay="false">
		<template>
			<view class="popup-box">
				<image class="update_app" src="@/static/img/index/updateApp.png" mode="widthFix" lazy-load></image>
				<view class="title">
					<text>{{$t("msg.sjdxbb")}}</text>
				</view>
				<view class="content">
					<text>{{$t("msg.qzsj")}}</text>
				</view>

				<view class="update_btn">
					<template v-if="!downloading">
						<button @click="confirm">{{$t("msg.ljgx")}}</button>
						<view @click="cancel" v-if="type == 2">{{$t("msg.zbgx")}}</view>
					</template>
					<template v-else>
						<button @click="to">{{$t("msg.ljtzgx")}}</button>
					</template>
				</view>
			</view>
		</template>
	</u-popup>
</template>

<script>
	import {
		mapMutations
	} from 'vuex'

	export default {
		name: "test",
		props: {
			show: {
				type: Boolean,
				default: false
			},
			type: {
				type: Number,
				default: 2
			},
			data: {
				type: Object,
				default: () => {}
			},
		},
		data() {
			return {
				primaryColor: '#2A6A47',
				downloading: false,
				progress: 0,
				downloadTask: null,
				link: ""
			}
		},
		created() {
			// #ifdef APP-PLUS
			this.eventChannel = this.getOpenerEventChannel();
			// #endif
		},
		methods: {
			...mapMutations({
				update: "system/update",
			}),
			cancel() {
				this.$emit('cancel')
				this.update({
					force: false,
					update_now: false
				})
			},
			confirm() {
				this.downloadAPK()
			},
			to() {
				plus.runtime.openURL(this.link)
				this.cancel()
			},
			downloadAPK() {
				// #ifdef H5
				this.cancel()
				window.location.href = this.data["04"]
				// #endif
				this.downloading = true
				// #ifdef APP-PLUS
				if (uni.getSystemInfoSync().platform === 'ios') {
					this.link = this.data["02"]
				} else {
					this.link = this.data["03"]
				}
				// #endif
			},
		},
	}
</script>

<style>
	page {
		background: transparent;
	}
</style>

<style lang="scss" scoped>
	::v-deep .u-popup__content {
		margin-top: -60rpx;
	}

	.popup-box {
		background: linear-gradient(to bottom, #ffe3cf, #fff7f2, #ffffff);
		width: 590rpx;
		height: 730rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: 20rpx;
		position: relative;

		.update_app {
			width: 340rpx;
			margin: 0 auto;
			margin-top: -100rpx;
		}

		.title {
			height: 48rpx;
			font-family: PingFangSC, PingFang SC;
			font-weight: 500;
			font-size: 34rpx;
			color: #7C1702;
			line-height: 48rpx;
			text-align: center;
			font-style: normal;
			margin-bottom: 45rpx;
		}

		.content {
			height: 52rpx;
			font-family: PingFangSC, PingFang SC;
			font-weight: 400;
			font-size: 27rpx;
			color: #25242A;
			line-height: 52rpx;
			text-align: center;
			font-style: normal;
		}

		.update_btn {
			button {
				display: block;
				width: 523rpx;
				height: 86rpx;
				background: #01040D;
				border-radius: 44rpx;
				font-family: PingFangSC, PingFang SC;
				font-weight: 400;
				font-size: 31rpx;
				color: #FCE7B7;
				line-height: 86rpx;
				text-align: center;
				font-style: normal;
				margin: 108rpx 0 26rpx 0;
			}

			view {
				height: 42rpx;
				font-family: PingFangSC, PingFang SC;
				font-weight: 400;
				font-size: 31rpx;
				color: #B6BFCA;
				line-height: 42rpx;
				text-align: center;
				font-style: normal;
			}
		}
	}

	.modal-box {
		display: flex;
		flex-direction: column;
		background: #fff;
		border-radius: 20rpx;
		overflow: hidden;

		.modal-top {
			width: 420rpx;
			padding: 40rpx;
			display: flex;
			flex-direction: column;
			align-items: center;

			.modal-title {
				font-size: 36rpx;
				font-weight: bold;
			}

			.modal-content {
				font-size: 30rpx;
				margin-top: 20rpx;
				text-align: center;
				color: #333333;
			}
		}

		.modal-btn {
			border-top: 1rpx solid #eee;
			display: flex;

			.item {
				font-size: 32rpx;
				width: 250rpx;
				height: 80rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #666666;
				font-weight: 600;
			}

			.active {
				color: $uni-color-primary;
			}
		}
	}

	.rich-box {
		max-width: 750rpx;
		overflow: hidden;
	}
</style>