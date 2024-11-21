// scripts/generatePagesJson.js
const fs = require('fs')
const path = require('path')

// 定义 router/modules 目录
const modulesDir = path.resolve(__dirname, '../routes')
const basePagesJson = require('../data/pagesJson.js')

// 用于存放合并后的路由数据
let pages = []

// 遍历 router/modules 目录下的所有 .js 文件
function generatePagesJson() {
  // 获取 modules 目录下的所有文件
  const moduleFiles = fs.readdirSync(modulesDir)

  // 遍历每个文件
  moduleFiles.forEach(file => {
    const filePath = path.join(modulesDir, file)

    // 只处理 .js 文件
    if (fs.statSync(filePath).isFile() && filePath.endsWith('.js')) {
      try {
        // 动态加载每个路由模块
        const routeModule = require(filePath)

        // 确保模块导出的内容是一个数组
        if (Array.isArray(routeModule)) {
          pages = pages.concat(routeModule)
        } else {
          console.warn(`警告：文件 ${file} 导出的路由模块不是数组！`)
        }
      } catch (error) {
        console.error(`加载文件 ${file} 时出错：`, error)
      }
    }
  })

  basePagesJson.pages = [...basePagesJson.pages, ...pages ]

  // 将合并后的 pagesJson 写入到 pages.json 文件中
  fs.writeFileSync(path.resolve(__dirname, '../pages.json'), JSON.stringify(basePagesJson, null, 2))
  console.log('pages.json has been generated')
}

// 调用函数生成 pages.json
generatePagesJson()
