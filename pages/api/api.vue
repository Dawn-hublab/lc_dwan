<template>
  <view class="container">
    <button @click="showModel">uni.showModal</button>
	<tab-bar current="3"></tab-bar>
  </view>
</template>

<script>
  export default {
    data() {
      return {}
    },
	// onReady() {
	// 	uni.setNavigationBarTitle({
	// 		title:this.$t('index.api')
	// 	})
	// },
	onShow() {
		setTimeout(()=>{
			uni.setNavigationBarTitle({
				title:this.$t('index.JinRongQuan')
			})
		},100)
	},
    methods: {
      showModel() {
        uni.showModal({
          content: this.$t('api.message'),
          success: (res) => {
            console.log(res);
          }
        })
      }
    }
  }
</script>

<style>

</style>
