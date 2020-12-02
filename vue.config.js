module.exports = {
  // 选项...
  publicPath: '/' ,
  devServer: {
    open: true, //是否自动弹出浏览器页面
    https: false,
    hotOnly: false,
    // proxy: 'http://127.0.0.1:8000' //配置跨域处理,只有一个代理
    // 配置多个代理
    proxy:{
        '/api': {
            target: 'http://127.0.0.1:8000/', //API服务器的地址
            // target: 'http://8.129.170.252:8000/', //API服务器的地址
            // target: 'http://192.168.146.128:8000/', //API服务器的地址
            ws: true,  //代理websockets
            changeOrigin: true, // 虚拟的站点需要更管origin
            pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
                '^/api': '/'
            }
        },

    },
  }

}
