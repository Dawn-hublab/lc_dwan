<template>
  <view class="container">
    <no-data></no-data>
  </view>
</template>

<script>
  export default {
    data() {
      return {
       
      }
    },
	// onReady() {
	// 	uni.setNavigationBarTitle({
	// 		title:this.$t('index.component')
	// 	})
	// },
	onShow() {
		setTimeout(()=>{
			uni.setNavigationBarTitle({
				title:this.$t('index.component')
			})
		},100)
	
	},
    methods: {
      
    }
  }
</script>

<style>

</style>
