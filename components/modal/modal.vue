<template>
    <view>
        <view
            class="modal-mask"
            v-if="visible"
        >
            <view class="modal">
                <view class="modal-content">
                    <view class="title">{{ title }}</view>
                    <view class="content">{{ content }}</view>
                </view>
                <view class="modal-btn">
                    <block v-if="showCancel">
                        <view
                            class="btn"
                            @click="handleClose(0)"
                            >{{ cancelText ? cancelText : $t('component.modal.cancel') }}</view
                        >
                        <view class="border"></view>
                    </block>
                    <view
                        class="btn"
                        @click="handleClose(1)"
                        >{{ confirmText ? confirmText : $t('component.modal.confirm') }}</view
                    >
                </view>
            </view>
        </view>
    </view>
</template>
<script setup>
    import { ref } from 'vue'
    const props = defineProps({
        show: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: '',
        },
        content: {
            type: String,
            default: '',
        },
        showCancel: {
            type: Boolean,
            default: true,
        },
        confirmText: {
            type: String,
            default: '',
        },
        cancelText: {
            type: String,
            default: '',
        },
        close: {
            type: Function,
            default: fun => fun(),
        },
        success: {
            type: Function,
            default: fun => fun(),
        },
        fail: {
            type: Function,
            default: fun => fun(),
        },
        complete: {
            type: Function,
            default: fun => fun(),
        },
    })
    const visible = ref(props.show)
    const emit = defineEmits(['update:show'])

    const handleClose = async i => {
        await props.success({ confirm: Boolean(i), cancel: !i })
        setTimeout(() => {
            visible.value = false
            props.complete()
        }, 200)
    }

</script>
<style lang="scss" scoped>
    $radius: 25rpx;
    .modal-mask {
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        .modal {
            width: 521.28rpx;
            margin-top: -100rpx;
            border-radius: $radius;
            background-color: #f0f0f0;
            .modal-content {
                padding: 33.7rpx;
                min-height: 139.36rpx;
            }
            .title {
                text-align: center;
                font-size: 33.7rpx;
                font-weight: bold;
                margin-bottom: 0;
            }
            .content {
                text-align: center;
                font-size: 24.82rpx;
            }
            .modal-btn {
                height: 85.1rpx;
                border-top: 1rpx solid #999;
                font-size: 33.7rpx;
                // font-weight: bold;
                color: #0094de;
                display: flex;
                .btn {
                    height: 100%;
                    text-align: center;
                    line-height: 85.1rpx;
                    flex: 1;
                    &:first-of-type {
                        border-bottom-left-radius: $radius;
                    }
                    &:last-of-type {
                        border-bottom-right-radius: $radius;
                    }
                }
                .btn:focus {
                    // background-color: #999;
                }
                .btn:active {
                    background-color: #dedede;
                }
                .border {
                    width: 1rpx;
                    background-color: #c0c0c0;
                }
            }
        }
    }
</style>
