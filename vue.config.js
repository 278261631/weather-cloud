module.exports = {
  devServer:{
    proxy:{
      '/weather':{
        target:'http://www.xjltp.com',
        changeOrigin: true,
        pathRewrite:{'^/weather':'/'}
      }
    }
  },

  assetsDir: 'static'
}