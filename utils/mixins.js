import { mapGetters, mapMutations } from 'vuex'
import { pushPathToStorage } from './common'

export default {
	install(Vue) {
		Vue.mixin({
			methods: {
				...mapMutations(["setTheme"])
			},
			computed: {
				...mapGetters(["theme"])
			},
      onShow() {
        // #ifdef H5
        const routes = getCurrentPages().map(page => page.$page.fullPath)
        if(routes.length > 0) {
          const route = routes[routes.length - 1]
          if(route === 'pages/index/index') return
          window.history.replaceState(null, '', '/')
          setTimeout(() => {
            pushPathToStorage(route)
          }, 100)
        }
        // #endif
      }
		})
	}
}