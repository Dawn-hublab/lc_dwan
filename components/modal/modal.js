import { createApp } from 'vue'
import modal from './modal.vue'
import { createI18n } from 'vue-i18n'
import messages from '@/locale/index.js'
let i18nConfig = {
    locale: uni.getLocale(),
    messages,
}

const showModal = (option = {}) => {
    const mountNode = document.createElement('div')
    const Instance = createApp(modal, {
        show: true,
        success: ({ confirm, cancel }) => {},
        fail: () => {},
        complete: () => {},
        ...option,
        close: () => {
            Instance.unmount(mountNode)
            document.body.removeChild(mountNode)
        },
    })
    Instance.use(createI18n(i18nConfig))
    document.body.appendChild(mountNode)
    Instance.mount(mountNode)
}

export default showModal
