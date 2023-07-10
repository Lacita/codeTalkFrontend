const CompressionPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
module.exports = {
  publicPath: '/',
  productionSourceMap: false,
  configureWebpack: {...},
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src'));
    config.when(process.env.NODE_ENV !== 'development',
      config => {
        // 提供带 Content-Encoding 编码的压缩版的资源
        config.plugin('compressionPlugin')
          .use(new CompressionPlugin({
            filename: '[path].gz[query]', // 目标文件名
            algorithm: 'gzip',  // 压缩算法
            test: productionGzipExtensions, // 满足正则表达式的文件会被压缩
            threshold: 10240, // 只处理比这个值大的资源。按字节计算 10240=10KB
            minRatio: 0.8, // 只有压缩率比这个值小的资源才会被处理
            deleteOriginalAssets: true // 是否删除原资源
          }));
      }
    )
  }
}
