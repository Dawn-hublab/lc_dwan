<script>
    import { getUpdateStatus } from './utils/common'
    export default {
        data() {
            return {
                modalVisible: false
            }
        },
        onLaunch: function () {
            this.showUpdateModal(false)
            // 封装showModal方法，新增modal显示状态处理
            const originalModal = this.showModal
            this.showModal = (config) => {
                this.modalVisible = true
                const complete = config?.complete
                const defaultConfig = {
                    complete: () => { // modal状态设为false，调用传入的complete（如果有）
                        this.modalVisible = false
                        if(typeof complete === 'function') {
                            complete()
                        }
                    }
                }
                originalModal({ ...config, ...defaultConfig })
            }
			const systemInfo = uni.getSystemInfoSync()
			console.log(systemInfo.osName,"22")
			//苹果
				if (systemInfo.osName === 'ios') {
						uni.getNetworkType({
						  success: function (res) {
						    // 获取网络类型
						    const networkType = res.networkType
						    if (networkType === 'none') {
						      // 当前无网络连接，展示无网络页面
						      uni.redirectTo({
						        url: '/pages/no-network/no-network'
						      })
						    }
						  }
						})
						uni.onNetworkStatusChange(function (res) {
						  if (res.isConnected) {
						    // 网络连接恢复，重新加载应用程序
						    uni.reLaunch({
						      url: '/pages/index/index'
						    })
						  }
						})
					}
            // uni.getNetworkType({
            //     success: ({ networkType }) => {console.log(networkType);},
            //     fail: (error) => {console.log('no network');}
            // })
        },
        onShow: function () {
            this.showUpdateModal(true)
        },
        onHide: function () {},
        methods: {
            // 更新提示，force(当类型为强制更新时则设置为每次打开软件提示更新)
            showUpdateModal(force) {
                const status = getUpdateStatus()
                const modalConfig = { title: '更新可用', content: '更新版本1.5.3，是否下载更新？', confirmText: '立即升级' }
                if (status === 1 && !force) {
                    this.showModal({
                        ...modalConfig,
                        showCancel: true,
                        cancelText: '暂不升级',
                        success: ({ confirm, cancel }) => {
                            console.log('升级', confirm)
                            console.log('不升级', cancel)
                        },
                    })
                } else if (status === 2 && force) { // 出现多个弹窗叠加
                    if(this.modalVisible) return
                    this.showModal({
                        ...modalConfig,
                        showCancel: false,
                        success: ({ confirm }) => {
                            console.log('升级?', confirm)
                        },
                    })
                }
            },
        },
    }
</script>

<style>
    .container {
        padding: 15px;
    }

    button {
        margin-bottom: 15px;
    }
</style>
