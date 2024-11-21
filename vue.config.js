const path = require('path')
module.exports = {
	configureWebpack: {
		module: {
			rules: [
			  {
				test: /\.vue$/,
				use:{
					// loader: "vue-inset-loader"
					// 针对Hbuilder工具创建的uni-app项目
					loader: path.resolve(__dirname,"./node_modules/vue-inset-loader")
				}
			  }
			]
		},
	}
}