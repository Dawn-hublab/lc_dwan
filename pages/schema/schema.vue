<template>
  <view class="user">
    <view class="user-info">
      <image
        class="user-info-pic"
        :src="userPic"
      ></image>
      <view class="user-info-name">test</view>
    </view>
    <view class="user-content">
      <view
        class="user-content-item"
        @tap.stop="jumpToPassword"
      >
        <text class="item-title">实名认证</text>

        <view class="rightArray">
          <uni-icons
            type="forward"
            size="30"
          ></uni-icons>
        </view>
      </view>
      <view
        class="user-content-item"
        @tap.stop="handleClearCache"
      >
        <text class="item-title">清理缓存</text>

        <view class="rightArray">
          <text>{{ fileSizeString }}</text>
        </view>
      </view>
    </view>
	<tab-bar current="4"></tab-bar>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        userPic: '../../static/user/user@2x.png',
        fileSizeString: '0B',
      }
    },
    onLoad() {
      this.formatSize()
    },
    onShow() {
      setTimeout(() => {
        uni.setNavigationBarTitle({
          title: this.$t('index.WoDe'),
        })
      }, 100)
    },
    methods: {
      jumpToPassword() {
        uni.navigateTo({
          url: '/pages/schema/authentication',
        })
      },
      // 获取缓存
      formatSize() {
        let that = this
        const clacSize = function (size) {
          let sizeCache = parseInt(size)
          if (sizeCache == 0) {
            that.fileSizeString = '0B'
          } else if (sizeCache < 1024) {
            that.fileSizeString = sizeCache + 'B'
          } else if (sizeCache < 1048576) {
            that.fileSizeString = (sizeCache / 1024).toFixed(2) + 'KB'
          } else if (sizeCache < 1073741824) {
            that.fileSizeString = (sizeCache / 1048576).toFixed(2) + 'MB'
          } else {
            that.fileSizeString = (sizeCache / 1073741824).toFixed(2) + 'GB'
          }
        }
        // #ifdef APP-PLUS
        plus.cache.calculate(clacSize)
        // #endif
        // #ifdef H5
        function getStorageSize() {
          const localStorage = window['localStorage']
          const sessionStorage = window['sessionStorage']
          let totalSize = 0

          for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
              const value = localStorage.getItem(key)
              totalSize += key.length + value.length // key和value的长度加起来
            }
          }
          for (let key in sessionStorage) {
            if (sessionStorage.hasOwnProperty(key)) {
              const value = sessionStorage.getItem(key)
              totalSize += key.length + value.length // key和value的长度加起来
            }
          }

          return totalSize // 字符串的长度是以字符为单位的，不是字节
        }
        clacSize(getStorageSize())
        // #endif
      },
      handleClearCache() {
        let that = this
        this.showModal({
          title: '清除缓存',
          content: '您确定要清除缓存吗？',
          success: res => {
            if (res.confirm) {
              that.clearCache()
            }
          },
        })
      },
      clearCache() {
        const that = this
        uni.getStorageInfo({
          success: res => {
            const keysToKeep = ['token'] // 需要保留的键名数组
            const keysToDelete = res.keys.filter(key => !keysToKeep.includes(key)) // 排除需要保留的键
            // 遍历删除其他缓存
            keysToDelete.forEach(key => {
              uni.removeStorage({
                key: key,
                success: () => console.log(`已清除缓存：${key}`),
              })
            })
          },
          fail: err => console.log('获取缓存信息失败', err),
        })
        // #ifdef APP-PLUS
        let os = plus.os.name
        if (os == 'Android') {
          let main = plus.android.runtimeMainActivity()
          let sdRoot = main.getCacheDir()
          let files = plus.android.invoke(sdRoot, 'listFiles')
          let len = files.length
          if (len === 0) return
          uni.showLoading({
            title: '清理中',
            mask: false,
          })
          const showMsg = (i, len) => {
            if (i !== len - 1) return
            uni.hideLoading()
            this.showModal({ title: '缓存清理完成' })
            that.formatSize()
          }
          for (let i = 0; i < len; i++) {
            let filePath = '' + files[i] // 没有找到合适的方法获取路径，这样写可以转成文件路径
            plus.io.resolveLocalFileSystemURL(
              filePath,
              entry => {
                if (!entry.isDirectory) {
                  entry.remove()
                  showMsg(i, len)
                  return
                }
                entry.removeRecursively(
                  //递归删除其下的所有文件及子目录
                  entry => showMsg(i, len),
                  e => that.showModal({ title: e.message })
                )
              },
              e => that.showModal({ title: '清理失败，请检查文件权限' })
            )
          }
        } else {
          // ios
          plus.cache.clear(() => {
            uni.showToast({ title: '缓存清理完成' })
            that.formatSize()
          })
        }
        // #endif
      },
    },
  }
</script>

<style lang="scss" scoped>
  .user {
    position: absolute;
    bottom: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #efefef;
    background-image: url(../../static/user/my-top-bj.png);
    background-repeat: no-repeat;
    background-size: 100% 320rpx;
    &-info {
      width: 705rpx;
      height: 208rpx;
      background-color: #fff;
      border-radius: 10rpx;
      margin: auto;
      margin-top: 200rpx;
      position: relative;
      padding-top: 70rpx;
      box-sizing: border-box;
      &-pic {
        position: absolute;
        left: 0;
        right: 0;
        margin: 0 auto;
        top: -70rpx;
        width: 132rpx;
        height: 132rpx;
        background-color: #fff;
        border: #fff 8rpx solid;
        border-radius: 50%;
      }
      &-name {
        text-align: center;
        display: block;
        font-size: 36rpx;
      }
      &-extra {
        width: 50%;
        display: flex;
        justify-content: space-around;
        margin: 0 auto;
        font-size: 30rpx;
      }
    }
    &-content {
      background-color: #fff;
      margin-top: 31rpx;
      width: 100%;
      &-item {
        border-bottom: 1px solid #dedede;
        width: 100%;
        height: 100rpx;
        line-height: 100rpx;
        box-sizing: border-box;
        padding: 0 30rpx;
        font-size: 30rpx;
        position: relative;
        display: block;
        .title {
          display: inline-block;
          margin-left: 16rpx;
        }
        .rightArray {
          position: absolute;
          top: 0rpx;
          right: 30rpx;
          margin: auto;
          font-size: 50rpx;
          color: #a4a4a4;
          line-height: 100rpx;
          height: 100rpx;
        }
      }
    }
  }
</style>
