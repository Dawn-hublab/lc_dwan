<template>
	<view class="auth">
		<view class="infos">
			<view class="list">
				<text>真实姓名</text>
				<input placeholder="请输入内容"
					placeholderStyle="font-size: 28rpx;color: #999999;line-height: 40rpx;font-family: PingFangSC-Regular;"
					border="surround" v-model="formData.name"></input>
			</view>
			<view class="list">
				<text>身份证号</text>
				<input placeholder="请输入内容"
					placeholderStyle="font-size: 28rpx;color: #999999;line-height: 40rpx;font-family: PingFangSC-Regular;"
					border="surround" v-model="formData.value"></input>
			</view>
			<view class="list">
				<text>上传身份证正面</text>
				<view class="upload" v-if="!formData.card_z">
					<image src="../../static/user/authentication/upload.png" @click="selectCard(1)"></image>
					<text>请保证身份证完整，身份证号清晰</text>
				</view>
				<view class="upload" v-show="formData.card_z">
					<image :src="formData.card_z"></image>
					<text>请保证身份证完整，身份证号清晰</text>
				</view>
			</view>
			<view class="list">
				<text>上传身份证反面</text>
				<view class="upload" v-show="!formData.card_f">
					<image src="../../static/user/authentication/upload.png" @click="selectCard(2)"></image>
					<text>请保证身份证完整，身份证号清晰</text>
				</view>
				<view class="upload" v-show="formData.card_f">
					<image :src="formData.card_f"></image>
					<text>请保证身份证完整，身份证号清晰</text>
				</view>
			</view>
			<view class="button" @click="submit">
				<text>提交认证信息</text>
			</view>
			<view class="text">
				<text>根据监管要求身份证照片仅用于实名认证</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formData: {
					name: '',
					value: '',
					card_z: '',
					card_f: ''
				},
				
			}
		},
		created() {},
		onShow() {
			setTimeout(() => {
				uni.setNavigationBarTitle({
					title: '实名认证'
				})
			}, 100)

		},
		methods: {
			//h5图片转base64
			imageBase64(url) { 
				return new Promise((resolve, reject) => {
					uni.request({
						url: url,
						method: 'GET',
						responseType: 'arraybuffer',
						success: ress => {
							let base64 = uni.arrayBufferToBase64(ress.data)
							base64 = 'data:image/jpeg;base64,' + base64
							resolve(base64)
						},
						fail: (e) => {
							reject("图片转换失败")
						}
					})
				});
		},
       //app图片转base64
		handleImageToBase64(filePath, callback) {
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
		// 上传图片
		selectCard(card_type) {
			let _this = this
			uni.chooseImage({
				count: 1, // 默认9，设置图片的选择数量
				sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], // 从相册选择
				success: (res) => {
					const tempFilePaths = res.tempFilePaths[0];
					
					// #ifdef APP-PLUS
					_this.handleImageToBase64(tempFilePaths, function(base64) {
						res.tempFilePath = base64
							if (card_type == 1) {
								_this.formData.card_z = base64
							} else {
								_this.formData.card_f = base64
							}
					});
					// #endif
					// #ifdef H5
					// 读取文件， base64 格式
					this.imageBase64(tempFilePaths).then((res)=>{
						console.log(res,"00")
						if (card_type == 1) {
							_this.formData.card_z = res
						} else {
							_this.formData.card_f = res
						}
					})
				
					// #endif
				},
				fail: (chooseImageErr) => {
					console.log('choose image fail:', chooseImageErr);
				}
			});
		},
		submit(){
			
			// debugger
			if (!this.formData.name) {
				uni.showToast({
					title: '请填写姓名',
					icon: 'error',
					duration: 2000
				}) 
				return
			}
			if (!this.formData.value) {
				uni.showToast({
					title: '请填写身份证号',
					icon: 'error',
					duration: 2000
				}) 
				return
			}
			if (!this.formData.card_z || !this.formData.card_f) {
				uni.showToast({
					title: '请上传身份证',
					icon: 'error',
					duration: 2000
				}) 
				return
			}
			 uni.request({
			                    // url: 'http://localhost:3000/upload', 
			                    url: 'https://mockapi.eolink.com/Rdg8I2Ke62b16148c201c163b44a429d27ce126ce42eebf/upload?responseId=1717607', 
								method:"POST",
								data: this.formData,
			                    success: (res) => {
									uni.showToast({
										title: '提交成功',
										icon: 'success',
										duration: 2000
									}) 
									setTimeout(()=>{
										 uni.navigateBack({
										 	delta: 1
										 });
									},1000)
									
			                        
			                    }
			                });
			            
		},
	}
	}
</script>

<style lang="scss" scoped>
	.auth {
		height: 100%;
		background-color: #FFFFFF;

		& text {
			font-family: PingFangSC-Regular, PingFang SC;
			color: #7C7597;
		}

		.infos {
			.list {
				display: flex;
				flex-direction: column;
				padding: 60rpx 78rpx 0;

				>text {
					font-size: 28rpx;
					font-weight: 600;
					color: #160651;
					line-height: 40rpx;
					margin-bottom: 14rpx;
				}

				>input {
					height: 80rpx;
					background: #F5F5FB;
					border-radius: 10rpx;
					padding-left: 32rpx;
				}

				.upload {
					display: flex;
					flex-direction: column;
					align-items: center;
					background: #F5F5FB;
					border-radius: 10rpx;
					padding: 62rpx 54rpx 30rpx 54rpx;

					& image {
						width: 488rpx;
						height: 264rpx;
					}

					>text {
						margin-top: 38rpx;
					}
				}
			}
		}

		.button {
			display: flex;
			padding: 0 82rpx;
			margin-top: 78rpx;

			>text {
				width: 100%;
				height: 84rpx;
				background: #533CD7;
				box-shadow: 0rpx 6rpx 30rpx 0rpx rgba(83, 60, 215, 0.4600);
				border-radius: 43rpx;
				font-size: 32rpx;
				color: #FFFFFF;
				line-height: 84rpx;
				text-align: center;
			}
		}

		.text {
			width: 100%;
			display: flex;
			justify-content: center;
			margin-top: 10rpx;
		}
	}
</style>