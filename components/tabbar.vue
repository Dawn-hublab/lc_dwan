<template>
	<view>
		<view class="zhanwei"></view>
		<view class="tabbar" :class="current == 2 ? 'tabbar-two' : ''">
			<view class="tabbar-item" v-for="(item,index) in list" :key="index" @click="changeTab(index)">
				<template v-if="index == 0">
					<view class="select" v-if="current == index">
						<image class="img imgactive" :class="index == 2? 'imgact2' : ''" :src="item.selectedIconPath"
							v-if="current == index"></image>
						<image class="img" :class="index == 2? 'img2' : ''" :src="item.iconPath" v-else></image>
						<view class="text" :class="{active: current == index}">{{$t('index.ShouYe')}}</view>
					</view>
					<view v-else>
						<image class="img" :class="index == 2? 'img2' : ''" :src="item.selectedIconPath"
							v-if="current == index"></image>
						<image class="img" :class="index == 2? 'img2' : ''" :src="item.iconPath" v-else></image>
						<view class="text" :class="{active: current == index}">{{$t('index.ShouYe')}}</view>
					</view>
				</template>
				<template v-if="index == 1">
					<view class="select" v-if="current == index">
						<image class="img imgactive" :class="index == 2? 'imgact2' : ''" :src="item.selectedIconPath"
							v-if="current == index"></image>
						<image class="img" :class="index == 2? 'img2' : ''" :src="item.iconPath" v-else></image>
						<view class="text" :class="{active: current == index}">{{$t('index.WenYingBao')}}</view>
					</view>
					<view v-else>
						<image class="img" :class="index == 2? 'img2' : ''" :src="item.selectedIconPath"
							v-if="current == index"></image>
						<image class="img" :class="index == 2? 'img2' : ''" :src="item.iconPath" v-else></image>
						<view class="text" :class="{active: current == index}">{{$t('index.WenYingBao')}}</view>
					</view>
				</template>
				<template v-if="index == 2">
					<view class="select" v-if="current == index">
						<image class="img imgactive" :class="index == 2? 'imgact2' : ''" :src="item.selectedIconPath"
							v-if="current == index"></image>
						<image class="img" :class="index == 2? 'img2' : ''" :src="item.iconPath" v-else></image>
					</view>
					<view v-else>
						<image class="img" :class="index == 2? 'img2' : ''" :src="item.selectedIconPath"
							v-if="current == index"></image>
						<image class="img" :class="index == 2? 'img2' : ''" :src="item.iconPath" v-else></image>
					</view>
				</template>
				<template v-if="index == 3">
					<view class="select" v-if="current == index">
						<image class="img imgactive" :class="index == 2? 'imgact2' : ''" :src="item.selectedIconPath"
							v-if="current == index"></image>
						<image class="img" :class="index == 2? 'img2' : ''" :src="item.iconPath" v-else></image>
						<view class="text" :class="{active: current == index}">{{$t('index.JinRongQuan')}}</view>
					</view>
					<view v-else>
						<image class="img" :class="index == 2? 'img2' : ''" :src="item.selectedIconPath"
							v-if="current == index"></image>
						<image class="img" :class="index == 2? 'img2' : ''" :src="item.iconPath" v-else></image>
						<view class="text" :class="{active: current == index}">{{$t('index.JinRongQuan')}}</view>
					</view>
				</template>
				<template v-if="index == 4">
					<view class="select" v-if="current == index">
						<image class="img imgactive" :class="index == 2? 'imgact2' : ''" :src="item.selectedIconPath"
							v-if="current == index"></image>
						<image class="img" :class="index == 2? 'img2' : ''" :src="item.iconPath" v-else></image>
						<view class="text" :class="{active: current == index}">{{$t('index.WoDe')}}</view>
					</view>
					<view v-else>
						<image class="img" :class="index == 2? 'img2' : ''" :src="item.selectedIconPath"
							v-if="current == index"></image>
						<image class="img" :class="index == 2? 'img2' : ''" :src="item.iconPath" v-else></image>
						<view class="text" :class="{active: current == index}">{{$t('index.WoDe')}}</view>
					</view>
				</template>
			</view>
		</view>
	</view>

