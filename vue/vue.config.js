const { defineConfig } = require('@vue/cli-service')
var path = require("path")

module.exports = defineConfig({
  transpileDependencies: true,
  outputDir : path.resolve(__dirname, "../node/public/"),
  devServer: { 
		proxy: { // proxyTable 설정
			'/api': {
				target: process.env.API_TARGET || 'http://localhost:3000/api',
				changeOrigin: true	,
				pathRewrite:{
					"^/api" : ''
				}
			}
		}
	}
})
