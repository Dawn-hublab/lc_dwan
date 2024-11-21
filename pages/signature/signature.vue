<template>
	<view class="vip-page-background">
		<nav-bar :title="$t('index.htqz')"></nav-bar>
		<!-- 主页 -->
		<view class="sign-content">
			<view class="p1">{{$t('index.QingShiYongZhengKaiZiMingZiXieRuKuangLi')}}</view>
			<view class="sign-item">
				<jp-signature ref="signatureRef" style="border: 1px solid gray;" :openSmooth="true" :landscape="true"></jp-signature>
			</view>
		</view>
		<view class="sm-btn">
			<view class="btn-li" @click="clear">{{$t('index.ChongQian')}}</view>
			<view class="btn" @click="noMultipleClicks(save)">{{$t('index.TiJiao')}}</view>
		</view>
		<u-loading-page class="loading" :loading="loading" :loadingText="$t('msg.jzz')" bg-color="transparent"
			loading-mode="spinner"></u-loading-page>
	</view>
</template>

<script>
	// import {
	// 	uploadSignature
	// } from '@/api/index.js'
    import JpSignature from '../../uni_modules/jp-signature/components/jp-signature/jp-signature.vue'
    import { noMultipleClicks } from '../../utils/common';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				id: null,
				amount: null,
				loading: false,
				noClick: true,
			};
		},
        components: {JpSignature},
		computed: {
			...mapState({
				orderData: state => state.formdata.orderData,
			})
		},
		onLoad({
			id,
			amount
		}) {
			this.id = id
			this.amount = amount
            console.log('signature');
		},
		methods: {
			...mapMutations({
				order: "formdata/order",
			}),
            noMultipleClicks,
			convertImageToBase64(filePath, callback) {
				plus.io.resolveLocalFileSystemURL(filePath, function(entry) {
					entry.file(function(file) {
						var reader = new plus.io.FileReader();
						reader.onloadend = function(e) {
							var base64 = e.target.result;
							callback(base64);
						};
						reader.readAsDataURL(file);
					}, function(e) {
						console.log("读取文件失败：" + e.message);
					});
				}, function(e) {
					console.log("获取文件失败：" + e.message);
				});
			},
            convertSignatureAndSave(path) {
                console.log(path);
            },
			save() {
				let _this = this
				this.loading = true
				this.$refs.signatureRef.canvasToTempFilePath({
					success: (res) => {
						if (res.isEmpty) {
							uni.showToast({
								title: this.$t("msg.qqz")
							})
							return
						}
						// #ifdef APP-PLUS
						_this.convertImageToBase64(res.tempFilePath, function(base64) {
							res.tempFilePath = base64
                            uni.showModal({
                                title: '存储签名？',
                                content: '将以base64格式存储到本地',
                                success: ({confirm}) => {
                                    if(confirm) {
                                        console.log(res.tempFilePath)
                                        uni.setStorageSync('signature', res.tempFilePath)
                                    }
                                }
                            })
							uploadSignature(res.tempFilePath).then(res => {
								const path = res.file_path
								const full_path = res.file_url
								_this.order({
									..._this.orderData,
									...{
										image: path,
										signature_full_path: full_path
									}
								})
								uni.redirectTo({
									url: `/pages/new/contract?id=${_this.id}&amount=${_this.amount}`
								})
							}).finally(() => _this.loading = false)
						});
						// #endif
						// #ifdef H5
                        uni.setStorageSync('signature', res.tempFilePath);
						/* uploadSignature(res.tempFilePath).then(res => {
							const path = res.file_path
							const full_path = res.file_url
							_this.order({
								..._this.orderData,
								...{
									image: path,
									signature_full_path: full_path
								}
							})
							uni.redirectTo({
								url: `/pages/new/contract?id=${_this.id}&amount=${_this.amount}`
							})
						}).finally(() => _this.loading = false) */
						// #endif
					}
				})
			},
			clear() {
				this.$refs.signatureRef.clear()
			},
		}
	}
</script>

<style lang="scss" scoped>
	.vip-page-background {
		width: 750rpx;
		min-height: 100vh;
	}

	.sign-content {
		width: 750rpx;

		.sign-item {
			height: 800rpx;
			margin-left: 30rpx;
			margin-right: 30rpx;
			background: #FFFFFF;
			border-radius: 27rpx;
		}

		.p1 {
			margin: 40rpx 30rpx 20rpx 30rpx;
			margin-left: 30rpx;
			margin-right: 30rpx;
			margin-bottom: 21rpx;
			font-weight: 400;
			font-size: 27rpx;
			color: #666666;
		}
	}

	.op3 {
		opacity: 0.5;
	}

	.sm-btn {
		display: flex;
		justify-content: space-between;
		padding: 0rpx 88rpx;
		position: fixed;
		left: 0;
		bottom: 60rpx;

		.btn-li {
			width: 256rpx;
			height: 86rpx;
			font-family: PingFangSC, PingFang SC;
			font-weight: 400;
			font-size: 31rpx;
			color: #FCE7B7;
			text-align: center;
			line-height: 86rpx;
			border: 2rpx solid #FCE7B7;
			border-radius: 44rpx;
			margin-right: 101rpx;
		}

		.btn {
			width: 256rpx;
			height: 86rpx;
			font-family: PingFangSC, PingFang SC;
			font-weight: 400;
			font-size: 31rpx;
			color: #1B1A22;
			text-align: center;
			line-height: 86rpx;
			background: #FCE7B7;
			border-radius: 44rpx;
		}
	}
</style>