</template>
<script>
	export default {
		name: "tabbar",
		props: ['current'],
		data() {
			return {
				list: [{
						pagePath: "pages/index/index",
						// iconPath: require("@/static/img/index/icon01.png"),
						iconPath: new URL("@/static/img/index/icon01.png", import.meta.url).href,
						// selectedIconPath: require("@/static/img/index/icon1.png"),
						selectedIconPath: new URL("@/static/img/index/icon1.png", import.meta.url).href,
						text: this.$t('index.ShouYe')
					},
					{
						pagePath: "pages/component/component",
						// iconPath: require("@/static/img/index/icon02.png"),
						iconPath: new URL("@/static/img/index/icon02.png", import.meta.url).href,
						// selectedIconPath: require("@/static/img/index/icon2.png"),
						selectedIconPath: new URL("@/static/img/index/icon2.png", import.meta.url).href,
						text: this.$t('index.WenYingBao')
					},
					{
						pagePath: "pages/transaction/transaction",
						// iconPath: require("@/static/img/index/iconZ.png"),
						iconPath: new URL("@/static/img/index/iconZ.png", import.meta.url).href,
						// selectedIconPath: require("@/static/img/index/iconZ1.png"),
						selectedIconPath: new URL("@/static/img/index/iconZ1.png", import.meta.url).href,
						text: ""
					},
					{
						pagePath: "pages/api/api",
						// iconPath: require("@/static/img/index/icon01.png"),
						iconPath: new URL("@/static/img/index/icon01.png", import.meta.url).href,
						// selectedIconPath: require("@/static/img/index/icon1.png"),
						selectedIconPath: new URL("@/static/img/index/icon1.png", import.meta.url).href,
						text: this.$t('index.JinRongQuan')
					},
					{
						pagePath: "pages/schema/schema",
						// iconPath: require("@/static/img/index/icon03.png"),
						iconPath: new URL("@/static/img/index/icon03.png", import.meta.url).href,
						// selectedIconPath: require("@/static/img/index/icon3.png"),
						selectedIconPath:new URL("@/static/img/index/icon3.png", import.meta.url).href,
						text: this.$t('index.WoDe')
					}
				]
			}
		},
		created() {
			uni.hideTabBar()
		},
		methods: {
			changeTab(e) {
				uni.switchTab({
					url: '/' + this.list[e].pagePath,
				});
			}
		}
	}
</script>
<style scoped lang="scss">
	$tabbar-height : 162rpx;

	.tabbar {
		position: fixed;
		left: 0;
		bottom: 0rpx !important;
		z-index: 9999;
		width: 750rpx;
		height: $tabbar-height;
		display: flex;
		justify-content: space-between;
		background: #302F36;
		overflow: hidden;
		box-shadow: inset 0rpx 2rpx 0rpx 0rpx #25242A;
	}

	.zhanwei {
		height: $tabbar-height;
	}

	.tabbar-item {
		// width: 88rpx;
		width: 20%;
		height: 100%;
		text-align: center;
		display: flex;
		justify-content: center;
		// margin: 0 35rpx;

	}

	.img {
		margin-top: 35rpx;
		height: 45rpx;
		width: 45rpx;
	}

	.img2 {
		margin-top: 32rpx;
		width: 103rpx;
		height: 72rpx;
	}

	.imgact2 {
		margin-top: 20rpx;
		width: 84rpx;
		height: 86rpx;
	}

	.text {
		margin-top: 4rpx;
		text-align: center;
		font-family: PingFangSC, PingFang SC;
		font-weight: 400;
		font-size: 19rpx;
		color: #666666;
	}

	.i-t {
		font-family: PingFangSC, PingFang SC;
		font-weight: 400;
		font-size: 19rpx;
		color: #666666;
		position: absolute;
	}

	.select {
		position: relative;
	}

	.text.active {
		color: #FCE7B7;
	}

	.tabbar-two {
		height: 179rpx;
		background-color: transparent;
		box-shadow: inset 0rpx 0rpx 0rpx 0rpx #25242A;
		background-image: url(@/static/img/index/iconDG.png);
		background-repeat: no-repeat;
		background-size: cover;
	}

	.tabbar-two .tabbar-item {
		padding-top: 20rpx !important
	}

	.tabbar-two .tabbar-item .imgact2 {
		margin-top: 10rpx;
	}
</style>