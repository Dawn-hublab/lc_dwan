# TODO

1，封装请求拦截器
2，将 store 目录下的方法引入到 main.js
3，utils 目录下的 common.js 需要引入多语言，在 copy 方法中的“复制成功”改为多语言配置
4，引入 uView
5，解决 pages.json 中 title 的多语言国际化翻译问题，用 hbuilder 创建一个国际化模板，他的语言包 json 在 locale 目录下，与 index.js 同级，这种方式 pages.json 中的国际化写法是生效的。但是加密后，不生效了，请修复

# 国际化加密方法

1，现在 locale/lang/下对应的 json 文件中写入翻译的多语言
2，执行 node jiami.js
3，在 static/目录下会生成 lang-encrypted 目录，这个目录下的文件都是 base64 加密后的多语言
4，locale/index.js 中引入的是 base64 加密后的文件

# 首次安装报错，没有找到 config.js

> 在 static 目录新建 config.js，将一下内容复进去，不要提交这个文件，这是本地开发测试使用的

```js
const title = "test"
const key = '494c76fb11e697e702dd9664993062cd'
// const jsonUrl = "https://xxxx.com/index.json" //存放apigateway的json文件
const jsonUrl = 'https://data324dc.hkg.bcebos.com/index.json' //存放apigateway的json文件

const version_conf = "1.0.25" //版本号，网页端用
const is_encrypt = false //是否加密
const is_test = false //是否为测试服
const test_url = "https://www.jvsvwuw.xyz/api/" //测试服域名/api/
// const test_url = "http://localhost:8787/lc/" //测试服域名/api/
const line_urls = [
	"https://chyt8hqqtl.execute-api.ap-southeast-1.amazonaws.com/p1/",
	"https://jvc1cnjbxd.execute-api.ap-southeast-1.amazonaws.com/p1/",
	"https://ufnjp8wozi.execute-api.ap-southeast-1.amazonaws.com/p1/",
	"https://vwuhf81z58.execute-api.ap-southeast-1.amazonaws.com/p1/",
	"https://bn77qzejfe.execute-api.ap-southeast-1.amazonaws.com/p1/"
]

const lang = 'zh'

export {
	title,
	key,
	jsonUrl,
	version_conf,
	is_encrypt,
	is_test,
	test_url,
	lang,
	line_urls
}
```

# 仿苹果自定义弹窗

文件位置：components -> modal
使用方法：

```js
this.showModal({title: '...', content: '...', })
```
可选参数：
title: 标题
content: 内容
showCancel: 是否显示取消按钮，默认true
cancelText: 取消按钮文本
confirmText: 确认按钮文本
success: 接口调用成功的回调函数
fail: 接口调用失败的回调函数
complete: 接口调用结束的回调函数

# pages.json自动化生成
##### 添加路由后运行/scripts/generatePages.js文件即可
多人开发时，为了避免频繁对pages.json文件进行更改造成git代码同步麻烦的问题，采用自动化生成pages.json文件的形式
开发者需要添加页面路由时，在routes目录下新增js文件导出路由配置，文件名随意（避免文件名冲突加上自己名字前缀），导出格式以下：
```js
module.exports = [
  {
    path: '/pages/custom/custom',
    // 其他配置项
  }
]
```
内容与pages.json的path配置相同，脚本会获取到数组并合并生成pages.json
pages.json的其他全局配置在data/pagesJson.js中编辑


#api
引入http文件下的俩个js文件
使用方法：
```javascript
toPromise(Get(opts)).then(res => res)
	.catch();
```


