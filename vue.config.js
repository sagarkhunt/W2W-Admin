module.exports = {
  publicPath: '/',
  runtimeCompiler: true,
  transpileDependencies: ['vue-echarts', 'resize-detector'],
  chainWebpack: config => {
    config.module.rules.delete('eslint')
  },
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    },
    module: {
      rules: [
        {
          test: /\.(csv|xlsx|xls)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
                emitFile: true
              }
            }
          ]
        }
      ]
    }
  }
}
