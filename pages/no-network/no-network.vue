<template>
	<view class="">
		无网络链接
	</view>
</template>

<script>
	export default {
	  data() {
	    return {
			
	    }
	  },
		onShow() {
		setTimeout(()=>{
			uni.setNavigationBarTitle({
				title:"无网络链接"
			})
		},100)
		},
	  methods: {
		  
	  }
	}
</script>

<style>
</style>